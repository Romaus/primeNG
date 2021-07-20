import { NgModule } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {CommonModule} from '@angular/common';

import { MainpageComponent } from './mainpage.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MainpageComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule
  ],
  providers: [],
  exports: [MainpageComponent]
})
export class MainpageModule { }
