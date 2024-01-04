import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { OfferService } from 'src/app/_services/_sales/offer.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {  

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('updatedialog') updatedialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  fetching:boolean = true;
  defaultCurrency = { name: "United States Dollar", code: "USD", symbol: "$" };
  offerObj = {
    id: '',
    name: '',
    currency: JSON.stringify(this.defaultCurrency),
    email_content: '<h2>Thank You for purchasing the offer!</h2>'
  }
  hasError:any = {
    name: '',
  };
  offers:Array<any> = [];
  offerLink = '/sales/offer/';
  offerlength:any;
  searchInp : string = ''; 
  sortInp : string = 'created_at DESC';

  constructor(
      private _offerservice: OfferService,
      private dialog: MatDialog,
      public _image: ImageService,
      public _general: GeneralService,
    ) {}

  ngOnInit(): void {
    this.fetchoffers(); 
  }
 
   openDialog(templateRef: TemplateRef<any>, offer: any) {
     this.hasError.name = '';
     this.hasError.type = '';
     this.offerObj = JSON.parse(JSON.stringify(offer));
     this.dialog.open(templateRef).afterClosed().subscribe((resp :any)=>{
       
     })
   }
 resetobj(){
  this.offerObj.id = '';
  this.offerObj.name = '';
  this.hasError.name = '';
  this.hasError.type = '';
  this.dialog.closeAll();
 }
   adjustdata(data:any){
     if(data) this.offers = data;
     this.fetching = false;
   }
 
   fetchoffers() {
    this.getpageoffers({pageIndex:0,pageSize:20});
   }

   getpageoffers(event:any){
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
    this._offerservice.offersalescount().subscribe((respsl:any) => {
      this._offerservice.getpageoffers(obj).subscribe((resp:any) => {
       this.offerlength=resp.offers; 
       const order = resp.data.map((item:any) => item.uniqueid);
       const mergedData:any = {};
 
       respsl.data.forEach((item:any) => {
           const { offerid, ...rest } = item;
           mergedData[offerid] = rest;
       });
 
       resp.data.forEach((item:any) => {
           const { uniqueid, ...rest } = item; 
           if (!mergedData[uniqueid]) {
               mergedData[uniqueid] = {
                   "offerid_count": 0,
                   "total_salesamount": "0",
                   ...rest
               };
           } else {
               Object.assign(mergedData[item.uniqueid], rest);
           }
       });
 
       const mergedArray = order.map((uniqueid:any) => ({
           "uniqueid": uniqueid,
           ...mergedData[uniqueid]
       }));
 
       // console.log(mergedArray);
        this.adjustdata(mergedArray);
       //  this.adjustdata(resp?.data);
        this.searchInp = '';
        this.sortInp = 'created_at DESC';
      });
     });
    }

   updateoffer(){
    if(this.offerObj.name) {
      this.hasError.name = '';
      // console.log(this.offerObj);
      this._offerservice.updateoffer(this.offerObj).subscribe((resp:any) => {
        if(resp.success) {
          this.fetchoffers();
          this.resetobj();
          this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
        }
        else {
          this.hasError.name = resp?.message; 
          this.dialog.open(this.updatedialog);
        }
      })
    }
    else {
      this.hasError.name = 'Please write the name of the offer';
      this.dialog.open(this.updatedialog);
    }
   }

   resetSearch() {
      this.searchInp = '';
      this.searchoffers(this.searchInp, this.sortInp);
   }
   toggleSort(column: string): void {
    // console.log(column)
    if (this.sortInp.includes(column)) {
      this.sortInp = this.sortInp.endsWith('ASC') ? `${column} DESC` : `${column} ASC`;
    } else {
      this.sortInp = `${column} ASC`;
    }
    this.searchoffers(this.searchInp, this.sortInp);
  }
   searchoffers(search: any, sortInp:any) {
     this.fetching = true;
     var obj = {
       value: search,
       sortby: sortInp,
       pageIndex:this.paginator.pageIndex,
       pageSize:this.paginator.pageSize,
     }
     this._offerservice.searchoffers(obj).subscribe((resp:any)=>{
       this.adjustdata(resp?.data);
     });
   }
 
  addoffer() {
    if(this.offerObj.name) {
      this.hasError.name = '';
      this._offerservice.addoffer(this.offerObj).subscribe((resp:any) => {
        if(resp.success) {
          this.fetchoffers();
         this.resetobj();
          this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
        }
        else {this.hasError.name = resp?.message; 
        this.dialog.open(this.adddialog);
      }
      })
    }
    else {
      this.hasError.name = 'Please write the name of the offer';
      this.dialog.open(this.adddialog);
    }
  }
 
   duplicateoffer(offer:any){
     var temp = JSON.parse(JSON.stringify(offer));
     temp.uniqueid = this._general.makeid(20);
     this._offerservice.duplicateoffer(temp).subscribe((resp:any) => {
           if(resp.success) this.fetchoffers();
           this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
           this.resetobj();
     });
   }
   
   deleteoffer() {
     this._offerservice.deleteoffer(this.offerObj.id).subscribe((resp:any) => {
       if(resp.success) this.fetchoffers();
       this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
       this.resetobj();
     });
   }

   convertToJSON(str:string) {
     if(str) return JSON.parse(str);
     else return '';
   }
}