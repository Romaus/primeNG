// @ts-ignore
import moment from 'moment';
import { Injectable } from '@angular/core';


@Injectable()
export class DateFormatService {

  constructor() { }

  convertByMomentToUS(date: string): any {
    return moment(date).format('MM/DD/YYYY');
  }

  convertToNumber(date: string): any {
    return moment(date).valueOf();
    // return Date.parse(date);
  }

  isbetween(date: any, startdate: any, enddate: any): boolean {
    return moment(date).isBetween(startdate, enddate);
  }
}
