import {Component, OnInit, ElementRef, ViewChild, TemplateRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { OrderformService } from 'src/app/_services/_sales/orderform.service';

@Component({
    selector: 'order-form',
    templateUrl: './orderform.component.html',
    styleUrls: ['./orderform.component.css']
  })
export class OrderFormComponent implements OnInit {

  fetching:boolean = true;
  hasError:string = '';
  products:Array<any> = [];
  productObj = {
    id: '',
    name: '',
  }
  search = {
    value: '',
    sortby: 'updated_at DESC',
  }
  
  constructor(
    private _orderformservice: OrderformService,
    private dialog: MatDialog,
    private _general: GeneralService
  ) {}

  ngOnInit(): void {
   this.fetchorderforms(); 
  }

  openDialog(templateRef: TemplateRef<any>, product: any) {
    this.hasError = '';
    this.productObj = JSON.parse(JSON.stringify(product));
    this.dialog.open(templateRef).afterClosed().subscribe((resp :any)=>{
      this.productObj.id = '';
      this.productObj.name = '';
    })
  }

  adjustdata(data:any){
    if(data) this.products = data;
    this.fetching = false;
  }

  fetchorderforms() {
    this._orderformservice.fetchorderforms().subscribe((resp:any) => {
      this.adjustdata(resp?.data);
      this.search.value = '';
      this.search.sortby = 'updated_at DESC';
    });
  }

  resetSearch() {
    this.search.value = '';
    this.searchorderforms();
  }

  searchorderforms() {
    this.fetching = true;
    var obj = {
      value: this.search.value,
      sortby: this.search.sortby,
    }
    this._orderformservice.searchorderforms(obj).subscribe((resp:any)=>{
      this.adjustdata(resp?.data);
    });
  }

  validateorderform(action: string) {
    if(this.productObj.name && this.productObj.name.length >= 3) {
      this.hasError = '';
      if(action == 'add') this.addorderform();
      else this.updateorderform();
    }
    else {
      let msg = this.productObj.name ? 'Minimum 3 characters required' : 'Please write the name of the Checkout';
      this.setError(msg);
    }
  }

  addorderform() {
    this._orderformservice.addorderform(this.productObj).subscribe((resp:any) => {
      if(resp.success) {
        this.fetchorderforms();
        this.dialog.closeAll();
        this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
      }
      else this.setError(resp?.message);
    })
  }

  updateorderform() {
    this._orderformservice.updateorderform(this.productObj).subscribe((resp:any) => {
      if(resp.success) {
        this.fetchorderforms();
        this.dialog.closeAll();
        this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
      }
      else this.setError(resp?.message);
    })
  }

  duplicateorderform(product:any){
    var temp = JSON.parse(JSON.stringify(product));
    temp.uniqueid = this._general.makeid(20);
    this._orderformservice.duplicateorderform(temp).subscribe((resp:any) => {
          if(resp.success) this.fetchorderforms();
          this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }
  
  deleteorderform() {
    this._orderformservice.deleteorderform(this.productObj.id).subscribe((resp:any) => {
      if(resp.success) this.fetchorderforms();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }

  setError(msg:string) {
    this.hasError = msg;
  }

}
