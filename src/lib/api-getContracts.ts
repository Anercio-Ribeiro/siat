// export async function fetchContratos(inquilinoId?: string, proprietarioId?: string) {
//     const params = new URLSearchParams();
//     if (inquilinoId) params.append("inquilinoId", inquilinoId);
//     if (proprietarioId) params.append("proprietarioId", proprietarioId);
  
//     const response = await fetch(`/api/contratos?${params.toString()}`);
//     if (!response.ok) {
//       throw new Error("Erro ao buscar contratos");
//     }
//     return response.json();
//   }
  
//   export async function fetchContratoById(id: string) {
//     const contratos = await fetchContratos(); // Simula busca; idealmente, crie um endpoint específico
//     return contratos.find((c: any) => c.id === id);
//   }



// export async function fetchContratos(inquilinoId?: string, proprietarioId?: string) {
//     const params = new URLSearchParams();
//     if (inquilinoId) params.append("inquilinoId", inquilinoId);
//     if (proprietarioId) params.append("proprietarioId", proprietarioId);
  
//     const response = await fetch(`/api/contratos?${params.toString()}`);
//     if (!response.ok) {
//       throw new Error("Erro ao buscar contratos");
//     }
//     return response.json();
//   }
  
//   export async function fetchContratoById(id: string) {
//     const response = await fetch(`/api/contratos/${id}`);
//     if (!response.ok) {
//       throw new Error("Erro ao buscar contrato");
//     }
//     return response.json();
//   }



//   export async function fetchContratos(inquilinoId?: string, proprietarioId?: string) {
//     const params = new URLSearchParams();
//     if (inquilinoId) params.append("inquilinoId", inquilinoId);
//     if (proprietarioId) params.append("proprietarioId", proprietarioId);
  
//     const response = await fetch(`/api/contratos?${params.toString()}`);
//     if (!response.ok) {
//       throw new Error("Erro ao buscar contratos");
//     }
//     return response.json();
//   }
  
//   export async function fetchContratoById(id: string) {
//     const response = await fetch(`/api/contratos/${id}`);
//     if (!response.ok) {
//       throw new Error("Erro ao buscar contrato");
//     }
//     return response.json();
//   }














export async function fetchContratos(
    userId: string,
    role: string,
    page: number = 1,
    pageSize: number = 10
  ) {
    const endpoint =
      role === "INQUILINO"
        ? `/api/contratos/inquilino-contrato?page=${page}&pageSize=${pageSize}`
        : `/api/contratos/proprietario-contrato?page=${page}&pageSize=${pageSize}`;
    const response = await fetch(endpoint, { credentials: "include" });
    if (!response.ok) {
      throw new Error("Erro ao buscar contratos");
    }
    return response.json();
  }
  
  export async function fetchContratoById(id: string) {
    const response = await fetch(`/api/contratos/${id}`, { credentials: "include" });
    if (!response.ok) {
      throw new Error("Erro ao buscar contrato");
    }
    return response.json();
  }