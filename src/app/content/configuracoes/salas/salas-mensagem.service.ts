import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable, throwError, Subject, BehaviorSubject } from "rxjs";




@Injectable()
export class SalasMensagemService {

    private _sucesso = new BehaviorSubject<string>(null);
    private _erro = new BehaviorSubject<string>(null);
    private _alerta = new BehaviorSubject<string>(null);

    public salaMensagemSucesso() {
        return this._sucesso;
    }

    public salaMensagemErro(){
        return this._erro;
    }

    public salaMensagemAlerta(){
        return this._alerta;
    }

    setSalasMensagemSucesso(mensagem){
        this._sucesso = mensagem;
    }

    setSalasMensagemAlerta(mensagem){
        this._alerta = mensagem;
    }
}