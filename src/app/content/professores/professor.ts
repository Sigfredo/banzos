import { Instrumento } from "../configuracoes/instrumentos/instrumento";


export class Professor {
    id: number;
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
    instrumentos: Instrumento[];
  }