import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

import * as moment from 'moment';
import { ViewChild, ElementRef} from '@angular/core';
import { Disciplina } from '../disciplina';
import { ActivatedRoute } from '@angular/router';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { DisciplinasMensagemService } from '../disciplinas-mensagem.service';
import { DisciplinasComponent } from '../disciplinas.component';


@Component({
  selector: 'banzos-disciplina-edicao',
  templateUrl: './disciplinas-edicao.component.html',
  styleUrls: ['./disciplinas-edicao.component.scss'],
  providers: [
  ],
})
export class DisciplinasEdicaoComponent implements OnInit {



  constructor(

  ) { }

  ngOnInit(): void { }

    moment.locale('pt-BR');
   
    const id = +this.route.snapshot.paramMap.get('id');

    this.disciplinaEditarForm = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      nascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      endereco: ['', Validators.required],
      cep: ['', Validators.required],
      banco: ['', Validators.required],
      tipoConta: ['', Validators.required],
      numeroConta: ['', Validators.required],
      agencia: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required]
    });

    if (id != 0) {
      this.tituloEdicaoDisciplina = "Disciplina";
      this.labelBotaoEdicaoDisciplina = "Salvar";
      this.isDisciplinaEdicao = true;
      this.buscarDisciplina(id).subscribe(retorno =>
        {}
      )
    } else {
      this.tituloEdicaoDisciplina = "Adicionar Disciplina";
      this.labelBotaoEdicaoDisciplina = "Cadastrar"
      this.isDisciplinaEdicao = false;
    }

    this.selectItemsService.buscarTipoContas()
        .subscribe(
            (tipoConta) => this.tiposConta = tipoConta
        );
  }

  enviarAlteracaoDisciplina () {

    const id = this.disciplinaEditarForm.get('id').value;
    const nome = this.disciplinaEditarForm.get('nome').value;
    const nascimento = this.disciplinaEditarForm.get('nascimento').value;
    const telefone = this.disciplinaEditarForm.get('telefone').value;
    const email = this.disciplinaEditarForm.get('email').value;
    const endereco = this.disciplinaEditarForm.get('endereco').value;
    const cep = this.disciplinaEditarForm.get('cep').value;
    const banco = this.disciplinaEditarForm.get('banco').value;
    const tipoConta = this.disciplinaEditarForm.get('tipoConta').value;
    const numeroConta = this.disciplinaEditarForm.get('numeroConta').value;
    const agencia = this.disciplinaEditarForm.get('agencia').value;
    const cpf = this.disciplinaEditarForm.get('cpf').value;
    const rg= this.disciplinaEditarForm.get('rg').value

    if (!this.isDisciplinaExclusao) {

      this.limparMensagens();

      this.disciplinasService
        .editarDisciplina({id, nome, nascimento, telefone, email,
          endereco, cep, banco, tipoConta, numeroConta, agencia, cpf, rg})
        .subscribe(
            () => {
              if (this.isDisciplinaEdicao) {
                 this.disciplinasMensagemService.disciplinaMensagemSucesso().next('Disciplina salvo com sucesso');
              } else {
                this.disciplinasMensagemService.disciplinaMensagemSucesso().next('Disciplina cadastrado com sucesso');
              }
              this.voltar()
            },
            erro => {
              this.disciplinasMensagemService.disciplinaMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
    } else {
      this.disciplinasService
        .excluirDisciplina(id)
        .subscribe(
            () => {
              this.disciplinasMensagemService.disciplinaMensagemAlerta().next('Disciplina excluído com sucesso');
                this.disciplinaEditarForm.reset();
                this.voltar();
            },
            erro => {
              this.disciplinasMensagemService.disciplinaMensagemErro().next('Erro ao excluir o disciplina');
            }
        );
    }
  }
  
  buscarDisciplina (id) {
    return this.disciplinasService.getDisciplina(id)
    .pipe(
        map(disciplina => {
          this.disciplina = disciplina;
          if(id != 0){
            this.disciplinaEditarForm.controls['id'].setValue(disciplina.id);
            this.disciplinaEditarForm.controls['nome'].setValue(disciplina.nome);
            this.disciplinaEditarForm.controls['nascimento'].setValue(disciplina.nascimento);
            this.disciplinaEditarForm.controls['telefone'].setValue(disciplina.telefone);
            this.disciplinaEditarForm.controls['email'].setValue(disciplina.email);
            this.disciplinaEditarForm.controls['endereco'].setValue(disciplina.endereco);
            this.disciplinaEditarForm.controls['cep'].setValue(disciplina.cep);
            this.disciplinaEditarForm.controls['banco'].setValue(disciplina.banco);
            this.disciplinaEditarForm.controls['tipoConta'].setValue(disciplina.tipoConta);
            this.disciplinaEditarForm.controls['numeroConta'].setValue(disciplina.numeroConta);
            this.disciplinaEditarForm.controls['agencia'].setValue(disciplina.agencia);
            this.disciplinaEditarForm.controls['cpf'].setValue(disciplina.cpf);
            this.disciplinaEditarForm.controls['rg'].setValue(disciplina.rg);

          }
        })
    );
    
  }

  excluirDisciplina() {
    this.isDisciplinaExclusao = true;
    this.enviarAlteracaoDisciplina();
  }

  editarDisciplina() {
    this.isDisciplinaExclusao = false;
    this.enviarAlteracaoDisciplina();
  }

  limparMensagens(): any {
     this.disciplinasMensagemService.disciplinaMensagemSucesso().next(null);
     this.disciplinasMensagemService.disciplinaMensagemAlerta().next(null);
     this.disciplinasMensagemService.disciplinaMensagemErro().next("");
  }

  voltar() {
    this._location.back()
  }

  botaoVoltar() {
    this.limparMensagens();
    this._location.back()
  }

  
}
