import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Produto } from "src/app/model/produto";
import { ProdutoDesc } from "src/app/model/produto-desc";
import { StepRequest } from "src/app/model/step-request";
import { UnidadeMedida } from "src/app/model/unidade-medida";
import { UploadEvent } from "src/app/model/upload-event";
import { ProdutoService } from "src/app/service/produto.service";
import { UnidadeMedidaService } from "src/app/service/unidade-medida.service";

@Component({
    selector: 'form-step',
    templateUrl: './form-step.component.html',
    styleUrls: ['./form-step.component.scss'],
})
export class FormStepComponent implements OnInit {

    @Output() stepEvent = new EventEmitter<StepRequest>();

    medidas: UnidadeMedida[] = [];
    produtos: ProdutoDesc[] = [];

    video!: File;
    modoPreparo: string = '';
    produtosData: Produto[] = [{ desc: '', unidMedida: '', medida: 0 }];
    formBuilder: FormBuilder = new FormBuilder();

    constructor(private medidaService: UnidadeMedidaService,
        private produtoService: ProdutoService) { }

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
        this.stepEvent.emit(new StepRequest(1, this.produtosData, this.modoPreparo, this.video));
    }

    selectVideo(event: UploadEvent) {
        this.video = event.files[0];
    }
}