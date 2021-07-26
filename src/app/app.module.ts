import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageModule } from './mainpage/mainpage.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TabMenuModule} from 'primeng/tabmenu';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {LocalStorageService} from './services/localstorageservice';
import {ConfirmationService, MessageService} from 'primeng-lts/api';
import {ToastModule} from 'primeng/toast';
import {DateFormatService} from './services/dateformatservice';
import {ValidatorsDirective} from './shared/Customvalidators.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainpageModule,
    TabMenuModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    ToastModule
  ],
  providers: [LocalStorageService, MessageService, DateFormatService, ConfirmationService, ValidatorsDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
