import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DragDropModule } from 'primeng/dragdrop';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormReceitaComponent } from '../components/form/receita/form-receita.component';
import { FormStepComponent } from '../components/form/step/form-step.component';
import { ModalComponent } from '../components/modal/modal.component';
import { VideoReceitaComponent } from '../components/video/video-receita.component';
import { FeedComponent } from './feed.component';

@NgModule({
  declarations: [
    ModalComponent,
    FormReceitaComponent,
    FormStepComponent,
    VideoReceitaComponent,
    FeedComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    CardModule,
    FileUploadModule,
    CheckboxModule,
    ToastModule,
    InputTextModule,
    OrderListModule,
    DragDropModule,
    ButtonModule,
    InputTextareaModule,
    MultiSelectModule,
    TagModule
  ],
  exports: [ModalComponent],
})
export class FeedModule { }
