import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Instrumento } from "./instrumento";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

const ALUNOS_BASE_URL = 'http://localhost:3000/instrumentos/';

@Injectable()
export class InstrumentosService {

    instrumento: Instrumento;

    constructor(private http: HttpClient){}

    todosInstrumentos(): Observable<Instrumento[]>  {
        return this.http.get<Instrumento[]>(ALUNOS_BASE_URL);
    }

    getInstrumento(id:number): Observable<Instrumento> {
        return this.http.get<Instrumento>(ALUNOS_BASE_URL+id)
    }

    editarInstrumento(instrumento) {
        if (instrumento.id == 0){
            return this.http.post( ALUNOS_BASE_URL,
                instrumento,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        } else {
            return this.http.put( ALUNOS_BASE_URL+instrumento.id,
                instrumento,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        }
       
    }

    excluirInstrumento(id) {
        return this.http.delete(ALUNOS_BASE_URL+id);
    }

}