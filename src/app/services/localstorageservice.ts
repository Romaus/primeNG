import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import { Product } from '../types/product';
import {Observable} from 'rxjs';
import {User} from '../types/users';

@Injectable()
export class LocalStorageService {

    constructor(private http: HttpClient) { }

  static getToken(): any {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user') as string).token;
      }
  }

    /*getItems(id: string): any {
      return JSON.parse(localStorage.getItem(id) as string);
    }*/

    // updateItems(id: string, items: any): void {
    //   localStorage.setItem(id, JSON.stringify(items));
    // }
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
        const items = JSON.parse(localStorage.getItem('items') as string);
        items.push(item);
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

    getUserInfo(): User {
      return JSON.parse(localStorage.getItem('user') as string);
    }

    removeUserInfo(): void {
      localStorage.removeItem('user');
    }

    setUserInfo(user: User): void {
      localStorage.setItem('user', JSON.stringify(user));
    }
}
