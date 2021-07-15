import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import { Product } from '../types/product';
import {Observable, of} from 'rxjs';

@Injectable()
export class LocalStorageService {

    constructor(private http: HttpClient) { }

    /*getItems(id: string): any {
      return JSON.parse(localStorage.getItem(id) as string);
    }*/

    getItems(id: string): Observable<Product[]> {
      return new Observable<Product[]>(observer => {
        setTimeout(() => observer.next(JSON.parse(localStorage.getItem(id) as string)), 0);
      });
    }

    // updateItems(id: string, items: any): void {
    //   localStorage.setItem(id, JSON.stringify(items));
    // }

    updateItems(id: string, items: any): Observable<void> {
      return new Observable<void>(observer => {
        localStorage.setItem(id, JSON.stringify(items));
        observer.next();
      });
    }
}
