import { A } from '@angular/cdk/keycodes';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(items:any,direction:string,column:string){
    let sortedItems:any = [];
    sortedItems=direction=='asc' ? this.sortAscending(items,column): this.sortDescending(items,column)
    return sortedItems;
  }

  sortAscending(items:any,column:any){
    return items.sort((a:any, b:any) => a[column].toUpperCase() < b[column].toUpperCase() ? -1 : a[column] - b[column]);
  }
  
  sortDescending(items:any,column:any){
    return items.sort((a:any, b:any) => b[column].toUpperCase() < a[column].toUpperCase() ? -1 : b[column] - a[column]);
  }

}
