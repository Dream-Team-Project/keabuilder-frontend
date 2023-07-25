import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ProductService } from 'src/app/_services/_sales/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  uniqueid:any;
edit=false;
btntext:any='Edit';
searchproduct:string = '';
product :any = {
  name: '',
  title:'',
  description: '',
  thumbnail: '',
  type: '',
}

  constructor(private _route: ActivatedRoute,
    private _productservice: ProductService,
    private dialog: MatDialog,
    private _general: GeneralService,) { 
     this._route.paramMap.subscribe((params: ParamMap) => {
      this.uniqueid=params.get('uniqueid');
    })
  }

  ngOnInit(): void {
    this.fetchproduct();
  }
  fetchproduct(){
    this._productservice.singleproduct(this.uniqueid).subscribe((data:any)=>{
      if(data.success){
      this.product=data.data[0];
      }
      else{
        this._general.openSnackBar(data.success,data.message,'Ok','center','top');
      }
    })
  }
  btnchange(){
    this.edit=true;
    this.btntext='Update';
    
  }
  updateproduct() {
    if(this.product.name && this.product.thumbnail && this.product.description && this.product.title){ 
    this._productservice.updateproduct(this.product).subscribe((resp:any) => {
      var msg;
      if(resp.exist) this.product.name.uniqueErr = true;
      else {
        if(resp.success) {
          msg = 'Product has been updated';
          // this.product = resp.product;
          this.edit = false;
          this.btntext='Edit';
          this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
        }
        else { msg = 'Server Error';
        this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
        this.edit = true;
        this.btntext='Update';
      }
      }
    });
  }else {let msg = 'Fill All details';
  this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
  this.edit = true;
  this.btntext='Update';
}
}

};


