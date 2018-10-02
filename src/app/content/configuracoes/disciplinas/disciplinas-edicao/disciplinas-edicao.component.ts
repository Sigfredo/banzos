import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
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


@Component({
  selector: 'banzos-disciplina-edicao',
  templateUrl: './disciplinas-edicao.component.html',
  styleUrls: ['./disciplinas-edicao.component.scss'],
  providers: [
  ],
})
export class DisciplinasEdicaoComponent implements OnInit {

  @Input() disciplina: Disciplina;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @Output() mensagemSucessoDisciplina: EventEmitter<string> = new EventEmitter<string>();

  disciplinaEditarForm: FormGroup;
  DisciplinaSelecionado: Disciplina;
  tituloEdicaoDisciplina: string;
  labelBotaoEdicaoDisciplina: string;
  isDisciplinaEdicao: boolean;
  isDisciplinaExclusao: boolean;
  instrumentos: Instrumento[];

  constructor(
    private formBuilder: FormBuilder,
    private configuracoesService: ConfiguracoesService,
    private configuracoesMensagemService: DisciplinasMensagemService,
    private route: ActivatedRoute,
    private _location: Location,
    private disciplinasComponent: DisciplinasComponent,
    private selectItemsService: SelectItemsService
    

  ) { }


  ngOnInit(): void { 

    moment.locale('pt-BR');
   
    const id = +this.route.snapshot.paramMap.get('id');

    this.disciplinaEditarForm = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      instrumento: ['', Validators.required],
      frequenciaMinima: ['', Validators.required],
      notaMinima: ['', Validators.required],
      teorica: [false, Validators.required]
     
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

    this.selectItemsService.buscarInstrumentos()
        .subscribe(
            (instrumentos) => this.instrumentos = instrumentos
        );
  }

  enviarAlteracaoDisciplina () {

    const id = this.disciplinaEditarForm.get('id').value;
    const nome = this.disciplinaEditarForm.get('nome').value;
    const instrumento = this.disciplinaEditarForm.get('instrumento').value;
    const frequenciaMinima = this.disciplinaEditarForm.get('frequenciaMinima').value;
    const notaMinima = this.disciplinaEditarForm.get('notaMinima').value;
    const teorica = this.disciplinaEditarForm.get('teorica').value;

    if (!this.isDisciplinaExclusao) {

      this.limparMensagens();

      this.configuracoesService
        .editarDisciplina({id, nome, instrumento, frequenciaMinima, notaMinima, teorica})
        .subscribe(
            () => {
              if (this.isDisciplinaEdicao) {
                 this.configuracoesMensagemService.disciplinaMensagemSucesso().next('Disciplina salvo com sucesso');
              } else {
                this.configuracoesMensagemService.disciplinaMensagemSucesso().next('Disciplina cadastrado com sucesso');
              }
              this.voltar()
            },
            erro => {
              this.configuracoesMensagemService.disciplinaMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
    } else {
      this.configuracoesService
        .excluirDisciplina(id)
        .subscribe(
            () => {
              this.configuracoesMensagemService.disciplinaMensagemAlerta().next('Disciplina excluído com sucesso');
                this.disciplinaEditarForm.reset();
                this.voltar();
            },
            erro => {
              this.configuracoesMensagemService.disciplinaMensagemErro().next('Erro ao excluir o disciplina');
            }
        );
    }
  }
  
  buscarDisciplina (id) {
    return this.configuracoesService.buscarDisciplina(id)
    .pipe(
        map(disciplina => {
          this.disciplina = disciplina;
          if(id != 0){
            this.disciplinaEditarForm.controls['id'].setValue(disciplina.id);
            this.disciplinaEditarForm.controls['nome'].setValue(disciplina.nome);
            this.disciplinaEditarForm.controls['instrumento'].setValue(disciplina.instrumento);
            this.disciplinaEditarForm.controls['frequenciaMinima'].setValue(disciplina.frequenciaMinima);
            this.disciplinaEditarForm.controls['notaMinima'].setValue(disciplina.notaMinima);
            this.disciplinaEditarForm.controls['teorica'].setValue(disciplina.teorica);

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

  
}
