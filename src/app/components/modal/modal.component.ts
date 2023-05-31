import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
	@Input() learnReceita: boolean = false;
	@Input() ehCadastro: boolean = false;
	@Input() stepFull: boolean = false;
	@Input() title: string = '';

	faPlay = faPlay;

	constructor(private modalService: NgbModal) { }

	openXl(content: any) {
		this.modalService.open(content, { size: 'xl' });
	}

	openFullscreen(content: any) {
		this.modalService.open(content, { fullscreen: true });
	}
}