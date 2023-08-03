import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ProductService } from 'src/app/_services/_sales/product.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

uniqueid:any;
searchproduct:string = '';
product :any = {
  name: '',
  title:'',
  description: '',
  thumbnail: '',
  type: '',
  price:'',
};
file = null;
typeerror:string = '';
thumbnail:any={name: '', path: '', type: ''};

  constructor(private _route: ActivatedRoute,
    private _productservice: ProductService,
    private dialog: MatDialog,
    public _image: ImageService,
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
      console.log(this.product)
      }
      else{
        this._general.openSnackBar(data.success,data.message,'Ok','center','top');
      }
    })
  }
  updateproduct() {
    if(this.product.name && (this.thumbnail.type || this.product.thumbnail) && this.product.description && this.product.title && this.product.price){ 
      if(this.thumbnail.type){
      this.thumbnail.name = 'product-thumbnail-'+this.product.uniqueid+'.'+this.thumbnail.type;
      this.product.thumbnail = 'keaimage-'+this.thumbnail.name;
      this._image.timeStamp = (new Date()).getTime();
      };
    this._productservice.updateproduct(this.product).subscribe((resp:any) => {
      var msg;
      if(resp.exist) this.product.name.uniqueErr = true;
      else {
        if(resp.success) {
          if(this.thumbnail.type) this._image.onImageFileUpload(this.thumbnail);
          msg = 'Product has been updated';
          this.fetchproduct();
          this.thumbnail={name: '', path: '', type: ''};
          this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
        }
        else { msg = 'Server Error';
        this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
       
      }
      }
    });
  }else {let msg = 'Fill All details';
  this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
}
}
back(){
  this._general.prevRoute();
}

  // image input method

  changeImg (event:any) {
    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;
    if (this.file!=null && (chktype=='image/jpeg' || chktype=='image/jpg' || chktype=='image/png')) {
      this.thumbnail.type = chktype.split('/')[1];
      this.typeerror = '';
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = e => this.thumbnail.path= fileReader.result; 
    }else{
      this.typeerror = 'File Type Not Allow';
    }

  }

  // image input method
};


