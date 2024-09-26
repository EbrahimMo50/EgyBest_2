import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    
    return value.substring(0,30)+"...";
  }

}
