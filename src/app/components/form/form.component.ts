import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ReceitaRequest } from 'src/app/model/receita-request';
import { Tag } from 'src/app/model/tag';
import { ReceitaService } from 'src/app/service/receita.service';
import { TagService } from 'src/app/service/tag.service';

@Component({
    selector: 'form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [MessageService]
})
export class FormComponent implements OnInit {
    uploadedFiles: File[] = [];
    selectedTags: string[] = [];
    titulo: string = '';

    tags: Tag[] = [];

    constructor(private messageService: MessageService,
        private tagService: TagService, private receitaService: ReceitaService) { }

    ngOnInit(): void {
        this.tagService.listAll().subscribe(tags => this.tags = tags);
    }

    onUpload(event: any) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        const tagsRequest = this.tags.filter(value => this.selectedTags.includes(value.tag));
        const receita = new ReceitaRequest(this.titulo, tagsRequest);

        this.receitaService.incluir(receita, this.uploadedFiles[0]).subscribe((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.messageService.add({ severity: 'success', summary: 'Receita salva', detail: '' });
            }
        },
            err => this.messageService.add({ severity: 'error', summary: 'Erro ao salvar receita', detail: err.toString() }));
    }
}