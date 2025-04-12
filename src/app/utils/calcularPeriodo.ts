export function calcularPeriodo(dias: number): string {
    // Validação inicial
    if (dias <= 0) {
      throw new Error('A quantidade de dias deve ser maior que zero.');
    }
  
    // Define o número de dias por mês
    const diasPorMes = 30;
  
    // Calcula a quantidade de meses (arredonda para baixo)
    const meses = Math.floor(dias / diasPorMes);
  
    if (meses >= 1) {
      // Retorna no formato "X mês" ou "X meses"
      return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    } else {
      // Retorna no formato "X dia" ou "X dias"
      return `${dias} ${dias === 1 ? 'dia' : 'dias'}`;
    }
  }