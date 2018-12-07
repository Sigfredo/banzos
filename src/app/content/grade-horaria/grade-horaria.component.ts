import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { GradeHoraria } from './grade-horaria';
import { GradeHorariaId } from './grade-horariaId';
import { BanzosUtils } from 'src/app/shared/banzos-util';

@Component({
  selector: 'app-grade-horaria',
  templateUrl: './grade-horaria.component.html',
  styleUrls: ['./grade-horaria.component.scss']
})
export class GradeHorariaComponent implements OnInit {

  private gradeCollection: AngularFirestoreCollection<GradeHoraria>;
  private grade: GradeHorariaId[] = [];
  private qtdSalas: number = 4;

  gradeSegunda: Map<string, number> = new Map();
  gradeTerca: Map<string, number> = new Map();
  gradeQuarta: Map<string, number> = new Map();
  gradeQuinta: Map<string, number> = new Map();
  gradeSexta: Map<string, number> = new Map();
  gradeSabado: Map<string, number> = new Map();
 

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
    this.gradeCollection.snapshotChanges().subscribe(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as GradeHorariaId;
        data.id = a.payload.doc.id;
        this.populaGrade(data);
      })
    );

  }

  ngOnInit() {
  }



  //criar metodo
  populaGrade(elemento: GradeHorariaId){

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

}
