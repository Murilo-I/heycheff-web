import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { StepRequest } from 'src/app/model/step-request';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
	@Output() stepSalvo = new EventEmitter<StepRequest>();
	@Input() learnReceita: boolean = false;
	@Input() ehCadastro: boolean = false;
	@Input() stepFull: boolean = false;
	@Input() title: string = '';
	@Input() receitaId: number = 0;

	faPlay = faPlay;

	constructor(private modalService: NgbModal) { }

	openXl(content: any) {
		this.modalService.open(content, { size: 'xl' });
	}

	openFullscreen(content: any) {
		this.modalService.open(content, { fullscreen: true });
	}

	pushStep(step: StepRequest) {
		this.stepSalvo.emit(step);
	}
}