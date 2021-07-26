import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Table} from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { Product } from '../types/product';
import { ValidatorsDirective } from '../shared/Customvalidators.directive';
import { LocalStorageService } from '../services/localstorageservice';
import { DateFormatService } from '../services/dateformatservice';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-tablepage',
  templateUrl: './tablepage.component.html',
  styleUrls: ['./tablepage.component.scss']
})

export class TablepageComponent implements OnInit{

  productDialog!: boolean;
  products: Product[] = [];
  product: Product = {};
  selectedProducts: any;
  itemForm: any;
  today = new Date(Date.now());
  category: any;
  readonly !: string;

  @ViewChild('dt') table?: Table;

  constructor(
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    public formatdate: DateFormatService,
    private confirmationService: ConfirmationService,
    private customValidator: ValidatorsDirective,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.readonly = data.readonly;
    });
    this.localStorageService.getItems('items')
      .subscribe(
        items => {
          this.products = items;
          this.category = this.products
            .map(el => ({value: el.category, label: el.category}))
            .filter((
              v,
              i,
              a) => a.findIndex(t => (t.value === v.value )) === i);
          // this.messageService.add({
          //   severity: 'success',
          //   summary: 'Successful',
          //   detail: 'Data in table Updated',
          //   life: 3000});
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Data not received',
            life: 3000});
        },
      );
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

  filterDate(value: any): void {
    // @ts-ignore
    this.table.filter(Date.parse(value), 'startdate', 'gte');
  }

  saveToStorage(): void {
    this.localStorageService.updateItems('items', this.products)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Data saved to Storage',
            life: 3000});
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Data not saved',
            life: 3000});
        }
      );
  }

  deleteSelectedProducts(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000});
      }
    });
  }

  deleteProduct(product: Product): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000});
      }
    });
  }

  convertNameToSearch(value: string): string{
    return value.replace(/ /g, '_');
  }
}
