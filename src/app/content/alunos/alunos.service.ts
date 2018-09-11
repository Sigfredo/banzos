import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Aluno } from "./aluno";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

const ALUNOS_BASE_URL = 'http://localhost:3000/alunos/';

@Injectable()
export class AlunosService {

    aluno: Aluno;

    constructor(private http: HttpClient){}

    todosAlunos(): Observable<Aluno[]>  {
        return this.http.get<Aluno[]>(ALUNOS_BASE_URL);
    }

    getAluno(id:number): Observable<Aluno> {
        return this.http.get<Aluno>(ALUNOS_BASE_URL+id)
    }

    editarAluno(aluno) {
        console.log("ID: "+aluno.nome)
        if (aluno.id == 0){
            return this.http.post( ALUNOS_BASE_URL,
                aluno,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        } else {
            return this.http.put( ALUNOS_BASE_URL+aluno.id,
                aluno,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        }
       
    }

    excluirAluno(id) {
        return this.http.delete(ALUNOS_BASE_URL+id);
    }

}