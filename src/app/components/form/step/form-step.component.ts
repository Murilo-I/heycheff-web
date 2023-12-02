import { HttpEvent, HttpResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from 'primeng/api';
import { Produto } from "src/app/model/produto";
import { StepRequest } from "src/app/model/step-request";
import { ProdutoService } from "src/app/service/produto.service";
import { StepService } from "src/app/service/step.service";
import { UnidadeMedidaService } from "src/app/service/unidade-medida.service";

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
    @Input() modal!: NgbModalRef;

    medidas: string[] = [];
    produtos: string[] = [];

    video!: File;
    chooseLabel: string = 'Adicionar Vídeo';
    modoPreparo: string = '';
    produtosData: Produto[] = [{ desc: '', unidMedida: 'unidade', medida: 1 }];
    formBuilder: FormBuilder = new FormBuilder();

    constructor(private medidaService: UnidadeMedidaService, private messageService: MessageService,
        private produtoService: ProdutoService, private stepService: StepService) { }

    ngOnInit(): void {
        this.medidaService.list(0).subscribe(medidas => medidas.map(unidadeMedida => this.medidas.push(unidadeMedida.descricao)));
        this.produtoService.listAll().subscribe(produtos => produtos.map(prod => this.produtos.push(prod.produtoDesc)));
    }

    formStep: FormGroup = this.formBuilder.group({
        ingredientes: this.formBuilder.array(this.produtosData.map(p => this.formBuilder.group(p)))
    });

    get ingredientes(): FormArray {
        return this.formStep.get('ingredientes') as FormArray;
    }

    addProduto(): void {
        this.ingredientes.push(this.formBuilder.group({
            desc: '',
            unidMedida: 'unidade',
            medida: 1
        }));
    }

    salvarStep() {
        var produtos = this.ingredientes.getRawValue() as Produto[];
        var step = new StepRequest(this.stepNumber, produtos, this.modoPreparo, this.video);
        this.stepService.incluir(step, this.receitaId).subscribe((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.messageService.add({ severity: 'success', summary: 'Step salvo', detail: '' })
            }
        },
            err => this.messageService.add({ severity: 'error', summary: 'Erro ao salvar step', detail: err.toString() }));

        this.stepEvent.emit(step);
        this.modal.close("Close step");
    }

    selectVideo(event: any) {
        this.video = event.target.files[0];
        this.chooseLabel = this.video.name;
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Video selecionado' });
    }
}