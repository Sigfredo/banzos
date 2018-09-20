import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ProfessoresService } from "../professores.service";
import * as moment from 'moment';
import { ViewChild, ElementRef} from '@angular/core';
import { Professor } from '../professor';
import { ActivatedRoute } from '@angular/router';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { ProfessoresMensagemService } from '../professores-mensagem.service';
import { ProfessoresComponent } from '../professores.component';

@Component({
  selector: 'banzos-professor-edicao',
  templateUrl: './professores-edicao.component.html',
  styleUrls: ['./professores-edicao.component.scss'],
  providers: [
  ],
})
export class ProfessoresEdicaoComponent implements OnInit {
  @Input() professor: Professor;
  @ViewChild('closeAddProfessorModal') closeAddProfessorModal: ElementRef;
  @Output() mensagemSucessoProfessor: EventEmitter<string> = new EventEmitter<string>();

  professorEditarForm: FormGroup;
  professorSelecionado: Professor;
  tituloEdicaoProfessor: string;
  labelBotaoEdicaoProfessor: string;
  isProfessorEdicao: boolean;
  isProfessorExclusao: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private professoresService: ProfessoresService,
    private professoresMensagemService: ProfessoresMensagemService,
    private route: ActivatedRoute,
    private _location: Location

    

  ) { }

  ngOnInit(): void { 

    moment.locale('pt-BR');
   
    const id = +this.route.snapshot.paramMap.get('id');

    this.professorEditarForm = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      nascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      cep: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required]
    });

    if (id != 0) {
      this.tituloEdicaoProfessor = "Professor";
      this.labelBotaoEdicaoProfessor = "Salvar";
      this.isProfessorEdicao = true;
      this.buscarProfessor(id).subscribe(retorno =>
        {}
      )
    } else {
      this.tituloEdicaoProfessor = "Adicionar Professor";
      this.labelBotaoEdicaoProfessor = "Cadastrar"
      this.isProfessorEdicao = false;
    }
  }

  enviarAlteracaoProfessor () {

    const id = this.professorEditarForm.get('id').value;
    const nome = this.professorEditarForm.get('nome').value;
    const nascimento = this.professorEditarForm.get('nascimento').value;
    const telefone = this.professorEditarForm.get('telefone').value;
    const endereco = this.professorEditarForm.get('endereco').value;
    const cep = this.professorEditarForm.get('cep').value;
    const cpf = this.professorEditarForm.get('cpf').value;
    const rg= this.professorEditarForm.get('rg').value

    if (!this.isProfessorExclusao) {

      this.limparMensagens();

      this.professoresService
        .editarProfessor({id, nome, nascimento, telefone, 
          endereco, cep, cpf, rg})
        .subscribe(
            () => {
              if (this.isProfessorEdicao) {
                 this.professoresMensagemService.professorMensagemSucesso().next('Professor salvo com sucesso');
              } else {
                this.professoresMensagemService.professorMensagemSucesso().next('Professor cadastrado com sucesso');
              }
              this.voltar()
            },
            erro => {
              this.professoresMensagemService.professorMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
    } else {
      this.professoresService
        .excluirProfessor(id)
        .subscribe(
            () => {
              this.professoresMensagemService.professorMensagemAlerta().next('Professor excluído com sucesso');
                this.professorEditarForm.reset();
                this.voltar();
            },
            erro => {
              this.professoresMensagemService.professorMensagemErro().next('Erro ao excluir o professor');
            }
        );
    }
  }
  
  buscarProfessor (id) {
    return this.professoresService.getProfessor(id)
    .pipe(
        map(professor => {
          this.professor = professor;
          if(id != 0){
            this.professorEditarForm.controls['id'].setValue(professor.id);
            this.professorEditarForm.controls['nome'].setValue(professor.nome);
            this.professorEditarForm.controls['nascimento'].setValue(professor.nascimento);
            this.professorEditarForm.controls['telefone'].setValue(professor.telefone);
            this.professorEditarForm.controls['endereco'].setValue(professor.endereco);
            this.professorEditarForm.controls['cep'].setValue(professor.cep);
            this.professorEditarForm.controls['cpf'].setValue(professor.cpf);
            this.professorEditarForm.controls['rg'].setValue(professor.rg);

          }
        })
    );
    
  }

  excluirProfessor() {
    this.isProfessorExclusao = true;
    this.enviarAlteracaoProfessor();
  }

  editarProfessor() {
    this.isProfessorExclusao = false;
    this.enviarAlteracaoProfessor();
  }

  limparMensagens(): any {
     this.professoresMensagemService.professorMensagemSucesso().next(null);
     this.professoresMensagemService.professorMensagemAlerta().next(null);
     this.professoresMensagemService.professorMensagemErro().next("");
  }

  voltar() {
    this._location.back()
  }

  botaoVoltar() {
    this.limparMensagens();
    this._location.back()
  }

  
}