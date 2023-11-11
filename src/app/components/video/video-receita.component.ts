import { Component, Input, OnInit } from "@angular/core";
import { ReceitaModal } from "src/app/model/receita-modal";
import { ReceitaService } from "src/app/service/receita.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'video-receita',
  templateUrl: './video-receita.component.html',
  styleUrls: ['./video-receita.component.scss']
})
export class VideoReceitaComponent implements OnInit {

  @Input() receitaId: number = 0;
  receita!: ReceitaModal;
  videos: string[] = [];
  index: number = 0;

  constructor(private receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.receitaService.loadModal(this.receitaId).subscribe(receita => {
      this.receita = receita;
      receita.steps.forEach(step => this.videos.push(environment.BaseUrl + step.path));
    });
  }

  nextStep() {
    this.index++;
  }

  previousStep() {
    this.index--;
  }
}