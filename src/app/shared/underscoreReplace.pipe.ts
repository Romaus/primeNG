import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underscoreReplace'
})
export class UnderscoreReplacePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
