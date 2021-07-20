import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {MainpageComponent} from './mainpage/mainpage.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'mainpage',
        component: MainpageComponent
      },
      {
        path: 'table',
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
