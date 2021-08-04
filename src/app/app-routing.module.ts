import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {MainpageComponent} from './mainpage/mainpage.component';
import {TablepageComponent} from './tablepage/tablepage.component';
import {UserInfoGuard} from './guards/user-info.guard';


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
        canActivate: [UserInfoGuard],
        loadChildren: () => import('./tablepage/tablepage.module').then( m => m.TablepageModule )
      },
      {
        path: 'tableguest',
        data : {readonly : true},
        loadChildren: () => import('./tablepage/tablepage.module').then( m => m.TablepageModule )
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
