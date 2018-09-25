import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TipoConta } from "./tipo-conta";
import { Observable, throwError } from "rxjs";


@Injectable()
export class SelectItemsService {

    TipoConta: TipoConta;

    constructor(private http: HttpClient){}

    buscarTipoContas(): Observable<TipoConta[]>  {
        return this.http.get<TipoConta[]>('http://localhost:3000/tipo_conta/');
    }

}