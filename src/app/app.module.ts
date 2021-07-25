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
import {MessageService} from 'primeng-lts/api';
import {ToastModule} from 'primeng/toast';

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
  providers: [LocalStorageService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
