import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { CourseService } from '../_services/_membership/course.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
series: ApexAxisChartSeries;
chart: ApexChart;
xaxis: ApexXAxis;
dataLabels: ApexDataLabels;
grid: ApexGrid;
stroke: ApexStroke;
title: ApexTitleSubtitle;
};

export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-membership-offers',
  templateUrl: './membership-offers.component.html',
  styleUrls: ['./membership-offers.component.css']
})
export class MembershipOffersComponent implements OnInit {

  kbcourses:any[] = [];
  addnewpages = true;
  popupsidebar = false;
  automationaddnewaction = false;
  itemshow = false;
  activeoffer = 'all';
  productoptionals = new FormControl();
  productoptionalList: any[] = [];
  paymenttype = '';
  pricetype = 'USD';
  showstats = false;
  title = '';
  price = 0;
  monthly_payments = 2;
  bill_every = 0;
  interval = 'none';
  createme = true;
  updateid = 0;
  showmyselected = [];
  selectedcourse = false;
  showquickoffer:any = [];

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;

  nameFormControl = new FormControl('', [Validators.required]);

  constructor(private courseService: CourseService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,) {

    this.courseService.all().subscribe({

      next: data => {
        // console.log(data);
        data.data.forEach((element:any) => {
            var genobj = {id:element.uniqueid,text:element.title};
            this.productoptionalList.push(genobj);
        });
      }

    });

    this.getallmyoffers();

    this.chartOptions = {
      series: [
        {
          name: "stepline-series",
          data: [34, 0, 54, 21, 12, 43, 0, 23, 66, 66, 58, 10, 50, 1, 5, 5,8 ,80, 150, 100, 80,0,0,0,0,0,0,0,0,0]
        }
      ],
      chart: {
        type: "line",
        height: 350
      },
      stroke: {
        curve: "stepline"
      },
      dataLabels: {
        enabled: true
      },
      title: {
        text: "Purchases Last 30 Days",
        align: "left"
      },
      markers: {
        hover: {
          sizeOffset: 4
        }
      }
    };
    this.chartOptions2 = {
      series: [
        {
          name: "STOCK ABC",
          data: [500,400,800,200]
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Net Revenue Last 30 Days",
        align: "left"
      },
      subtitle: {
        text: "Price Movements",
        align: "left"
      },
      labels: ['15 Nov','16 Nov','17 Nov','18 Nov'],
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }

  getallmyoffers(){
    this.courseService.getalloffers().subscribe({
      next: data => {

       this.showdataoffer(data);

      }
    });
  }

  showdataoffer(data:any){
    this.kbcourses = [];

    // console.log(data);
    data.data.forEach((element:any) => {
      // console.log(element.selected_course);
      var shortcourse = '0';
      if(element.selected_course!=''){
        shortcourse = (element.selected_course).split(',').length;
      }
      var newobj:any = {id:element.id, offer_name:element.title, offer_url:'', course_assign:shortcourse, offer_price:element.price, qty_sold:0, net_revenue:0, publish_status:element.publish_status, itemshow:false, dropdownstatus:false,currency:element.currency};
      this.kbcourses.push(newobj);
    });
  }

  ngOnInit(): void {
  }

  addnewcourse(){
    this.popupsidebar = true;
    this.automationaddnewaction = true;
  }

  kbitemshow(){
    this.itemshow = !this.itemshow;
  }

  changemystate(value: string){
    this.activeoffer = value;

    if(value!='stats'){
      this.courseService.filteroffer(value).subscribe({
        next: data => {
          console.log(data);
          this.showdataoffer(data);

        }
      });
    }

  }

  hidepopupsidebar(){
    this.popupsidebar = false;
    this.selectedcourse = false;
    this.showmyselected  = [];
    this.title = '';
    var arselmult:any = [];
    this.productoptionals.setValue(arselmult); 
    this.paymenttype = '';
    this.price = 0;
    this.pricetype = 'USD';
    this.monthly_payments = 2;
    this.bill_every = 0;
    this.interval = 'none';
  }

  changeselectcourse(event:any){
      this.selectedcourse = false;
  }

  createoffer(){

    this.createme = true;
    var selectcourse = '';
    if(this.productoptionals.value!=null){
      selectcourse = (this.productoptionals.value).toString();
    }

    var newoffer = {title:this.title,selected_course:selectcourse,payment_type:this.paymenttype,price:this.price,currency:this.pricetype,no_monthly_payment:this.monthly_payments,bill_every:this.bill_every,offer_interval:this.interval};

    // console.log(newoffer);

    if(this.nameFormControl.status=='VALID'){

      this.courseService.addnewoffer(newoffer).subscribe({
        next: data => {
          // console.log(data);
          if(data.already==1){
            this._snackBar.open('Offer Already Exist!', 'Close');
          }else{
              this.getallmyoffers();
              this._snackBar.open('Offer Added Successfully!', 'Close');
          }
        }
      });

    }

  }

  openDialog(id:any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: 'Offer'},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // console.log(id);

      if(result.event == 'Delete'){
        var data = {id:id,name:'',type:'delete'};
        this.courseService.updatedeloffer(data).subscribe({
          next: data => {
            // console.log(data);
            this.getallmyoffers();
            this._snackBar.open('Offer Deleted Successfully!', 'Close');
          }
        });
      }

    });

  }

  makequickedit(type:any,id:any){

    this.createme = false;
    this.updateid = id;

    if(type=='edit'){
      var data = {id:id,name:'',type:'geteditdata'};
      this.courseService.updatedeloffer(data).subscribe({
        next: data => {
          // console.log(data);
          data.data.forEach((element:any) => {

            

            this.title = element.title;
            // console.log(element.selected_course);
            if(element.selected_course!=null && element.selected_course!=''){
              
              var arselmult = (element.selected_course).split(',');
              // console.log(arselmult);
              this.productoptionals.setValue(arselmult); 
              
              this.showmyselected = arselmult;
            }
            // console.log(this.productoptionals);

            this.paymenttype = element.payment_type;
            this.price = element.price;
            this.pricetype = element.currency;
            this.monthly_payments = element.no_monthly_payment;
            this.bill_every = element.bill_every;
            this.interval = element.offer_interval;
            
            this.selectedcourse = true;
            this.popupsidebar = true;
            this.automationaddnewaction = true;
            
            this.findselectedproduct();


          });
        }
      });
    }else if(type=='duplicate'){

      var data = {id:id,name:'',type:'duplicate'};
      this.courseService.updatedeloffer(data).subscribe({
        next: data => {
          console.log(data);
          this.getallmyoffers();
          this._snackBar.open('Offer Duplicate Successfully!', 'Close');
        }
      });
    }

    
  }

  changeofferoutside(id:any, name:any, type:any){
    var data = {id:id,name:name,type:type};
    this.courseService.updatedeloffer(data).subscribe({
      next: data => {
        // console.log(data);
        if(data.isrename==true){
          this._snackBar.open('Offer Renamed Successfully!', 'Close');
        }else if(data.isrename==false){
          this._snackBar.open('Offer Status Update Successfully!', 'Close');
        }
      }
    });

  }

  findselectedproduct(){
    this.showquickoffer = [];
    if(this.showmyselected.length!=0){
      this.productoptionalList.forEach(element => {
        this.showmyselected.forEach(element2 => {
          if(element.id==element2){
            this.showquickoffer.push(element.text);
          }
        });
      });
    }
  }

  updateoffer(){

    var selectcourse = '';
    if(this.productoptionals.value!=null){
      selectcourse = (this.productoptionals.value).toString();
    }

    var newoffer = {title:this.title,selected_course:selectcourse,payment_type:this.paymenttype,price:this.price,currency:this.pricetype,no_monthly_payment:this.monthly_payments,bill_every:this.bill_every,offer_interval:this.interval};
    var data = {id:this.updateid, name:'', type:'update', update:newoffer};
    // console.log(data);

    this.courseService.updatedeloffer(data).subscribe({
      next: data => {
        // console.log(data);
        this.getallmyoffers();
        this._snackBar.open('Offer Updated Successfully!', 'Close');
      }
    });

  }

  searchoffer(event: Event) {
    var SearchValue = (event.target as HTMLInputElement).value;
    // console.log(SearchValue);

    this.courseService.querystringmanage(SearchValue).subscribe({
      next: data => {
        console.log(data);
        this.showdataoffer(data);
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
