import { Component, Input, OnInit } from "@angular/core";
import { ReceitaModal } from "src/app/model/receita-modal";
import { StepResponse } from "src/app/model/step-response";
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
  steps: StepResponse[] = [];
  currentStep: StepResponse | undefined;
  videos: string[] = [];
  currentVideo: string | undefined;
  index: number = 0;

  constructor(private receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.receitaService.loadModal(this.receitaId).subscribe(receita => {
      this.receita = receita;
      this.steps = receita.steps;
      this.steps.forEach(step => this.videos.push(environment.BaseUrl + step.path));
      this.currentStep = this.steps.at(this.index);
      this.currentVideo = this.videos.at(this.index);
    });
  }

  changeStep(index: number) {
    this.currentStep = this.steps.at(index);
    this.currentVideo = this.videos.at(index);
    this.index = index;
  }
}