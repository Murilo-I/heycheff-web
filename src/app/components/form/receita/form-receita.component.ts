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
    thumb: File[] = [];
    selectedTags: string[] = [];
    steps: StepRequest[] = [];
    titulo: string = '';

    tags: Tag[] = [];

    constructor(private messageService: MessageService,
        private tagService: TagService, private receitaService: ReceitaService) { }

    ngOnInit(): void {
        this.tagService.listAll().subscribe(tags => this.tags = tags);
    }

    addStep(step: StepRequest) {
        this.steps.push(step);
        console.log("step salvo");
    }

    uploadReceita(event: UploadEvent) {
        for (let file of event.files) {
            this.thumb.push(file);
        }

        const tagsRequest = this.tags.filter(value => this.selectedTags.includes(value.tag));
        const receita = new ReceitaRequest(this.titulo, tagsRequest);

        this.receitaService.incluir(receita, this.thumb[0]).subscribe((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.messageService.add({ severity: 'success', summary: 'Receita salva', detail: '' });
            }
        },
            err => this.messageService.add({ severity: 'error', summary: 'Erro ao salvar receita', detail: err.toString() }));
    }
}