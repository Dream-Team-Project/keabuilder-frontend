import {Component, OnInit, ElementRef, ViewChild, TemplateRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ProductService } from 'src/app/_services/_sales/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  fetching:boolean = true;
  hasError:string = '';
  products:Array<any> = [];
  productObj = {
    id: '',
    name: '',
    description: '',
  }
  search = {
    value: '',
    sortby: 'updated_at DESC',
  }
  
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
      this.productObj.id = '';
      this.productObj.name = '';
      this.productObj.description = '';
    })
  }

  adjustdata(data:any){
    if(data) this.products = data;
    this.fetching = false;
  }

  fetchproducts() {
    this._productservice.fetchproducts().subscribe((resp:any) => {
      this.adjustdata(resp?.data);
      this.search.value = '';
      this.search.sortby = 'updated_at DESC';
    });
  }

  resetSearch() {
    this.search.value = '';
    this.searchproducts();
  }

  searchproducts() {
    this.fetching = true;
    var obj = {
      value: this.search.value,
      sortby: this.search.sortby,
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
    }
  }

  addproduct() {
    this._productservice.addproduct(this.productObj).subscribe((resp:any) => {
      if(resp.success) {
        this.fetchproducts();
        this.dialog.closeAll();
        this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
      }
      else this.setError(resp?.message);
    })
  }

  updateproduct() {
    this._productservice.updateproduct(this.productObj).subscribe((resp:any) => {
      if(resp.success) {
        this.fetchproducts();
        this.dialog.closeAll();
        this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
      }
      else this.setError(resp?.message);
    })
  }

  duplicateproduct(product:any){
    var temp = JSON.parse(JSON.stringify(product));
    temp.uniqueid = this._general.makeid(20);
    this._productservice.duplicateproduct(temp).subscribe((resp:any) => {
          if(resp.success) this.fetchproducts();
          this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }
  
  deleteproduct() {
    this._productservice.deleteproduct(this.productObj.id).subscribe((resp:any) => {
      if(resp.success) this.fetchproducts();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }

  setError(msg:string) {
    this.hasError = msg;
  }

}
