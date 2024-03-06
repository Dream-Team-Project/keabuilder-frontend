import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';
import { DashboardService } from '../../_services/dashboard.service';
import { UserService } from '../../_services/user.service';
import { ReportingService } from 'src/app/_services/reporting.service';
import { HeatmapsService } from 'src/app/_services/heatmaps.service';
import { GoogleChartInterface } from 'ng2-google-charts';

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
import { CookieService } from 'ngx-cookie-service';

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

const sparkLineData :any = [
  47,
  45,
  54,
  38,
  56,
  24,
  65,
  31,
  37,
  39,
  62,
  51,
  35,
  41,
  35,
  27,
  93,
  53,
  61,
  27,
  54,
  43,
  19,
  46
];

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

  public chartOptions15: Partial<ChartOptions> | any;
  public chartOptions16: Partial<ChartOptions> | any;
  public chartOptions17: Partial<ChartOptions> | any;
  public chartOptions18: Partial<ChartOptions> | any;
  public chartOptions19: Partial<ChartOptions> | any;
  public chartOptions20: Partial<ChartOptions> | any;
  public chartOptions21: Partial<ChartOptions> | any;
  public chartOptions22: Partial<ChartOptions> | any;
  public chartOptions23: Partial<ChartOptions> | any;
  public chartOptions24: Partial<ChartOptions> | any;
  public chartOptions25: Partial<ChartOptions> | any;
  public chartOptions26: Partial<ChartOptions> | any;
  public chartOptions27: Partial<ChartOptions> | any;
  public chartOptions28: Partial<ChartOptions> | any;
  public chartOptions29: Partial<ChartOptions> | any;
  public chartOptions30: Partial<ChartOptions> | any;
  public chartOptions31: Partial<ChartOptions> | any;
  public chartOptions32: Partial<ChartOptions> | any;

  public pieChartData: GoogleChartInterface = {
    chartType: 'GeoChart',
    dataTable: [['Country', 'Visit']],
    options: {
      height: 400,
      colorAxis: { colors: ['#FFD700', '#FF0000'] },
      datalessRegionColor: '#f8bbd0',
      defaultColor: '#f5f5f5',
      fetched:false,
    },
    
  };
  
  loadmore=false;
  isDarkMode: boolean = false;
  error?: string;
  fetching=false;
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
  sparkline:any = {
    data: [],
    data2:[],
    fetched:false
  }

  course_revenue:any = {
    prices: [
      8107.85,
      8128.0,
      8122.9,
      8165.5,
      8340.7,
      8423.7,
      8423.5,
      8514.3,
      8481.85,
      8487.7,
      8506.9,
      8626.2,
      8668.95,
      8602.3,
      8607.55,
      8512.9,
      8496.25,
      8600.65,
      8881.1,
      9340.85
    ],
    dates: [
      "13 Nov 2017",
      "14 Nov 2017",
      "15 Nov 2017",
      "16 Nov 2017",
      "17 Nov 2017",
      "20 Nov 2017",
      "21 Nov 2017",
      "22 Nov 2017",
      "23 Nov 2017",
      "24 Nov 2017",
      "27 Nov 2017",
      "28 Nov 2017",
      "29 Nov 2017",
      "30 Nov 2017",
      "01 Dec 2017",
      "04 Dec 2017",
      "05 Dec 2017",
      "06 Dec 2017",
      "07 Dec 2017",
      "08 Dec 2017"
    ],
    fetched:false
 }
 top_query:any=[
  {name:'Personal Coaching Sences',click:'10',impressions:'25'},
  {name:'Simplicity Coach',click:'20',impressions:'25'},
  {name:'Life Coach',click:'20',impressions:'25'},
 ]

  data_topcountry:any = {};
  data_topreferrals:any = [];
  data_toplandingpage:any = [];
  // chartData: any[] = [['Country', 'Count']];

  constructor(
    private _reportingService : ReportingService,
    private dashboardService: DashboardService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    public userService: UserService,
    private heatmapsService: HeatmapsService,
    private cookieService: CookieService
  ) {
    this.getTheme();
    this.fetching=true;
    this.chartOptions = {
      series: [
        {
          name: 'Earning',
          data: this.data1,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
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
        // height: 350,
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
        // height: 350,
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
        // height: 350,
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
        // height: 350,
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
        // height: 350,
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
    // this.pieChart = {
    //     chartType: 'GeoChart',
    //     dataTable: this.chartData,
    //     options: {
    //       region: 'world',
    //       resolution: 'countries',
    //       colorAxis: { colors: ['red', 'orange', 'yellow', 'green'] },
    //       datalessRegionColor: '#f8bbd0',
    //       defaultColor: '#f5f5f5',
    //     }
    // };
  }

  ngOnInit(): void {
   this.allfunctions();
  }
  getTheme() {
    const theme = this.cookieService.get('theme');
    // console.log(theme)
    if (theme) {
      this.isDarkMode = theme === 'dark';
    } else {
      this.isDarkMode = false;
    }
  }

  allfunctions(){
    let datacondition2 = { type: 'lastweekrevenue', option: '7 DAY' };
    this.dashboardService.getconditionaldata(datacondition2).subscribe({
      next: (data:any) => {
        // // console.log(data);
        if(data.success){
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

        if (data?.data?.length == 0) {
          this.data1date.push(months[d.getMonth()] + ' ' + dt);
          this.data1.push(0);
        } else {
          data?.data?.forEach((element: any) => {
            var arr: any = { name: '', value: 0 };
            arr.name = months[d.getMonth()] + ' ' + dt;
            arr.value = parseFloat(element.amount);
            newarr.push(arr);
            this.totalrevenue7day += parseFloat(element.amount);
          });
          // // console.log(newarr);
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
            // // console.log(element3);
            this.data1date.push(element3.name);
            this.data1.push(element3.value);
          });

          // // console.log(this.data1date);
        }
      }
      },
    });

    // last week contact
    let datacondition = { type: 'lastweekcontact', option: '7 DAY' };
    this.dashboardService.getconditionaldata(datacondition).subscribe({
      next: (data:any) => {
        // // console.log(data);

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
            // // console.log(element3);
            this.data2date.push(element3.name);
            this.data2.push(element3.value);
          });
        }
      },
    });

    // recent sales activity
    this.dashboardService.getrecentsales().subscribe({
      next: (data:any) => {
        // // console.log(data);

        if (data?.data?.length != 0) {
          let emailMap = new Map(data?.data2?.map((item:any) => [item.uniqueid, item.email]));
          let newArray1 = data?.data.map((item:any) => {
              let email = emailMap.get(item.contactid);
              let time_ago = this.timeAgo(item.created_at);
              return { ...item, email, time_ago };
          });
          this.recentsales = newArray1;
          // // console.log(this.recentsales);
        }

      },
    });

    this.fetchUserplan();
    this.allrevenue();
    this.allcontact();
    this.dailySales();

    // total earning activity
    this.totalearn();

    this.fetchDateReportContacts();
    this.fetchRecentCampaigns();
    this.randomwelm();
   
    this.dashboardheat();

    this.pageviews();

    this.visitordata({ type: 'newvsreturn'});

    this.visitordevice({ type: 'device'});
    
    this.visitortopcountries({ type: 'topcountries'}).then((resp:any)=>{
      this.drawGeoChart()
    });
    
    this.visitortopreferrals({ type: 'topreferrals'});
    
    this.visitorlanding_page({ type: 'toplanding_page'});
    
    this.visitorbrowser({ type: 'browser'});

    this.visitoros({ type: 'os'});
    this.saleschart();
    this.visitchart();
    this.activeusers();
    this.revenuechart();
    this.ticketsupportchart();
    this.emailtimeChart();
    this.Bestperformerchart();
    this.coursemembers();
    this.courserevenue(); 
    this.topcourses();
    this.browserbreakdown();
    this.devicebrakdown();
    this.heatMapchart();
    this.fetching=false;
  }
   
  visitorbrowser(condition:any){
    this.fetching=true;
    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data:any) => {
        // // console.log(data);

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
        this.fetching=false;
      }
    });

  }

  visitoros(condition:any){
    this.fetching=true;
    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data:any) => {
        // // console.log(data);

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
        this.fetching=false;
      }
    });

  }

  visitorlanding_page(condition:any){
    this.fetching=true;
    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data:any) => {
          // // console.log(data);
          if(data.data?.length>0){
            data.data.sort((a:any, b:any) => b.count - a.count);
            this.data_toplandingpage = data.data;
          }
          this.fetching=false;
      }
    });

  }

  visitortopreferrals(condition:any){
    this.fetching=true;
    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data:any) => {
          // // console.log(data);
          if(data.data?.length>0){
            data.data.sort((a:any, b:any) => b.count - a.count);
            this.data_topreferrals = data.data;
          }
          this.fetching=false;
      }
    });

  }

  visitortopcountries(condition:any){
    return new Promise((resolve) => {
    this.fetching=true;
    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data:any) => {
          // // console.log(data);
          if(data.data?.length>0){
            data.data.sort((a:any, b:any) => b.count - a.count);
            this.data_topcountry = data.data;
            // console.log(this.data_topcountry)
          }
          this.fetching=false;
          resolve(true);
      }
    });
  });

  }

  visitordevice(condition:any){
    this.fetching=true;
    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data:any) => {
        // // console.log(data);

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
        this.fetching=false;
      }
    });

  }

  visitordata(condition:any){
    this.fetching=true;
    this.dashboardService.visitordata(condition.type).subscribe({
      next: (data) => {
        // // console.log(data);

        var dt = data.data;
        if(dt?.length>0){
          var dtnew = [parseInt(dt[0].percentage),parseInt(dt[1].percentage)];
          this.data_newvsret.data = dtnew;
        }else{
          this.data_newvsret.data = [0,0]
        }
        this.pagenewvsretReportOptions();
        this.fetching=false;
      },
    });

  }

  pageviews(){
    this.fetching=true;
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
        this.fetching=false;

      },
    });

  }

  allrevenue(){
    this.fetching=true;
    this.dashboardService.getAllrevenue(this.revenuelimit).subscribe({
      next: (data) => {
        // // console.log(data);
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
        this.fetching=false;
      },
    });

  }

  allcontact(){
    this.fetching=true;
    this.dashboardService.getAllcontact(this.contactlimit).subscribe({
      next: (data) => {
        // // console.log(data);
        if (data.data.length != 0 && data.data.length != null) {
          this.totalmembers = data.data[0]['count(*)'];
        }
        else{
          this.totalmembers =0;
        }
        this.fetching=false;
      },
    });

  }

  totalearn(){
    this.fetching=true;
    this.dashboardService.totalearning().subscribe({
      next: (data) => {
        // // console.log(data);
        if (data.data.length != 0) {

          const inputData = data.data;
          const resultData = new Array(12).fill(0); 
          inputData.forEach((item:any) => {
            const monthIndex = parseInt(item.month.split('-')[1]) - 1; 
            const totalSum = parseInt(item.total_sum);
            resultData[monthIndex] = totalSum;
          });
          
          // // console.log(resultData);
          this.totalearningsreport(resultData);

        }else{
        var data:any = [0,0,0,0,0,0,0,0,0,0,0,0];
          this.totalearningsreport(data);
        }
        this.fetching=false;
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
    this.fetching=true;
    this.dashboardService.plandata().subscribe((data:any)=>{
      // // console.log(data.data[0])
      if(data.success){
        this.userplan=data.data[0];
      }
      else{
        this.userplan=[];
      }
      this.fetching=false;
    })
  }

  dashboardheat(){
    this.dashboardService.getdashboardheat(this.visitlimit).subscribe({
      next: (data) => {
        // // console.log(data);

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
    // // console.log(data);

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
        // console.log(resp.data);
        this.contact.monthly = resp.data;
        this.contact.totalcontacts=resp.data[0]?.contacts;
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
        // // console.log(this.campaign);

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
        // colors: ['#dea641'],
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
        colors:['#00ff00'],
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
    // this.chartOptions10 = {
    //   series: [
    //     {
    //       name: "Current Month Contact",
    //       data: this.contact.chartData.y,
    //     },
    //   ],
    //   chart: {
    //     type: "bar", // Change the chart type to "bar" for a bar graph
    //     // height: 350,
    //   },
    //   plotOptions: {
    //     bar: { // Specify bar plot options
    //       horizontal: false, // Set to true for horizontal bars
    //       endingShape: 'rounded',
    //     },
    //   },
    //   colors: ['#dea641'],
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   stroke: {
    //     show: true,
    //     // width: 2,
    //     colors: ['#dea641'],
    //   },
    //   xaxis: {
    //     categories: this.contact.chartData.x,
    //   },
    //   yaxis: {
    //     title: {
    //       text: "",
    //     },
    //     decimalsInFloat: 0, // Adjust the decimal places
    //   },
    //   fill: {
    //     opacity: 0.5,
    //     colors: ['#044'],
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function (value: string) {
    //         return value;
    //       },
    //     },
    //   },
    // }
    this.chartOptions10 = {
      series: this.contact.chartData.y,
      chart: {
        type: "radialBar",
        offsetY: -20
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -2,
              fontSize: "22px"
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        }
      },
      labels: ["Average Results"]
    };
    this.contact.fetched = true;
  }

  campaignReportOptions() {
    // this.chartOptions12 = {
    //   series: this.campaign.chartData.y,
    //   chart: {
    //     type: 'pie',
    //     height: 350,
    //     dropShadow: {
    //       enabled: true,
    //       color: '#111',
    //       top: -1,
    //       left: 3,
    //       blur: 3,
    //       opacity: 0.2,
    //     },
    //   },
    //   stroke: {
    //     width: 0,
    //   },
    //   plotOptions: {
    //     pie: {
    //       donut: {
    //         labels: {
    //           show: true,
    //           total: {
    //             showAlways: true,
    //             show: true,
    //           },
    //         },
    //       },
    //     },
    //     expandOnClick: true,
    //   },
    //   labels: this.campaign.chartData.x.map((label:string) => label.charAt(0).toUpperCase() + label.slice(0,8)+'...'),
    //   dataLabels: {
    //     dropShadow: {
    //       blur: 2,
    //       opacity: 0.8,
    //     },
    //     formatter(value: any, opts: any): any {
    //       return opts.w.config.series[opts.seriesIndex];
    //     },
    //   },
    //   fill: {
    //     type: 'pattern',
    //     opacity: 1,
    //     pattern: {
    //       enabled: true,
    //       style: [
    //         'verticalLines',
    //         'squares',
    //         'horizontalLines',
    //         'circles',
    //         'slantedLines',
    //       ],
    //     },
    //   },
    //   states: {
    //     hover: {
    //       filter: {
    //         type: 'none',
    //       },
    //     },
    //   },
    //   theme: {
    //     palette: 'palette2',
    //   },
    //   title: {
    //     text: '',
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200,
    //         },
    //         legend: {
    //           position: 'bottom',
    //         },
    //       },
    //     },
    //   ],
    // };
    this.chartOptions12 = {
      series: this.campaign.chartData.y,
      // series: [44, 55, 67, 83],
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Total",
              formatter: function(w:any) {
                return "249";
              }
            }
          }
        }
      },
      labels: this.campaign.chartData.x.map((label:string) => label.charAt(0).toUpperCase() + label.slice(0,8)+'...'),
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
        // type: "pie",
        type: "donut",
        height:350,
        // width:350,
      },
      fill: {
        type: "gradient"
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
      ],
      // legend: {
      //   show: true,
      //   floating: true,
      //   fontSize: "16px",
      //   position: "bottom",
      //   offsetX: 50,
      //   offsetY: 10,
      //   labels: {
      //     useSeriesColors: true
      //   },
      // },
    };

    this.data_newvsret.fetched = true;

  }

  deviceReportOptions() {

    this.chartOptions5 = {
      series: this.data_devicebreak.data2,
      chart: {
        type: "donut",
        height:350,
        // width:350,
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

    // this.chartOptions13 = {
    //   series: this.data_browserbreak.data2,
    //   chart: {
    //     type: "radar",
    //     height:350,
    //     width:350,
    //   },
    //   labels: this.data_browserbreak.data,
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         chart: {
    //           width: 200
    //         },
    //         legend: {
    //           position: "bottom"
    //         }
    //       }
    //     }
    //   ]
    // };
    this.chartOptions13 = {
      series: this.data_browserbreak.data2,
        chart: {
          // width: 380,
          height:350,
          type: 'polarArea'
        },
        labels: this.data_browserbreak.data,
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: ["#a7f605"],
        },
        yaxis: {
          show: false
        },
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            }
          }
        },
        theme: {
          monochrome: {
            //    enabled: true,
            shadeTo: 'light',
            shadeIntensity: 0.6
          }
        }
    };
    this.data_browserbreak.fetched = true;

  }

  osReportOptions() {

    this.chartOptions14 = {
      series: this.data_osbreak.data2,
      chart: {
        type: "polarArea",
        height:350,
        // width:350,
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
  
  drawGeoChart() {
    this.data_topcountry.total_count=0;
    this.data_topcountry.forEach((item:any) => {
      this.pieChartData.dataTable.push([item.location, item.count]);
      this.data_topcountry.total_count=parseInt(this.data_topcountry.total_count)+parseInt(item.count);
      this.pieChartData.options.fetched=true;
    });

    // this.pieChart = {
    //   chartType: 'GeoChart',
    //   dataTable: this.chartData,
    //   options: {
    //     region: 'world',
    //     resolution: 'countries',
    //     colorAxis: { colors: ['red', 'orange', 'yellow', 'green'] },
    //     datalessRegionColor: '#f8bbd0',
    //     defaultColor: '#f5f5f5',
    //   }
    // };
  }
  saleschart() {

    this.chartOptions15 = {
      chart: {
        type: "area",
        height: 100,
        sparkline: {
          enabled: true
        }
      },
      stroke: {
        curve: "straight"
      },
      fill: {
        opacity: 0.3
      },
      yaxis: {
        min: 0
      },
      series: [
        {
          name: "sales",
          data: this.randomizeArray(sparkLineData)
        }
      ],
      colors: ["#DCE6EC"],
      // title: {
      //   text: "$424,652",
      //   offsetX: 0,
      //   style: {
      //     fontSize: "24px"
      //   }
      // },
      // subtitle: {
      //   text: "Sales",
      //   offsetX: 0,
      //   style: {
      //     fontSize: "14px"
      //   }
      // }
    };
    this.sparkline.fetched = true;

  }
  visitchart() {

    this.chartOptions16 = {
      chart: {
        type: "line",
        height: 100,
        sparkline: {
          enabled: true
        }
      },
      stroke: {
        curve: "straight"
      },
      fill: {
        opacity: 0.3
      },
      yaxis: {
        min: 0
      },
      series: [
        {
          name: "Clients",
          data: this.randomizeArray(sparkLineData)
        }
      ],
      colors: ["#a7f605"],
      // title: {
      //   text: "$424,652",
      //   offsetX: 0,
      //   style: {
      //     fontSize: "24px"
      //   }
      // },
      // subtitle: {
      //   text: "Sales",
      //   offsetX: 0,
      //   style: {
      //     fontSize: "14px"
      //   }
      // }
    };
    this.sparkline.fetched = true;

  }
  activeusers() {

    this.chartOptions17 = {
      chart: {
        type: "bar",
        height: 100,
        sparkline: {
          enabled: true
        }
      },
      stroke: {
        curve: "straight"
      },
      fill: {
        opacity: 0.3
      },
      yaxis: {
        min: 0
      },
      series: [
        {
          name: "Users",
          data: this.randomizeArray(sparkLineData)
        }
      ],
      colors: ['#3b09f7'],
      // title: {
      //   text: "$424,652",
      //   offsetX: 0,
      //   style: {
      //     fontSize: "24px"
      //   }
      // },
      // subtitle: {
      //   text: "Sales",
      //   offsetX: 0,
      //   style: {
      //     fontSize: "14px"
      //   }
      // }
    };
    this.sparkline.fetched = true;

  }
  revenuechart() {

    this.chartOptions18 = {
      chart: {
        type: "area",
        height: 100,
        sparkline: {
          enabled: true
        }
      },
      stroke: {
        curve: "straight"
      },
      fill: {
        opacity: 0.3
      },
      yaxis: {
        min: 0
      },
      series: [
        {
          name: "Revenue",
          data: this.randomizeArray(sparkLineData)
        }
      ],
      colors: ['#f65f05'],
      // title: {
      //   text: "$424,652",
      //   offsetX: 0,
      //   style: {
      //     fontSize: "24px"
      //   }
      // },
      // subtitle: {
      //   text: "Sales",
      //   offsetX: 0,
      //   style: {
      //     fontSize: "14px"
      //   }
      // }
    };
    this.sparkline.fetched = true;

  }
  ticketsupportchart() {

    // this.chartOptions19 = {
    //   series: [70],
    //   chart: {
    //     height: 425,
    //     type: "radialBar"
    //   },
    //   plotOptions: {
    //     radialBar: {
    //       hollow: {
    //         size: "70%",
    //       }
    //     }
    //   },
    //   labels: ["Completed"]
    // };
    this.chartOptions19 = {
      series: [70],
      chart: {
        height: 425,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val:any) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Completed"]
    };
      
    this.sparkline.fetched = true;

  }
  randomizeArray(arg:[]): number[] {
    var array = arg.slice();
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  emailtimeChart(){
    this.chartOptions20 = {
      series: [
        {
          name: "Emails",
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart:any, w:any, e:any) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: true
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ["12AM - 3AM","EST "],
          ["3.01AM - 6AM","EST "],
          ["6.01AM - 9AM","EST "],
          ["9.01AM - 12PM","PM EST "],
          ["12.01PM - 3PM","EST "],
          ["3.01PM - 6PM","EST "],
          ["6.01PM - 9PM","EST "],
          ["9.01PM - 12AM","EST"],
        ],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8",
            ],
            fontSize: "8px"
          }
        }
      }
    };
  }
  Bestperformerchart() {
    this.chartOptions21 = {
      // series: this.campaign.chartData.y,
      series: [44, 55, 67, 83,24],
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Total",
              formatter: function(w:any) {
                return "249";
              }
            }
          }
        }
      },
      labels: ['Website',
               'Funnel',
              'Product',
               'Blog',
              'Other'],
        legend: {
                show: true,
                floating: true,
                fontSize: "16px",
                position: "bottom",
                offsetX: 50,
                offsetY: 8,
                labels: {
                  useSeriesColors: true
                },
                formatter: function(seriesName:any, opts:any) {
                  return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
                },
                itemMargin: {
                  horizontal: 3
                }
              },
    };    
    this.campaign.fetched = true;
  }
  coursemembers(){
    this.chartOptions22 = {
      // series: this.campaign.chartData.y,
        series: [86, 49, 35],
        chart: {
          height: 350,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px"
              },
              value: {
                fontSize: "16px"
              },
              total: {
                show: true,
                label: "Total Members",
                formatter: function(w:any) {
                  return "85";
                }
              }
            }
          }
        },
        labels: ['Total Members', 'Paid Members', 'Special Members'],
        legend: {
          show: true,
          floating: true,
          fontSize: "16px",
          position: "bottom",
          offsetX: 50,
          offsetY: 10,
          labels: {
            useSeriesColors: true
          },
          formatter: function(seriesName:any, opts:any) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
          },
          itemMargin: {
            horizontal: 3
          }
        },
      };  
    // this.course_member.fetched = true;  
  }
  courserevenue(){
    this.chartOptions23 = {
      series: [
        {
          name: "Revenue",
          data: this.course_revenue.prices,
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        },
        colors:['#FB67CA'],
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      labels: this.course_revenue.dates,
    };
  }

  topcourses(){
    this.chartOptions24 = {
      series: [
        {
          name: "No Of Subscribers",
          data: [20, 100, 40, 30, 50, 80, 33]
        }
      ],
      chart: {
        height: 350,
        type: "radar"
      },
      dataLabels: {
        enabled: true
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColor: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"]
            }
          }
        }
      },
      title: {
        // text: "Radar with Polygon Fill"
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColors: ["#FF4560"],
        strokeWidth: 2
      },
      tooltip: {
        y: {
          formatter: function(val:any) {
            return val;
          }
        }
      },
      xaxis: {
        categories: [
          "Course1",
          "Course2",
          "Course3",
          "Course4",
          "Course5",
          "Course6",
          "Course7",
        ]
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: function(val:any, i:any) {
            if (i % 2 === 0) {
              return val;
            } else {
              return "";
            }
          }
        }
      }
    };
  }

  browserbreakdown(){
    this.chartOptions26 = {
      series: [70],
      chart: {
        width:100,
        height: 100,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            padding:0,
            size: '10%', 
          },
          dataLabels: {
            showOn: 'always',
            name: {
              // offsetY: -10,
              show: true,
              // color: '#888',
              fontSize: '10px',
            },
            value: {
              offsetY: 5,
              color: '#111',
              fontSize: '10px',
              show: true,
            },
            labels: {
              position: "bottom",
              offsetX: 10, 
              offsetY: 0, 
              rotate: 0 
            },
          }
        }
      },
      labels: [""]
    };
    this.chartOptions27 = {
      series: [50],
      chart: {
        width:100,
        height: 100,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            padding:0,
            size: '10%' 
          },
          dataLabels: {
            showOn: 'always',
            name: {
              // offsetY: -10,
              show: true,
              // color: '#888',
              fontSize: '10px',
            },
            value: {
              offsetY: 5,
              color: '#111',
              fontSize: '10px',
              show: true,
            },
            labels: {
              position: "bottom",
              offsetX: 10, 
              offsetY: 0, 
              rotate: 0 
            },
          }
        }
      },
      labels: [""]
    };
    this.chartOptions28 = {
      series: [40],
      chart: {
        width:100,
        height: 100,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            padding:0,
            size: '10%' 
          },
          dataLabels: {
            showOn: 'always',
            name: {
              // offsetY: -10,
              show: true,
              // color: '#888',
              fontSize: '10px',
            },
            value: {
              offsetY: 5,
              color: '#111',
              fontSize: '10px',
              show: true,
            },
            labels: {
              position: "bottom",
              offsetX: 10, 
              offsetY: 0, 
              rotate: 0 
            },
          }
        }
      },
      labels: [""]
    };
    this.chartOptions29 = {
      series: [30],
      chart: {
        width:100,
        height: 100,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            padding:0,
            size: '10%' 
          },
          dataLabels: {
            showOn: 'always',
            name: {
              // offsetY: -10,
              show: true,
              // color: '#888',
              fontSize: '10px',
            },
            value: {
              offsetY: 5,
              color: '#111',
              fontSize: '10px',
              show: true,
            },
            labels: {
              position: "bottom",
              offsetX: 10, 
              offsetY: 0, 
              rotate: 0 
            },
          }
        }
      },
      labels: [""]
    };
    this.chartOptions30 = {
      series: [20],
      chart: {
        width:100,
        height: 100,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            padding:0,
            size: '10%' 
          },
          dataLabels: {
            showOn: 'always',
            name: {
              // offsetY: -10,
              show: true,
              // color: '#888',
              fontSize: '10px',
            },
            value: {
              offsetY: 5,
              color: '#111',
              fontSize: '10px',
              show: true,
            },
            labels: {
              position: "bottom",
              offsetX: 10, 
              offsetY: 0, 
              rotate: 0 
            },
          }
        }
      },
      labels: [""]
    };
    this.chartOptions31 = {
      series: [10],
      chart: {
        width:100,
        height: 100,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            padding:0,
            size: '10%' 
          },
          dataLabels: {
            showOn: 'always',
            name: {
              // offsetY: -10,
              show: true,
              // color: '#888',
              fontSize: '10px',
            },
            value: {
              offsetY: 5,
              color: '#111',
              fontSize: '10px',
              show: true,
            },
            labels: {
              position: "bottom",
              offsetX: 10, 
              offsetY: 0, 
              rotate: 0 
            },
          }
        }
      },
      labels: [""]
    };
  }

  devicebrakdown(){
    this.chartOptions25 = {
      series: [44, 55, 41],
      chart: {
        width: 400,
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      legend: {
        position: "bottom",
        formatter: function(val:any, opts:any) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        },
      },
      labels: ['<i class="fa-solid fa-desktop"></i> Desktop','<i class="fa-solid fa-tablet-screen-button"></i> Tablet','<i class="fa-solid fa-mobile-screen"></i> Mobile'],
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
      ],
    };
  }
  heatMapchart() {
    this.chartOptions32 = {
      series: [
        {
          name: "Jan",
          data: this.GenerateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Feb",
          data: this.GenerateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Mar",
          data: this.GenerateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Apr",
          data: this.GenerateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "May",
          data: this.GenerateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Jun",
          data: this.GenerateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Jul",
          data: this.GenerateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Aug",
          data: this.GenerateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Sep",
          data: this.GenerateData(20, {
            min: -30,
            max: 55
          })
        }
      ],
      chart: {
        height: 350,
        // width:500,
        type: "heatmap"
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              {
                from: -30,
                to: 5,
                name: "low",
                color: "#00A100"
              },
              {
                from: 6,
                to: 20,
                name: "medium",
                color: "#128FD9"
              },
              {
                from: 21,
                to: 45,
                name: "high",
                color: "#FFB200"
              },
              {
                from: 46,
                to: 55,
                name: "extreme",
                color: "#FF0000"
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      // title: {
      //   text: "HeatMap Chart with Color Range"
      // }
    };
  }

  GenerateData(count:any, yrange:any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
  loadMoreContent(){
    this.loadmore=true;
    // this.allfunctions();
  }
}
