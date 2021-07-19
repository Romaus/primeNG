import {Component, OnInit} from '@angular/core';
import {Product} from '../../types/product';
import {LocalStorageService} from '../../services/localstorageservice';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ValidatorsDirective } from '../../shared/Customvalidators.directive';
import {DateFormatService} from '../../services/dateformatservice';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  product: Product = {};
  id = '';
  stream$: Subscription;
  itemForm: any;

  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private customValidator: ValidatorsDirective,
    public formatdate: DateFormatService
  ) {
    this.stream$ = route.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.localStorageService.getItemsID('items', this.id)
      .subscribe(item => {
        this.product = item;
        this.product.startdate = this.formatdate.convertByMomentToUS(this.product.startdate);
        this.product.enddate = this.formatdate.convertByMomentToUS(this.product.enddate);
        console.log(this.product);
      });

    this.itemForm = new FormGroup({
      name: new FormControl(this.product.name, [Validators.required]),
      email: new FormControl(this.product.email, [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl(this.product.phone, [
        Validators.required,
        this.customValidator.phoneCodeBelarusValidator()
      ]),
      description: new FormControl(this.product.description, [
        Validators.required,
        Validators.minLength(20)
      ]),
      category: new FormControl(this.product.category),
      price: new FormControl(this.product.price),
      quantity: new FormControl(this.product.quantity),
      startdate: new FormControl(this.product.startdate, [
        Validators.required,
        this.customValidator.dateValidator()
      ]),
      enddate: new FormControl(this.product.enddate, [
        Validators.required,
        this.customValidator.dateValidator()
      ])
    });
  }
}
