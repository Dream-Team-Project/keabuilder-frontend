import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatTable} from '@angular/material/table';
<<<<<<< HEAD
import { CourseService } from '../_services/_membership//course.service';
=======
import { CourseService } from '../_services/_membership/course.service';
>>>>>>> 911fcd631fbe4db6c056ab7075fa25ce8c429df6
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface UserData {
  coupons: string;
  numberoffer: string;
  amountoff: string;  
  duration: string;
  expirationdate: string;
  expirestatus:string;
  actions:string;
}

export interface DialogData {
  name: string;
}

const ELEMENT_DATA: UserData[] = [];

@Component({
  selector: 'app-membership-coupons',
  templateUrl: './membership-coupons.component.html',
  styleUrls: ['./membership-coupons.component.css']
})

export class MembershipCouponsComponent implements OnInit {
  
  minDate = new Date();

  displayedColumns: string[] = ['coupons', 'numberoffer', 'amountoff', 'duration','expirationdate','expirestatus','actions'];

  users:any = [];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  
  popupsidebar = false;
  automationaddnewaction = false;
  itemshow = false;
  pricetype = 'USD';

  discountselected = '';
  currencytype = '';
  kbduration = '';
  
  productoptionals = new FormControl();
  productoptionalList: string[] = [];

  newcoupon = {name:'', discount_type:'', percent_off:'', amount_off:'', currency_type:'', duration:'', expiration_date:'', duration_in_month:'', included_offers:''};
  nameFormControl = new FormControl('', [Validators.required]);

  createme = true;
  updateid = 0;
  
  constructor(private courseService:CourseService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,) {
  }

  ngOnInit(): void {

    this.courseService.getalloffers().subscribe({
      next: data => {

       data.data.forEach((element: any) => {
          this.productoptionalList.push(element.title);
       });

      }
    });

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);

    this.getallmycoupons();

  }

  getallmycoupons(){
    this.courseService.getallcoupons().subscribe({
      next: data => {
        console.log(data);
        this.users = [];
        this.dataSource.data = [];

        data.data.forEach((element:any) => {
          if(element.expiration_date!=''){
            var mycustomdate =  new Date(element.expiration_date);
            var text1 = mycustomdate.toDateString();    
            var text2 = mycustomdate.toLocaleTimeString();
            element.expiration_date = text1+' '+text2;
          }

            var countoffer = '';
            if(element.include_offers!=''){
              countoffer = (element.include_offers).split(',').length;
            }

            var createamountoff = '';
            if(element.discount_type!=''){
              if(element.discount_type=='percentoff' && element.percent_off!=''){
                createamountoff = element.percent_off+'% off';
              }else if(element.discount_type=='amountoff' && element.amount_off!=''){
                createamountoff = element.amount_off+' '+element.currency_type+' off';
              }
            }

            var expirestatus = '';
            if(element.expiration_date!=''){
              var d1 = new Date();
              var d2 = new Date(element.expiration_date);
              if(d1>=d2){
                expirestatus = 'EXPIRED';
              }
            }

            var tgobj = {id:element.id,coupons:element.name, numberoffer:countoffer,amountoff:createamountoff, duration:element.duration,expirationdate:element.expiration_date,expirestatus:expirestatus,actions:''};
            this.users.push(tgobj);
        });
        this.dataSource.data = this.users;
        this.table.renderRows();
      }
    });
  }

  addnewcourse(){
    this.createme = true;
    this.popupsidebar = true;
    this.automationaddnewaction = true;
  }

  kbitemshow(){
    this.itemshow = !this.itemshow;
  }

  hidepopupsidebar(){
    this.popupsidebar = false;
    this.newcoupon = {name:'', discount_type:'', percent_off:'', amount_off:'', currency_type:'', duration:'', expiration_date:'', duration_in_month:'', included_offers:''};

    this.discountselected = "none";
    this.currencytype = "none";
    this.kbduration = "none";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createmycoupon(){
    
    this.newcoupon.discount_type = this.discountselected;
    this.newcoupon.currency_type = this.currencytype;
    this.newcoupon.duration = this.kbduration;
    var settags = this.productoptionals.value == null ? '' : this.productoptionals.value;
    this.newcoupon.included_offers = settags;
    
    // console.log(this.newcoupon);
    if(this.nameFormControl.status=='VALID'){

      this.courseService.addnewcoupon(this.newcoupon).subscribe({
        next: data => {
          // console.log(data);
          if(data.already==1){
            this._snackBar.open('Coupon Already Exist!', 'Close');
          }else{
              this.getallmycoupons();
              this._snackBar.open('Coupon Added Successfully!', 'Close');
          }
        }
      });

    }

  }

  editcouponstep(id:any){
    this.createme = false;
    this.updateid = id;

    var data = {id:id,name:'',type:'geteditdata'};
    this.courseService.updatedelcoupon(data).subscribe({
      next: data => {
        console.log(data);
        data.data.forEach((element:any) => {
          
          this.newcoupon = {name:element.name, discount_type:element.discount_type, percent_off:element.percent_off, amount_off:element.amount_off, currency_type:element.currency_type, duration:element.duration, expiration_date:element.expiration_date, duration_in_month:element.duration_in_months, included_offers:element.include_offers};

          this.discountselected = element.discount_type;
          this.currencytype = element.currency_type;
          this.kbduration = element.duration;

          var arselmult = (element.include_offers).split(',');
          this.productoptionals.setValue(arselmult); 

          this.popupsidebar = true;
          this.automationaddnewaction = true;

        });
      }
    });
  }

  openDialog(id:any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: 'Coupon'},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // console.log(id);

      if(result.event == 'Delete'){
        var data = {id:id,name:'',type:'delete'};
        this.courseService.updatedelcoupon(data).subscribe({
          next: data => {
            // console.log(data);
            this.getallmycoupons();
            this._snackBar.open('Coupon Deleted Successfully!', 'Close');
          }
        });
      }
      
    });

  }

  updatemycoupon(){
    
    this.newcoupon.discount_type = this.discountselected;
    this.newcoupon.currency_type = this.currencytype;
    this.newcoupon.duration = this.kbduration;
    var settags = this.productoptionals.value == null ? '' : this.productoptionals.value;
    this.newcoupon.included_offers = settags;

    var data = {id:this.updateid, name:'', type:'update', update:this.newcoupon};
    this.courseService.updatedelcoupon(data).subscribe({
      next: data => {
        console.log(data);
        this.getallmycoupons();
        this._snackBar.open('Coupon Updated Successfully!', 'Close');
      }
    });

  }


}


@Component({
  selector: 'tags-dialog',
  templateUrl: '../delete-dialog/delete-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close({event:'nothanks'});
  }
  onClick(){
    this.dialogRef.close({event:'Delete'});
  }
}
