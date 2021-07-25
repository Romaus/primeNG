import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {User} from './types/users';
import {LocalStorageService} from './services/localstorageservice';
import {DateFormatService} from './services/dateformatservice';
import {ValidatorsDirective} from './shared/Customvalidators.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'testPrimeNG';

  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  users!: User[];

  selectedUser!: User;

  constructor(
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: './'},
      {label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: './mainpage'},
      {label: 'Table', icon: 'pi pi-fw pi-pencil', routerLink: './table'}
    ];
    this.users = [
      {name: 'Admin', role: 'ADMIN'},
      {name: 'Moderator', role: 'MODERATOR'},
      {name: 'Guest', role: 'GUEST'}
    ];
    this.activeItem = this.items[0];
    this.selectedUser = this.users[0];
  }

  login(): void {
    if (this.selectedUser && (this.selectedUser.role === 'ADMIN' || this.selectedUser.role === 'MODERATOR')) {
      this.selectedUser.token = this.createToken();
    }
    this.localStorageService.setUserInfo(this.selectedUser);
  }

  logoff(): void {
    this.localStorageService.removeUserInfo();
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
