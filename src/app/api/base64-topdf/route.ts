// // app/api/base64-to-pdf/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   const base64 = req.nextUrl.searchParams.get('data');

//   if (!base64) {
//     return NextResponse.json({ error: 'Missing base64 data' }, { status: 400 });
//   }

//   try {
//     const buffer = Buffer.from(base64, 'base64');

//     return new NextResponse(buffer, {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'attachment; filename="file.pdf"',
//       },
//     });
//   } catch (error) {
//     return NextResponse.json({ error: 'Invalid base64 data' }, { status: 400 });
//   }
// }





import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
//   const base64 = 'JVBERi0xLjcKJYGBgYEKCjYgMCBvYmoKPDwKL0ZpbHRlciAvRmxhdGVEZWNvZGUKL0xlbmd0aCA0NjIKPj4Kc3RyZWFtCniclZTPitRAEMbv/RR9FsT6X90gC24mwYMXIS8gsi6Ke1gRn9+qZEdm1HYjIT3VSSb1y1df1WO5XQvUPL7dl1dv777+uPv++eOHlw69SQNvvaLV9VMhqeu7gtujWBVqA6jrQ3ktbIvNLk6GLrYQmJgSCNrkah6n2nRT1y9lfVHmtbwvj6Os3YWskVqrSH/N6tr3rD1yYry72xTnbAu/IVAzjFidnQ1jDxFT5O9Jd4yBAKCB9mZDBqaNQSHeuniuPfLIjFu0k0Q+S5r49thxcqU6zkeVUBDrBD6kAL3S/0L9Jb98zMY9DmBkYmbhgDvG5KGlMttYGfO2KxPoDhde+M0ju0KiytJFRGWWjFAO+qSJAjbAsTqmuKuz64IXJC1qwnZLp/TQpgey0BKK9Fgpfon1IIeFTxybD/1qeeU5jiWUlScSDgZk/F8SbSRmUdAhiXZ/cm32xHyKiuxOSVcGmU0bgTFsjD14D3oVY1JENaMbh7l9nxVbf06Rj84+vZ4S52qEP3NFmjPOp2SRg/3rrbWOCMZDGuazS3M6nLIrf/H84dSj/dpZpFMfJgX757i0KyEoGzfGWJQh7sZIywjzeu62f+tz447mK/Sf3qJJxwplbmRzdHJlYW0KZW5kb2JqCgo3IDAgb2JqCjw8Ci9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9UeXBlIC9PYmpTdG0KL04gNQovRmlyc3QgMjYKL0xlbmd0aCA0NDYKPj4Kc3RyZWFtCnic1VNNi9swEL37V8yxPRSNvqUSAtkkbqEsXXYLLS09eG0RXBap2ErZ/vuO7GTDsi49FzNYM++NNJqn4YAgQCmQYB0o0FKABu8RVquKffr9MwC7aQ5hrNiHvhvhG3EQbuF7xbbpGDPwar2uLtxtk5uHdKjmJOCFfGbcDKk7tmGAVb2va0SLiEaRGUSxo/+WzJMJ8gkTjtZkVp2MYlYiyg1h9WzGzjkFn7j6lL+nP3FN4exmrnKz/3RuOWs/7yH+VY9fV+w6dbsmB3i1eytQaFRIKOeSf31N7RhCk9P/e7mp/j7Fv97wmc5F3iLyEMobmFRmt2FMx6El2QuvToSUxfvw8Cvkvm3eWPSO6rTO0xubUi6Yt0oYJ7RxL7HSL4faO7OUR1UaL9C+xKy2QktplvKc0sgd8qU8Z+gsy51dqEU7oYwRUi5gnG6nheJWL9TinPOck25Ld/BSKS/ObaFOsy8f73+EdupgcfeP+d1dLtLMgRK7Dl3fXKVHGkqkT3sNTokympsYUy7DOo1pzCRS8cxpdJ8pWXSq2N3xPk9uCfKKXTVjmBS8lElFxDZ1fTwA+9zHTRz7c6Ds+Ac66A0qCmVuZHN0cmVhbQplbmRvYmoKCjggMCBvYmoKPDwKL1NpemUgOQovUm9vdCAyIDAgUgovSW5mbyAzIDAgUgovRmlsdGVyIC9GbGF0ZURlY29kZQovVHlwZSAvWFJlZgovTGVuZ3RoIDQxCi9XIFsgMSAyIDIgXQovSW5kZXggWyAwIDkgXQo+PgpzdHJlYW0KeJxjYGD4/5+JgZ2BAUQwgggmEMEMIlgYGQQYgILqQILFm4EBAFvVAsEKZW5kc3RyZWFtCmVuZG9iagoKc3RhcnR4cmVmCjEwOTkKJSVFT0Y=';//req.nextUrl.searchParams.get('data');

//   if (!base64) {
//     return NextResponse.json({ error: 'Missing base64 data' }, { status: 400 });
//   }

//   try {
//     const buffer = Buffer.from(base64, 'base64');

//     return new NextResponse(buffer, {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'attachment; filename="file.pdf"',
//       },
//     });
//   } catch (error) {
//     return NextResponse.json({ error: 'Invalid base64 data' }, { status: 400 });
//   }

const result = calcularDuracaoRenda("05-09-2025","02-09-2026");  
console.log(result); // Exibe o resultado no console
return NextResponse.json({ result }, { status: 200 });

}


function calcularDuracaoRenda(inicioRenda: string, fimRenda: string): string {
    // Obter data atual
    const dataAtual = new Date();
  
    // Definir datas de início e fim
    const inicio = new Date(inicioRenda);
    const fim = new Date(fimRenda);
  
    // Calcular duração total da renda
    const diffMs = fim.getTime() - inicio.getTime();
    const duracaoDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    // Calcular o tempo restante
    const restanteMs = fim.getTime() - dataAtual.getTime();
    const restanteDias = Math.floor(restanteMs / (1000 * 60 * 60 * 24));
  
    // Verificar se a renda já começou
    const jaComecou = dataAtual >= inicio;
  
    // Verificar se a renda já terminou
    const jaTerminou = dataAtual > fim;
  
    // Definir os status e resultados
    const statusRenda = {
      duracaoDias,
      restanteDias,
      jaComecou,
      jaTerminou,
    };
  
    // Formatar o resultado
    const duracaoMeses = Math.floor(duracaoDias / 30); // Aproximação de meses
    const duracaoRestanteMeses = Math.floor(restanteDias / 30); // Aproximação de meses restantes
  
    let resultado = `
      A duração total da renda é de ${duracaoMeses} meses e ${duracaoDias % 30} dias.
      `;
    
    if (jaComecou) {
      resultado += `
      A renda já começou.
      `;
    } else {
      resultado += `
      A renda ainda não começou.
      `;
    }
  
    if (jaTerminou) {
      resultado += `
      A renda já terminou.
      `;
    } else {
      resultado += `
      Faltam ${duracaoRestanteMeses} meses e ${restanteDias % 30} dias para o término da renda.
      `;
    }
  
    return resultado;
  }
  
  // Testar com as datas fornecidas
  const inicioRenda = "2025-09-05"; // Exemplo: 05/09/2025
  const fimRenda = "2026-07-02"; // Exemplo: 02/07/2026
  
  const resultado = calcularDuracaoRenda(inicioRenda, fimRenda);
  console.log(resultado);
  