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
import { BanzosUtils } from "../../../../shared/banzos-util";
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'banzos-instrumentos-listagem',
  templateUrl: './instrumentos-listagem.component.html',
  styleUrls: ['./instrumentos-listagem.component.scss']
})
export class InstrumentosListagemComponent implements OnInit{

  
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('instrumentoEdicaoModal') instrumentoEdicaoModal: ElementRef;
  

  instrumentos: Instrumento[];

  instrumentoEdicaoForm: FormGroup;
  instrumentoSelecionado: Instrumento;
  tituloEdicaoInstrumento: string;
  labelBotaoEdicaoInstrumento: string;
  isInstrumentoEdicao: boolean;
  isInstrumentoExclusao: boolean;

  mensagemInstrumentoSucesso: string;
  mensagemInstrumentoAlerta: string;
  mensagemInstrumentoErro: string;

  constructor(
    private formBuilder: FormBuilder,
    private configuracoesService: ConfiguracoesService,
    private configuracoesMensagemService: ConfiguracoesMensagemService,
    private route: ActivatedRoute, 
    private banzosUtils: BanzosUtils
  ) { }

  ngOnInit(): void { 

    var self = this;
    $(function() {
      $('#instrumentoEdicaoModal').on('hide.bs.modal', function () {
        self.limparFormulario();
      });
      $('#instrumentoEdicaoModal').on('shown.bs.modal', function () {
        self.limparMensagens();
      });
    }); 
    this.configuracoesMensagemService.instrumentoMensagemSucesso().subscribe((message) => {this.mensagemInstrumentoSucesso = message});
    this.configuracoesMensagemService.instrumentoMensagemAlerta().subscribe((message) => {this.mensagemInstrumentoAlerta = message});
    this.configuracoesMensagemService.instrumentoMensagemErro().subscribe((message) => {this.mensagemInstrumentoErro = message});

    this.configuracoesService.buscarInstrumentos()
    .subscribe(
      (result) => this.instrumentos = this.banzosUtils.filter(result,'nome',false)
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

    this.limparMensagens();
    
    if (!this.isInstrumentoExclusao) {

      this.configuracoesService
        .editarInstrumento({id, nome, descricao})
        .subscribe(
            () => {
              if (this.isInstrumentoEdicao) {
                 this.configuracoesMensagemService.instrumentoMensagemSucesso().next('Instrumento salvo com sucesso');
              } else {
                this.configuracoesMensagemService.instrumentoMensagemSucesso().next('Instrumento cadastrado com sucesso');
              }
              this.voltar()
            },
            erro => {
              this.configuracoesMensagemService.instrumentoMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
    } else {
      this.configuracoesService
        .excluirInstrumento(id)
        .subscribe(
            () => {
              this.configuracoesMensagemService.instrumentoMensagemAlerta().next('Instrumento excluído com sucesso');
                this.instrumentoEdicaoForm.reset();
                this.voltar();
            },
            erro => {
              this.configuracoesMensagemService.instrumentoMensagemErro().next('Erro ao excluir o instrumento');
            }
        );
    }
  }
  
  buscarInstrumento(id) {
    this.limparMensagens();
    this.tituloEdicaoInstrumento = "Instrumento";
    this.labelBotaoEdicaoInstrumento = "Salvar";
    this.isInstrumentoEdicao = true;
    this.configuracoesService.buscarInstrumento(id)
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
    this.abrirEdicaoInstrumento();
    
  }

  abrirEdicaoInstrumento(){
    this.isInstrumentoExclusao = false;
    $('#instrumentoEdicaoModal').modal('show');
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
    this.mensagemInstrumentoSucesso = '';
    this.mensagemInstrumentoAlerta = '';
    this.mensagemInstrumentoErro = '';
  }

  voltar() {
    this.closeAddExpenseModal.nativeElement.click();
    this.configuracoesService.buscarInstrumentos()
    .subscribe(
      (result) => this.instrumentos = result
    );
    this.limparFormulario();
  }

  limparFormulario(): any {
    this.instrumentoEdicaoForm.controls['id'].setValue('');
    this.instrumentoEdicaoForm.controls['nome'].setValue('');
    this.instrumentoEdicaoForm.controls['descricao'].setValue('');
    this.isInstrumentoEdicao = false
  }

  botaoVoltar() {
    this.closeAddExpenseModal.nativeElement.click();
    location.reload()
  }
}
