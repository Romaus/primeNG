import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {DateFormatService} from '../services/dateformatservice';
import {Directive} from '@angular/core';

@Directive()
export class ValidatorsDirective {
  constructor(
    private checkdate: DateFormatService){}

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = this.checkdate.convertByMomentToUS(control.value) === 'Invalid date';
      return forbidden ? {dateinvalid: {value: control.value}} : null;
    };
  }

  phoneCodeBelarusValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const RegExpBelPhoneNumberCode = /^(\+375)\((29|25|44|33)\)(\d{3})-(\d{2})-(\d{2})$/;
      const forbidden = RegExpBelPhoneNumberCode.test(control.value);
      return forbidden ? null : {phonebelcode: {value: control.value}};
    };
  }
}
