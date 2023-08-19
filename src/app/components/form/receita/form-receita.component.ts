import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ReceitaRequest } from 'src/app/model/receita-request';
import { StepRequest } from 'src/app/model/step-request';
import { Tag } from 'src/app/model/tag';
import { UploadEvent } from 'src/app/model/upload-event';
import { ReceitaService } from 'src/app/service/receita.service';
import { TagService } from 'src/app/service/tag.service';

@Component({
    selector: 'form-receita',
    templateUrl: './form-receita.component.html',
    styleUrls: ['./form-receita.component.scss'],
    providers: [MessageService]
})
export class FormReceitaComponent implements OnInit {
    thumb!: File;
    selectedTags: string[] = [];
    steps: StepRequest[] = [];
    titulo: string = '';
    stepEnabled: boolean = false;
    receitaId: number = 0;

    tags: Tag[] = [];

    constructor(private messageService: MessageService,
        private tagService: TagService, private receitaService: ReceitaService) { }

    ngOnInit(): void {
        this.tagService.listAll().subscribe(tags => this.tags = tags);
    }

    addStep(step: StepRequest) {
        this.steps.push(step);
        console.log("step salvo");
        console.log(step);
    }

    selectThumb(event: UploadEvent) {
        this.thumb = event.files[0];
    }

    uploadReceita() {
        const tagsRequest = this.tags.filter(value => this.selectedTags.includes(value.tag));
        const receita = new ReceitaRequest(this.titulo, tagsRequest);

        this.receitaService.incluir(receita, this.thumb).subscribe((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.messageService.add({ severity: 'success', summary: 'Receita salva', detail: '' });
                this.stepEnabled = true;
                this.receitaId =  event.body.id;
            }
        },
            err => this.messageService.add({ severity: 'error', summary: 'Erro ao salvar receita', detail: err.toString() }));
    }
}