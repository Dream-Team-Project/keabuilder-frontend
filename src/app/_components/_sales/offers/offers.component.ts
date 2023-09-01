import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { OfferService } from 'src/app/_services/_sales/offer.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

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
  search = {
    value: '',
    sortby: 'updated_at DESC',
  }
  offerLink = '/sales/offer/';

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
       this.offerObj.id = '';
       this.offerObj.name = '';
     })
   }
 
   adjustdata(data:any){
     if(data) this.offers = data;
     this.fetching = false;
   }
 
   fetchoffers() {
    this._offerservice.offersalescount().subscribe((respsl:any) => {
     this._offerservice.fetchoffers().subscribe((resp:any) => {
        
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
       this.search.value = '';
       this.search.sortby = 'updated_at DESC';
     });
    });
   }

   resetSearch() {
      this.search.value = '';
      this.searchoffers();
   }
 
   searchoffers() {
     this.fetching = true;
     var obj = {
       value: this.search.value,
       sortby: this.search.sortby,
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
          this.dialog.closeAll();
          this._general.openSnackBar(false, resp?.message, 'OK', 'center', 'top');
        }
        else this.hasError.name = resp?.message; 
      })
    }
    else {
      this.hasError.name = 'Please write the name of the offer';
    }
  }
 
   duplicateoffer(offer:any){
     var temp = JSON.parse(JSON.stringify(offer));
     temp.uniqueid = this._general.makeid(20);
     this._offerservice.duplicateoffer(temp).subscribe((resp:any) => {
           if(resp.success) this.fetchoffers();
           this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
     });
   }
   
   deleteoffer() {
     this._offerservice.deleteoffer(this.offerObj.id).subscribe((resp:any) => {
       if(resp.success) this.fetchoffers();
       this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
     });
   }

   convertToJSON(str:string) {
     if(str) return JSON.parse(str);
     else return '';
   }
}