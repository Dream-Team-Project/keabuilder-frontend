import { Component, OnInit, ViewChild } from '@angular/core';
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
import { CampaignService } from 'src/app/_services/_crm/campaign.service';
import { ContactService } from 'src/app/_services/_crm/contact.service';
import { ReportingService } from 'src/app/_services/reporting.service';

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
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;
  filtercontacts:any='WEEK';
  contacts:any=[];
  contactsduration:any=[];
  fetch=false;
  crmdata:any;
  campaigns:any;
  allcontacts:Array<any> = [];
  constructor(private _reportingService : ReportingService,
    private _campaignservice: CampaignService,
    private _contactService: ContactService,) { 
    this.fetchcrmdata();
    this.fetchcontactsdata(this.filtercontacts).then((resp)=>{
      this.chartsReload();
      this.fetch=true;
  })
  this.fetchcampaigns();
  this.fetchContacts();
  }

  ngOnInit(): void {
   
  }
  chartsReload(){
    
    this.chartOptions = {
      series: [
        {
          name: "Contacts",
          data: this.contacts,
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
        categories: this.contactsduration
         
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
fetchcrmdata(){
  this._reportingService.getcrmData().subscribe((data:any)=>{
    if(data.success){
      this.crmdata=data.data;
      // console.log(this.crmdata)
    }
  })
}
  fetchcontactsdata(value:any){
    this.contacts=[];
  this.contactsduration=[];
    let obj={duration:this.filtercontacts};
    return new Promise((resolve) => {
    this._reportingService.getcontactsData(obj).subscribe((data:any)=>{
      console.log(data)
      if(data.success){
        let i=0;
        data.data.map((element:any) =>{
          if(i < 20){
          this.contacts.push(element.contacts);
          this.contactsduration.push(element.week);
          }
          i++;
        });
        // console.log(this.contacts)
        //   console.log(this.contactsduration)
          }
          resolve(true);
        });
    })
}
getdata(event:any){
  // console.log(event)
  this.filtercontacts=event;
  this.fetchcontactsdata(this.filtercontacts).then((resp)=> this.chartsReload());
}
fetchcampaigns(){
  this._campaignservice.fetchcampaigns().subscribe({
    next: resp => {
      // console.log(resp.data);
     this.campaigns=resp?.data;
    }
  });
}
fetchContacts() {
  this._contactService.fetchcontacts().subscribe((resp) => {
    this.allcontacts=resp?.data;
    // console.log(this.allcontacts)
});
}

}
