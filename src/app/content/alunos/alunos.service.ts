import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const ALUNOS_BASE_URL = 'http://localhost:3000/api/alunos';

@Injectable()
export class AlunosService {

    constructor(private http: HttpClient){}

    todosAlunos() {
        return this.http.get(ALUNOS_BASE_URL);
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