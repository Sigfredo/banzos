import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Professor } from "./Professor";
import { Observable, throwError } from "rxjs";

const PROFESSORES_BASE_URL = 'http://localhost:3000/Professores/';

@Injectable()
export class ProfessoresService {

    Professor: Professor;

    constructor(private http: HttpClient){}

    todosProfessores(): Observable<Professor[]>  {
        return this.http.get<Professor[]>(PROFESSORES_BASE_URL);
    }

    getProfessor(id:number): Observable<Professor> {
        return this.http.get<Professor>(PROFESSORES_BASE_URL+id)
    }

    editarProfessor(Professor) {
        if (Professor.id == 0){
            return this.http.post( PROFESSORES_BASE_URL,
                Professor,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        } else {
            return this.http.put( PROFESSORES_BASE_URL+Professor.id,
                Professor,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        }
       
    }

    excluirProfessor(id) {
        return this.http.delete(PROFESSORES_BASE_URL+id);
    }

}