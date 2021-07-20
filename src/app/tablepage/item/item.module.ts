import { NgModule } from '@angular/core';
import { ItemComponent } from './item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../../app-routing.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  imports: [
    ReactiveFormsModule,
    InputMaskModule,
    InputNumberModule,
    RadioButtonModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CommonModule,
    AppRoutingModule,
    ConfirmDialogModule
  ],
    declarations: [ItemComponent],
    bootstrap: [],
    exports: [
        ItemComponent
    ],
    providers: []
})

export class ItemModule { }
