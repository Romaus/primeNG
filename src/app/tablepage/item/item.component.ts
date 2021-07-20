import {Component, OnInit} from '@angular/core';
import {Product} from '../../types/product';
import {LocalStorageService} from '../../services/localstorageservice';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ValidatorsDirective } from '../../shared/Customvalidators.directive';
import {DateFormatService} from '../../services/dateformatservice';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  product: Product = {};
  id = '';
  stream1$: Subscription;
  stream2$: Subscription;
  itemForm: any;
  edit = true;

  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private customValidator: ValidatorsDirective,
    private formatdate: DateFormatService,
    private confirmationService: ConfirmationService
  ) {
    this.stream1$ = route.url.subscribe(segments => {
      if (segments[1].path !== 'edit') {
        this.edit = false;
      }
    });
    this.stream2$ = route.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.localStorageService.getItemsID('items', this.id)
      .subscribe(item => {
        if (item) {
          this.product = item;
          this.product.startdate = this.formatdate.convertByMomentToUS(this.product.startdate);
          this.product.enddate = this.formatdate.convertByMomentToUS(this.product.enddate);
        }
        else {
          this.product.id = this.createId();
        }
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

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  saveProduct(): void {
    this.product.startdate = this.formatdate.convertToNumber(this.product.startdate);
    this.product.enddate = this.formatdate.convertToNumber(this.product.enddate);
    if (this.product.name?.trim()) {
      if (this.edit) {
        this.confirmationService.confirm({
          message: 'Save changes in ' + this.product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.localStorageService.updateItemID(this.id, this.product).subscribe(() => {});
            this.router.navigate(['/table']);
          }
        });
      }
      else {
        this.localStorageService.addNewItem(this.product).subscribe(() => {});
        this.router.navigate(['/table']);
      }
    }
  }
}
