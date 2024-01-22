import { NgModule } from '@angular/core';
import { FilterPipe } from '../_pipes/filter.pipe';
import { SvgPipe } from '../_pipes/svg.pipe';
import { SafeHtmlPipe } from '../_pipes/safe-html.pipe';
import { SortingPipe } from '../_pipes/sorting.pipe';


@NgModule({
  declarations: [
    SvgPipe,
    SafeHtmlPipe,
    FilterPipe ,
    SortingPipe
  ],
  exports: [
    SvgPipe,
    SafeHtmlPipe,
    FilterPipe ,
    SortingPipe
  ]
})
export class PipeModule { }
