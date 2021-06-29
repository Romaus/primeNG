import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../types/product';

@Injectable()
export class LocalStorageService {

    constructor(private http: HttpClient) { }

    getItems(id: string): any {
      return JSON.parse(localStorage.getItem(id) as string);
    }

    updateItems(id: string, items: any): void {
      localStorage.setItem(id, JSON.stringify(items));
    }
}
