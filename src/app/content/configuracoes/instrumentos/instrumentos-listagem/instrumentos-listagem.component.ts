import { Component, Input, OnInit } from "@angular/core";
import { ConfiguracoesService } from "../../configuracoes.service";

@Component({
  selector: 'banzos-instrumentos-listagem',
  templateUrl: './instrumentos-listagem.component.html',
  styleUrls: ['./instrumentos-listagem.component.scss']
})
export class InstrumentosListagemComponent implements OnInit{

  instrumentos = [];

  constructor(
    private configuracoesService: ConfiguracoesService
  ){

  }

  ngOnInit(): void {
    
    this.configuracoesService.buscarInstrumentos()
    .subscribe(
      (result) => this.instrumentos = result
    );

  }
}
