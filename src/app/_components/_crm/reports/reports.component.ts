import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportingService } from 'src/app/_services/reporting.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-crm-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class CrmReportsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | any;
  public chartContactOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;

  fetched=false;
  recentContacts:any = [];
  monthlyContacts:any = [];
  contactLimit = 8;
  contactData = {
    x: [],
    y: [],
  }

  crmdata:any;
  filtercontacts:any='WEEK';
  contacts:any=[];
  contactsduration:any=[];
  campaigns:any;

  constructor(private _reportingService : ReportingService) { }

  ngOnInit(): void {
    this.fetchRecentContacts();
    this.fetchMonthlyContacts();
  }

  fetchRecentContacts() {
    this._reportingService.recentContacts(this.contactLimit).subscribe((resp:any)=>{
      if(resp.success) this.recentContacts = resp.data;
    })
  }

  fetchMonthlyContacts() {
    this._reportingService.monthlyContacts().subscribe((resp:any)=>{
      if(resp.success) {
        this.monthlyContacts = resp.data;
        this.contactData.x = this.monthlyContacts.map((m:any) => m.date);
        this.contactData.y = this.monthlyContacts.map((m:any) => m.count);
        console.log(this.contactData);
        this.contactChartOption();
      }
    })
  }

  contactChartOption() {
    this.chartContactOptions = {
      series: [
        {
          name: "Contacts",
          data: this.contactData.y,
        },
      ],
      chart: {
        type: "area",
        height: 350
      },
      plotOptions: {
        stroke: {
          curve: 'smooth',
        },
        colors:'#dea641',
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#dea641']
      },
      xaxis: {
        categories: this.contactData.x
      },
      yaxis: {
        title: {
          text: "Contacts Per Month",
        }
      },
      fill: {
        opacity: 1,
        colors:'#dea641',
      },
      tooltip: {
        y: {
          formatter: function(val: string) {
            return val;
          },
        },
      }
    };
    console.log(this.chartContactOptions);
    this.fetched = true;
  }

  chartsReload(){
    this.chartOptions2 = {
      series: [
        {
          name: 'No',
          data: [this.crmdata.automations,this.crmdata.campaigns,this.crmdata.contacts,this.crmdata.lists,this.crmdata.tags,this.crmdata.address]
        }
      ],
      chart: {
        height: 400,
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '55%',
          endingShape: 'rounded',
        }
      },
      fill: {
        opacity: 1,
        colors:'#dea641',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        // type: "datetime"
        categories: ['Automations','Campaigns','Contacts','Lists','Tags','Address']
      },
      tooltip: {
        x: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
    };
  }

  contactIcon(contact:any){
    var fullname = (contact.firstname ? contact.firstname : '') + (contact.lastname ? contact.lastname : '');
    var str = contact.firstname?.charAt(0) + contact.lastname?.charAt(0);
    if(str.length != 2) str = fullname ? fullname.slice(0, 2) : contact.email.slice(0, 2);
    return str.toUpperCase();
  }
}
