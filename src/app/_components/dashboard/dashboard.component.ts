import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';
import { DashboardService } from '../../_services/dashboard.service';
import { UserService } from '../../_services/user.service';
import { ReportingService } from 'src/app/_services/reporting.service';
import { HeatmapsService } from 'src/app/_services/heatmaps.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;
  public chartOptions5: Partial<ChartOptions> | any;
  public chartOptions6: Partial<ChartOptions> | any;
  public chartOptions7: Partial<ChartOptions> | any;
  public chartOptions8: Partial<ChartOptions> | any;
  public chartOptions9: Partial<ChartOptions> | any;
  public chartOptions10: Partial<ChartOptions> | any;
  public chartOptions11: Partial<ChartOptions> | any;
  public chartOptions12: Partial<ChartOptions> | any;

  public chartOptions13: Partial<ChartOptions> | any;
  public chartOptions14: Partial<ChartOptions> | any;

  error?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  username = '';
  hidefornow = false;
  totalrevenue: any = 0;
  revenuelimit:any='1';
  totalrevenue7day: any = 0;
  totalmembers: any = 0;
  contactlimit:any='1';
  data1: any = [];
  data1date: any = [];
  data2: any = [];
  data2date: any = [];
  totalcontact7day = 0;
  recentsales:any = [];
  dailysales:any = 0;
  saleslimit:any='1';
  randomwelcome = "";
  dailyvisit:any = 0;
  visitlimit:any='1';
  userplan:any;
  // contact reporting
  contact:any = {
    totalcontacts:0,
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
  data11:any = false;
  // contact reporting
  // campaign reporting
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
  // campaign reporting
  // duration:any='week';

  data_pageview:any = {
    data: [],
    data2:[],
    fetched:false
  };

  data_newvsret:any = {
    data: [],
    fetched:false
  }

  data_devicebreak:any = {
    data: [],
    data2:[],
    fetched:false
  }

  data_browserbreak:any = {
    data: [],
    data2:[],
    fetched:false
  }

  data_osbreak:any = {
    data: [],
    data2:[],
    fetched:false
  }

  data_topcountry:any = [];
  data_topreferrals:any = [];
  data_toplandingpage:any = [];


  constructor(
    private _reportingService : ReportingService,
    private dashboardService: DashboardService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    public userService: UserService,
    private heatmapsService: HeatmapsService,
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Earning',
          data: this.data1,
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + '$';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },

      xaxis: {
        categories: this.data1date,
        position: 'top',
        labels: {
          offsetY: -18,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val + '$';
          },
        },
      },
      title: {
        text: 'Weekly Earning',
        floating: 0,
        offsetY: 320,
        align: 'center',
        style: {
          color: '#444',
        },
      },
    };
    this.chartOptions2 = {
      series: [
        {
          name: 'Contact',
          data: this.data2,
        },
      ],
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: this.data2date,
      },
      tooltip: {
        x: {
          format: 'MM-dd',
        },
      },
    };
    this.chartOptions3 = {
      series: [
        {
          name: 'W1',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W2',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W3',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W4',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W5',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W6',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W7',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W8',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W9',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W10',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W11',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W12',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W13',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W14',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'W15',
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
      ],
      chart: {
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false,
      },
      colors: [
        '#F3B415',
        '#F27036',
        '#663F59',
        '#6A6E94',
        '#4E88B4',
        '#00A7C6',
        '#18D8D8',
        '#A9D794',
        '#46AF78',
        '#A93F55',
        '#8C5E58',
        '#2176FF',
        '#33A1FD',
        '#7A918D',
        '#BAFF29',
      ],
      xaxis: {
        type: 'category',
        categories: [
          '08:00',
          '10:00',
          '12:00',
          '02:00',
          '04:00',
          '06:00',
          '08:00',
          '10:00',
        ],
      },
      title: {
        text: 'Website & Funnel Combine HeatMap Report',
      },
      grid: {
        padding: {
          right: 20,
        },
      },
    };
    this.chartOptions6 = {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
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
        categories: [
          '01 Aug',
          '02 Aug',
          '03 Aug',
          '04 Aug',
          '05 Aug',
          '06 Aug',
          '07 Aug',
        ],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    };
    this.chartOptions8 = {
      series: [
        {
          name: 'Total Orders',
          data: [76, 85, 101, 98, 87, 105, 91],
        },
        {
          name: 'Abondant Cart',
          data: [44, 55, 57, 56, 61, 58, 63],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
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
        categories: [
          '01 Aug',
          '02 Aug',
          '03 Aug',
          '04 Aug',
          '05 Aug',
          '06 Aug',
          '07 Aug',
        ],
      },
      yaxis: {
        title: {
          text: '',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
    };
    this.chartOptions9 = {
      series: [
        {
          name: 'No. of Plays',
          data: [44, 55, 57, 56, 61, 58, 63],
        },
        {
          name: 'No. of Views',
          data: [76, 85, 101, 98, 87, 105, 91],
        },
        {
          name: 'No. of Downloads',
          data: [35, 41, 36, 26, 45, 48, 52],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
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
        categories: [
          '01 Aug',
          '02 Aug',
          '03 Aug',
          '04 Aug',
          '05 Aug',
          '06 Aug',
          '07 Aug',
        ],
      },
      yaxis: {
        title: {
          text: '',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.fetchUserplan();
    this.allrevenue();
    this.allcontact();
    this.dailySales();
    // last week revenue
    var datacondition2 = { type: 'lastweekrevenue', option: '7 DAY' };
    this.dashboardService.getconditionaldata(datacondition2).subscribe({
      next: (data) => {
        // console.log(data);

        var newarr: any = [];

        var months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'June',
          'July',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec',
        ];
        var d = new Date();
        var dt = d.getDate();

        if (data.data.length == 0) {
          this.data1date.push(months[d.getMonth()] + ' ' + dt);
          this.data1.push(0);
        } else {
          data.data.forEach((element: any) => {
            var arr: any = { name: '', value: 0 };
            arr.name = months[d.getMonth()] + ' ' + dt;
            arr.value = parseFloat(element.amount);
            newarr.push(arr);
            this.totalrevenue7day += parseFloat(element.amount);
          });
          // console.log(newarr);
          var output: any = [];

          newarr.forEach(function (item: any) {
            var existing = output.filter(function (v: any, i: any) {
              return v.name == item.name;
            });
            if (existing.length) {
              var existingIndex = output.indexOf(existing[0]);
              output[existingIndex].value =
                output[existingIndex].value + item.value;
            } else {
              if (typeof item.value == 'string') item.value = [item.value];
              output.push(item);
            }
          });

          output.forEach((element3: any) => {
            // console.log(element3);
            this.data1date.push(element3.name);
            this.data1.push(element3.value);
          });

          // console.log(this.data1date);
        }
      },
    });

    // last week contact
    var datacondition = { type: 'lastweekcontact', option: '7 DAY' };
    this.dashboardService.getconditionaldata(datacondition).subscribe({
      next: (data) => {
        // console.log(data);

        var newarr: any = [];

        if (data.data.length == 0) {
          this.data2date.push(new Date());
          this.data2.push(0);
        } else {
          data.data.forEach((element: any) => {
            var arr: any = { name: '', value: 1 };
            arr.name = element.created_at;
            newarr.push(arr);
            this.totalcontact7day += 1;
          });
          var output: any = [];

          newarr.forEach(function (item: any) {
            var existing = output.filter(function (v: any, i: any) {
              return v.name == item.name;
            });
            if (existing.length) {
              var existingIndex = output.indexOf(existing[0]);
              output[existingIndex].value =
                output[existingIndex].value + item.value;
            } else {
              if (typeof item.value == 'string') item.value = [item.value];
              output.push(item);
            }
          });

          output.forEach((element3: any) => {
            // console.log(element3);
            this.data2date.push(element3.name);
            this.data2.push(element3.value);
          });
        }
      },
    });

    // recent sales activity
    this.dashboardService.getrecentsales().subscribe({
      next: (data) => {
        // console.log(data);

        if (data.data.length != 0) {
          let emailMap = new Map(data.data2.map((item:any) => [item.uniqueid, item.email]));
          let newArray1 = data.data.map((item:any) => {
              let email = emailMap.get(item.contactid);
              let time_ago = this.timeAgo(item.created_at);
              return { ...item, email, time_ago };
          });
          this.recentsales = newArray1;
          // console.log(this.recentsales);
        }

      },
    });

   

    // total earning activity
    this.totalearn();

    this.fetchDateReportContacts();
    this.fetchRecentCampaigns();
    this.randomwelm();
   
    this.dashboardheat();

    this.pageviews();

    this.visitordata({ type: 'newvsreturn'});

    this.visitordevice({ type: 'device'});
    
    this.visitortopcountries({ type: 'topcountries'});
    
    this.visitortopreferrals({ type: 'topreferrals'});
    
    this.visitorlanding_page({ type: 'toplanding_page'});
    
    this.visitorbrowser({ type: 'browser'});

    this.visitoros({ type: 'os'});

  }

  visitorbrowser(condition:any){

    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data) => {
        // console.log(data);

        var dt = data.data;
        if(dt?.length>0){

          var totalCount = dt.reduce((total:any, browser:any) => total + browser.count, 0);
          var percentages = dt.map((browser:any) => ({
              browser: browser.browser,
              percentage: (browser.count / totalCount) * 100
          }));

          percentages.sort((a:any, b:any) => b.percentage - a.percentage);
          
          percentages.forEach((elm:any) => {
            this.data_browserbreak.data.push(elm.browser);
            this.data_browserbreak.data2.push(elm.percentage);
          });

          
        }else{
          this.data_browserbreak.data.push('No Browser Found');
          this.data_browserbreak.data2.push(0);
        }

        this.browserReportOptions();

      }
    });

  }

  visitoros(condition:any){

    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data) => {
        // console.log(data);

        var dt = data.data;
        if(dt?.length>0){

          var totalCount = dt.reduce((total:any, os:any) => total + os.count, 0);
          var percentages = dt.map((os:any) => ({
              os: os.os,
              percentage: (os.count / totalCount) * 100
          }));
          
          percentages.sort((a:any, b:any) => b.percentage - a.percentage);
          
          percentages.forEach((elm:any) => {
            this.data_osbreak.data.push(elm.os);
            this.data_osbreak.data2.push(elm.percentage);
          });

          
        }else{
          this.data_osbreak.data.push('No OS Found');
          this.data_osbreak.data2.push(0);
        }

        this.osReportOptions();

      }
    });

  }

  visitorlanding_page(condition:any){

    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data) => {
          // console.log(data);
          if(data.data?.length>0){
            data.data.sort((a:any, b:any) => b.count - a.count);
            this.data_toplandingpage = data.data;
          }
      }
    });

  }

  visitortopreferrals(condition:any){

    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data) => {
          // console.log(data);
          if(data.data?.length>0){
            data.data.sort((a:any, b:any) => b.count - a.count);
            this.data_topreferrals = data.data;
          }
      }
    });

  }

  visitortopcountries(condition:any){

    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data) => {
          // console.log(data);
          if(data.data?.length>0){
            data.data.sort((a:any, b:any) => b.count - a.count);
            this.data_topcountry = data.data;
          }
      }
    });

  }

  visitordevice(condition:any){

    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data) => {
        // console.log(data);

        var dt = data.data;
        if(dt?.length>0){

          var totalCount = dt.reduce((total:any, device:any) => total + device.count, 0);
          var percentages = dt.map((device:any) => ({
              device: device.device,
              percentage: (device.count / totalCount) * 100
          }));
          
          percentages.forEach((elm:any) => {
            this.data_devicebreak.data.push(elm.device);
            this.data_devicebreak.data2.push(elm.percentage);
          });

          
        }else{
          this.data_devicebreak.data.push('No Device Found');
          this.data_devicebreak.data2.push(0);
        }

        this.deviceReportOptions();

      }
    });

  }

  visitordata(condition:any){

    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data) => {
        // console.log(data);

        var dt = data.data;
        if(dt?.length>0){
          var dtnew = [parseInt(dt[0].percentage),parseInt(dt[1].percentage)];
          this.data_newvsret.data = dtnew;
        }else{
          this.data_newvsret.data = [0,0]
        }
        this.pagenewvsretReportOptions();

      },
    });

  }

  pageviews(){

    this.dashboardService.pageview().subscribe({
      next: (data) => {
        // console.log(data);

        if(data.data.length>0){

          var mkdata:any = [];
          var mkdata2:any = [];
          data.data.forEach((elm:any) => {
            mkdata.push(elm.distinct_ipv4_count);
            mkdata2.push(elm.date);
          });
          this.data_pageview.data = mkdata;
          this.data_pageview.data2 = mkdata2;
          
        }

        this.pageviewReportOptions();


      },
    });

  }

  allrevenue(){
    this.dashboardService.getAllrevenue(this.revenuelimit).subscribe({
      next: (data) => {
        // console.log(data);
        if (data.data.length != 0) {
          data.data.forEach((element : any) => {
            if(element.total_sales_amount!=null){
              this.totalrevenue = parseFloat(element.total_sales_amount);
            }
            else{
              this.totalrevenue=0;
            }
          });
        }
        else{
          this.totalrevenue=0;
        }
      },
    });

  }

  allcontact(){

    this.dashboardService.getAllcontact(this.contactlimit).subscribe({
      next: (data) => {
        // console.log(data);
        if (data.data.length != 0 && data.data.length != null) {
          this.totalmembers = data.data[0]['count(*)'];
        }
        else{
          this.totalmembers =0;
        }
      },
    });

  }

  totalearn(){
    this.dashboardService.totalearning().subscribe({
      next: (data) => {
        // console.log(data);
        if (data.data.length != 0) {

          const inputData = data.data;
          const resultData = new Array(12).fill(0); 
          inputData.forEach((item:any) => {
            const monthIndex = parseInt(item.month.split('-')[1]) - 1; 
            const totalSum = parseInt(item.total_sum);
            resultData[monthIndex] = totalSum;
          });
          
          // console.log(resultData);
          this.totalearningsreport(resultData);

        }else{
        var data:any = [0,0,0,0,0,0,0,0,0,0,0,0];
          this.totalearningsreport(data);
        }

      },
    });
  }

  triggerFunction(event:any,type:any) {
  if(type== 'visit') {
    this.visitlimit=event.target.value;
    this.dashboardheat();
  }
  else if( type== 'revenue') {
    this.revenuelimit=event.target.value;
    this.allrevenue();
  }
  else if( type== 'contacts') {
    this.contactlimit=event.target.value;
    this.allcontact();
  }
  else if( type== 'sales') {
    this.saleslimit=event.target.value;
    this.dailySales();
  }
  }

  fetchUserplan(){
    this.dashboardService.plandata().subscribe((data:any)=>{
      // console.log(data.data[0])
      if(data.success){
        this.userplan=data.data[0];
      }
      else{
        this.userplan=[];
      }
    })
  }

  dashboardheat(){
    this.dashboardService.getdashboardheat(this.visitlimit).subscribe({
      next: (data) => {
        // console.log(data);

        if(data.data?.length>0){
          this.dailyvisit = data.data[0].daily_visits;
        }
        else{
          this.dailyvisit=0;
        }

      },
    });
  }

  dailySales(){
 // daliy sales activity
 this.dashboardService.dailysales(this.saleslimit).subscribe({
  next: (data) => {
    // console.log(data);

    if (data.data.length != 0) {

      if(data.data[0].total_sales_amount!=null){
        this.dailysales = data.data[0].total_sales_amount;
      }
      else{
        this.dailysales=0;
      }
    }
    else{
      this.dailysales=0;
    }

  },
});
  }

  randomwelm(){
    var welcomeMessages = [
      "Welcome back! We're glad to see you.",
      "Hello there! Ready to get started?",
      "Good day! Let's make it productive.",
      "Greetings! Your dashboard awaits you.",
      "Hey, it's you again! Let's dive in.",
      "Welcome! Get ready to explore a world of possibilities.",
      "Greetings! Your journey begins here.",
      "Hello! We're thrilled to have you with us.",
      "Hey there! Let's make today awesome.",
      "Welcome back! We missed you.",
      "Hello! Your presence makes us smile.",
      "Good day! Your adventure starts now.",
      "Greetings! Get ready for a fantastic experience.",
      "Hey, we hope you're ready for some exciting moments!",
      "Welcome aboard! Let's navigate this together.",
      "Hello! Your journey into our world begins now.",
      "Good to see you! Let's make today productive.",
      "Welcome back! Your presence brightens our day.",
      "Hello! We're delighted to have you here.",
      "Hey there! Let's dive into a world of possibilities.",
      "Welcome! Your adventure awaits.",
      "Greetings! Let's get started on something amazing.",
      "Hello! Your presence is the best part of our day.",
      "Good day! We're excited to have you here.",
    ];
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    this.randomwelcome = welcomeMessages[randomIndex];
  }

  fetchDateReportContacts() {
    let d = new Date();
    this.contact.date.from = new Date(d.setDate(d.getDate() - 30));
    this._reportingService.datefilterContacts(this.contact.date.from, this.contact.date.to).subscribe((resp:any)=>{
      if(resp.success) {
        console.log(resp.data);
        this.contact.monthly = resp.data;
        this.contact.totalcontacts=resp.data[0].contacts;
        this.contact.chartData.x = this.contact.monthly.map((m:any) => m.date);
        this.contact.chartData.y = this.contact.monthly.map((m:any) => m.count.toString());
        if(this.contact.monthly.length!=0){
          this.contactReportOptions();
        }
      }
    })
  }

  fetchRecentCampaigns() {
    this._reportingService.recentCampaigns(this.campaign.limit).subscribe((resp:any)=>{
      if(resp.success) {
        this.campaign.recents = resp.data;
        this.campaign.chartData.x = this.campaign.recents.map((m:any) => m.name);
        this.campaign.chartData.y = this.campaign.recents.map((m:any) => m.sentto);
        // console.log(this.campaign);

        if(this.campaign.recents.length!=0){
          this.campaignReportOptions();
        }
      }
    })
  }

  totalearningsreport(resultData:any){
    this.chartOptions11 = {
      series: [
        {
          name: 'Earnings in $',
          data: resultData,
        },
      ],
      chart: {
        type: 'area',
        height: 350,
      },

      plotOptions: {
        stroke: {
          curve: 'smooth',
        },
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
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yaxis: {
        title: {
          text: '',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val;
          },
        },
      },
    };
    this.data11 = true;
  }
  
  contactReportOptions() {
    this.chartOptions10 = {
      series: [
        {
          name: "Current Month Contact",
          data: this.contact.chartData.y,
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
        // width: 2,
        colors: ['#dea641'],
      },
      xaxis: {
        categories: this.contact.chartData.x,
      },
      yaxis: {
        title: {
          text: "",
        },
        decimalsInFloat: 0, // Adjust the decimal places
      },
      fill: {
        opacity: 0.5,
        colors: ['#044'],
      },
      tooltip: {
        y: {
          formatter: function (value: string) {
            return value;
          },
        },
      },
    }
    this.contact.fetched = true;
  }

  campaignReportOptions() {
    this.chartOptions12 = {
      series: this.campaign.chartData.y,
      chart: {
        height: 350,
        type: 'pie',
        dropShadow: {
          enabled: true,
          color: '#111',
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2,
        },
      },
      stroke: {
        width: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
        expandOnClick: true,
      },
      labels: this.campaign.chartData.x.map((label:string) => label.charAt(0).toUpperCase() + label.slice(1)),
      dataLabels: {
        dropShadow: {
          blur: 2,
          opacity: 0.8,
        },
        formatter(value: any, opts: any): any {
          return opts.w.config.series[opts.seriesIndex];
        },
      },
      fill: {
        type: 'pattern',
        opacity: 1,
        pattern: {
          enabled: true,
          style: [
            'verticalLines',
            'squares',
            'horizontalLines',
            'circles',
            'slantedLines',
          ],
        },
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
      theme: {
        palette: 'palette2',
      },
      title: {
        text: '',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };    
    this.campaign.fetched = true;
  }

  public generateData(count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push(y);
      i++;
    }
    return series;
  }

  timeAgo(timestamp:any) {
      let now:any = new Date();
      let time:any = new Date(timestamp);
      let elapsedMilliseconds = now - time;
      let seconds = Math.floor(elapsedMilliseconds / 1000);
      
      if (seconds < 60) {
          return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
      } else if (seconds < 3600) {
          let minutes = Math.floor(seconds / 60);
          return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
      } else if (seconds < 86400) {
          let hours = Math.floor(seconds / 3600);
          return `${hours} hour${hours === 1 ? '' : 's'} ago`;
      } else {
          let days = Math.floor(seconds / 86400);
          return `${days} day${days === 1 ? '' : 's'} ago`;
      }
  }

  pageviewReportOptions() {
    this.chartOptions7 = {
      series: [
        {
          name: "Unique Views",
          data: this.data_pageview.data
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
        // text: "Contacts",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: this.data_pageview.data2,
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
    // this.chartOptions7 = {
    //   series: [
    //     {
    //       name: "Unique Views",
    //       data: this.data_pageview.data
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "line",
    //     zoom: {
    //       enabled: false
    //     }
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   stroke: {
    //     curve: "straight"
    //   },
    //   title: {
    //     text: "",
    //     align: "left"
    //   },
    //   grid: {
    //     row: {
    //       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
    //       opacity: 0.5
    //     }
    //   },
    //   xaxis: {
    //     categories: this.data_pageview.data2
    //   }
    // };
    this.data_pageview.fetched = true;
  }

  pagenewvsretReportOptions() {

    this.chartOptions4 = {
      series: this.data_newvsret.data,
      chart: {
        type: "pie",
        width:380,
      },
      labels: ["New", "Returning"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.data_newvsret.fetched = true;

  }

  deviceReportOptions() {

    this.chartOptions5 = {
      series: this.data_devicebreak.data2,
      chart: {
        type: "pie",
        width:370,
      },
      labels: this.data_devicebreak.data,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.data_devicebreak.fetched = true;

  }

  makemyurl(url:any){
    let cleanedUrl = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    return cleanedUrl;
  }

  browserReportOptions() {

    this.chartOptions13 = {
      series: this.data_browserbreak.data2,
      chart: {
        type: "donut"
      },
      labels: this.data_browserbreak.data,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.data_browserbreak.fetched = true;

  }

  osReportOptions() {

    this.chartOptions14 = {
      series: this.data_osbreak.data2,
      chart: {
        type: "donut"
      },
      labels: this.data_osbreak.data,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.data_osbreak.fetched = true;

  }


}
