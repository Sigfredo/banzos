import { Timestamp } from "rxjs/internal/operators/timestamp";

export class Aluno {
    id: string;
    nome: string;
    instrumento: string;
    inicioPlano: string;
    fimPlano: string;
    nascimento: Timestamp<string>;
    telefone: string;
    endereco: string;
    cep: string;
    nomeResponsavel: string;
    cpfResponsavel: string;
    rgResponsavel: string;
  }