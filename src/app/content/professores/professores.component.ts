import { Component, OnInit } from '@angular/core';
import { ProfessoresService } from './professores.service';
import { ProfessoresMensagemService } from './professores-mensagem.service';

@Component({
  selector: 'banzos-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresComponent implements OnInit {

  professores = [];
 mensagemProfessorSucesso: string;
 mensagemProfessorAlerta: string;
 mensagemProfessorErro: string;
  

  constructor(
    private professoresService: ProfessoresService,
    private professoresMensagemService: ProfessoresMensagemService,
    ) { }

  ngOnInit() {

    this.professoresMensagemService.professorMensagemSucesso().subscribe((message) => {this.mensagemProfessorSucesso = message});
    //  this.mensagemProfessorSucesso = this.professoresMensagemService.professorMensagemSucesso().getValue();
     this.professoresMensagemService.professorMensagemAlerta().subscribe((message) => {this.mensagemProfessorAlerta = message});
     this.professoresMensagemService.professorMensagemErro().subscribe((message) => {this.mensagemProfessorErro = message});

     this.professoresService.todosProfessores()
    .subscribe(
       (response) => {this.professores = response},
      (error) => {console.log(error)}
    );
  }

}
