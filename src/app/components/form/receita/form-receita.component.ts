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
    url: any = '';

    tags: Tag[] = [];

    constructor(private messageService: MessageService,
        private tagService: TagService, private receitaService: ReceitaService) { }

    ngOnInit(): void {
        this.tagService.listAll().subscribe(tags => this.tags = tags);
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
                this.receitaId = event.body.id;
            }
        },
            err => this.messageService.add({ severity: 'error', summary: 'Erro ao salvar receita', detail: err.toString() }));
    }

    addStep(step: StepRequest) {
        this.steps = [...this.steps, step];
        let reader = new FileReader();

        this.getVideoCover(step.video).then(cover => {
            if (cover != null) {
                reader.readAsDataURL(cover);
                reader.onload = (event) => {
                    this.url = event.target?.result;
                }
            }
        });
    }

    getVideoCover(file: File): Promise<Blob | null> {
        return new Promise((resolve, reject) => {
            var video = document.createElement('video');
            video.setAttribute('src', URL.createObjectURL(file));
            video.load();
            video.addEventListener('error', exception => {
                reject("error when loading video file: " + exception);
            });

            video.addEventListener('loadedmetadata', () => {
                setTimeout(() => { }, 200);

                video.addEventListener('seeked', () => {
                    var canvas = document.createElement('canvas');
                    canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                    canvas.toBlob(blob => { resolve(blob) }, 'image/jpeg', .75);
                });
            });
        });
    }
}