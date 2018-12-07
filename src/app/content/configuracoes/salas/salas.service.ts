import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Sala } from "./sala";
import { Observable, throwError } from "rxjs";

const PROFESSORES_BASE_URL = 'http://localhost:3000/Salas/';

@Injectable()
export class SalasService {

    Sala: Sala;

    constructor(private http: HttpClient){}

    todosSalas(): Observable<Sala[]>  {
        return this.http.get<Sala[]>(PROFESSORES_BASE_URL);
    }

    getSala(id:number): Observable<Sala> {
        return this.http.get<Sala>(PROFESSORES_BASE_URL+id)
    }

    editarSala(Sala) {
        if (Sala.id == 0){
            return this.http.post( PROFESSORES_BASE_URL,
                Sala,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        } else {
            return this.http.put( PROFESSORES_BASE_URL+Sala.id,
                Sala,
                {
                    headers: new HttpHeaders()
                      .set('Content-Type', 'application/json')
                  }
                );
        }
       
    }

    excluirSala(id) {
        return this.http.delete(PROFESSORES_BASE_URL+id);
    }

}