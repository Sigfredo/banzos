import { Injectable } from "@angular/core";
import { AngularFirestore, QuerySnapshot, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { TipoConta } from "./select-items/tipo-conta";


@Injectable()
export class SharedService {

    constructor(
        private db: AngularFirestore,
        private tiposConta: TipoConta
        ){

    }

    getInstrumentos(){
       return this.db.collection('instrumento').snapshotChanges()
    }

    getTiposConta(){
        return this.tiposConta.getTipoContas();
    }

}