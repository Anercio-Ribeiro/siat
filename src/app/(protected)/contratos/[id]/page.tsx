// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { fetchContratoById } from "@/lib/api-getContracts";
// import dynamic from "next/dynamic";
// import { useUser } from "@/hooks/getUser";
// import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";
// import { differenceInDays, parse, isValid } from "date-fns";
// import { calcularDuracaoRenda } from "@/app/utils/calcularDuracaoRenda";

// const PDFViewer = dynamic(
//   () => import("@/components/PDFViewer").then((mod) => mod.PDFViewer),
//   { ssr: false, loading: () => <Skeleton className="h-96 w-full" /> }
// );

// type Contrato = {
//   id: string;
//   valorTotal: number;
//   dataInicio: string;
//   dataFim: string;
//   termosContrato: string;
//   urlDocumento: string;
//   imovel: {
//     id: string;
//     titulo: string;
//     endereco: string;
//     bairro: string;
//     provincia: string;
//   };
//   inquilino: {
//     id: string;
//     nome: string;
//     email: string;
//   };
//   proprietario: {
//     id: string;
//     nome: string;
//     email: string;
//   };
// };

// export default function ContratoDetalhes() {
//   const router = useRouter();
//   const { id } = useParams();
//   const { user } = useUser();
//   const [contrato, setContrato] = useState<Contrato | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function loadContrato() {
//       if (!id) return;
//       setLoading(true);
//       try {
//         const data = await fetchContratoById(id as string);
//         console.log("Contrato carregado:", {
//           id: data.id,
//           urlDocumentoLength: data.urlDocumento?.length,
//           urlDocumentoSnippet: data.urlDocumento?.substring(0, 50),
//           isBase64Valid: data.urlDocumento ? /^[A-Za-z0-9+/=]+$/.test(data.urlDocumento) : false,
//         });
//         if (!data.urlDocumento) {
//           throw new Error("No PDF document available");
//         }
//         if (!/^[A-Za-z0-9+/=]+$/.test(data.urlDocumento)) {
//           throw new Error("Invalid Base64 string format");
//         }
//         setContrato(data);
//       } catch (err: any) {
//         setError(err.message || "Erro ao carregar contrato");
//         console.error("Load contrato error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadContrato();
//   }, [id]);

//   if (error) {
//     return (
//       <div className="container mx-auto p-6">
//         <Alert variant="destructive">
//           <AlertTitle>Erro</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="container mx-auto p-6">
//         <Alert variant="destructive">
//           <AlertTitle>Erro</AlertTitle>
//           <AlertDescription>Usuário não autenticado</AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   const isProprietario = user.role === "PROPRIETARIO";

//   if (contrato && isProprietario && contrato.proprietario.id !== user.id) {
//     return (
//       <div className="container mx-auto p-6">
//         <Alert variant="destructive">
//           <AlertTitle>Erro</AlertTitle>
//           <AlertDescription>Acesso não autorizado</AlertDescription>
//         </Alert>
//       </div>
//     );
//   }
//   if (contrato && !isProprietario && contrato.inquilino.id !== user.id) {
//     return (
//       <div className="container mx-auto p-6">
//         <Alert variant="destructive">
//           <AlertTitle>Erro</AlertTitle>
//           <AlertDescription>Acesso não autorizado</AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   // Calcular o tempo restante até o fim do aluguel
  

//   const tempoRestante = contrato ? calcularDuracaoRenda(contrato.dataInicio, contrato.dataFim) : null;

