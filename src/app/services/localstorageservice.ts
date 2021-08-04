import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import { Product } from '../types/product';
import {EMPTY, Observable} from 'rxjs';

@Injectable()

export class LocalStorageService {

    constructor(private http: HttpClient) { }

    getCategories(key: string): any {
      return new Observable<any>(observer => {
        if (localStorage.getItem(key)) {
          setTimeout(() => observer.next(
            JSON.parse(localStorage.getItem(key) as string)
              .map((el: any) => ({value: el.category, label: el.category}))
              .filter((
                v: any,
                i: any,
                a: any) => a.findIndex((t: any) => (t.value === v.value )) === i)
          ), 0);
        }
        else {observer.next(
          EMPTY
        ); }
      });
    }

    findIndexById = (id: string, items: any): number => {
    let index = -1;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

    getItems(id: string): Observable<Product[]> {
      return new Observable<Product[]>(observer => {
        setTimeout(() => observer.next(JSON.parse(localStorage.getItem(id) as string)), 0);
      });
    }

    getItemsID(id: string, idItem: string): Observable<Product> {
      const items = JSON.parse(localStorage.getItem(id) as string);
      return new Observable<Product>(observer => {
        setTimeout(() => observer.next(items[this.findIndexById(idItem, items)]), 0);
      });
    }

    updateItemID(id: string, item: any): Observable<void> {
      return new Observable<void>(observer => {
        const items = JSON.parse(localStorage.getItem('items') as string);
        items[this.findIndexById(id, items)] = item;
        localStorage.setItem('items', JSON.stringify(items));
        observer.next();
      });
    }

    addNewItem(item: any): Observable<void> {
      return new Observable<void>(observer => {
        let items = JSON.parse(localStorage.getItem('items') as string);
        if (items) {
          items.push(item);
        }
        else { items = [item]; }
        localStorage.setItem('items', JSON.stringify(items));
        observer.next();
      });
    }

    updateItems(id: string, items: any): Observable<void> {
      return new Observable<void>(observer => {
        localStorage.setItem(id, JSON.stringify(items));
        observer.next();
      });
    }
}
