import { Component, Input, OnInit } from "@angular/core";
import { ConfiguracoesService } from "../../configuracoes.service";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Instrumento } from "../instrumento";
import { ConfiguracoesMensagemService } from "../../configuracoes-mensagem.service";
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'banzos-instrumentos-listagem',
  templateUrl: './instrumentos-listagem.component.html',
  styleUrls: ['./instrumentos-listagem.component.scss']
})
export class InstrumentosListagemComponent implements OnInit{

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  instrumentos: Instrumento[];

  instrumentoEdicaoForm: FormGroup;
  instrumentoSelecionado: Instrumento;
  tituloEdicaoInstrumento: string;
  labelBotaoEdicaoInstrumento: string;
  isInstrumentoEdicao: boolean;
  isInstrumentoExclusao: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private configuracoesService: ConfiguracoesService,
    private configuracoesMensagemService: ConfiguracoesMensagemService,
    private route: ActivatedRoute,
    private _location: Location,   
  ) { }

  ngOnInit(): void { 
    
    this.configuracoesService.buscarInstrumentos()
    .subscribe(
      (result) => this.instrumentos = result
    );

    moment.locale('pt-BR');
   
    const id = +this.route.snapshot.paramMap.get('id');

    this.instrumentoEdicaoForm = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    });

    if (id != 0) {
      this.tituloEdicaoInstrumento = "Instrumento";
      this.labelBotaoEdicaoInstrumento = "Salvar";
      this.isInstrumentoEdicao = true;
    } else {
      this.tituloEdicaoInstrumento = "Adicionar Instrumento";
      this.labelBotaoEdicaoInstrumento = "Cadastrar"
      this.isInstrumentoEdicao = false;
    }
  }

  enviarAlteracaoInstrumento () {

    const id = this.instrumentoEdicaoForm.get('id').value;
    const nome = this.instrumentoEdicaoForm.get('nome').value;
    const descricao = this.instrumentoEdicaoForm.get('descricao').value;


    if (!this.isInstrumentoExclusao) {

      this.limparMensagens();

      this.configuracoesService
        .editarInstrumento({id, nome, descricao})
        .subscribe(
            () => {
              if (this.isInstrumentoEdicao) {
                 this.configuracoesMensagemService.configuracoesMensagemSucesso().next('Instrumento salvo com sucesso');
              } else {
                this.configuracoesMensagemService.configuracoesMensagemSucesso().next('Instrumento cadastrado com sucesso');
              }
              this.voltar()
            },
            erro => {
              this.configuracoesMensagemService.configuracoesMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
    } else {
      this.configuracoesService
        .excluirInstrumento(id)
        .subscribe(
            () => {
              this.configuracoesMensagemService.configuracoesMensagemAlerta().next('Instrumento excluído com sucesso');
                this.instrumentoEdicaoForm.reset();
                this.voltar();
            },
            erro => {
              this.configuracoesMensagemService.configuracoesMensagemErro().next('Erro ao excluir o instrumento');
            }
        );
    }
  }
  
  buscarInstrumento(id) {
    this.tituloEdicaoInstrumento = "Instrumento";
    this.labelBotaoEdicaoInstrumento = "Salvar";
    this.isInstrumentoEdicao = true;
    return this.configuracoesService.buscarInstrumento(id)
    .subscribe(
      (instrumento) => {
        this.instrumentoSelecionado = instrumento;
        if(id != 0){
          this.instrumentoEdicaoForm.controls['id'].setValue(instrumento.id);
          this.instrumentoEdicaoForm.controls['nome'].setValue(instrumento.nome);
          this.instrumentoEdicaoForm.controls['descricao'].setValue(instrumento.descricao);
        }
      }          
    );
    
  }

  excluirInstrumento() {
    this.isInstrumentoExclusao = true;
    this.enviarAlteracaoInstrumento();
  }

  editarInstrumento() {
    this.isInstrumentoExclusao = false;
    this.enviarAlteracaoInstrumento();
  }

  limparMensagens(): any {
     this.configuracoesMensagemService.configuracoesMensagemSucesso().next(null);
     this.configuracoesMensagemService.configuracoesMensagemSucesso().next(null);
     this.configuracoesMensagemService.configuracoesMensagemSucesso().next("");
  }

  voltar() {
    this.closeAddExpenseModal.nativeElement.click();
    location.reload()
  }

  botaoVoltar() {
    this.limparMensagens();
    this.closeAddExpenseModal.nativeElement.click();
    location.reload()
  }
}
