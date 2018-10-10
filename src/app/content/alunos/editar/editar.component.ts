import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AlunosService } from "../alunos.service";
import * as moment from 'moment';
import { ViewChild, ElementRef} from '@angular/core';
import { Aluno } from '../aluno';
import { ActivatedRoute } from '@angular/router';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { AlunosMensagemService } from '../alunos-mensagem.service';
import { AlunosComponent } from '../alunos.component';

@Component({
  selector: 'banzos-aluno-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
  providers: [
  ],
})

export class EditarComponent implements OnInit {
  @Input() aluno: Aluno;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @Output() mensagemSucessoAluno: EventEmitter<string> = new EventEmitter<string>();

  alunoEditarForm: FormGroup;
  alunoSelecionado: Aluno;
  tituloEdicaoAluno: string;
  labelBotaoEdicaoAluno: string;
  isAlunoEdicao: boolean;
  isAlunoExclusao: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private alunosService: AlunosService,
    private alunosMensagemService: AlunosMensagemService,
    private route: ActivatedRoute,
    private _location: Location,
    private alunoComponent: AlunosComponent
    

  ) { }

  ngOnInit(): void { 

    moment.locale('pt-BR');
   
    const id = +this.route.snapshot.paramMap.get('id');

    this.alunoEditarForm = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      instrumento: ['', Validators.required],
      inicioPlano: ['', Validators.required],
      fimPlano: ['', Validators.required],
      nascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      cep: ['', Validators.required],
      nomeResponsavel: ['', Validators.required],
      cpfResponsavel: ['', Validators.required],
      rgResponsavel: ['', Validators.required]
    });

    if (id != 0) {
      this.tituloEdicaoAluno = "Aluno";
      this.labelBotaoEdicaoAluno = "Salvar";
      this.isAlunoEdicao = true;
      this.buscarAluno(id).subscribe(retorno =>
        {}
      )
    } else {
      this.tituloEdicaoAluno = "Adicionar Aluno";
      this.labelBotaoEdicaoAluno = "Cadastrar"
      this.isAlunoEdicao = false;
    }
  }

  enviarAlteracaoAluno () {

    const id = this.alunoEditarForm.get('id').value;
    const nome = this.alunoEditarForm.get('nome').value;
    const instrumento = this.alunoEditarForm.get('instrumento').value;
    const inicioPlano = this.alunoEditarForm.get('inicioPlano').value;
    const fimPlano = this.alunoEditarForm.get('fimPlano').value;
    const nascimento = this.alunoEditarForm.get('nascimento').value;
    const telefone = this.alunoEditarForm.get('telefone').value;
    const endereco = this.alunoEditarForm.get('endereco').value;
    const cep = this.alunoEditarForm.get('cep').value;
    const nomeResponsavel = this.alunoEditarForm.get('nomeResponsavel').value;
    const cpfResponsavel = this.alunoEditarForm.get('cpfResponsavel').value;
    const rgResponsavel = this.alunoEditarForm.get('rgResponsavel').value

    this.limparMensagens();
    
    if (!this.isAlunoExclusao) {

      this.alunosService
        .editarAluno({id, nome, instrumento, inicioPlano, fimPlano ,nascimento, telefone, 
          endereco, cep, nomeResponsavel, cpfResponsavel, rgResponsavel})
        .then(
            () => {
              if (this.isAlunoEdicao) {
                 this.alunosMensagemService.alunoMensagemSucesso().next('Aluno salvo com sucesso');
              } else {
                this.alunosMensagemService.alunoMensagemSucesso().next('Aluno cadastrado com sucesso');
              }
              this.voltar()
            },
            erro => {
              this.alunosMensagemService.alunoMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
    } else {
      this.alunosService
        .excluirAluno(id)
        .subscribe(
            () => {
              this.alunosMensagemService.alunoMensagemAlerta().next('Aluno excluído com sucesso');
                this.alunoEditarForm.reset();
                this.voltar();
            },
            erro => {
              this.alunosMensagemService.alunoMensagemErro().next('Erro ao excluir o aluno');
            }
        );
    }
  }
  
  buscarAluno (id) {
    return this.alunosService.getAluno(id)
    // .pipe(
    //     map(aluno => {
      .subscribe(
        (aluno) => console.log(aluno)
      )
        
      
          
          // this.aluno = aluno;
          // if(id != 0){
          //   this.alunoEditarForm.controls['id'].setValue(aluno.id);
          //   this.alunoEditarForm.controls['nome'].setValue(aluno.nome);
          //   this.alunoEditarForm.controls['instrumento'].setValue(aluno.instrumento);
          //   this.alunoEditarForm.controls['inicioPlano'].setValue(aluno.inicioPlano);
          //   this.alunoEditarForm.controls['fimPlano'].setValue(aluno.fimPlano);
          //   this.alunoEditarForm.controls['nascimento'].setValue(aluno.nascimento);
          //   this.alunoEditarForm.controls['telefone'].setValue(aluno.telefone);
          //   this.alunoEditarForm.controls['endereco'].setValue(aluno.endereco);
          //   this.alunoEditarForm.controls['cep'].setValue(aluno.cep);
          //   this.alunoEditarForm.controls['nomeResponsavel'].setValue(aluno.nomeResponsavel);
          //   this.alunoEditarForm.controls['cpfResponsavel'].setValue(aluno.cpfResponsavel);
          //   this.alunoEditarForm.controls['rgResponsavel'].setValue(aluno.rgResponsavel);

          // }
        // })
    // );
    
  }

  excluirAluno() {
    this.isAlunoExclusao = true;
    this.enviarAlteracaoAluno();
  }

  editarAluno() {
    this.isAlunoExclusao = false;
    this.enviarAlteracaoAluno();
  }

  limparMensagens(): any {
     this.alunosMensagemService.alunoMensagemSucesso().next(null);
     this.alunosMensagemService.alunoMensagemAlerta().next(null);
     this.alunosMensagemService.alunoMensagemErro().next(null);
  }

  voltar() {
    this._location.back()
  }

  botaoVoltar() {
    this.limparMensagens();
    this._location.back()
  }

  
}
