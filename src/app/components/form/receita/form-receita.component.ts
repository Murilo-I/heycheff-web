import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { ReceitaRequest } from 'src/app/model/receita-request';
import { ReceitaStatus } from 'src/app/model/receita-status';
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
    @Input() modal!: NgbModalRef;

    thumb!: File;
    selectedTags: string[] = [];
    steps: StepRequest[] = [];
    titulo: string = '';
    stepEnabled: boolean = false;
    receitaId: number = 0;
    videoUrl: any[] = [];
    thumbUrl!: any;

    tags: Tag[] = [];

    constructor(private messageService: MessageService, private router: Router,
        private tagService: TagService, private receitaService: ReceitaService) { }

    ngOnInit(): void {
        this.tagService.listAll().subscribe(tags => this.tags = tags);
    }

    selectThumb(event: UploadEvent) {
        this.thumb = event.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(this.thumb);
        reader.onload = (event) => {
            this.thumbUrl = event.target?.result;
        }
    }

    uploadReceita() {
        const tagsRequest = this.tags.filter(value => this.selectedTags.includes(value.tag));
        const receita = new ReceitaRequest(this.titulo, tagsRequest);

        this.receitaService.incluir(receita, this.thumb).subscribe((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.messageService.add({ severity: 'success', summary: 'Receita salva', detail: '' });
                this.stepEnabled = true;
                this.receitaId = event.body.seqId;
            }
        },
            err => this.messageService.add({
                severity: 'error', summary: 'Erro ao salvar receita',
                detail: "Não esqueça de adicionar a thumb!"
            })
        );
    }

    addStep(step: StepRequest) {
        this.steps = [...this.steps, step];
        let reader = new FileReader();

        this.getVideoCover(step.video).then(cover => {
            if (cover != null) {
                reader.readAsDataURL(cover);
                reader.onload = (event) => {
                    this.videoUrl = [...this.videoUrl, event.target?.result];
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
                setTimeout(() => { video.currentTime = 0 }, 200);

                video.addEventListener('seeked', () => {
                    var canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    var context = canvas.getContext('2d');
                    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
                    context?.canvas.toBlob(blob => { resolve(blob) }, 'image/jpeg', 1);
                });
            });
        });
    }

    finishForm() {
        this.receitaService.atualizaStatus(new ReceitaStatus(true), this.receitaId)
            .pipe(finalize(() => {
                if (this.router.url.includes("home")) this.router.navigate(['feed']);
                else this.router.navigate(['home'])
                this.modal.close("Close Form");
            }))
            .subscribe((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.messageService.add({ severity: 'success', summary: 'Cadastro finalizado', detail: '' });
                }
            },
                err => this.messageService.add({ severity: 'error', summary: 'Erro ao finalizar cadastro', detail: err.toString() }));
    }
}