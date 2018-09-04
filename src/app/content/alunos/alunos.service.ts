import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IAlunos } from "./IAlunos";
import { Observable } from "rxjs";

const ALUNOS_BASE_URL = 'http://localhost:3000/alunos';

@Injectable()
export class AlunosService {

    constructor(private http: HttpClient){}

    todosAlunos(): Observable<IAlunos[]> {
        return this.http.get<IAlunos[]>(ALUNOS_BASE_URL);
    }

    editarAluno(aluno) {
        return this.http.post( ALUNOS_BASE_URL,
            aluno,
            {
                headers: new HttpHeaders()
                  .set('Content-Type', 'application/json')
              }
            );
    }
}