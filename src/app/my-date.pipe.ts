import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDate',
  standalone: true
})
export class MyDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const date = new Date(value);
    let dayByName = date.toString().substring(0,3);
    let year = date.getFullYear();
    return dayByName+'/'+year;
  }
}
