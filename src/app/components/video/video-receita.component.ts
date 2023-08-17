import { Component, OnInit } from "@angular/core";
import { ReceitaService } from "src/app/service/receita.service";

@Component({
  selector: 'video-receita',
  templateUrl: './video-receita.component.html',
  styleUrls: ['./video-receita.component.scss']
})
export class VideoReceitaComponent implements OnInit {

  constructor(private receitaService: ReceitaService) { }

  ngOnInit(): void {
  }
}