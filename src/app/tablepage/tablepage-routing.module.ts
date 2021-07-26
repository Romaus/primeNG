import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {TablepageComponent} from './tablepage.component';
import {ItemComponent} from './item/item.component';
import {UserInfoGuard} from '../guards/user-info.guard';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TablepageComponent,
        canActivate: [UserInfoGuard],
      },
      {
        path: 'addnewitem',
        component: ItemComponent
      },
      {
        path: 'edit/:id',
        component: ItemComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class TablepageRoutingModule { }
