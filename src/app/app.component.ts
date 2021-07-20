import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'testPrimeNG';

  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit(): void {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: './'},
      {label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: './mainpage'},
      {label: 'Table', icon: 'pi pi-fw pi-pencil', routerLink: './table'}
    ];

    this.activeItem = this.items[0];
  }
}
