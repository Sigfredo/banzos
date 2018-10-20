import { Injectable } from "@angular/core";
import * as moment from 'moment';
import { SharedService } from "./shared.service";

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
    console.log("Entrei")
      for (var i=0; i < array.length; i++) {
          if (array[i].id === id) {
              return array[i];
          }
      }
  
  }

}

