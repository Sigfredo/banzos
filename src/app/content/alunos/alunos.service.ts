import { Injectable } from "@angular/core";
import { Aluno } from "./aluno";
import { AngularFirestore, QuerySnapshot, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';


@Injectable()
export class AlunosService {

    aluno: Aluno;

    constructor(private db: AngularFirestore){

                }

    getAlunos(){
       return this.db.collection('aluno').snapshotChanges()
    }

    getAluno(id:string) {
        return this.db.collection("aluno").doc(id).get()
    }

    editarAluno(aluno) {
        if (aluno.id === ""){    
            return this.db.collection("aluno").add(aluno)
            .then(
                () => {return null}
            )
        } else {
            return this.db.collection("aluno").doc(aluno.id).set(aluno.get())
        }
    }

    excluirAluno(id) {
        return this.db.collection("aluno").doc(id).delete();
    }

}