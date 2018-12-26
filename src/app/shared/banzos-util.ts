import { Injectable } from "@angular/core";
import * as moment from 'moment';
import { SharedService } from "./shared.service";
import { GradeHorariaId } from "../content/grade-horaria/grade-horariaId";

@Injectable()
export class BanzosUtils{

  constructor(
    private sharedService: SharedService
  ){}


  public filter(items, field, reverse) {
      var filtered = [];
      items.forEach(function(item) {
        filtered.push(item);
      });
      filtered.sort(function (a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });
      if(reverse) filtered.reverse();
      return filtered;
  }

  public extrairData(data){
    if (data == " " || data == null || data == "") {
      return null
    } else{
      return data.toDate();
    }
  }

  public buscarIdade(nascimento){
    if (nascimento == " " || nascimento == null || nascimento == "") {
      return "Não informada"
    } else{
      return moment(new Date(nascimento.toDate())).locale('pt-br').fromNow(true);
    }
  }

  public getInstrumentos(){
    return this.sharedService.getInstrumentos();
  }

  //busca o valor de "nome" em um array de objetos
  buscarNomeById(id: string, array: any){
      for (var i=0; i < array.length; i++) {
          if (array[i].id === id) {
              return array[i];
          }
      }
  
  }

  //Filtra a Grade levando em consideração Disciplina, professor e sala.
  filtrarGrade(grade: GradeHorariaId[], disciplina: string, professor: string, sala: string): GradeHorariaId[]{
    const retorno = [];
    for (let g of grade){
      if (professor === undefined || professor === "" || professor === g.professor){
        if (disciplina === undefined || disciplina === "" || disciplina === g.disciplina){
          if(sala === undefined || sala === "" || sala === g.sala){
            retorno.push(g);
          }
        }
      }
    }
    return retorno;
  }

  //Inicializa a grade horária, 08:00 a 20:30 com valor 0
  inicializaGradeHoraria(): Map<string, number>{

    let grade: Map<string, number> = new Map(); 

    grade.set("08:00", 0);
    grade.set("08:30", 0);
    grade.set("09:00", 0);
    grade.set("09:30", 0);
    grade.set("10:00", 0);
    grade.set("10:30", 0);
    grade.set("11:00", 0);
    grade.set("11:30", 0);
    grade.set("12:00", 0);
    grade.set("12:30", 0);
    grade.set("13:00", 0);
    grade.set("13:30", 0);
    grade.set("14:00", 0);
    grade.set("14:30", 0);
    grade.set("15:00", 0);
    grade.set("15:30", 0);
    grade.set("16:00", 0);
    grade.set("16:30", 0);
    grade.set("17:00", 0);
    grade.set("17:30", 0);
    grade.set("18:00", 0);
    grade.set("18:30", 0);
    grade.set("19:00", 0);
    grade.set("19:30", 0);
    grade.set("20:00", 0);
    grade.set("20:30", 0);

    return grade;

  }

  populaGradeHoraria(grade: Map<string, number>, elemento: GradeHorariaId): Map<string, number>{
    
    switch (elemento.hora){
      case "08:00": {
        grade.set("08:00", grade.get("08:00")+1);
        break;
      }
        
      case "08:30": {
        grade.set("08:30", grade.get("08:30")+1);
        break;
      }
      
      case "09:00": {
        grade.set("09:00", grade.get("09:00")+1);
        break;
      }
        
      case "09:30": {
        grade.set("09:30", grade.get("09:30")+1);
        break;
      }
      
      case "10:00": {
        grade.set("10:00", grade.get("10:00")+1);
        break;
      }
        
      case "10:30": {
        grade.set("10:30", grade.get("10:30")+1);
        break;
      }

      case "11:00": {
        grade.set("11:00", grade.get("11:00")+1);
        break;
      }
        
      case "11:30": {
        grade.set("11:30", grade.get("11:30")+1);
        break;
      }
      case "12:00": {
        grade.set("12:00", grade.get("12:00")+1);
        break;
      }
        
      case "12:30": {
        grade.set("12:30", grade.get("12:30")+1);
        break;
      }
      case "13:00": {
        grade.set("13:00", grade.get("13:00")+1);
        break;
      }
        
      case "13:30": {
        grade.set("13:30", grade.get("13:30")+1);
        break;
      }
      case "14:00": {
        grade.set("14:00", grade.get("14:00")+1);
        break;
      }
        
      case "14:30": {
        grade.set("14:30", grade.get("14:30")+1);
        break;
      }
      case "15:00": {
        grade.set("15:00", grade.get("15:00")+1);
        break;
      }
        
      case "15:30": {
        grade.set("15:30", grade.get("15:30")+1);
        break;
      }
      case "16:00": {
        grade.set("16:00", grade.get("16:00")+1);
        break;
      }
        
      case "16:30": {
        grade.set("16:30", grade.get("16:30")+1);
        break;
      }
      case "17:00": {
        grade.set("17:00", grade.get("17:00")+1);
        break;
      }
        
      case "17:30": {
        grade.set("17:30", grade.get("17:30")+1);
        break;
      }
      case "18:00": {
        grade.set("18:00", grade.get("18:00")+1);
        break;
      }
        
      case "18:30": {
        grade.set("18:30", grade.get("18:30")+1);
        break;
      }
      case "19:00": {
        grade.set("19:00", grade.get("19:00")+1);
        break;
      }
        
      case "19:30": {
        grade.set("19:30", grade.get("19:30")+1);
        break;
      }
      case "20:00": {
        grade.set("20:00", grade.get("20:00")+1);
        break;
      }
        
      case "20:30": {
        grade.set("20:30", grade.get("20:30")+1);
        break;
      }
    }

    return grade;

  }

}


