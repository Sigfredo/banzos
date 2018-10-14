import { Injectable } from "@angular/core";
import { AngularFirestore, QuerySnapshot, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';


@Injectable()
export class SharedService {

    constructor(private db: AngularFirestore){

    }

    getInstrumentos(){
       return this.db.collection('instrumento').snapshotChanges()
    }

}