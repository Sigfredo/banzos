import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ConfiguracoesService } from "../../configuracoes.service";
import * as moment from 'moment';
import { ViewChild, ElementRef} from '@angular/core';
import { Disciplina } from '../disciplina';
import { ActivatedRoute } from '@angular/router';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { DisciplinasMensagemService } from '../disciplinas-mensagem.service';
import { DisciplinasComponent } from '../disciplinas.component';
import { Instrumento } from '../../instrumentos/instrumento';
import { SelectItemsService } from '../../../../shared/select-items/select-items.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { InstrumentoId } from '../../instrumentos/instrumentoId';
import { DisciplinaId } from '../disciplinaId';


@Component({
  selector: 'banzos-disciplina-edicao',
  templateUrl: './disciplinas-edicao.component.html',
  styleUrls: ['./disciplinas-edicao.component.scss'],
  providers: [
  ],
})
export class DisciplinasEdicaoComponent implements OnInit {

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @Output() mensagemSucessoDisciplina: EventEmitter<string> = new EventEmitter<string>();

  disciplinaEditarForm: FormGroup;
  DisciplinaSelecionada: DisciplinaId;
  tituloEdicaoDisciplina: string;
  labelBotaoEdicaoDisciplina: string;
  isDisciplinaEdicao: boolean;
  isDisciplinaExclusao: boolean;
  isTeorica: boolean; 
  private dbCollection: AngularFirestoreCollection;
  id = null;
  instrumentos: InstrumentoId[] = []

  constructor(
    private formBuilder: FormBuilder,
    private configuracoesService: ConfiguracoesService,
    private configuracoesMensagemService: DisciplinasMensagemService,
    private route: ActivatedRoute,
    private _location: Location,
    private selectItemsService: SelectItemsService,
    private cdRef:ChangeDetectorRef,
    private readonly afs: AngularFirestore
    

  ) {
    this.id = this.route.snapshot.paramMap.get('id');

            
      this.dbCollection = afs.collection<Disciplina>('disciplina');

      if(this.id != null){
        //busca aluno  
        this.dbCollection.doc(this.id).get().subscribe(
          a => {
            
            const data = a.data() as DisciplinaId;
            data.id = a.id;
            this.DisciplinaSelecionada = data;

            this.disciplinaEditarForm.controls['id'].setValue(data.id);
            this.disciplinaEditarForm.controls['nome'].setValue(data.nome);
            this.disciplinaEditarForm.controls['instrumento'].setValue(data.instrumento);
            this.disciplinaEditarForm.controls['frequenciaMinima'].setValue(data.frequenciaMinima);
            this.disciplinaEditarForm.controls['notaMinima'].setValue(data.notaMinima);
            this.disciplinaEditarForm.controls['teorica'].setValue(data.teorica);
            this.setTipoAula(data.teorica)
            this.cdRef.detectChanges();

          }
        );
      }

      //busca os instrumentos
      this.afs.collection<Instrumento>('instrumento').snapshotChanges().subscribe(
        actions => actions.map(a => {
          const data = a.payload.doc.data() as InstrumentoId;
          data.id = a.payload.doc.id;
          this.instrumentos.push(data);
        })
      );
   }


  ngOnInit() { 

    moment.locale('pt-BR');

    this.isTeorica = false;

    this.disciplinaEditarForm = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      instrumento: ['', Validators.required],
      frequenciaMinima: ['', Validators.required],
      notaMinima: ['', Validators.required],
      teorica: [false, Validators.required]
     
    });

    if (this.id != null) {
      this.tituloEdicaoDisciplina = "Disciplina";
      this.labelBotaoEdicaoDisciplina = "Salvar";
      this.isDisciplinaEdicao = true;
    } else {
      this.tituloEdicaoDisciplina = "Adicionar Disciplina";
      this.labelBotaoEdicaoDisciplina = "Cadastrar"
      this.isDisciplinaEdicao = false;
    }

  }

  enviarAlteracaoDisciplina () {

    const id = this.disciplinaEditarForm.get('id').value;
    const nome = this.disciplinaEditarForm.get('nome').value;
    const instrumento = this.disciplinaEditarForm.get('instrumento').value;
    const frequenciaMinima = this.disciplinaEditarForm.get('frequenciaMinima').value;
    const notaMinima = this.disciplinaEditarForm.get('notaMinima').value;
    const teorica = this.disciplinaEditarForm.get('teorica').value;

    this.limparMensagens();

    //Se não for exclusão
    if (!this.isDisciplinaExclusao) {
      //Se for adição
      if(this.id == null){
        this.dbCollection
        .add({id, nome, instrumento, frequenciaMinima, notaMinima, teorica} as Disciplina)
        .then(
            () => {
              this.configuracoesMensagemService.disciplinaMensagemSucesso().next('Aluno cadastrado com sucesso');
              this.voltar()
            },
            erro => {
              this.configuracoesMensagemService.disciplinaMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
      // Então é edição
      }else {
        this.dbCollection.doc(this.id)
        .update({id, nome, instrumento, frequenciaMinima, notaMinima, teorica})
        .then(
            () => {
              this.configuracoesMensagemService.disciplinaMensagemSucesso().next('Aluno salvo com sucesso');
              this.voltar()
            },
            erro => {
              this.configuracoesMensagemService.disciplinaMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
      }
      //Exclusão
      } else {
          this.dbCollection.doc(this.id).delete()
            .then(
                () => {
                  this.configuracoesMensagemService.disciplinaMensagemAlerta().next('Aluno excluído com sucesso');
                    this.disciplinaEditarForm.reset();
                    this.voltar();
                },
                erro => {
                  this.configuracoesMensagemService.disciplinaMensagemErro().next('Erro ao excluir o aluno');
                }
          );
      }
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
     this.configuracoesMensagemService.disciplinaMensagemSucesso().next(null);
     this.configuracoesMensagemService.disciplinaMensagemAlerta().next(null);
     this.configuracoesMensagemService.disciplinaMensagemErro().next("");
  }

  voltar() {
    this._location.back()
  }

  botaoVoltar() {
    this.limparMensagens();
    this._location.back()
  }

  setTipoAula(teorica){
    this.isTeorica = teorica;
  }
  
}
