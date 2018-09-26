import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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

    buscarDisciplinas(): Observable<Disciplina[]>  {
        return this.http.get<Disciplina[]>(DISCIPLINAS_BASE_URL);
    }

}