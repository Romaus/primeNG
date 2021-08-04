import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {TablepageComponent} from './tablepage.component';
import {ItemComponent} from './item/item.component';
import {TabledataResolver} from '../resolvers/tabledata.resolver';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TablepageComponent,
        resolve: { tablepage: TabledataResolver }
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
