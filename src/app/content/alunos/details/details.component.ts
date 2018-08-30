import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../data.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  aluno$: Object;

  constructor(private data: DataService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.aluno$ = params.id)
  }

  ngOnInit() {
    this.data.getAluno(this.aluno$).subscribe(
      data => this.aluno$ = data
    )
  }

}
