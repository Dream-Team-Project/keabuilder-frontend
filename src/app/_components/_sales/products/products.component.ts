import {Component, OnInit, ElementRef, ViewChild, TemplateRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
    });
  }

  searchproducts(search: any, sortInp:any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      sortInp: sortInp.value,
    }
    this._productservice.searchproducts(obj).subscribe((resp:any)=>{
      this.adjustdata(resp?.data);
    });
  }

  addproduct() {
    if(this.productObj.name) {
      this.hasError = '';
      this._productservice.addproduct(this.productObj).subscribe((resp:any) => {
        if(resp.success) {
          this.fetchproducts();
          this.dialog.closeAll();
          this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
        }
        else this.setError(resp?.message);
      })
    }
    else {
      let msg = 'Please write the name of the product';
      this.setError(msg)
    }
  }

  updateproduct() {
    if(this.productObj.name) {
      this.hasError = '';
      this._productservice.updateproduct(this.productObj).subscribe((resp:any) => {
        if(resp.success) {
          this.fetchproducts();
          this.dialog.closeAll();
          this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
        }
        else this.setError(resp?.message);
      })
    }
    else {
      let msg = 'Please write the name of the product';
      this.setError(msg)
    }
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

  };
