import { A } from '@angular/cdk/keycodes';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(items:any,direction:string,column:string){
    if(direction) {
      let sortedItems:any = [];
      sortedItems = direction=='asc' ? this.sortAscending(items,column): this.sortDescending(items,column)
      return sortedItems;
    }
    else return items;
  }

  sortAscending(items:any,column:any){
    return items.sort((a:any, b:any) => (isNaN(a[column] && b[column]) ? (a[column].toUpperCase() < b[column].toUpperCase()) :  (a[column] < b[column])) ? -1 : a[column] - b[column]);
  }
  
  sortDescending(items:any,column:any){
    return items.sort((a:any, b:any) => (isNaN(a[column] && b[column]) ? (b[column].toUpperCase() < a[column].toUpperCase()) : (b[column] < a[column]))  ? -1 : b[column] - a[column]);
  }

}
