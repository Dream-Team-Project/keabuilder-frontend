import {Component, OnInit, ElementRef, ViewChild, TemplateRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { OrderformService } from 'src/app/_services/_sales/orderform.service';

@Component({
    selector: 'order-form',
    templateUrl: './orderform.component.html',
    styleUrls: ['./orderform.component.css']
  })
export class OrderFormComponent implements OnInit {

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('updatedialog') updatedialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  fetching:boolean = true;
  hasError:string = '';
  products:Array<any> = [];
  productObj = {
    id: '',
    name: '',
  }
  searchInp : string = ''; 
  sortInp : string = 'updated_at DESC';
  orderformlength:any;
  
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
      
    })
  }
  resetobj(){
    this.hasError = '';
    this.productObj.id = '';
    this.productObj.name = '';
    this.dialog.closeAll();
  }

  adjustdata(data:any){
    if(data) this.products = data;
    this.fetching = false;
  }

  fetchorderforms() {
    this.getpageorderforms({pageIndex:0,pageSize:20});
  }
  getpageorderforms(event:any){
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
    this._orderformservice.getpageorderforms(obj).subscribe((resp:any) => {
      this.adjustdata(resp?.data);
      this.orderformlength=resp.orderforms;
      this.searchInp = '';
      this.sortInp = 'updated_at DESC';
    });
    }
  resetSearch() {
    this.searchInp = '';
    this.searchorderforms(this.searchInp, this.sortInp);
  }
  toggleSort(column: string): void {
    // console.log(column)
    if (this.sortInp.includes(column)) {
      this.sortInp = this.sortInp.endsWith('ASC') ? `${column} DESC` : `${column} ASC`;
    } else {
      this.sortInp = `${column} ASC`;
    }
    this.searchorderforms(this.searchInp, this.sortInp);
  }
  searchorderforms(search: any, sort:any) {
    this.fetching = true;
    var obj = {
      value: search,
      sortby: sort,
      pageIndex:this.paginator.pageIndex,
      pageSize:this.paginator.pageSize,
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
      if(action == 'add') this.dialog.open(this.adddialog);
      else this.dialog.open(this.updatedialog);
    }
  }

  addorderform() {
    this._orderformservice.addorderform(this.productObj).subscribe((resp:any) => {
      if(resp.success) {
        this.fetchorderforms();
        this.resetobj();
        this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
      }
      else {
      this.setError(resp?.message);
      this.dialog.open(this.adddialog);
      }
    })
  }

  updateorderform() {
    this._orderformservice.updateorderform(this.productObj).subscribe((resp:any) => {
      if(resp.success) {
        this.fetchorderforms();
       this.resetobj();
        this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
      }
      else 
      {this.setError(resp?.message);
        this.dialog.open(this.updatedialog);
      }

    })
  }

  duplicateorderform(product:any){
    var temp = JSON.parse(JSON.stringify(product));
    temp.uniqueid = this._general.makeid(20);
    this._orderformservice.duplicateorderform(temp).subscribe((resp:any) => {
          if(resp.success) this.fetchorderforms();
          this.resetobj();
          this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }
  
  deleteorderform() {
    this._orderformservice.deleteorderform(this.productObj.id).subscribe((resp:any) => {
      if(resp.success) this.fetchorderforms();
      this.resetobj();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }

  setError(msg:string) {
    this.hasError = msg;
  }

}
