import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AlunosService } from "../alunos.service";

@Component({
  selector: 'banzos-aluno-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent implements OnInit {

  alunoEdicaoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunosService
  ) { }

  ngOnInit(): void {
    this.alunoEdicaoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      instrumento: ['', Validators.required],
      nascimento: ['', Validators.required]
    });

  }

  enviarEdicao () {
    
    const nome = this.alunoEdicaoForm.get('nome').value;
    const instrumento = this.alunoEdicaoForm.get('instrumento').value;
    const nascimento = this.alunoEdicaoForm.get('nascimento').value;

    this.alunoService
        .editarAluno({nome, instrumento, nascimento})
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
