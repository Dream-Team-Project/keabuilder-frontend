import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'src/app/_services/navigation.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { StyleService } from 'src/app/_services/_builder/style.service';

@Component({
  selector: 'app-fetch-menu',
  templateUrl: './fetch-menu.component.html',
  styleUrls: ['./fetch-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FetchMenuComponent implements OnInit {

  @Input ('menu_element') menu_element:any = '';
  @Input ('isBlockActive') isBlockActive:boolean = false;

  menu_success:boolean = false;

  constructor(private _navigation: NavigationService, private _general: GeneralService, public _style: StyleService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['menu_element']) this.fetchMenu(this.menu_element);
  }

  fetchMenu(menu_element:any) {
    let obj = {uniqueid: menu_element.content.data_id};
    this._navigation.singleNavigation(obj).subscribe((resp:any)=>{
      if(resp.success) {
        let temp = resp.data[0];
        menu_element.content.items = this._general.decodeJSON(temp.items);
        this.menu_success = true;
      }
    })
  }
}
