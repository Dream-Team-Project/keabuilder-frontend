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
  fetching=false;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  report_type:any='last_week';
  report_campaign:any='last_week';
  report_month:any;
  campaign_month:any;
  contact:any = {
    recents: [],
    monthly: [],
    contacts:'0',
    new_contacts:'0',
    lists:'0',
    tags:'0',
    forms:'0',
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
    campaigns:'0',
    drafts:'0',
    sent:'0',
    active:'0',
    recurring:'0',
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
    this.fetching=true;
    this.currentDate = new Date();
    this.contact.date.from = new Date(this.currentDate.setDate(this.currentDate.getDate() - 30));
    this.campaign.date.from = new Date(this.currentDate.setDate(this.currentDate.getDate() - 30));
    this.fetchRecentContacts();
    this.fetchDateReportContacts();
    this.fetchRecentCampaigns();
    this.fetchDateReportCampaigns();
    this.fetching=false;
  }

  // start contacts

  fetchRecentContacts() {
    this.fetching=true;
    this._reportingService.recentContacts(this.contact.limit).subscribe((resp:any)=>{
      if(resp.success) this.contact.recents = resp.data;
      this.fetching=false;
    })
  }

  fetchDateReportContacts() {
    this.fetching=true;
    if(this.report_type == 'last_week') {
      this.contact.date.to = new Date();
      this.contact.date.from = new Date();
      this.contact.date.from.setDate(this.currentDate.getDate() - 7);
    }
    if(this.report_type == 'monthly') {
      this.contact.date.from = new Date(this.currentDate.getFullYear(), this.months.indexOf(this.report_month), 1);
      const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.months.indexOf(this.report_month) + 1, 0).getDate();
      this.contact.date.to = new Date(this.currentDate.getFullYear(), this.months.indexOf(this.report_month), lastDayOfMonth);
    }
    this._reportingService.datefilterContacts(this.contact.date.from, this.contact.date.to).subscribe((resp:any)=>{
      
      if(resp.success) {
        this.contact.monthly = resp?.data || [];
        this.contact.chartData.x = this.contact.monthly.map((m:any) => m.date) || [];
        this.contact.chartData.y = this.contact.monthly.map((m:any) => m.count.toString()) || [];
        this.contact.contacts = resp?.data[0]?.contacts || '0';
        this.contact.tags = resp?.data[0]?.tags || '0';
        this.contact.lists = resp?.data[0]?.lists || '0';
        this.contact.forms = resp?.data[0]?.forms || '0';
        this.contact.new_contacts = resp?.data[0]?.new_contacts || '0';
        this.contactChartOption();
        this.fetching=false;
      }
    })
  }

  contactChartOption() {
    // this.chartContactOptions = {
    //   series: [
    //     {
    //       name: "Contacts",
    //       data: this.contact.chartData.y,
    //     },
    //   ],
    //   chart: {
    //     type: "bar",
    //     height: 350
    //   },
    //   plotOptions: {
    //     stroke: {
    //       curve: 'smooth',
    //     },
    //     colors:'rgb(100, 116, 139)',
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   stroke: {
    //     show: true,
    //     width: 2,
    //     colors: ['rgb(100, 116, 139)']
    //     // colors: ['#dea641']
    //   },
    //   xaxis: {
    //     categories: this.contact.chartData.x
    //   },
    //   yaxis: {
    //     title: {
    //       text: "",
    //     },
    //     decimal: 0
    //   },
    //   fill: {
    //     opacity: 1,
    //     colors:'rgb(226, 232, 240)',
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function(value: string) {
    //         return value;
    //       },
    //     },
    //   }
    // };
    this.chartContactOptions = {
    series: [
      {
        name: "Contacts",
        data: this.contact.chartData.y,
      }
    ],
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: "smooth"
    },
    title: {
      text: "Contacts",
      align: "left"
    },
    grid: {
      borderColor: "#e7e7e7",
      // row: {
      //   colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      //   opacity: 0.5
      // }
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: this.contact.chartData.x,
      title: {
        text: ""
      }
    },
    yaxis: {
      title: {
        text: ""
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  }
    this.contact.fetched = true;
  }

  // end contacts

  // start campaigns

  fetchRecentCampaigns() {
    this.fetching=true;
    this._reportingService.recentCampaigns(this.campaign.limit).subscribe((resp:any)=>{
      if(resp.success) this.campaign.recents = resp.data;
      this.fetching=false;
    })
  }

  fetchDateReportCampaigns() {
    this.fetching=true;
    if(this.report_campaign == 'last_week') {
      this.campaign.date.to = new Date();
      this.campaign.date.from = new Date();
      this.campaign.date.from.setDate(this.currentDate.getDate() - 7);
    }
    if(this.report_campaign == 'monthly') {
      this.campaign.date.from = new Date(this.currentDate.getFullYear(), this.months.indexOf(this.campaign_month), 1);
      const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.months.indexOf(this.campaign_month) + 1, 0).getDate();
      this.campaign.date.to = new Date(this.currentDate.getFullYear(), this.months.indexOf(this.campaign_month), lastDayOfMonth);
    }
    this._reportingService.datefilterCampaigns(this.campaign.date.from, this.campaign.date.to).subscribe((resp:any)=>{
      // console.log(resp)
      if(resp.success) {
        this.campaign.monthly = resp.data;
        this.campaign.chartData.x = this.campaign.monthly.map((m:any) => m.date);
        this.campaign.chartData.y = this.campaign.monthly.map((m:any) => m.count.toString());
        this.campaign.active=resp?.data[0]?.active || '0';
        this.campaign.drafts=resp?.data[0]?.drafts || '0';
        this.campaign.recurring=resp?.data[0]?.recurring || '0';
        this.campaign.campaigns=resp?.data[0]?.campaigns || '0';
        this.campaign.sent=resp?.data[0]?.sent || '0';
        this.campaignChartOption();
        this.fetching=false;
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
        type: "area", // Change the chart type to "bar" for a bar graph
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

  reporttypechange(event:any){
    // console.log(event);
    this.report_type=event;
    if(event == 'last_week') this.fetchDateReportContacts();
  }
  
  reporttypechange1(event:any){
    // console.log(event);
    this.report_campaign=event;
    if(event == 'last_week') this.fetchDateReportCampaigns();
  }
}
