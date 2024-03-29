import {Component, OnInit, ElementRef, ViewChild, TemplateRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ProductService } from 'src/app/_services/_sales/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('updatedialog') updatedialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  fetching:boolean = true;
  hasError:string = '';
  products:Array<any> = [];
  productObj = {
    id: '',
    name: '',
    description: '',
  }
  searchInp : string = ''; 
  sortInp : string = 'updated_at DESC';
  productlength:any;
  
  constructor(
    private _productservice: ProductService,
    private dialog: MatDialog,
    private _general: GeneralService
  ) {}

  ngOnInit(): void {
   this.fetchproducts(); 
  }

  openDialog(templateRef: TemplateRef<any>, product: any) {
    this.hasError = '';
    this.productObj = JSON.parse(JSON.stringify(product));
    this.dialog.open(templateRef).afterClosed().subscribe((resp :any)=>{
    
    })
  }
  resetobj(){
    this.fetching=false;
    this.hasError = '';
    this.productObj.id = '';
    this.productObj.name = '';
    this.productObj.description = '';
    this.dialog.closeAll();
  }

  adjustdata(data:any){
    if(data) this.products = data;
    this.fetching = false;
  }

  fetchproducts() {
    this.getpageproducts({pageIndex:0,pageSize:20});
  }
  getpageproducts(event:any){
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
    this._productservice.getpageproducts(obj).subscribe((resp:any) => {
       this.productlength=resp.products; 
       this.adjustdata(resp?.data);
      this.searchInp = '';
      })
    }
  resetSearch() {
    this.searchInp = '';
    this.searchproducts(this.searchInp, this.sortInp);
  }
  toggleSort(column: string): void {
    // console.log(column)
    if (this.sortInp.includes(column)) {
      this.sortInp = this.sortInp.endsWith('ASC') ? `${column} DESC` : `${column} ASC`;
    } else {
      this.sortInp = `${column} ASC`;
    }
    this.searchproducts(this.searchInp, this.sortInp);
  }
  searchproducts(search: any, sort:any) {
    this.fetching = true;
    var obj = {
      value: search,
      sortby: sort,
      pageIndex:this.paginator.pageIndex,
      pageSize:this.paginator.pageSize,
    }
    this._productservice.searchproducts(obj).subscribe((resp:any)=>{
      this.adjustdata(resp?.data);
    });
  }

  validateproduct(action: string) {
    if(this.productObj.name && this.productObj.name.length >= 3) {
      this.hasError = '';
      if(action == 'add') this.addproduct();
      else this.updateproduct();
    }
    else {
      let msg = this.productObj.name ? 'Minimum 3 characters required' : 'Please write the name of the product';
      this.setError(msg);
      if(action == 'add') this.dialog.open(this.adddialog);
      else this.dialog.open(this.updatedialog);
    }
  }

  addproduct() {
    this._productservice.addproduct(this.productObj).subscribe((resp:any) => {
      if(resp.success) {
        this.fetchproducts();
       this.resetobj();
        this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
      }
      else {
        this.setError(resp?.message);
        this.dialog.open(this.adddialog);
      }
    })
  }

  updateproduct() {
    this._productservice.updateproduct(this.productObj).subscribe((resp:any) => {
      if(resp.success) {
        this.fetchproducts();
        this.resetobj();
        this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
      }
      else{
       this.setError(resp?.message);
      this.dialog.open(this.updatedialog);
      }
    })
  }

  duplicateproduct(product:any){
    var temp = JSON.parse(JSON.stringify(product));
    temp.uniqueid = this._general.makeid(20);
    this._productservice.duplicateproduct(temp).subscribe((resp:any) => {
          if(resp.success) this.fetchproducts();
          this.resetobj();
          this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }
  
  deleteproduct() {
    this._productservice.deleteproduct(this.productObj.id).subscribe((resp:any) => {
      if(resp.success) this.fetchproducts();
      this.resetobj();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }

  setError(msg:string) {
    this.hasError = msg;
  }

}
