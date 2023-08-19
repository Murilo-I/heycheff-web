import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MessageService } from 'primeng/api';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Produto } from "src/app/model/produto";
import { ProdutoDesc } from "src/app/model/produto-desc";
import { StepRequest } from "src/app/model/step-request";
import { UnidadeMedida } from "src/app/model/unidade-medida";
import { UploadEvent } from "src/app/model/upload-event";
import { ProdutoService } from "src/app/service/produto.service";
import { StepService } from "src/app/service/step.service";
import { UnidadeMedidaService } from "src/app/service/unidade-medida.service";
import { HttpEvent, HttpResponse } from "@angular/common/http";
import { StepResponse } from "src/app/model/step-response";

@Component({
    selector: 'form-step',
    templateUrl: './form-step.component.html',
    styleUrls: ['./form-step.component.scss'],
    providers: [MessageService]
})
export class FormStepComponent implements OnInit {

    @Output() stepEvent = new EventEmitter<StepRequest>();
    @Input() receitaId: number = 0;
    @Input() stepNumber: number = 0;

    medidas: UnidadeMedida[] = [];
    produtos: ProdutoDesc[] = [];

    video!: File;
    modoPreparo: string = '';
    produtosData: Produto[] = [{ desc: '', unidMedida: '', medida: 0 }];
    formBuilder: FormBuilder = new FormBuilder();

    constructor(private medidaService: UnidadeMedidaService, private messageService: MessageService,
        private produtoService: ProdutoService, private stepService: StepService) { }

    ngOnInit(): void {
        this.medidaService.list(0).subscribe(medidas => this.medidas = medidas);
        this.produtoService.listAll().subscribe(produtos => this.produtos = produtos);
    }

    formStep: FormGroup = this.formBuilder.group({
        ingredientes: this.formBuilder.array(this.produtosData.map(p => this.formBuilder.group(p)))
    });

    get ingredientes(): FormArray {
        return this.formStep.get('ingredientes') as FormArray;
    }

    addProduto(): void {
        this.ingredientes.push(this.formBuilder.group({
            desc: null,
            unidMedida: null,
            medida: null
        }));
    }

    salvarStep() {
        var step = new StepRequest(this.stepNumber, this.produtosData, this.modoPreparo, this.video);
        this.stepService.incluir(step, this.receitaId).subscribe((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.messageService.add({ severity: 'success', summary: 'Step salvo', detail: '' })
            }
        },
            err => this.messageService.add({ severity: 'error', summary: 'Erro ao salvar step', detail: err.toString() }));

        this.stepEvent.emit(step);
    }

    selectVideo(event: UploadEvent) {
        this.video = event.files[0];
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Video selecionado' });
    }
}