import {Component, OnInit} from '@angular/core';
import { Product } from '../types/product';
import { LocalStorageService } from '../services/localstorageservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { phoneCodeBelarusValidator } from '../shared/belarus-phoneCodeNumberValidator.directive';
import {DateFormatService} from '../services/dateformatservice';

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
  date?: string;
  datePipe?: string;
  dateMoment?: string;

  constructor(
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private formatdate: DateFormatService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    if (this.localStorageService.getItems('items')) {
      this.products = this.localStorageService.getItems('items');
    }

    this.itemForm = new FormGroup({
      name: new FormControl(this.product.name, [Validators.required]),
      email: new FormControl(this.product.email, [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl(this.product.phone, [
        Validators.required,
        phoneCodeBelarusValidator()
      ]),
      description: new FormControl(this.product.description, [
        Validators.required,
        Validators.minLength(20)
      ]),
      category: new FormControl(this.product.category),
      price: new FormControl(this.product.price),
      quantity: new FormControl(this.product.quantity),
      updatedate: new FormControl(this.product.updatedate)
    });
  }
  showDatePipe(): void {
    this.datePipe = this.date;
  }
  showDateMoment(): void {
    if (this.date) {
      this.dateMoment = this.formatdate.convertByMomentToUS(this.date);
    }
  }
  saveToStorage(): void {
    this.localStorageService.updateItems('items', this.products);
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Changes saved to LocalStorage', life: 3000});
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
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
  }

  editProduct(product: Product): void {
    this.product = {...product};
    this.productDialog = true;
  }

  deleteProduct(product: Product): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog(): void {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct(): void {
    this.submitted = true;
    this.product.updatedate = this.formatdate.convertByMomentToUS(this.product.updatedate);
    // @ts-ignore
    if (this.product.name.trim()) {
      if (this.product.id && this.products.length !== 0) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
        this.product.id = this.createId();
        this.products.push(this.product);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
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
