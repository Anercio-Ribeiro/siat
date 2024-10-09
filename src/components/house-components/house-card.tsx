"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// Definindo a interface para o Imóvel
interface Imagem {
  url: string;
}

interface Imovel {
  titulo: string;
  bairro: string;
  provincia: string;
  preco: number;
  numeroQuarto: number;
  numeroCasaBanho: number;
  imagens: Imagem[];
}

interface HouseCardProps {
  imovel: Imovel | null; // Aceita null para evitar erros de undefined
}

export function HouseCard({ imovel }: HouseCardProps) {
  // Verifica se imovel está definido
  if (!imovel) {
    return <div>Carregando...</div>; // Ou um componente de loading
  }

  return (
    <Card className="max-w-xs">
      <div className="relative h-40">
        {imovel.imagens.length > 0 ? (
          <Image
            src={imovel.imagens[0].url} // Mostra apenas a primeira imagem
            alt={imovel.titulo}
            layout="fill"
            objectFit="cover"
            className="rounded-t-md"
          />
        ) : (
          <Image
            src="/20240723-163550.jpg" // Imagem padrão
            alt={imovel.titulo}
            layout="fill"
            objectFit="cover"
            className="rounded-t-md"
          />
        )}
      </div>
      <CardContent>
        <h2>{imovel.titulo}</h2>
        <p>
          {imovel.bairro} - {imovel.provincia}
        </p>
        <p>Preço: {imovel.preco} Kz</p>
      </CardContent>
      <CardFooter>
        <p>{imovel.numeroQuarto} quartos</p>
        <p>{imovel.numeroCasaBanho} casas de banho</p>
      </CardFooter>
    </Card>
  );
}
