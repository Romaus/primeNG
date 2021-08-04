import {Injectable} from '@angular/core';
import {User} from '../types/users';

@Injectable()
export class UserinfoService {
  userinfo?: any;

  constructor() {
    if (localStorage.getItem('user')) {
      this.userinfo = JSON.parse(localStorage.getItem('user') as string);
    }
  }

  removeUserInfo(): void {
    localStorage.removeItem('user');
    this.userinfo = '';
  }

  setUserInfo(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userinfo = user;
  }
}
