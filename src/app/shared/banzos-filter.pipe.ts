import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})

export class BanzosFilterPipe implements PipeTransform {
  transform(array: Array<any>, value: string) {
    if (value && array) {
        return array.filter((item: any) => this.matchAnyKey(value, item));
    } else {
        return array;
    }
}

   matchAnyKey(value: string, obj: any): boolean {
    let filterKeys = Object.keys(obj);
    let matchedProps = filterKeys.filter(key => obj[key]
                                            && typeof obj[key] === 'string'
                                            && obj[key].toLowerCase().indexOf(value.toLowerCase()) > -1);
    return matchedProps.length > 0;
   }
}