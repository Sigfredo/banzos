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

    editarAluno(aluno) {
        return this.http.post( ALUNOS_BASE_URL,
            aluno,
            {
                headers: new HttpHeaders()
                  .set('Content-Type', 'application/json')
              }
            );
    }

    
    // getAluno(id:number): Observable<Aluno[]>{
    //         return this.http.get<Aluno[]>(ALUNOS_BASE_URL+id);
    // }

    getAluno(id:number): Observable<Aluno> {
        // console.log("Service, id: "+id)
        // console.log("GET:")
        // console.log(this.http.get<Aluno>(ALUNOS_BASE_URL+id).forEach(next => console.log(next.nome)))
        return this.http.get<Aluno>(ALUNOS_BASE_URL+id)
    }

//     getAluno(id:number): Aluno{
//         return this.http.get<Aluno[]>(ALUNOS_BASE_URL+id)
//         .pipe(map(res => 
//             {
//                 return res.json().results.map(item => {
//                     return new Aluno(
//                         item.id;
//                         item.nome;
//                     );
//                 });

//             }));
     
// }
}