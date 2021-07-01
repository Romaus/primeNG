import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function phoneCodeBelarusValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const RegExpBelPhoneNumberCode = /^(\+375)\((29|25|44|33)\)(\d{3})-(\d{2})-(\d{2})$/;
    const forbidden = RegExpBelPhoneNumberCode.test(control.value);
    return forbidden ? null : {phonebelcode: {value: control.value}};
  };
}
