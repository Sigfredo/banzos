import { Component } from '@angular/core';
import { MatDatepicker } from "@angular/material";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'banzos';

  constructor(db: AngularFirestore) {
  }

}
