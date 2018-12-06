import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { SalasService } from "../salas.service";
import * as moment from 'moment';
import { ViewChild, ElementRef} from '@angular/core';
import { Sala } from '../sala';
import { ActivatedRoute } from '@angular/router';
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { SalasMensagemService } from '../salas-mensagem.service';
import { SalasComponent } from '../salas.component';
import { SelectItemsService } from '../../../../shared/select-items/select-items.service';
import { TipoConta } from '../../../../shared/select-items/tipo-conta';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { InstrumentoId } from '../../../configuracoes/instrumentos/instrumentoId';
import { SalaId } from '../salaId';
import { Instrumento } from '../../../configuracoes/instrumentos/instrumento';
import { SharedService } from 'src/app/shared/shared.service';
import { BanzosUtils } from 'src/app/shared/banzos-util';
import { Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';

@Component({
  selector: 'banzos-sala-edicao',
  templateUrl: './salas-edicao.component.html',
  styleUrls: ['./salas-edicao.component.scss'],
  providers: [
  ],
})
export class SalasEdicaoComponent implements OnInit {
  @Input() sala: Sala;
  @ViewChild('closeAddSalaModal') closeAddSalaModal: ElementRef;
  @ViewChild('closeAddInstrumentoModal') closeAddInstrumentoModal: ElementRef;
  @ViewChild('closeRemoveInstrumentoModal') closeRemoveInstrumentoModal: ElementRef;
  @Output() mensagemSucessoSala: EventEmitter<string> = new EventEmitter<string>();

  salaEditarForm: FormGroup;
  salaSelecionado: SalaId;
  tituloEdicaoSala: string;
  labelBotaoEdicaoSala: string;
  isSalaEdicao: boolean;
  isSalaExclusao: boolean;
  tiposConta = [];
  private dbCollection: AngularFirestoreCollection;
  id = null;
  instrumentos: InstrumentoId[] = [];
  instrumentosSala: InstrumentoId[] = []
  comboInstrumentoSala: string;
  comboRemoveInstrumentoSala: string;
  instrumentoSelecionadoSala: InstrumentoId;
  isAdicaoInstrumentoSucesso: boolean = true;
  isExclusaoInstrumentoSucesso: boolean = true;
  mensagemRemocaoInstrumentoSala: string;
  


  constructor(
    private formBuilder: FormBuilder,
    private salasService: SalasService,
    private salasMensagemService: SalasMensagemService,
    private route: ActivatedRoute,
    private _location: Location,
    private selectItemsService: SelectItemsService,
    private readonly afs: AngularFirestore,
    private sharedService: SharedService,
    private banzosUtils: BanzosUtils,
    private db: AngularFireDatabase
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');

            
      this.dbCollection = afs.collection<Sala>('sala');

      if(this.id != null){
        //busca sala  
        this.dbCollection.doc(this.id).get().subscribe(
          a => {
            
            const data = a.data() as SalaId;
            data.id = a.id;
            this.salaSelecionado = data;
            this.salaSelecionado.instrumentos = [];

            this.salaEditarForm.controls['id'].setValue(data.id);
            this.salaEditarForm.controls['nome'].setValue(data.nome);
            this.salaEditarForm.controls['nascimento'].setValue(this.banzosUtils.extrairData(data.nascimento));
            this.salaEditarForm.controls['telefone'].setValue(data.telefone);
            this.salaEditarForm.controls['email'].setValue(data.email);
            this.salaEditarForm.controls['endereco'].setValue(data.endereco);
            this.salaEditarForm.controls['cep'].setValue(data.cep);
            this.salaEditarForm.controls['banco'].setValue(data.banco);
            this.salaEditarForm.controls['tipoConta'].setValue(data.tipoConta);
            this.salaEditarForm.controls['numeroConta'].setValue(data.numeroConta);
            this.salaEditarForm.controls['agencia'].setValue(data.agencia);
            this.salaEditarForm.controls['cpf'].setValue(data.cpf);
            this.salaEditarForm.controls['rg'].setValue(data.rg);
            this.dbCollection.doc(this.id).collection<Instrumento>('instrumentos').snapshotChanges()
            .subscribe(actions => {
              this.salaSelecionado.instrumentos = [];
              actions.map(i => {
                const data = i.payload.doc.data() as InstrumentoId;
                data.id = i.payload.doc.id;
                this.salaSelecionado.instrumentos.push(data);
            })
            }
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

    this.salaEditarForm = this.formBuilder.group({
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
      this.tituloEdicaoSala = "Sala";
      this.labelBotaoEdicaoSala = "Salvar";
      this.isSalaEdicao = true;
    } else {
      this.tituloEdicaoSala = "Adicionar Sala";
      this.labelBotaoEdicaoSala = "Cadastrar"
      this.isSalaEdicao = false;
    }

  }

  enviarAlteracaoSala () {

    const nome = this.salaEditarForm.get('nome').value;
    const nascimento = this.salaEditarForm.get('nascimento').value == null? null:new Date(this.salaEditarForm.get('nascimento').value);
    const telefone = this.salaEditarForm.get('telefone').value;
    const email = this.salaEditarForm.get('email').value;
    const endereco = this.salaEditarForm.get('endereco').value;
    const cep = this.salaEditarForm.get('cep').value;
    const banco = this.salaEditarForm.get('banco').value;
    const tipoConta = this.salaEditarForm.get('tipoConta').value;
    const numeroConta = this.salaEditarForm.get('numeroConta').value;
    const agencia = this.salaEditarForm.get('agencia').value;
    const cpf = this.salaEditarForm.get('cpf').value;
    const rg= this.salaEditarForm.get('rg').value

    this.limparMensagens();
    //Se não for exclusão
    if (!this.isSalaExclusao) {
      //Se for adição
      if(this.id == null){
        this.dbCollection
        .add({nome, nascimento, telefone, email,
          endereco, cep, banco, tipoConta, numeroConta, agencia, cpf, rg} as Sala)
        .then(
            () => {
              this.salasMensagemService.salaMensagemSucesso().next('Sala cadastrado com sucesso');
              this.voltar()
            },
            erro => {
              this.salasMensagemService.salaMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
      // Então é edição
      }else {
        this.dbCollection.doc(this.id)
        .update({nome, nascimento, telefone, email,
          endereco, cep, banco, tipoConta, numeroConta, agencia, cpf, rg})
        .then(
            () => {
              this.salasMensagemService.salaMensagemSucesso().next('Sala salvo com sucesso');
              this.voltar()
            },
            erro => {
              this.salasMensagemService.salaMensagemErro().next('Algum dado está repetido ou inválido');
            }
        );
      }
    //Exclusão
    } else {
      this.dbCollection.doc(this.id).delete()
        .then(
            () => {
              this.salasMensagemService.salaMensagemAlerta().next('Sala excluído com sucesso');
                this.salaEditarForm.reset();
                this.voltar();
            },
            erro => {
              this.salasMensagemService.salaMensagemErro().next('Erro ao excluir o sala');
            }
        );
    }
  }

  excluirSala() {
    this.isSalaExclusao = true;
    this.enviarAlteracaoSala();
  }

  editarSala() {
    this.isSalaExclusao = false;
    this.enviarAlteracaoSala();
  }

  adicionarInstrumentoSala(){
    if (this.salaSelecionado.instrumentos.find(obj => obj.nome == this.comboInstrumentoSala)){
      this.isAdicaoInstrumentoSucesso = false 
    }else{

      this.instrumentoSelecionadoSala = this.instrumentos.find(obj => obj.nome == this.comboInstrumentoSala) as InstrumentoId;
      // console.log(this.comboInstrumentoSala)
      //var sel = document.getElementById('comboInstrumentoSala');
      //console.log(sel. .value)
       this.dbCollection.doc(this.id).collection<Instrumento>('instrumentos')
       .doc(this.instrumentoSelecionadoSala.id)
       .set(this.instrumentoSelecionadoSala)

       this.isAdicaoInstrumentoSucesso = true
    }
  }


  removerInstrumentoSala(){
    console.log("Entrei")
    
    if (this.salaSelecionado.instrumentos.find(obj => obj.nome == this.comboRemoveInstrumentoSala)){
      this.instrumentoSelecionadoSala = this.salaSelecionado.instrumentos.find(obj => obj.nome == this.comboRemoveInstrumentoSala) as InstrumentoId;
      this.dbCollection.doc(this.id).collection<Instrumento>('instrumentos')
      .doc(this.instrumentoSelecionadoSala.id)
      .delete()
      .then(
        () => {this.isExclusaoInstrumentoSucesso = true,
               this.mensagemRemocaoInstrumentoSala = "Instrumento Removido",
               console.log("Excluí")
               },
         (erro) =>  {this.mensagemRemocaoInstrumentoSala = "O sala não tem o instrumento que você está tentando excluir, isso não deveria acontecer... Informe ao Administrador",
                       console.log("Deu p excluir não senhor.")
                     }
      )
    }else{
      this.isExclusaoInstrumentoSucesso = false 
    }
  }

  getInstrumentosSala(){
    return this.salaSelecionado.instrumentos
  }

  fecharAddInstrumentoSala(){
    this.closeAddInstrumentoModal.nativeElement.click();
  }


  fecharRemoveInstrumentoSala(){
    this.closeRemoveInstrumentoModal.nativeElement.click();
  }

  limparMensagens(): any {
     this.salasMensagemService.salaMensagemSucesso().next(null);
     this.salasMensagemService.salaMensagemAlerta().next(null);
     this.salasMensagemService.salaMensagemErro().next("");
  }

  voltar() {
    this._location.back()
  }

  botaoVoltar() {
    this.limparMensagens();
    this._location.back()
  }

  
}
