// @ts-ignore
import moment from 'moment';
import { Injectable } from '@angular/core';


@Injectable()
export class DateFormatService {

  constructor() { }

  convertByMomentToUS(date: string): any {
    return moment(date).format('MM/DD/YYYY');
  }
}
