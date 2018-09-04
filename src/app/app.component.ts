import { Component } from '@angular/core';
import { MatDatepicker } from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'banzos';
  picker: MatDatepicker<string>;
}
