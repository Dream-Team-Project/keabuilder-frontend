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

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  
  
  
  fetching:boolean = true;
  products:Array<any> = [];

  product :any = {
    name: '',
    title:'',
    description: '',
    thumbnail: '',
    type: '',
  }
  hasError:string = '';
  

  constructor(
    private _productservice: ProductService,
    private dialog: MatDialog,
    private _general: GeneralService
  ) {
    // this._route.paramMap.subscribe((params: ParamMap) => {
    // })
  }

  ngOnInit(): void {
   this.fetchData(); 
  }

  adjustdata(data:any){
    if(data) this.products = data;
    this.fetching = false;
  }
  
  fetchData(){
    this.fetchproducts();
      
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
      // filterInp: filterInp.value,
    }
    this._productservice.searchproducts(obj).subscribe((resp:any)=>{
      this.adjustdata(resp?.data);
    });
  }

  addproduct() {
    if(this.product.name && this.product.title && this.product.description && this.product.thumbnail && this.product.type) {
      this.hasError = '';
      delete this.product.error;
      this._productservice.addproduct(this.product).subscribe((resp:any) => {
          if(resp.success) {
            this.fetchproducts();
            this.dialog.closeAll();
            this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
          }
          else this.setError(resp?.message);
        })
    }
    else {
      let msg = 'All field are required';
      this.setError(msg)
    }
  }

  setError(msg:string) {
    this.hasError = msg;
    this.product.error = true;
    this.openDialog(this.adddialog, this.product);
  }

  deleteproduct() {
    this._productservice.deleteproduct(this.product.id).subscribe((resp:any) => {
      if(resp.success) this.fetchproducts();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }

  openDialog(templateRef: TemplateRef<any>, product: any) {
    if(!product.error) {
      delete product.error;
      this.hasError = '';
      this.product = JSON.parse(JSON.stringify(product));
    }
    this.dialog.open(templateRef).afterClosed().subscribe((resp :any)=>{
      this.product= {
        name: '',
        title:'',
        description: '',
        thumbnail: '',
        type: '',
      }
    })
  }

  duplicateproduct(product:any){
    var datadup = product;
    datadup.olduid = product.uniqueid;
    datadup.uniqueid = this._general.makeid(20);
    this._productservice.duplicateproduct(datadup).subscribe({
      next: (data :any) => {
          if(data.uniqueid!=''){
                      this.fetchproducts();
                      this._general.openSnackBar(false, 'Product Duplicated Successfully!', 'OK', 'center', 'top');
                    }
                else{
                  this.fetchproducts();
                  this._general.openSnackBar(false, 'Product Duplicated Successfully!', 'OK', 'center', 'top');
                }
  
              }
            });
  }
  rename(data:any, inp:any){
    var newname = inp.value;
    if(data.name !== newname) {
      if(newname.length>3){
        data.name = newname;
        this._productservice.updateproduct(data).subscribe({
          next: (data:any) => {
            
            var msg=data.message;
            if(data.success){
              // msg = 'Product name updated successfully!';
              this.fetchproducts();
              this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
            }
            else {
              this.fetchproducts();
            this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
            }
          }
        }); 
      }else{
      this._general.openSnackBar(true, 'Product name must be at least 3 characters!', 'OK', 'center', 'top');
        inp.value = data.name;
      }
    }
  }
  };
