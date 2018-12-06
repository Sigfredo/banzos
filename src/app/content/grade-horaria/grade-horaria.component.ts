import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-grade-horaria',
  templateUrl: './grade-horaria.component.html',
  styleUrls: ['./grade-horaria.component.scss']
})
export class GradeHorariaComponent implements OnInit {

  gradeSegunda: Map<string, number> = new Map();
  gradeTerca: Map<string, number> = new Map();
  gradeQuarta: Map<string, number> = new Map();
  gradeQuinta: Map<string, number> = new Map();
  gradeSexta: Map<string, number> = new Map();
  gradeSabado: Map<string, number> = new Map();
 

  constructor() { 

    //Inicializa a tabela zerada
    this.gradeSegunda.set("08:00", 0);
  }

  ngOnInit() {
  }

}
