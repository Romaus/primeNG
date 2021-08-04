import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {User} from '../types/users';
import {MessageService} from 'primeng-lts/api';
import {UserinfoService} from '../services/userinfoservice';

@Injectable({
  providedIn: 'root'
})
export class UserInfoGuard implements CanActivate {
  userInfo = {} as User;
  constructor(
    private router: Router,
    private userinfoservice: UserinfoService,
    private messageService: MessageService,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if ( this.userinfoservice.userinfo ) {
      return of(true);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You are not authorized to this page',
        life: 3000});
      this.router.navigate(['']);
      return EMPTY;
    }
  }
}
