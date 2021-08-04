import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import {EMPTY, forkJoin, Observable} from 'rxjs';
import {catchError, take} from 'rxjs/operators';
import {LocalStorageService} from '../services/localstorageservice';

@Injectable({ providedIn: 'root' })
export class TabledataResolver implements Resolve<any> {
  constructor(
    private localstorage: LocalStorageService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return forkJoin( {
      tablelist: this.localstorage.getItems('items').pipe(
        take(1)
      ),
      categories: this.localstorage.getCategories('items').pipe(
        take(1),
      ),
    }).pipe(
      catchError(() => {
        return EMPTY;
      })
    );
  }
}