//   return (
//     <PageWithBreadcrumb
//       title="Imóvel"
//       breadcrumbItems={[
//         { label: "Início", href: "/" },
//         { label: "Dashboard", href: "/dashboard" },
//         { label: "Contrato" },
//       ]}
//     >
//       <div className="container mx-auto p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="mt-4 ml-6 mb-4">Detalhes do Contrato</CardTitle>
//               <hr className="ml-6 mb-4 mr-6" />
//             </CardHeader>
//             <CardContent>
//               {loading ? (
//                 <div className="space-y-4">
//                   <Skeleton className="h-6 w-48" />
//                   <Skeleton className="h-6 w-64" />
//                   <Skeleton className="h-6 w-32" />
//                   <Skeleton className="h-6 w-32" />
//                   <Skeleton className="h-6 w-80" />
//                 </div>
//               ) : contrato ? (
//                 <div className="space-y-4">
//                   <p>
//                     <strong>Imóvel:</strong> {contrato.imovel.titulo} (
//                     {contrato.imovel.endereco}, {contrato.imovel.bairro}, {contrato.imovel.provincia})
//                   </p>
//                   <p>
//                     <strong>Valor Total:</strong>{" "}
//                     {contrato.valorTotal.toLocaleString("pt-BR", {
//                       style: "currency",
//                       currency: "AOA",
//                     })}
//                   </p>
//                   <p><strong>Data Início:</strong> {contrato.dataInicio}</p>
//                   <p><strong>Data Fim:</strong> {contrato.dataFim}</p>
//                   <p>
//                     <strong>Tempo Restante:</strong>{" "}
//                     <span className={tempoRestante ? "text-green-500" : "text-red-500"}>
//                       {tempoRestante || "Erro ao calcular o tempo restante"}
//                     </span>
//                   </p>
//                   <p><strong>Termos do Contrato:</strong> {contrato.termosContrato}</p>
//                   {isProprietario ? (
//                     <div>
//                       <p><strong>Inquilino:</strong> {contrato.inquilino.nome}</p>
//                       <p><strong>Email do Inquilino:</strong> {contrato.inquilino.email}</p>
//                     </div>
//                   ) : (
//                     <div>
//                       <p><strong>Proprietário:</strong> {contrato.proprietario.nome}</p>
//                       <p><strong>Email do Proprietário:</strong> {contrato.proprietario.email}</p>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <p>Contrato não encontrado</p>
//               )}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="mt-4 ml-6 mb-4">Documento do Contrato</CardTitle>
//               <hr className="ml-6 mb-5 mr-6" />
//             </CardHeader>
//             <CardContent>
//               {loading ? (
//                 <Skeleton className="h-96 w-full" />
//               ) : contrato && contrato.urlDocumento ? (
//                 <PDFViewer base64Data={contrato.urlDocumento} />
//               ) : (
//                 <Alert variant="destructive">
//                   <AlertTitle>Erro</AlertTitle>
//                   <AlertDescription>Documento não disponível</AlertDescription>
//                 </Alert>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </PageWithBreadcrumb>
//   );
// }












"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { fetchContratoById } from "@/lib/api-getContracts";
import dynamic from "next/dynamic";
import { useUser } from "@/hooks/getUser";
import { PageWithBreadcrumb } from "@/components/PageWithBreadcrumb";

const PDFViewer = dynamic(
  () => import("@/components/PDFViewer").then((mod) => mod.PDFViewer),
  { ssr: false, loading: () => <Skeleton className="h-96 w-full" /> }
);

type Contrato = {
  id: string;
  valorTotal: number;
  dataInicio: string;
  dataFim: string;
  termosContrato: string;
  urlDocumento: string;
  imovel: {
    id: string;
    titulo: string;
    endereco: string;
    bairro: string;
    provincia: string;
  };
  inquilino: {
    id: string;
    nome: string;
    email: string;
  };
  proprietario: {
    id: string;
    nome: string;
    email: string;
  };
};

