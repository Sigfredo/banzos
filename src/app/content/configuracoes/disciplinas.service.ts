import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Disciplina } from "./disciplina";
import { Observable, throwError } from "rxjs";

const PROFESSORES_BASE_URL = 'http://localhost:3000/Disciplinas/';

@Injectable()
export class DisciplinasService {

    Disciplina: Disciplina;

    constructor(private http: HttpClient){}

    todosDisciplinas(): Observable<Disciplina[]>  {
        return this.http.get<Disciplina[]>(PROFESSORES_BASE_URL);
    }

    getDisciplina(id:number): Observable<Disciplina> {
        return this.http.get<Disciplina>(PROFESSORES_BASE_URL+id)
    }

    editarDisciplina(Disciplina) {
        if (Disciplina.id == 0){
            return this.http.post( PROFESSORES_BASE_URL,
                Disciplina,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        } else {
            return this.http.put( PROFESSORES_BASE_URL+Disciplina.id,
                Disciplina,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        }
       
    }

    excluirDisciplina(id) {
        return this.http.delete(PROFESSORES_BASE_URL+id);
    }

}