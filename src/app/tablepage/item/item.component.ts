import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../types/product';
import {LocalStorageService} from '../../services/localstorageservice';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  product: Product = {};
  id = '';
  stream$: Subscription;

  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {
    this.stream$ = route.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.localStorageService.getItemsID('items', this.id)
      .subscribe(item => {
        this.product = item;
        console.log(this.product)
      });
  }

}
