import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';
import { DashboardService } from '../../_services/dashboard.service';
import { UserService } from '../../_services/user.service';
import { ReportingService } from 'src/app/_services/reporting.service';

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

  error?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  username = '';
  greeting: any = '';
  hidefornow = false;
  totalrevenue: any = 0;
  totalrevenue7day: any = 0;
  totalmembers: any = 0;
  data1: any = [];
  data1date: any = [];
  data2: any = [];
  data2date: any = [];
  totalcontact7day = 0;
  recentsales:any = [];
  dailysales:any = 0;
  randomwelcome = "";
  // contact reporting
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
  constructor(
    private _reportingService : ReportingService,
    private dashboardService: DashboardService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    public userService: UserService
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
    this.chartOptions4 = {
      series: [1024, 500, 13],
      chart: {
        width: 350,
        type: 'pie',
      },
      labels: ['Opened', 'Unopened', 'Bounced'],
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
    this.chartOptions5 = {
      series: [500, 400, 1],
      chart: {
        width: 350,
        type: 'pie',
      },
      labels: ['Opened', 'Unopened', 'Bounced'],
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
    this.chartOptions7 = {
      series: [
        {
          name: 'Total Visitors',
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
    // this.userService.getUsersDetails().subscribe({
    //   next: (data) => {
    //     this.username = data.data[0].firstname;
    //   },
    // });

    // if (this.tokenStorage.getToken()) {
    //   this.username = this.tokenStorage.getUser().username;
    // }

    this.greetings();

    this.dashboardService.getAllrevenue().subscribe({
      next: (data) => {
        // console.log(data);
        if (data.data.length != 0) {
          data.data.forEach((element: any) => {
            if(element.total_sales_amount!=null){
              this.totalrevenue += parseFloat(element.total_sales_amount);
            }
          });
        }
      },
    });

    this.dashboardService.getAllcontact().subscribe({
      next: (data) => {
        // console.log(data);
        if (data.data.length != 0) {
          this.totalmembers = data.data[0]['count(*)'];
        }
      },
    });

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

    // daliy sales activity
    this.dashboardService.dailysales().subscribe({
      next: (data) => {
        // console.log(data);

        if (data.data.length != 0) {

          if(data.data[0].total_sales_amount!=null){
            this.dailysales = data.data[0].total_sales_amount;
          }
        }

      },
    });

    // total earning activity
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

    this.fetchDateReportContacts();
    this.fetchRecentCampaigns();


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
        this.contact.monthly = resp.data;
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
          name: 'Earnings',
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
        width: 2,
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
        colors: ['#dea641'],
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
        type: 'donut',
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

  greetings() {
    var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;

    if (hrs < 12) greet = 'Morning';
    else if (hrs >= 12 && hrs <= 17) greet = 'Afternoon';
    else if (hrs >= 17 && hrs <= 24) greet = 'Evening';

    this.greeting = greet;
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

}
