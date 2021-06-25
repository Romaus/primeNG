import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../types/product';

@Injectable()
export class LocalStorageService {

    constructor(private http: HttpClient) { }

    getItems(): any {
      return JSON.parse(localStorage.getItem('items') as string);
    }

    updateItems(items: any): void {
      localStorage.setItem('items', JSON.stringify(items));
    }
}
