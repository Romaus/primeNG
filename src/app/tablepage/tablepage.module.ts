import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TablepageComponent } from './tablepage.component';
import { LocalStorageService } from '../services/localstorageservice';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ToolbarModule} from 'primeng/toolbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {InputMaskModule} from 'primeng/inputmask';
import {DateFormatService} from '../services/dateformatservice';
import {CalendarModule} from 'primeng/calendar';
import {UnderscoreReplacePipe} from '../shared/underscoreReplace.pipe';
import {TooltipModule} from 'primeng/tooltip';
import {ItemModule} from './item/item.module';
import {TablepageRoutingModule} from './tablepage-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        DialogModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        InputTextModule,
        ToolbarModule,
        FormsModule,
        RadioButtonModule,
        ConfirmDialogModule,
        ToastModule,
        InputMaskModule,
        CalendarModule,
        TooltipModule,
        ItemModule,
        TablepageRoutingModule
    ],
  declarations: [ TablepageComponent, UnderscoreReplacePipe ],
  bootstrap:    [ TablepageComponent ],
  providers: [LocalStorageService, DateFormatService, MessageService, ConfirmationService]
})

export class TablepageModule { }
