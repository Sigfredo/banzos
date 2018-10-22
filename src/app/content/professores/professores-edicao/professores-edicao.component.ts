import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ProfessoresService } from "../professores.service";
import * as moment from 'moment';
import { ViewChild, ElementRef} from '@angular/core';
import { Professor } from '../professor';
import { ActivatedRoute } from '@angular/router';
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { ProfessoresMensagemService } from '../professores-mensagem.service';
import { ProfessoresComponent } from '../professores.component';
import { SelectItemsService } from '../../../shared/select-items/select-items.service';
import { TipoConta } from '../../../shared/select-items/tipo-conta';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { InstrumentoId } from '../../configuracoes/instrumentos/instrumentoId';
import { ProfessorId } from '../professorId';
import { Instrumento } from '../../configuracoes/instrumentos/instrumento';
import { SharedService } from 'src/app/shared/shared.service';
import { BanzosUtils } from 'src/app/shared/banzos-util';
import { Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';

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
  professorSelecionado: ProfessorId;
  tituloEdicaoProfessor: string;
  labelBotaoEdicaoProfessor: string;
  isProfessorEdicao: boolean;
  isProfessorExclusao: boolean;
  tiposConta = [];
  private dbCollection: AngularFirestoreCollection;
  id = null;
  instrumentos: InstrumentoId[] = [];
  instrumentosProfessor: InstrumentoId[] = []


  constructor(
    private formBuilder: FormBuilder,
    private professoresService: ProfessoresService,
    private professoresMensagemService: ProfessoresMensagemService,
    private route: ActivatedRoute,
    private _location: Location,
    private selectItemsService: SelectItemsService,
    private readonly afs: AngularFirestore,
    private sharedService: SharedService,
    private banzosUtils: BanzosUtils,
    private db: AngularFireDatabase
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');

            
      this.dbCollection = afs.collection<Professor>('professor');

      if(this.id != null){
        //busca professor  
        this.dbCollection.doc(this.id).get().subscribe(
          a => {
            
            const data = a.data() as ProfessorId;
            data.id = a.id;
            this.professorSelecionado = data;
            this.professorSelecionado.instrumentos = [];

            this.professorEditarForm.controls['id'].setValue(data.id);
            this.professorEditarForm.controls['nome'].setValue(data.nome);
            this.professorEditarForm.controls['nascimento'].setValue(this.banzosUtils.extrairData(data.nascimento));
            this.professorEditarForm.controls['telefone'].setValue(data.telefone);
            this.professorEditarForm.controls['email'].setValue(data.email);
            this.professorEditarForm.controls['endereco'].setValue(data.endereco);
            this.professorEditarForm.controls['cep'].setValue(data.cep);
            this.professorEditarForm.controls['banco'].setValue(data.banco);
            this.professorEditarForm.controls['tipoConta'].setValue(data.tipoConta);
            this.professorEditarForm.controls['numeroConta'].setValue(data.numeroConta);
            this.professorEditarForm.controls['agencia'].setValue(data.agencia);
            this.professorEditarForm.controls['cpf'].setValue(data.cpf);
            this.professorEditarForm.controls['rg'].setValue(data.rg);
            this.dbCollection.doc(this.id).collection<Instrumento>('instrumentos').snapshotChanges()
            .subscribe(actions => actions.map(i => {
              const data = i.payload.doc.data() as InstrumentoId;
              data.id = i.payload.doc.id;
              this.professorSelecionado.instrumentos.push(data);
            })
            );
          
         }
        );
      }

      

      //busca os instrumentos para a combo
      this.afs.collection<Instrumento>('instrumento').snapshotChanges().subscribe(
        actions => actions.map(a => {
          const data = a.payload.doc.data() as InstrumentoId;
          data.id = a.payload.doc.id;
          this.instrumentos.push(data);
        })
      );
      
      //busca os tipos de conta
      this.tiposConta = sharedService.getTiposConta();
  }

  ngOnInit(): void { 

    moment.locale('pt-BR');

    this.professorEditarForm = this.formBuilder.group({
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

    if (this.id != null) {
      this.tituloEdicaoProfessor = "Professor";
      this.labelBotaoEdicaoProfessor = "Salvar";
      this.isProfessorEdicao = true;
    } else {
      this.tituloEdicaoProfessor = "Adicionar Professor";
      this.labelBotaoEdicaoProfessor = "Cadastrar"
      this.isProfessorEdicao = false;
    }

  }

  enviarAlteracaoProfessor () {

    const nome = this.professorEditarForm.get('nome').value;
    const nascimento = this.professorEditarForm.get('nascimento').value == null? null:new Date(this.professorEditarForm.get('nascimento').value);
    const telefone = this.professorEditarForm.get('telefone').value;
    const email = this.professorEditarForm.get('email').value;
    const endereco = this.professorEditarForm.get('endereco').value;
    const cep = this.professorEditarForm.get('cep').value;
    const banco = this.professorEditarForm.get('banco').value;
    const tipoConta = this.professorEditarForm.get('tipoConta').value;
    const numeroConta = this.professorEditarForm.get('numeroConta').value;
    const agencia = this.professorEditarForm.get('agencia').value;
    const cpf = this.professorEditarForm.get('cpf').value;
    const rg= this.professorEditarForm.get('rg').value

    this.limparMensagens();
    //Se não for exclusão
    if (!this.isProfessorExclusao) {
      //Se for adição
      if(this.id == null){
        this.dbCollection
        .add({nome, nascimento, telefone, email,
          endereco, cep, banco, tipoConta, numeroConta, agencia, cpf, rg} as Professor)
        .then(
            () => {
              this.professoresMensagemService.professorMensagemSucesso().next('Professor cadastrado com sucesso');
              this.voltar()
            },
            erro => {
              this.professoresMensagemService.professorMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
      // Então é edição
      }else {
        this.dbCollection.doc(this.id)
        .update({nome, nascimento, telefone, email,
          endereco, cep, banco, tipoConta, numeroConta, agencia, cpf, rg})
        .then(
            () => {
              this.professoresMensagemService.professorMensagemSucesso().next('Professor salvo com sucesso');
              this.voltar()
            },
            erro => {
              this.professoresMensagemService.professorMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
      }
    //Exclusão
    } else {
      this.dbCollection.doc(this.id).delete()
        .then(
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
