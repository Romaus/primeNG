import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Table} from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { Product } from '../types/product';
import { ValidatorsDirective } from '../shared/Customvalidators.directive';
import { LocalStorageService } from '../services/localstorageservice';
import { DateFormatService } from '../services/dateformatservice';


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
  submitted!: boolean;
  itemForm: any;
  today = new Date(Date.now());
  category: any;

  @ViewChild('dt') table?: Table;

  constructor(
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    public formatdate: DateFormatService,
    private confirmationService: ConfirmationService,
    private customValidator: ValidatorsDirective) { }

  ngOnInit(): void {
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
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Data received',
            life: 3000});
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

  openNew(): void{
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
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

  editProduct(product: Product): void {
    this.product = {...product};
    this.product.startdate = this.formatdate.convertByMomentToUS(this.product.startdate);
    this.product.enddate = this.formatdate.convertByMomentToUS(this.product.enddate);
    this.productDialog = true;
    console.log(this.product.id);
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

  hideDialog(): void {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct(): void {
    this.submitted = true;
    this.product.startdate = this.formatdate.convertToNumber(this.product.startdate);
    this.product.enddate = this.formatdate.convertToNumber(this.product.enddate);
    // @ts-ignore
    if (this.product.name.trim()) {
      if (this.product.id && this.products.length !== 0) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000});
      }
      else {
        this.product.id = this.createId();
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000});
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
