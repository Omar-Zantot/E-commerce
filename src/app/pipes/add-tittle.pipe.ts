import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addTittle',
})
export class AddTittlePipe implements PipeTransform {
  transform(value: string): unknown {
    return `product .. ${value}`;
  }
}
