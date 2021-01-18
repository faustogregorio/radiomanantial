import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {

  transform(date: Date): any {
    const options: any = { dateStyle: 'full', timeStyle: 'medium', hour12: true };
    return new Intl.DateTimeFormat('es-MX', options).format(new Date(date));
  }

}
