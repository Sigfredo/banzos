import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, Subject, BehaviorSubject } from "rxjs";






@Injectable()
export class ConfiguracoesMensagemService {

    // private mensagemSucesso = "";
    // private mensagemAlerta = "";
    // private mensagemErro = "";

    private _sucesso = new BehaviorSubject<string>(null);
    private _erro = new BehaviorSubject<string>(null);
    private _alerta = new BehaviorSubject<string>(null);

    public configuracoesMensagemSucesso() {
        return this._sucesso;
    }

    public configuracoesMensagemErro(){
        return this._erro;
    }

    public configuracoesMensagemAlerta(){
        return this._alerta;
    }

    setConfiguracoesMensagemSucesso(mensagem){
        this._sucesso = mensagem;
    }

    setConfiguracoesMensagemAlerta(mensagem){
        this._alerta = mensagem;
    }
}