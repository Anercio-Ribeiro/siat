// import { format } from "date-fns";
// import { pt } from "date-fns/locale";
// import { ContractRepository } from "../repositories/contractRepository";



// export class ContractService {
  
//     private contratosRepository = new ContractRepository();
//   async getContratosByInquilinoId(inquilinoId: string) {
//     if (!inquilinoId) {
//       throw new Error("ID do inquilino é obrigatório");
//     }

//     const contratos = await this.contratosRepository.getContratosByInquilinoId(inquilinoId);

//     return contratos.map((contrato) => ({
//       id: contrato.id,
//       valorTotal: contrato.valorTotal,
//       dataInicio: format(new Date(contrato.dataInicio), "dd/MM/yyyy", { locale: pt }),
//       dataFim: format(new Date(contrato.dataFim), "dd/MM/yyyy", { locale: pt }),
//       termosContrato: contrato.termosContrato,
//       urlDocumento: contrato.urlDocumento,
//       imovel: {
//         id: contrato.aluguel.imovel.id,
//         titulo: contrato.aluguel.imovel.titulo,
//         endereco: contrato.aluguel.imovel.endereco,
//         bairro: contrato.aluguel.imovel.bairro,
//         provincia: contrato.aluguel.imovel.provincia,
//       },
//       proprietario: {
//         id: contrato.aluguel.imovel.proprietario.id,
//         nome: contrato.aluguel.imovel.proprietario.nome,
//         email: contrato.aluguel.imovel.proprietario.email,
//       },
//     }));
//   }

//   async getContratosByProprietarioId(proprietarioId: string) {
//     if (!proprietarioId) {
//       throw new Error("ID do proprietário é obrigatório");
//     }

//     const contratos = await this.contratosRepository.getContratosByProprietarioId(proprietarioId);

//     return contratos.map((contrato) => ({
//       id: contrato.id,
//       valorTotal: contrato.valorTotal,
//       dataInicio: format(new Date(contrato.dataInicio), "dd/MM/yyyy", { locale: pt }),
//       dataFim: format(new Date(contrato.dataFim), "dd/MM/yyyy", { locale: pt }),
//       termosContrato: contrato.termosContrato,
//       urlDocumento: contrato.urlDocumento,
//       imovel: {
//         id: contrato.aluguel.imovel.id,
//         titulo: contrato.aluguel.imovel.titulo,
//         endereco: contrato.aluguel.imovel.endereco,
//         bairro: contrato.aluguel.imovel.bairro,
//         provincia: contrato.aluguel.imovel.provincia,
//       },
//       inquilino: {
//         id: contrato.aluguel.inquilino.id,
//         nome: contrato.aluguel.inquilino.nome,
//         email: contrato.aluguel.inquilino.email,
//       },
//     }));
//   }

//   async getContratoById(id: string) {
//     if (!id) {
//       throw new Error("ID do contrato é obrigatório");
//     }

//     const contrato = await this.contratosRepository.getContratoById(id);
//     if (!contrato) {
//       throw new Error("Contrato não encontrado");
//     }

//     return {
//       id: contrato.id,
//       valorTotal: contrato.valorTotal,
//       dataInicio: format(new Date(contrato.dataInicio), "dd/MM/yyyy", { locale: pt }),
//       dataFim: format(new Date(contrato.dataFim), "dd/MM/yyyy", { locale: pt }),
//       termosContrato: contrato.termosContrato,
//       urlDocumento: contrato.urlDocumento,
//       imovel: {
//         id: contrato.aluguel.imovel.id,
//         titulo: contrato.aluguel.imovel.titulo,
//         endereco: contrato.aluguel.imovel.endereco,
//         bairro: contrato.aluguel.imovel.bairro,
//         provincia: contrato.aluguel.imovel.provincia,
//       },
//       inquilino: {
//         id: contrato.aluguel.inquilino.id,
//         nome: contrato.aluguel.inquilino.nome,
//         email: contrato.aluguel.inquilino.email,
//       },
//       proprietario: {
//         id: contrato.aluguel.imovel.proprietario.id,
//         nome: contrato.aluguel.imovel.proprietario.nome,
//         email: contrato.aluguel.imovel.proprietario.email,
//       },
//     };
//   }
// };










import { ContractRepository } from "../repositories/contractRepository";
import { format } from "date-fns";
import { pt } from "date-fns/locale";


export class ContratosService {

