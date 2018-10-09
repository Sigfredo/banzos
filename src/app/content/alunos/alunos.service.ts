import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Aluno } from "./aluno";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';

const ALUNOS_BASE_URL = 'http://localhost:3000/alunos/';

@Injectable()
export class AlunosService {

    aluno: Aluno;

    constructor(private http: HttpClient,
                private db: AngularFirestore){

                }

    todosAlunos(): Observable<{}[]>  {
        // return this.http.get<Aluno[]>(ALUNOS_BASE_URL);
        return this.db.collection('aluno').valueChanges()
    }

    getAluno(id:number): Observable<Aluno> {
        return this.http.get<Aluno>(ALUNOS_BASE_URL+id)
    }

    editarAluno(aluno) {
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