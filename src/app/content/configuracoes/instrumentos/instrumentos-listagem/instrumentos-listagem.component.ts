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
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { InstrumentoId } from "../instrumentoId";
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
  

  instrumentos: InstrumentoId[] = [];

  instrumentoEdicaoForm: FormGroup;
  instrumentoSelecionado: Instrumento;
  tituloEdicaoInstrumento: string;
  labelBotaoEdicaoInstrumento: string;
  isInstrumentoEdicao: boolean;
  isInstrumentoExclusao: boolean;

  mensagemInstrumentoSucesso: string;
  mensagemInstrumentoAlerta: string;
  mensagemInstrumentoErro: string;

  id = null;
  private dbCollection: AngularFirestoreCollection;

  constructor(
    private formBuilder: FormBuilder,
    private configuracoesService: ConfiguracoesService,
    private configuracoesMensagemService: ConfiguracoesMensagemService,
    private route: ActivatedRoute, 
    private banzosUtils: BanzosUtils,
    private readonly afs: AngularFirestore
  ) { 
    this.dbCollection = afs.collection<Instrumento>('instrumento');

    if(this.id != null){
      //busca aluno  
      this.dbCollection.doc(this.id).get().subscribe(
        a => {
          
          const data = a.data() as InstrumentoId;
          data.id = a.id;
          this.instrumentoSelecionado = data;

          this.instrumentoEdicaoForm.controls['nome'].setValue(this.instrumentoSelecionado.nome);
          this.instrumentoEdicaoForm.controls['descricao'].setValue(this.instrumentoSelecionado.descricao);
        }
      );
    }
  }

  ngOnInit(): void { 

    this.instrumentos = [];

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

    this.afs.collection<Instrumento>('instrumento').snapshotChanges().subscribe(  
      actions => actions.map(a => {
                    const data = a.payload.doc.data() as InstrumentoId;
                    data.id = a.payload.doc.id;
                    this.instrumentos.push(data);
                })
    );

    moment.locale('pt-BR');
   
    this.id = this.route.snapshot.paramMap.get('id');

    this.instrumentoEdicaoForm = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    });

    if (this.id != 0) {
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
    
    //Se não for exclusão
    if (!this.isInstrumentoExclusao) {
      //Se for adição
      if(this.id == null){
        this.dbCollection
        .add({nome, descricao} as Instrumento)
        .then(
            () => {
              this.configuracoesMensagemService.instrumentoMensagemSucesso().next('Instrumento cadastrado com sucesso');
              this.voltar()
            },
            erro => {
              this.configuracoesMensagemService.instrumentoMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
      // Então é edição
      }else {
        this.dbCollection.doc(this.id)
        .update({nome, descricao})
        .then(
            () => {
              this.configuracoesMensagemService.instrumentoMensagemSucesso().next('Aluno salvo com sucesso');
              this.voltar()
            },
            erro => {
              this.configuracoesMensagemService.instrumentoMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
      }
    //Exclusão
    } else {
      this.dbCollection.doc(this.id).delete()
        .then(
            () => {
              this.configuracoesMensagemService.instrumentoMensagemAlerta().next('Aluno excluído com sucesso');
                this.instrumentoEdicaoForm.reset();
                this.voltar();
            },
            erro => {
              this.configuracoesMensagemService.instrumentoMensagemErro().next('Erro ao excluir o aluno');
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
    // this.configuracoesService.buscarInstrumentos()
    // .subscribe(
    //   (result) => this.instrumentos = result
    // );
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
