import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items:any,input:any,column:any): any {
      if (input) {
        if(column == 'page_name') {
          return items.filter((val:any) => val.page_name?.toLowerCase().indexOf(input.toLowerCase()) >= 0)
        }
        else if(column == 'name') {
          return items.filter((val:any) => val.name?.toLowerCase().indexOf(input.toLowerCase()) >= 0)
        }
        else {
          return items;
        }
      } else {
        return items;
      }
  }
}
