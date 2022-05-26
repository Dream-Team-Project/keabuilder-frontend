import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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


@Component({
  selector: 'app-membership-offers',
  templateUrl: './membership-offers.component.html',
  styleUrls: ['./membership-offers.component.css']
})
export class MembershipOffersComponent implements OnInit {

  kbcourses:any[] = [
    {
        "id": 1,
        "offer_name": "Online Course",
        "offer_url": "online-course",
        "course_assign":2,
        "offer_price":500.00,
        "qty_sold":200,
        "net_revenue":2000.00,
        "publish_status": 1,
        "itemshow": false,
        "dropdownstatus": false
    },
    {
        "id": 2,
        "offer_name": "Childcare Success",
        "offer_url": "childcare-success",
        "course_assign":6,
        "offer_price":100.00,
        "qty_sold":10,
        "net_revenue":200.00,
        "publish_status": 0,
        "itemshow": false,
        "dropdownstatus": false
    },
    {
        "id": 2,
        "offer_name": "Master Motion",
        "offer_url": "master-motion",
        "course_assign":20,
        "offer_price":600.00,
        "qty_sold":10,
        "net_revenue":6000.00,
        "publish_status": 1,
        "itemshow": false,
        "dropdownstatus": false
    },
    {
        "id": 2,
        "offer_name": "Income Academy",
        "offer_url": "income-academy",
        "course_assign":20,
        "offer_price":600.00,
        "qty_sold":10,
        "net_revenue":6000.00,
        "publish_status": 0,
        "itemshow": false,
        "dropdownstatus": false
    }
  ];
  addnewpages = true;
  poupsidebar = false;
  automationaddnewaction = false;
  itemshow = false;
  activeoffer = 'all';
  productoptionals = new FormControl();
  productoptionalList: string[] = ['For testing', 'Small Option Big Profits','Weekly Options Income Academy'];
  paymenttype = '';
  pricetype = 'USD';
  showstats = false;

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;

  constructor() {
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

  ngOnInit(): void {
  }

  addnewcourse(){
    this.poupsidebar = true;
    this.automationaddnewaction = true;
  }

  kbitemshow(){
    this.itemshow = !this.itemshow;
  }

  changemystate(value: string){
    this.activeoffer = value;
  }

  hidepopupsidebar(){
    this.poupsidebar = false;
  }


}
