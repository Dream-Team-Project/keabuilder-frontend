import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, input: any, search: any): any {
      if (input) {
        if(search == 'page_name') {
          return value.filter((val:any) => val.page_name.toLowerCase().indexOf(input.toLowerCase()) >= 0)
        }
        else if(search == 'name') {
          return value.filter((val:any) => val.name.toLowerCase().indexOf(input.toLowerCase()) >= 0)
        }
        else {
          return value;
        }
      } else {
        return value;
      }
  }
}
