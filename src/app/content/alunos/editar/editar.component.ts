import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AlunosService } from "../alunos.service";
import * as moment from 'moment';
import { ViewChild, ElementRef} from '@angular/core';
import { Aluno } from '../aluno';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { AlunosMensagemService } from '../alunos-mensagem.service';
import { AlunosComponent } from '../alunos.component';
import { DocumentSnapshot, AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BanzosUtils } from 'src/app/shared/banzos-util';
import { Instrumento } from '../../configuracoes/instrumentos/instrumento';
import { AlunoId } from '../alunoId';
import { InstrumentoId } from '../../configuracoes/instrumentos/instrumentoId';




@Component({
  selector: 'banzos-aluno-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
  providers: [ 
  ],
})

export class EditarComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @Output() mensagemSucessoAluno: EventEmitter<string> = new EventEmitter<string>();

  alunoEditarForm: FormGroup;
  alunoSelecionado: AlunoId;
  tituloEdicaoAluno: string;
  labelBotaoEdicaoAluno: string;
  isAlunoEdicao: boolean;
  isAlunoExclusao: boolean;
  private dbCollection: AngularFirestoreCollection;
  id = null;
  instrumentos: InstrumentoId[] = []

  constructor(
    private formBuilder: FormBuilder,
    private alunosService: AlunosService,
    private alunosMensagemService: AlunosMensagemService,
    private route: ActivatedRoute,
    private _location: Location,
    private alunoComponent: AlunosComponent,
    private banzosUtils: BanzosUtils,
    private readonly afs: AngularFirestore
  ){

      this.id = this.route.snapshot.paramMap.get('id');

            
      this.dbCollection = afs.collection<Aluno>('aluno');

      if(this.id != null){
        //busca aluno  
        this.dbCollection.doc(this.id).get().subscribe(
          a => {
            
            const data = a.data() as AlunoId;
            data.id = a.id;
            this.alunoSelecionado = data;

            this.alunoEditarForm.controls['id'].setValue(this.alunoSelecionado.id);
            this.alunoEditarForm.controls['nome'].setValue(this.alunoSelecionado.nome);
            this.alunoEditarForm.controls['instrumento'].setValue(this.alunoSelecionado.instrumento);
            this.alunoEditarForm.controls['inicioPlano'].setValue(this.banzosUtils.extrairData(this.alunoSelecionado.inicioPlano));
            this.alunoEditarForm.controls['fimPlano'].setValue(this.banzosUtils.extrairData(this.alunoSelecionado.fimPlano));
            this.alunoEditarForm.controls['nascimento'].setValue(this.banzosUtils.extrairData(this.alunoSelecionado.nascimento));
            this.alunoEditarForm.controls['telefone'].setValue(this.alunoSelecionado.telefone);
            this.alunoEditarForm.controls['endereco'].setValue(this.alunoSelecionado.endereco);
            this.alunoEditarForm.controls['cep'].setValue(this.alunoSelecionado.cep);
            this.alunoEditarForm.controls['nomeResponsavel'].setValue(this.alunoSelecionado.nomeResponsavel);
            this.alunoEditarForm.controls['cpfResponsavel'].setValue(this.alunoSelecionado.cpfResponsavel);
            this.alunoEditarForm.controls['rgResponsavel'].setValue(this.alunoSelecionado.rgResponsavel);
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

  ngOnInit(): void { 

    moment.locale('pt-BR');

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

    if (this.id != null) {
      this.tituloEdicaoAluno = "Aluno";
      this.labelBotaoEdicaoAluno = "Salvar";
      this.isAlunoEdicao = true;
    } else {
      this.tituloEdicaoAluno = "Adicionar Aluno";
      this.labelBotaoEdicaoAluno = "Cadastrar"
      this.isAlunoEdicao = false;
    }
  }

  enviarAlteracaoAluno () {
    const nome = this.alunoEditarForm.get('nome').value;
    const instrumento = this.alunoEditarForm.get('instrumento').value;
    const inicioPlano = this.alunoEditarForm.get('inicioPlano').value == null? null:new Date(this.alunoEditarForm.get('inicioPlano').value);
    const fimPlano = this.alunoEditarForm.get('fimPlano').value == null? null:new Date(this.alunoEditarForm.get('fimPlano').value);
    const nascimento = this.alunoEditarForm.get('nascimento').value == null? null:new Date(this.alunoEditarForm.get('nascimento').value);
    const telefone = this.alunoEditarForm.get('telefone').value;
    const endereco = this.alunoEditarForm.get('endereco').value;
    const cep = this.alunoEditarForm.get('cep').value;
    const nomeResponsavel = this.alunoEditarForm.get('nomeResponsavel').value;
    const cpfResponsavel = this.alunoEditarForm.get('cpfResponsavel').value;
    const rgResponsavel = this.alunoEditarForm.get('rgResponsavel').value

    this.limparMensagens();
    
    //Se não for exclusão
    if (!this.isAlunoExclusao) {
      //Se for adição
      if(this.id == null){
        this.dbCollection
        .add({nome, instrumento, inicioPlano, fimPlano ,nascimento, telefone, 
          endereco, cep, nomeResponsavel, cpfResponsavel, rgResponsavel} as Aluno)
        .then(
            () => {
              this.alunosMensagemService.alunoMensagemSucesso().next('Aluno cadastrado com sucesso');
              this.voltar()
            },
            erro => {
              this.alunosMensagemService.alunoMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
      // Então é edição
      }else {
        this.dbCollection.doc(this.id)
        .update({nome, instrumento, inicioPlano, fimPlano ,nascimento, telefone, 
          endereco, cep, nomeResponsavel, cpfResponsavel, rgResponsavel})
        .then(
            () => {
              this.alunosMensagemService.alunoMensagemSucesso().next('Aluno salvo com sucesso');
              this.voltar()
            },
            erro => {
              this.alunosMensagemService.alunoMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
      }
    //Exclusão
    } else {
      this.dbCollection.doc(this.id).delete()
        .then(
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
