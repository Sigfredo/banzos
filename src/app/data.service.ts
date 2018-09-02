import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAlunos(){
    return this.http.get('http://localhost:3000/alunos/');
  }
  getAluno(alunoId){
    return this.http.get('http://localhost:3000/alunos/'+alunoId);
  }
  getPagamentos(){
    return this.http.get('https://jsonplaceholder.typicode.com/todos');
  }
  getProfessores(){
    return this.http.get('http://localhost:3000/professores/');
  }
  
}
