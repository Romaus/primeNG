import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {MainpageComponent} from './mainpage/mainpage.component';
import {TablepageComponent} from './tablepage/tablepage.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'mainpage',
        component: MainpageComponent
      },
      {
        path: 'table',
        data : {readonly : false},
        loadChildren: () => import('./tablepage/tablepage.module').then( m => m.TablepageModule )
      },
      {
        path: 'tableguest',
        data : {readonly : true},
        component: TablepageComponent
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
      ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
