import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,  } from "@angular/common/http";
import { Disciplina } from "./disciplinas/disciplina";
import { Observable } from "rxjs";
import { Instrumento } from "./instrumentos/instrumento";



const INSTRUMENTOS_BASE_URL = 'http://localhost:3000/instrumentos/';
const DISCIPLINAS_BASE_URL = 'http://localhost:3000/disciplinas/';

@Injectable()
export class ConfiguracoesService {


    constructor(private http: HttpClient){}

    buscarInstrumentos(): Observable<Instrumento[]>  {
        return this.http.get<Instrumento[]>(INSTRUMENTOS_BASE_URL);
    }

    editarInstrumento(instrumento) {
        if (instrumento.id == 0){
            return this.http.post( INSTRUMENTOS_BASE_URL,
                instrumento,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        } else {
            return this.http.put( INSTRUMENTOS_BASE_URL+instrumento.id,
                instrumento,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        }
       
    }

    excluirInstrumento(id) {
        return this.http.delete(INSTRUMENTOS_BASE_URL+id);
    }

    buscarInstrumento(id:number): Observable<Instrumento> {
        return this.http.get<Instrumento>(INSTRUMENTOS_BASE_URL+id)
    }

    buscarDisciplinas(): Observable<Disciplina[]>  {
        return this.http.get<Disciplina[]>(DISCIPLINAS_BASE_URL);
    }

}