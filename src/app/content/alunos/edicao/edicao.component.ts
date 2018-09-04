import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AlunosService } from "../alunos.service";
import * as moment from 'moment';

@Component({
  selector: 'banzos-aluno-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss'],
  providers: [
  ],
})
export class EdicaoComponent implements OnInit {
  

  alunoEdicaoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunosService,

  ) { }

  ngOnInit(): void {
    moment.locale('pt-BR');
    
    this.alunoEdicaoForm = this.formBuilder.group({
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

  }

  enviarEdicao () {
    
    const nome = this.alunoEdicaoForm.get('nome').value;
    const instrumento = this.alunoEdicaoForm.get('instrumento').value;
    const inicioPlano = moment(this.alunoEdicaoForm.get('inicioPlano').value).format('L');
    //const inicioPlano = this.alunoEdicaoForm.get('inicioPlano').value;
    //console.log(transform(new Date(), "MMM/dd/yyyy"));
    //console.log(this.alunoEdicaoForm.get('inicioPlano').value.format('DD/MM/YYYY'));
    const fimPlano = this.alunoEdicaoForm.get('fimPlano').value;
    const nascimento = this.alunoEdicaoForm.get('nascimento').value;
    const telefone = this.alunoEdicaoForm.get('telefone').value;
    const endereco = this.alunoEdicaoForm.get('endereco').value;
    const cep = this.alunoEdicaoForm.get('cep').value;
    const nomeResponsavel = this.alunoEdicaoForm.get('nomeResponsavel').value;
    const cpfResponsavel = this.alunoEdicaoForm.get('cpfResponsavel').value;
    const rgResponsavel = this.alunoEdicaoForm.get('rgResponsavel').value

    this.alunoService
        .editarAluno({nome, instrumento, inicioPlano, fimPlano ,nascimento, telefone, 
          endereco, cep, nomeResponsavel, cpfResponsavel, rgResponsavel})
        .subscribe(
            () => {
                alert('Aluno cadastrado com sucesso');
                this.alunoEdicaoForm.reset();
            },
            erro => {
                this.alunoEdicaoForm.reset();
                alert('Algum dado está repetido ou inválido');
            }
        );
}

}
