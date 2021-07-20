import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TablepageComponent} from './tablepage/tablepage.component';
import {MainpageComponent} from './mainpage/mainpage.component';
import {ItemComponent} from './tablepage/item/item.component';

const routes: Routes = [
  {
    path: 'table',
    component: TablepageComponent,
  },
  {
    path: 'mainpage',
    component: MainpageComponent,
  },
  {
    path: 'table/edit/:id',
    component: ItemComponent
  },
  {
    path: 'table/addnewitem',
    component: ItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