    private contratosRepository = new ContractRepository();
  async getContratosByInquilinoId(
    inquilinoId: string,
    page: number = 1,
    pageSize: number = 10
  ) {
    if (!inquilinoId) {
      throw new Error("ID do inquilino é obrigatório");
    }

    const [contratos, total] = await Promise.all([
        this.contratosRepository.getContratosByInquilinoId(inquilinoId, page, pageSize),
        this.contratosRepository.countContratosByInquilinoId(inquilinoId),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      contratos: contratos.map((contrato) => ({
        id: contrato.id,
        valorTotal: contrato.valorTotal,
        dataInicio: format(new Date(contrato.dataInicio), "dd/MM/yyyy", { locale: pt }),
        dataFim: format(new Date(contrato.dataFim), "dd/MM/yyyy", { locale: pt }),
        termosContrato: contrato.termosContrato,
        urlDocumento: contrato.urlDocumento,
        imovel: {
          id: contrato.aluguel.imovel.id,
          titulo: contrato.aluguel.imovel.titulo,
          endereco: contrato.aluguel.imovel.endereco,
          bairro: contrato.aluguel.imovel.bairro,
          provincia: contrato.aluguel.imovel.provincia,
        },
        proprietario: {
          id: contrato.aluguel.imovel.proprietario.id,
          nome: contrato.aluguel.imovel.proprietario.nome,
          email: contrato.aluguel.imovel.proprietario.email,
        },
        inquilino: {
          id: contrato.aluguel.inquilino.id,
          nome: contrato.aluguel.inquilino.nome,
          email: contrato.aluguel.inquilino.email,
        },
      })),
      total,
      totalPages,
      currentPage: page,
    };
  }

  async getContratosByProprietarioId(
    proprietarioId: string,
    page: number = 1,
    pageSize: number = 10
  ) {
    if (!proprietarioId) {
      throw new Error("ID do proprietário é obrigatório");
    }

    const [contratos, total] = await Promise.all([
      this.contratosRepository.getContratosByProprietarioId(proprietarioId, page, pageSize),
      this.contratosRepository.countContratosByProprietarioId(proprietarioId),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      contratos: contratos.map((contrato) => ({
        id: contrato.id,
        valorTotal: contrato.valorTotal,
        dataInicio: format(new Date(contrato.dataInicio), "dd/MM/yyyy", { locale: pt }),
        dataFim: format(new Date(contrato.dataFim), "dd/MM/yyyy", { locale: pt }),
        termosContrato: contrato.termosContrato,
        urlDocumento: contrato.urlDocumento,
        imovel: {
          id: contrato.aluguel.imovel.id,
          titulo: contrato.aluguel.imovel.titulo,
          endereco: contrato.aluguel.imovel.endereco,
          bairro: contrato.aluguel.imovel.bairro,
          provincia: contrato.aluguel.imovel.provincia,
        },
        inquilino: {
          id: contrato.aluguel.inquilino.id,
          nome: contrato.aluguel.inquilino.nome,
          email: contrato.aluguel.inquilino.email,
        },
        proprietario: {
          id: contrato.aluguel.inquilino.id,// imovel.proprietario.id,
          nome: contrato.aluguel.inquilino.nome,
          email: contrato.aluguel.inquilino.email,
        },
      })),
      total,
      totalPages,
      currentPage: page,
    };
  }

  async getContratoById(id: string) {
    if (!id) {
      throw new Error("ID do contrato é obrigatório");
    }

    const contrato = await this.contratosRepository.getContratoById(id);
    if (!contrato) {
      throw new Error("Contrato não encontrado");
    }

    return {
      id: contrato.id,
      valorTotal: contrato.valorTotal,
      dataInicio: format(new Date(contrato.dataInicio), "dd/MM/yyyy", { locale: pt }),
      dataFim: format(new Date(contrato.dataFim), "dd/MM/yyyy", { locale: pt }),
      termosContrato: contrato.termosContrato,
      urlDocumento: contrato.urlDocumento,
      imovel: {
        id: contrato.aluguel.imovel.id,
        titulo: contrato.aluguel.imovel.titulo,
        endereco: contrato.aluguel.imovel.endereco,
        bairro: contrato.aluguel.imovel.bairro,
        provincia: contrato.aluguel.imovel.provincia,
      },
      inquilino: {
        id: contrato.aluguel.inquilino.id,
        nome: contrato.aluguel.inquilino.nome,
        email: contrato.aluguel.inquilino.email,
      },
      proprietario: {
        id: contrato.aluguel.imovel.proprietario.id,
        nome: contrato.aluguel.imovel.proprietario.nome,
        email: contrato.aluguel.imovel.proprietario.email,
      },
    };
  }
};