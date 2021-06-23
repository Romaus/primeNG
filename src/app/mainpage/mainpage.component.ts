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
  timer = 0;
  time = 0;
  timerexpired = false;
  startTime: any;
  finishTime: any;
  floor = (num: number) => {
    return Math.floor(num);
  }

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
    sessionStorage.removeItem('sessionFinishTime');
    sessionStorage.setItem('sessionStartTime', JSON.stringify(Date.now()));
    this.startTime = sessionStorage.getItem('sessionStartTime');
    const sessionTime = () => {
      this.time = Math.floor((Date.now() - this.startTime) / 1000);
      this.timer = 60 - this.time;
      if (this.timer <= 0) {
        clearInterval(sessionTimerCheck);
        this.timerexpired = true;
        sessionStorage.setItem('sessionFinishTime', JSON.stringify(Date.now()));
        this.finishTime = sessionStorage.getItem('sessionFinishTime');
      }
    };
    const sessionTimerCheck = setInterval(sessionTime, 1000);
  }

}
