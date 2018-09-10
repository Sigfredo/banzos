import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AlunosService } from "../alunos.service";
import * as moment from 'moment';
import { ViewChild, ElementRef} from '@angular/core';
import { Aluno } from '../aluno';
import { ActivatedRoute } from '@angular/router';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

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

  alunoEditarForm: FormGroup;
  alunoSelecionado: Aluno;

  constructor(
    private formBuilder: FormBuilder,
    private alunosService: AlunosService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void { 
    moment.locale('pt-BR');
   
    this.alunoEditarForm = this.formBuilder.group({
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

    this.buscarAluno().subscribe(retorno =>
      console.log("Retornei: "+retorno)
    )

  }

  enviarEditar () {
    
    const nome = this.alunoEditarForm.get('nome').value;
    const instrumento = this.alunoEditarForm.get('instrumento').value;
    const inicioPlano = moment(this.alunoEditarForm.get('inicioPlano').value).format('L');
    const fimPlano = moment(this.alunoEditarForm.get('fimPlano').value).format('L');
    const nascimento = moment(this.alunoEditarForm.get('nascimento').value).format('L');
    const telefone = this.alunoEditarForm.get('telefone').value;
    const endereco = this.alunoEditarForm.get('endereco').value;
    const cep = this.alunoEditarForm.get('cep').value;
    const nomeResponsavel = this.alunoEditarForm.get('nomeResponsavel').value;
    const cpfResponsavel = this.alunoEditarForm.get('cpfResponsavel').value;
    const rgResponsavel = this.alunoEditarForm.get('rgResponsavel').value

    this.alunosService
        .editarAluno({nome, instrumento, inicioPlano, fimPlano ,nascimento, telefone, 
          endereco, cep, nomeResponsavel, cpfResponsavel, rgResponsavel})
        .subscribe(
            () => {
                alert('Aluno cadastrado com sucesso');
                this.alunoEditarForm.reset();
                this.closeAddExpenseModal.nativeElement.click();
            },
            erro => {
                this.alunoEditarForm.reset();
                alert('Algum dado está repetido ou inválido');
            }
        );
  }

  buscarAluno () {
    const id = +this.route.snapshot.paramMap.get('id');

    return this.alunosService.getAluno(id)
    .pipe(
        map(aluno => {
          this.aluno = aluno;
          if(id != 0){
            this.alunoEditarForm.controls['nome'].setValue(aluno.nome);
            this.alunoEditarForm.controls['instrumento'].setValue(aluno.instrumento);
            this.alunoEditarForm.controls['inicioPlano'].setValue(aluno.inicioPlano);
        
          
        })
    );

    // console.log("Achei o aluno id: " + id);
  
    // console.log(this.aluno);
    // this.alunoSelecionado = this.alunosService
    // .getAluno(id)
    // console.log(this.alunoSelecionado)
    // document.getElementById("editar-aluno-button").click();
  }

}
