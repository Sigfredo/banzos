import { InstrumentoId } from "../configuracoes/instrumentos/instrumentoId";


export class Professor {
    nome: string;
    nascimento: Date;
    telefone: string;
    email: string;
    endereco: string;
    cep: string;
    banco: string;
    tipoConta: number;
    numeroConta: string;
    agencia: string;
    cpf: string;
    rg: string;
    instrumentos: InstrumentoId[];
  }