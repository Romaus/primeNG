import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {User} from './types/users';
import {LocalStorageService} from './services/localstorageservice';
import {DateFormatService} from './services/dateformatservice';
import {ValidatorsDirective} from './shared/Customvalidators.directive';
import {Router} from '@angular/router';
import {UserinfoService} from './services/userinfoservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'testPrimeNG';

  items: MenuItem[]  = [
    {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/'},
    {label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: 'mainpage'},
    {label: 'TableGuest', icon: 'pi pi-fw pi-pencil', routerLink: 'tableguest'}
  ];

  users!: User[];

  selectedUser!: User;

  constructor(
    public userinfoservice: UserinfoService) { }

  ngOnInit(): void {
    if (this.userinfoservice.userinfo) {
      this.items.pop();
      this.items.push({label: 'Table', icon: 'pi pi-fw pi-pencil', routerLink: './table'});
    }
    this.users = [
      {name: 'Boris', role: 'ADMIN'},
      {name: 'Robert', role: 'MODERATOR'}
    ];
    this.selectedUser = this.users[0];
  }

  login(): void {
    if (this.selectedUser && (this.selectedUser.role === 'ADMIN' || this.selectedUser.role === 'MODERATOR')) {
      this.selectedUser.token = this.createToken();
    }
    this.userinfoservice.setUserInfo(this.selectedUser);
    this.items.pop();
    this.items.push({label: 'Table', icon: 'pi pi-fw pi-pencil', routerLink: './table'});
    // console.log(this.items);
  }

  logoff(): void {
    if (this.userinfoservice.userinfo) {
      this.userinfoservice.removeUserInfo();
      this.items.pop();
      this.items.push({label: 'TableGuest', icon: 'pi pi-fw pi-pencil', routerLink: './tableguest'});
    }
  }

  createToken(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 25; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
