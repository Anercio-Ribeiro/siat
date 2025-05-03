function parseData(data: string): Date {
    // Substituir '/' por '-' para facilitar o split
    const limpa = data.replace(/\//g, '-');
  
    const partes = limpa.split('-').map((parte) => parseInt(parte, 10));
  
    // Identificar formato: se o primeiro número for maior que 31, é ano (YYYY-MM-DD)
    if (partes[0] > 31) {
      // Formato: YYYY-MM-DD
      return new Date(partes[0], partes[1] - 1, partes[2]);
    } else if (partes[2] > 31) {
      // Formato: DD-MM-YYYY
      return new Date(partes[2], partes[1] - 1, partes[0]);
    } else {
      throw new Error("Formato de data inválido ou ambíguo.");
    }
  }
  
  export function calcularDuracaoRenda(inicioRenda: string, fimRenda: string): string {
    const dataAtual = new Date();
  
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
  


//   function parseData(data: string): Date {
//     // Substituir '/' por '-' para facilitar o split
//     const limpa = data.replace(/\//g, '-');
  
//     const partes = limpa.split('-').map((parte) => parseInt(parte, 10));
  
//     // Identificar formato: se o primeiro número for maior que 31, é ano (YYYY-MM-DD)
//     if (partes[0] > 31) {
//       // Formato: YYYY-MM-DD
//       return new Date(partes[0], partes[1] - 1, partes[2]);
//     } else if (partes[2] > 31) {
//       // Formato: DD-MM-YYYY
//       return new Date(partes[2], partes[1] - 1, partes[0]);
//     } else {
//       throw new Error("Formato de data inválido ou ambíguo.");
//     }
//   }




  
//   function calcularDuracaoRenda(inicioRenda: string, fimRenda: string): string {
//     const dataAtual = new Date();
  
//     const inicio = parseData(inicioRenda);
//     const fim = parseData(fimRenda);
  
//     const diffMs = fim.getTime() - inicio.getTime();
//     const duracaoDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
//     const restanteMs = fim.getTime() - dataAtual.getTime();
//     const restanteDias = Math.floor(restanteMs / (1000 * 60 * 60 * 24));
  
//     const jaComecou = dataAtual >= inicio;
//     const jaTerminou = dataAtual > fim;
  
//     const duracaoMeses = Math.floor(duracaoDias / 30);
//     const duracaoRestanteMeses = Math.floor(restanteDias / 30);
  
//     let resultado = `
//       A duração total da renda é de ${duracaoMeses} meses e ${duracaoDias % 30} dias.
//     `;
  
//     if (jaComecou) {
//       resultado += `
//       A renda já começou.
//       `;
//     } else {
//       resultado += `
//       A renda ainda não começou.
//       `;
//     }
  
//     if (jaTerminou) {
//       resultado += `
//       A renda já terminou.
//       `;
//     } else {
//       resultado += `
//       Faltam ${duracaoRestanteMeses} meses e ${restanteDias % 30} dias para o término da renda.
//       `;
//     }
  
//     return resultado;
//   }
  
//   // Exemplos:
//   console.log(calcularDuracaoRenda("2025-09-05", "02/07/2026"));
//   console.log(calcularDuracaoRenda("05/09/2025", "2026/07/02"));
//   console.log(calcularDuracaoRenda("05-09-2025", "02-07-2026"));
  