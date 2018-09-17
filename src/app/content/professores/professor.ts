import { Instrumento } from "../instrumentos/instrumento";

export class Professor {
    id: number;
    nome: string;
    nascimento: Date;
    telefone: string;
    endereco: string;
    cep: string;
    cpf: string;
    rg: string;
    instrumentos: Instrumento[];
  }