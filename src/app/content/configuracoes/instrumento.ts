import { Instrumento } from "../instrumentos/instrumento";

export class Disciplina {
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