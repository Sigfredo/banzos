import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { GradeHoraria } from './grade-horaria';
import { GradeHorariaId } from './grade-horariaId';
import { BanzosUtils } from 'src/app/shared/banzos-util';
import { Observable } from 'rxjs';
import { Disciplina } from '../configuracoes/disciplinas/disciplina';
import { DisciplinaId } from '../configuracoes/disciplinas/disciplinaId';
import { ProfessorId } from '../professores/professorId';
import { SalaId } from '../configuracoes/salas/salaId';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Professor } from '../professores/professor';
import { Sala } from '../configuracoes/salas/sala';

@Component({
  selector: 'app-grade-horaria',
  templateUrl: './grade-horaria.component.html',
  styleUrls: ['./grade-horaria.component.scss']
})
export class GradeHorariaComponent implements OnInit {

  private gradeCollection: AngularFirestoreCollection<GradeHoraria>;
  private grade: Observable<GradeHorariaId[]>;
  private gradeCrua: GradeHorariaId[] = [];
  private gradeFiltrada: GradeHorariaId[] = [];
  private qtdSalas: number = 4;

  gradeSegunda: Map<string, number> = new Map();
  gradeTerca: Map<string, number> = new Map();
  gradeQuarta: Map<string, number> = new Map();
  gradeQuinta: Map<string, number> = new Map();
  gradeSexta: Map<string, number> = new Map();
  gradeSabado: Map<string, number> = new Map();

  disciplinaFiltro = "";
  professorFiltro = "";
  salaFiltro = "";

  disciplinas: DisciplinaId[] = [];
  professores: ProfessorId[] = [];
  salas: SalaId[] = [];

  comboFiltroDisciplina: string;
  comboFiltroProfessor: string;
  comboFiltroSala: string;
 

  constructor(
    private readonly afs: AngularFirestore,
    private banzosUtils: BanzosUtils
  ) { 

    //Popula o mapa de cada dia da semana
    this.gradeSegunda = banzosUtils.inicializaGradeHoraria();
    this.gradeTerca = banzosUtils.inicializaGradeHoraria();
    this.gradeQuarta = banzosUtils.inicializaGradeHoraria();
    this.gradeQuinta = banzosUtils.inicializaGradeHoraria();
    this.gradeSexta = banzosUtils.inicializaGradeHoraria();
    this.gradeSabado = banzosUtils.inicializaGradeHoraria();


    
    this.gradeCollection = afs.collection<GradeHoraria>('grade-horaria');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.grade = this.gradeCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as GradeHoraria;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
      
    );

    this.grade.subscribe(
      x => {this.gradeCrua = x,
            this.filtrarGrade(),
            this.populaGrade(this.gradeFiltrada)
      }
    )

    //busca os instrumentos para a combo de disciplinas
    this.afs.collection<Disciplina>('disciplina').snapshotChanges().subscribe(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as DisciplinaId;
        data.id = a.payload.doc.id;
        this.disciplinas.push(data);
      })
    );

    //busca os instrumentos para a combo de professores
    this.afs.collection<Professor>('professor').snapshotChanges().subscribe(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as ProfessorId;
        data.id = a.payload.doc.id;
        this.professores.push(data);
      })
    );

    //busca os instrumentos para a combo de salas
    this.afs.collection<Sala>('sala').snapshotChanges().subscribe(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as SalaId;
        data.id = a.payload.doc.id;
        this.salas.push(data);
      })
    );

  }

  ngOnInit() {

  }

  filtrarGrade(){
    this.gradeFiltrada = this.banzosUtils.filtrarGrade(this.gradeCrua, this.disciplinaFiltro, "OiWvE2Lg0H9uvRIGJxti", this.salaFiltro);
  }

  populaGrade(gradeArray: GradeHorariaId[]){
    for (let g of gradeArray){
      this.agrupaGrade(g);
    }
  }

  
  agrupaGrade(elemento: GradeHorariaId){

    switch (elemento.dia){
      case "segunda": {
        this.gradeSegunda = this.banzosUtils.populaGradeHoraria(this.gradeSegunda, elemento)
        break;
      }
      case "terca": {
        this.gradeTerca = this.banzosUtils.populaGradeHoraria(this.gradeTerca, elemento)
        break;
      } 
      case "quarta": {
        this.gradeQuarta = this.banzosUtils.populaGradeHoraria(this.gradeQuarta, elemento)
        break;
      }
      case "quinta": {
        this.gradeQuinta = this.banzosUtils.populaGradeHoraria(this.gradeQuinta, elemento)
        break;
      }
      case "sexta": {
        this.gradeSexta = this.banzosUtils.populaGradeHoraria(this.gradeSexta, elemento)
        break;
      }
      case "sabado": {
        this.gradeSabado = this.banzosUtils.populaGradeHoraria(this.gradeSabado, elemento)
        break;
      }
      
    }

    
  }

  teste(numero){
    console.log(numero)
  }

}
