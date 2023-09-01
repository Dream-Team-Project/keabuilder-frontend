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
  public chartCampaignOptions: Partial<ChartOptions> | any;

  currentDate:any = '';
  contact:any = {
    recents: [],
    monthly: [],
    limit: 8,
    chartData: {
      x: [],
      y: [],
    },
    date: {
      from: '',
      to: new Date()
    },
    fetched: false
  }
  campaign:any = {
    recents: [],
    monthly: [],
    limit: 8,
    chartData: {
      x: [],
      y: [],
    },
    date: {
      from: '',
      to: new Date
    },
    fetched: false
  }
  maxDate:Date = new Date();

  constructor(private _reportingService : ReportingService) {
   }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.contact.date.from = new Date(this.currentDate.setDate(this.currentDate.getDate() - 30));
    this.campaign.date.from = new Date(this.currentDate.setDate(this.currentDate.getDate() - 30));
    this.fetchRecentContacts();
    this.fetchDateReportContacts();
    this.fetchRecentCampaigns();
    this.fetchDateReportCampaigns();
  }

  // start contacts

  fetchRecentContacts() {
    this._reportingService.recentContacts(this.contact.limit).subscribe((resp:any)=>{
      if(resp.success) this.contact.recents = resp.data;
    })
  }

  fetchDateReportContacts() {
    this._reportingService.datefilterContacts(this.contact.date.from, this.contact.date.to).subscribe((resp:any)=>{
      if(resp.success) {
        this.contact.monthly = resp.data;
        this.contact.chartData.x = this.contact.monthly.map((m:any) => m.date);
        this.contact.chartData.y = this.contact.monthly.map((m:any) => m.count.toString());
        this.contactChartOption();
      }
    })
  }

  contactChartOption() {
    this.chartContactOptions = {
      series: [
        {
          name: "Contacts",
          data: this.contact.chartData.y,
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
        categories: this.contact.chartData.x
      },
      yaxis: {
        title: {
          text: "",
        },
        decimal: 0
      },
      fill: {
        opacity: 1,
        colors:'#dea641',
      },
      tooltip: {
        y: {
          formatter: function(value: string) {
            return value;
          },
        },
      }
    };
    this.contact.fetched = true;
  }

  // end contacts

  // start campaigns

  fetchRecentCampaigns() {
    this._reportingService.recentCampaigns(this.campaign.limit).subscribe((resp:any)=>{
      if(resp.success) this.campaign.recents = resp.data;
    })
  }

  fetchDateReportCampaigns() {
    this._reportingService.datefilterCampaigns(this.campaign.date.from, this.campaign.date.to).subscribe((resp:any)=>{
      if(resp.success) {
        this.campaign.monthly = resp.data;
        this.campaign.chartData.x = this.campaign.monthly.map((m:any) => m.date);
        this.campaign.chartData.y = this.campaign.monthly.map((m:any) => m.count.toString());
        this.campaignChartOption();
      }
    })
  }

  campaignChartOption() {
    this.chartCampaignOptions = {
      series: [
        {
          name: "Campaigns",
          data: this.campaign.chartData.y,
        },
      ],
      chart: {
        type: "bar", // Change the chart type to "bar" for a bar graph
        height: 350,
      },
      plotOptions: {
        bar: { // Specify bar plot options
          horizontal: false, // Set to true for horizontal bars
          endingShape: 'rounded',
        },
      },
      colors: ['#dea641'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#dea641'],
      },
      xaxis: {
        categories: this.campaign.chartData.x,
      },
      yaxis: {
        title: {
          text: "",
        },
        decimalsInFloat: 0, // Adjust the decimal places
      },
      fill: {
        opacity: 0.5,
        colors: ['#dea641'],
      },
      tooltip: {
        y: {
          formatter: function (value: string) {
            return value;
          },
        },
      },
    };    
    this.campaign.fetched = true;
  }

  // end campaigns

  contactIcon(contact:any){
    var fullname = (contact.firstname ? contact.firstname : '') + (contact.lastname ? contact.lastname : '');
    var str = contact.firstname?.charAt(0) + contact.lastname?.charAt(0);
    if(str.length != 2) str = fullname ? fullname.slice(0, 2) : contact.email.slice(0, 2);
    return str.toUpperCase();
  }
}
