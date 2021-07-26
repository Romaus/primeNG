import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router, ActivatedRoute
} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {User} from '../types/users';
import {LocalStorageService} from '../services/localstorageservice';
import {MessageService} from 'primeng-lts/api';

@Injectable({
  providedIn: 'root'
})
export class UserInfoGuard implements CanActivate {
  userInfo = {} as User;
  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if ( this.storage.getUserInfo() ) {
      return of(true);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You are not authorized to this page',
        life: 3000});
      this.router.navigate(['']);
      return of(false);
    }
  }
}
