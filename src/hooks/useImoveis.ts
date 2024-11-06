import { FetchImoveisResponse } from "@/app/page";

async function fetchImoveis(minPreco?: number, maxPreco?: number, localizacao?: string, tipologia?: string): Promise<FetchImoveisResponse> {
    const query = new URLSearchParams();
    if (minPreco) query.append("minPreco", minPreco.toString());
    if (maxPreco) query.append("maxPreco", maxPreco.toString());
    if (localizacao) query.append("localizacao", localizacao);
    if (tipologia) query.append("tipologia", tipologia);
  
    const response = await fetch(`/api/imoveis/getAll?${query.toString()}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar imóveis");
    }
    return response.json();
  }
  