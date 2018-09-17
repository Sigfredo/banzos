import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable, throwError, Subject, BehaviorSubject } from "rxjs";




@Injectable()
export class ProfessoresMensagemService {

    private _sucesso = new BehaviorSubject<string>(null);
    private _erro = new BehaviorSubject<string>(null);
    private _alerta = new BehaviorSubject<string>(null);

    public professorMensagemSucesso() {
        return this._sucesso;
    }

    public professorMensagemErro(){
        return this._erro;
    }

    public professorMensagemAlerta(){
        return this._alerta;
    }

    setProfessoresMensagemSucesso(mensagem){
        this._sucesso = mensagem;
    }

    setProfessoresMensagemAlerta(mensagem){
        this._alerta = mensagem;
    }
}