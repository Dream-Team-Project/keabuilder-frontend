import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from 'src/app/_services/image.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ListService } from 'src/app/_services/_crm/list.service';
import { OfferService} from 'src/app/_services/_sales/offer.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  fetching:boolean = true;
  offername ='';
  offernameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  toggleview = true;
  kboffers:any = [];
  shortwaiting = true;
  selectedForm:string = '';
  lists: any = [];
  deloffer:any;
  error=false;
  errormessage:any;
  
  constructor(
      private _offerservice: OfferService,
      private _listService: ListService,
      private _snackBar: MatSnackBar, 
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private router: Router,
      public _image: ImageService,
      public _general: GeneralService,
      private _file: FileUploadService,
    ) {
      this.toggleview = _general.getStorage('offer_toggle');
  }

  ngOnInit(): void {
    this.fetchoffers();
    this.fetchLists();
    setTimeout(() => {
        this.shortwaiting = false;
    }, 1000);
  }
fetchoffers(){
  this.fetching=true;
  this._offerservice.fetchoffers().subscribe({
    next: resp => {
      // console.log(data);
     this.adjustdata(resp?.data)
    }
  });
}
adjustdata(data:any){
  if(data) this.kboffers = data;
  this.fetching = false;
}
fetchLists() {
  this._listService.fetchlists().subscribe((data:any) => {
      this.lists = data.data;  

})
}
dateformat(value:any){
    if(value=='') return '';
    var mycustomdate =  new Date(value);
    var text1 = mycustomdate.toDateString();    
    var text2 = mycustomdate.toLocaleTimeString();
    return text1;
    // return text1+' '+text2;
  }
createoffer(){
    if(this.offernameControl.status=='VALID'){
      if(this.offername!=''){
        var data = {name:this.offername};
        this._offerservice.addoffer(data).subscribe({
          next: data => {
            if(data?.success){
            this.dialog.closeAll();
            this._snackBar.open('Offer Created Successfully!', 'OK');
            this.router.navigate(['/sales/offer/'+data.uniqueid],{relativeTo: this.route});
          }
          else{
            this.error=true;
            this.errormessage=data?.message;
          }
        }
        });

      }

    }

  }
openDialog(templateRef: TemplateRef<any>,id:any): void {
    if(id)  this.deloffer = id;
    this.dialog.open(templateRef).afterClosed().subscribe((data)=>{
      this.offername='';
      this.deloffer='';
      this.error=false;
      this.errormessage='';
    })
  } 
changepagename(dataobj:any, title:any){
  }
  togglepageview(){
    this.toggleview = !this.toggleview; 
    console.log(this.toggleview);
    this._general.setStorage('offer_toggle',this.toggleview);
  }
  deleteoffer(offer:any){
    this._offerservice.deleteoffer(offer.id).subscribe((data:any)=>{
      var genscrn = 'keaimage-offer-'+offer.uniqueid+'-screenshot.png';
        this._file.validateimg(genscrn).subscribe({
          next: datagen => {
            if(datagen.data==1){
              this._file.deleteimage('keaimage-offer-'+offer.uniqueid+'-screenshot.png').subscribe({
                next: data => {
                  this.fetchoffers();
                  this._general.openSnackBar(false, 'offer Deleted Successfully!', 'OK', 'center', 'top');
                }
              });
            }
            else {
              this.fetchoffers();
              this._general.openSnackBar(false, 'offer Deleted Successfully!', 'OK', 'center', 'top');
            }
          }
        });
    })
  }
  searchoffers(search: any, sortInp:any, sentInp:any, listInp:any) {
    this.fetching=true;
    var obj = {
      search: search.value,
      sortInp: sortInp.value,
      sentInp: sentInp.value,
      listInp: listInp.value,
    }
    this._offerservice.searchoffers(obj).subscribe((resp:any)=>{
      this.adjustdata(resp?.data);
    });
  }
duplicateoffer(offer:any){
  offer.publish_status=0;
  offer.status='opened';
  offer.olduid = offer.uniqueid;
  offer.uniqueid = this._general.makeid(20);
  this._offerservice.duplicateoffer(offer).subscribe((data:any) => {
        if(data.success==true){
          var oldimg = 'keaimage-offer-'+offer.olduid+'-screenshot.png';
          this._file.validateimg(oldimg).subscribe({
            next: datagen => {
              if(datagen.data==1){
                var imgobj  = {oldname:oldimg, newname:'keaimage-offer-'+offer.uniqueid+'-screenshot.png'};
                this._file.copyimage(imgobj).subscribe({
                  next: data => {
                    this.fetchoffers();
                    this._general.openSnackBar(false, 'offer Duplicated Successfully!', 'OK', 'center', 'top');
                  }
                });
              }else{
                this.fetchoffers();
                this._general.openSnackBar(false, 'offer Duplicated Successfully!', 'OK', 'center', 'top');
              }

            }
          });
        }
    })   
}
}