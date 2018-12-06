import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.scss']
})
export class TurmaComponent implements OnInit, AfterViewInit {
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor() { }

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      defaultView: 'agendaWeek',
      allDaySlot: false, //Tira o texto da celula 0,0
      hiddenDays: [ 0 ], // Esconde o domingo
      header: {
        left: '',
        center: '',
        right: ''
      },
      
    };

    
  }

  ngAfterViewInit(){
    this.ucCalendar.fullCalendar('columnHeader', false)
  }
}