function parseData(data: string): Date {
  const limpa = data.replace(/\//g, "-");
  const partes = limpa.split("-").map((parte) => parseInt(parte, 10));

  if (partes[0] > 31) {
    return new Date(partes[0], partes[1] - 1, partes[2]);
  } else if (partes[2] > 31) {
    return new Date(partes[2], partes[1] - 1, partes[0]);
  } else {
    throw new Error("Formato de data inválido ou ambíguo.");
  }
}

export default function ContratoDetalhes() {
  const router = useRouter();
  const { id } = useParams();
  const { user } = useUser();
  const [contrato, setContrato] = useState<Contrato | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContrato() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await fetchContratoById(id as string);
        console.log("Contrato carregado:", {
          id: data.id,
          urlDocumentoLength: data.urlDocumento?.length,
          urlDocumentoSnippet: data.urlDocumento?.substring(0, 50),
          isBase64Valid: data.urlDocumento ? /^[A-Za-z0-9+/=]+$/.test(data.urlDocumento) : false,
        });
        if (!data.urlDocumento) {
          throw new Error("No PDF document available");
        }
        if (!/^[A-Za-z0-9+/=]+$/.test(data.urlDocumento)) {
          throw new Error("Invalid Base64 string format");
        }
        setContrato(data);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar contrato");
        console.error("Load contrato error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadContrato();
  }, [id]);

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>Usuário não autenticado</AlertDescription>
        </Alert>
      </div>
    );
  }

  const isProprietario = user.role === "PROPRIETARIO";

  if (contrato && isProprietario && contrato.proprietario.id !== user.id) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>Acesso não autorizado</AlertDescription>
        </Alert>
      </div>
    );
  }
  if (contrato && !isProprietario && contrato.inquilino.id !== user.id) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>Acesso não autorizado</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Calcular o tempo restante até o fim do aluguel
  const calcularTempoRestante = (inicioRenda: string, fimRenda: string) => {
    try {
      const dataAtual = new Date("2025-05-02");
      const inicio = parseData(inicioRenda);
      const fim = parseData(fimRenda);

      const diffMs = fim.getTime() - inicio.getTime();
      const duracaoDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      const restanteMs = fim.getTime() - dataAtual.getTime();
      const restanteDias = Math.floor(restanteMs / (1000 * 60 * 60 * 24));

      const jaComecou = dataAtual >= inicio;
      const jaTerminou = dataAtual > fim;

      const duracaoMeses = Math.floor(duracaoDias / 30);
      const duracaoRestanteMeses = Math.floor(restanteDias / 30);

      console.log("Debug tempo restante:", {
        inicioRenda,
        fimRenda,
        duracaoDias,
        restanteDias,
        jaComecou,
        jaTerminou,
      });

      if (jaTerminou) {
        return { texto: "A renda já terminou", verde: false };
      }

      if (!jaComecou) {
        const textoDuracao = `A duração total da renda é de ${duracaoMeses} ${duracaoMeses === 1 ? "mês" : "meses"} e ${duracaoDias % 30} ${duracaoDias % 30 === 1 ? "dia" : "dias"}`;
        return {
          texto: `A renda ainda não começou\n${textoDuracao}`,
          verde: restanteDias >= 30,
        };
      }

      const textoMeses = duracaoRestanteMeses > 0 ? `${duracaoRestanteMeses} ${duracaoRestanteMeses === 1 ? "mês" : "meses"}` : "";
      const textoDias = restanteDias % 30 > 0 ? `${restanteDias % 30} ${restanteDias % 30 === 1 ? "dia" : "dias"}` : "";
      const texto = `Faltam ${textoMeses}${textoMeses && textoDias ? " e " : ""}${textoDias} para o término da renda`;

      return { texto, verde: restanteDias >= 30 };
    } catch (err) {
      console.error("Erro ao calcular tempo restante:", err);
      return { texto: "Erro ao calcular o tempo restante", verde: false };
    }
  };

  const tempoRestante = contrato ? calcularTempoRestante(contrato.dataInicio, contrato.dataFim) : null;

  return (
    <PageWithBreadcrumb
      title="Imóvel"
      breadcrumbItems={[
        { label: "Início", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Contrato" },
      ]}
    >
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="mt-4 ml-6 mb-4">Detalhes do Contrato</CardTitle>
              <hr className="ml-6 mb-4 mr-6" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-64" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-80" />
                </div>
              ) : contrato ? (
                <div className="space-y-4">
                  <p>
                    <strong>Imóvel:</strong> {contrato.imovel.titulo} (
                    {contrato.imovel.endereco}, {contrato.imovel.bairro}, {contrato.imovel.provincia})
                  </p>
                  <p>
                    <strong>Valor Total:</strong>{" "}
                    {contrato.valorTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "AOA",
                    })}
                  </p>
                  <p><strong>Data Início:</strong> {contrato.dataInicio}</p>
                  <p><strong>Data Fim:</strong> {contrato.dataFim}</p>
                  {tempoRestante && (
                    <>
                      <p>
                        <strong>Tempo Restante:</strong>{" "}
                        <span className={tempoRestante.verde ? "text-green-600" : ""}>
                          {tempoRestante.texto.split("\n")[0]}
                        </span>
                      </p>
                      {tempoRestante.texto.includes("\n") && (
                        <p>
                          <span className={tempoRestante.verde ? "text-green-600" : ""}>
                            {tempoRestante.texto.split("\n")[1]}
                          </span>
                        </p>
                      )}
                    </>
                  )}
                  <p><strong>Termos do Contrato:</strong> {contrato.termosContrato}</p>
                  {isProprietario ? (
                    <div>
                      <p><strong>Inquilino:</strong> {contrato.inquilino.nome}</p>
                      <p><strong>Email do Inquilino:</strong> {contrato.inquilino.email}</p>
                    </div>
                  ) : (
                    <div>
                      <p><strong>Proprietário:</strong> {contrato.proprietario.nome}</p>
                      <p><strong>Email do Proprietário:</strong> {contrato.proprietario.email}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p>Contrato não encontrado</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="mt-4 ml-6 mb-4">Documento do Contrato</CardTitle>
              <hr className="ml-6 mb-5 mr-6" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-96 w-full" />
              ) : contrato && contrato.urlDocumento ? (
                <PDFViewer base64Data={contrato.urlDocumento} />
              ) : (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>Documento não disponível</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWithBreadcrumb>
  );
}