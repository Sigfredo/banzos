import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TipoConta } from "./tipo-conta";
import { Observable, throwError } from "rxjs";
import { Instrumento } from "../../content/configuracoes/instrumentos/instrumento";


@Injectable()
export class SelectItemsService {
  
    TipoConta: TipoConta;

    constructor(private http: HttpClient){}

    buscarTipoContas(): Observable<TipoConta[]>  {
        return this.http.get<TipoConta[]>('http://192.168.25.235:3000/tipo_conta/');
    }
    buscarInstrumentos(): Observable<Instrumento[]>  {
        return this.http.get<Instrumento[]>('http://192.168.25.235:3000/instrumentos/');
    }

}