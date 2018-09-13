import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Aluno } from "./aluno";
import { Observable, throwError, Subject, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";






@Injectable()
export class AlunosMensagemService {

    // private mensagemSucesso = "";
    // private mensagemAlerta = "";
    // private mensagemErro = "";

    private _sucesso = new BehaviorSubject<string>(null);
    private _erro = new BehaviorSubject<string>(null);
    private _alerta = new BehaviorSubject<string>(null);

    public alunoMensagemSucesso() {
        return this._sucesso;
    }

    public alunoMensagemErro(){
        return this._erro;
    }

    public alunoMensagemAlerta(){
        return this._alerta;
    }

    setAlunoMensagemSucesso(mensagem){
        this._sucesso = mensagem;
    }

    setAlunoMensagemAlerta(mensagem){
        this._alerta = mensagem;
    }
}