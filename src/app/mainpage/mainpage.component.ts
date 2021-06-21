import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  date1: Date = new Date();

  constructor() { }

  ru: any;

  ngOnInit(): void {
    this.ru = {
      firstDayOfWeek: 1,
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Ср', 'Чт', 'Птн', 'Сб'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: [ 'Январь', 'Февраль', ' Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
      monthNamesShort: [ 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
      today: 'Сегодня',
      clear: 'Очистить',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Нд'
    };
  }

}
