import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TablepageComponent } from './tablepage.component';
import { LocalStorageService } from '../services/localstorageservice';

import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {InputMaskModule} from 'primeng/inputmask';
import {DateFormatService} from '../services/dateformatservice';
import {ValidatorsDirective} from '../shared/Customvalidators.directive';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        TableModule,
        DialogModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        InputTextModule,
        HttpClientModule,
        ToolbarModule,
        RatingModule,
        FormsModule,
        RadioButtonModule,
        InputNumberModule,
        ConfirmDialogModule,
        InputTextareaModule,
        ToastModule,
        InputMaskModule,
        CalendarModule
    ],
  declarations: [ TablepageComponent ],
  bootstrap:    [ TablepageComponent ],
  providers: [LocalStorageService, DateFormatService, MessageService, ConfirmationService, ValidatorsDirective]
})

export class TablepageModule { }
