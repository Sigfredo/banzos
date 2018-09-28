import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable, throwError, Subject, BehaviorSubject } from "rxjs";




@Injectable()
export class DisciplinasMensagemService {

    private _sucesso = new BehaviorSubject<string>(null);
    private _erro = new BehaviorSubject<string>(null);
    private _alerta = new BehaviorSubject<string>(null);

    public disciplinaMensagemSucesso() {
        return this._sucesso;
    }

    public disciplinaMensagemErro(){
        return this._erro;
    }

    public disciplinaMensagemAlerta(){
        return this._alerta;
    }

    setDisciplinasMensagemSucesso(mensagem){
        this._sucesso = mensagem;
    }

    setDisciplinasMensagemAlerta(mensagem){
        this._alerta = mensagem;
    }
}