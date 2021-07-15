import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../types/product';
import {Observable, of} from 'rxjs';

@Injectable()
export class LocalStorageService {

    constructor(private http: HttpClient) { }

    /*getItems(id: string): any {
      return JSON.parse(localStorage.getItem(id) as string);
    }*/

    getItems(id: string): Observable<Product[]> {
      return of(JSON.parse(localStorage.getItem(id) as string));
    }

    updateItems(id: string, items: any): void {
      localStorage.setItem(id, JSON.stringify(items));
    }
}
