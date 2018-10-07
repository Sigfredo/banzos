import { Component, OnInit, ApplicationRef } from '@angular/core';
import { AlunosService } from './alunos.service';
import { AlunosMensagemService } from './alunos-mensagem.service';
import { BanzosUtils } from '../../shared/banzos-util';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

 alunos = [];
 mensagemAlunoSucesso: string;
 mensagemAlunoAlerta: string;
 mensagemAlunoErro: string;
  

  constructor(
    private alunosService: AlunosService,
    private alunosMensagemService: AlunosMensagemService,
    ) { }

  ngOnInit() {

    this.alunosMensagemService.alunoMensagemSucesso().subscribe((message) => {this.mensagemAlunoSucesso = message});
    //  this.mensagemAlunoSucesso = this.alunosMensagemService.alunoMensagemSucesso().getValue();
     this.alunosMensagemService.alunoMensagemAlerta().subscribe((message) => {this.mensagemAlunoAlerta = message});
     this.alunosMensagemService.alunoMensagemErro().subscribe((message) => {this.mensagemAlunoErro = message});

     this.alunosService.todosAlunos()
    .subscribe(
       (response) => {this.alunos = response},
      (error) => {console.log(error)}
    );
  }

}
