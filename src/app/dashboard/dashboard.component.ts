import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { DashboardService } from '../_services/dashboard.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis
} from "ng-apexcharts";

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
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;
  public chartOptions5: Partial<ChartOptions> | any;
  public chartOptions6: Partial<ChartOptions> | any;
  public chartOptions7: Partial<ChartOptions> | any;
  public chartOptions8: Partial<ChartOptions> | any;
  public chartOptions9: Partial<ChartOptions> | any;

  error?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  username= '';
  greeting:any = '';
  hidefornow = false;
  totalrevenue:any = 0;
  totalrevenue7day:any = 0;
  totalmembers:any = 0;
  data1:any = [];
  data1date:any = [];
  data2:any = [];
  data2date:any = [];
  totalcontact7day = 0;

  constructor( private dashboardService: DashboardService,
              private tokenStorage: TokenStorageService,
              private router: Router) {

                this.chartOptions = {
                  series: [
                    {
                      name: "Earning",
                      data: this.data1
                    }
                  ],
                  chart: {
                    height: 350,
                    type: "bar"
                  },
                  plotOptions: {
                    bar: {
                      dataLabels: {
                        position: "top" // top, center, bottom
                      }
                    }
                  },
                  dataLabels: {
                    enabled: true,
                    formatter: function(val:any) {
                      return val + "$";
                    },
                    offsetY: -20,
                    style: {
                      fontSize: "12px",
                      colors: ["#304758"]
                    }
                  },
            
                  xaxis: {
                    categories: this.data1date,
                    position: "top",
                    labels: {
                      offsetY: -18
                    },
                    axisBorder: {
                      show: false
                    },
                    axisTicks: {
                      show: false
                    },
                    crosshairs: {
                      fill: {
                        type: "gradient",
                        gradient: {
                          colorFrom: "#D8E3F0",
                          colorTo: "#BED1E6",
                          stops: [0, 100],
                          opacityFrom: 0.4,
                          opacityTo: 0.5
                        }
                      }
                    },
                    tooltip: {
                      enabled: true,
                      offsetY: -35
                    }
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "light",
                      type: "horizontal",
                      shadeIntensity: 0.25,
                      gradientToColors: undefined,
                      inverseColors: true,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [50, 0, 100, 100]
                    }
                  },
                  yaxis: {
                    axisBorder: {
                      show: false
                    },
                    axisTicks: {
                      show: false
                    },
                    labels: {
                      show: false,
                      formatter: function(val:any) {
                        return val + "$";
                      }
                    }
                  },
                  title: {
                    text: "Weekly Earning",
                    floating: 0,
                    offsetY: 320,
                    align: "center",
                    style: {
                      color: "#444"
                    }
                  }
                };
                this.chartOptions2 = {
                  series: [
                    {
                      name: "Funnels",
                      data: this.data2
                    }
                  ],
                  chart: {
                    height: 350,
                    type: "area"
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: "smooth"
                  },
                  xaxis: {
                    type: "datetime",
                    categories: this.data2date
                  },
                  tooltip: {
                    x: {
                      format: "MM-dd"
                    }
                  }
                };
                this.chartOptions3 = {
                  series: [
                    {
                      name: "W1",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W2",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W3",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W4",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W5",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W6",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W7",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W8",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W9",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W10",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W11",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W12",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W13",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W14",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    },
                    {
                      name: "W15",
                      data: this.generateData(8, {
                        min: 0,
                        max: 90
                      })
                    }
                  ],
                  chart: {
                    height: 350,
                    type: "heatmap"
                  },
                  dataLabels: {
                    enabled: false
                  },
                  colors: [
                    "#F3B415",
                    "#F27036",
                    "#663F59",
                    "#6A6E94",
                    "#4E88B4",
                    "#00A7C6",
                    "#18D8D8",
                    "#A9D794",
                    "#46AF78",
                    "#A93F55",
                    "#8C5E58",
                    "#2176FF",
                    "#33A1FD",
                    "#7A918D",
                    "#BAFF29"
                  ],
                  xaxis: {
                    type: "category",
                    categories: [
                      "08:00",
                      "10:00",
                      "12:00",
                      "02:00",
                      "04:00",
                      "06:00",
                      "08:00",
                      "10:00",
                    ]
                  },
                  title: {
                    text: "Website & Funnel Combine HeatMap Report"
                  },
                  grid: {
                    padding: {
                      right: 20
                    }
                  }
                };
                this.chartOptions4 = {
                  series: [1024, 500, 13],
                  chart: {
                    width: 350,
                    type: "pie"
                  },
                  labels: ["Opened", "Unopened", "Bounced"],
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
                this.chartOptions5 = {
                  series: [500, 400, 1],
                  chart: {
                    width: 350,
                    type: "pie"
                  },
                  labels: ["Opened", "Unopened", "Bounced"],
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
                this.chartOptions6 = {
                  series: [
                    {
                      name: "Net Profit",
                      data: [44, 55, 57, 56, 61, 58, 63]
                    },
                    {
                      name: "Revenue",
                      data: [76, 85, 101, 98, 87, 105, 91]
                    },
                    {
                      name: "Free Cash Flow",
                      data: [35, 41, 36, 26, 45, 48, 52]
                    }
                  ],
                  chart: {
                    type: "bar",
                    height: 350
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: "55%",
                      endingShape: "rounded"
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"]
                  },
                  xaxis: {
                    categories: [
                      "01 Aug",
                      "02 Aug",
                      "03 Aug",
                      "04 Aug",
                      "05 Aug",
                      "06 Aug",
                      "07 Aug"
                    ]
                  },
                  yaxis: {
                    title: {
                      text: "$ (thousands)"
                    }
                  },
                  fill: {
                    opacity: 1
                  },
                  tooltip: {
                    y: {
                      formatter: function(val:any) {
                        return "$ " + val + " thousands";
                      }
                    }
                  }
                };
                this.chartOptions7 = {
                  series: [
                    {
                      name: "Total Visitors",
                      data: [44, 55, 57, 56, 61, 58, 63]
                    },
                  ],
                  chart: {
                    type: "bar",
                    height: 350
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: "55%",
                      endingShape: "rounded"
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"]
                  },
                  xaxis: {
                    categories: [
                      "01 Aug",
                      "02 Aug",
                      "03 Aug",
                      "04 Aug",
                      "05 Aug",
                      "06 Aug",
                      "07 Aug"
                    ]
                  },
                  yaxis: {
                    title: {
                      text: ""
                    }
                  },
                  fill: {
                    opacity: 1
                  },
                  tooltip: {
                    y: {
                      formatter: function(val:any) {
                        return val;
                      }
                    }
                  }
                };
                this.chartOptions8 = {
                  series: [
                    {
                      name: "Total Orders",
                      data: [76, 85, 101, 98, 87, 105, 91]
                    },
                    {
                      name: "Abondant Cart",
                      data: [44, 55, 57, 56, 61, 58, 63]
                    },
                  ],
                  chart: {
                    type: "bar",
                    height: 350
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: "55%",
                      endingShape: "rounded"
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"]
                  },
                  xaxis: {
                    categories: [
                      "01 Aug",
                      "02 Aug",
                      "03 Aug",
                      "04 Aug",
                      "05 Aug",
                      "06 Aug",
                      "07 Aug"
                    ]
                  },
                  yaxis: {
                    title: {
                      text: ""
                    }
                  },
                  fill: {
                    opacity: 1
                  },
                  tooltip: {
                    y: {
                      formatter: function(val:any) {
                        return val;
                      }
                    }
                  }
                };
                this.chartOptions9 = {
                  series: [
                    {
                      name: "No. of Plays",
                      data: [44, 55, 57, 56, 61, 58, 63]
                    },
                    {
                      name: "No. of Views",
                      data: [76, 85, 101, 98, 87, 105, 91]
                    },
                    {
                      name: "No. of Downloads",
                      data: [35, 41, 36, 26, 45, 48, 52]
                    }
                  ],
                  chart: {
                    type: "bar",
                    height: 350
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: "55%",
                      endingShape: "rounded"
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"]
                  },
                  xaxis: {
                    categories: [
                      "01 Aug",
                      "02 Aug",
                      "03 Aug",
                      "04 Aug",
                      "05 Aug",
                      "06 Aug",
                      "07 Aug"
                    ]
                  },
                  yaxis: {
                    title: {
                      text: ""
                    }
                  },
                  fill: {
                    opacity: 1
                  },
                  tooltip: {
                    y: {
                      formatter: function(val:any) {
                        return val;
                      }
                    }
                  }
                };
                
                
              }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.username = this.tokenStorage.getUser().username;
    }

    this.greetings();

    this.dashboardService.getAllrevenue().subscribe({
      next: data => {

        if(data.data.length!=0){
          data.data.forEach((element:any) => {
            this.totalrevenue+=parseFloat(element.amount);
          });
        }

      }
    });
    
    this.dashboardService.getAllcontact().subscribe({
      next: data => {
        // console.log(data);
        if(data.data.length!=0){
          this.totalmembers = data.data[0]['count(*)'];
        }
      }
    });

    // last week revenue
    var datacondition2 = {type:'lastweekrevenue',option:'7 DAY'}
    this.dashboardService.getconditionaldata(datacondition2).subscribe({
      next: data => {
        // console.log(data);
        
        var newarr:any = [];
        if(data.data.length!=0){
          data.data.forEach((element:any) => {
            var arr:any = {name:'',value:0};
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
            var d = new Date(element.created_at);
            var dt = d.getDate();
            arr.name = months[d.getMonth()]+' '+dt;
            arr.value = parseFloat(element.amount);
            newarr.push(arr);
            this.totalrevenue7day += parseFloat(element.amount);
          });
          // console.log(newarr);
          var output:any = [];

          newarr.forEach(function(item:any) {
            var existing = output.filter(function(v: any, i: any) {
              return v.name == item.name;
            });
            if (existing.length) {
              var existingIndex = output.indexOf(existing[0]);
              output[existingIndex].value = (output[existingIndex].value+item.value);
            } else {
              if (typeof item.value == 'string')
                item.value = [item.value];
              output.push(item);
            }
          });

          output.forEach((element3:any) => {
            this.data1date.push(element3.name);
            this.data1.push(element3.value);
          });

          // console.log(this.data1date);

        }

      }
    });

    // last week contact
    var datacondition = {type:'lastweekcontact',option:'7 DAY'}
    this.dashboardService.getconditionaldata(datacondition).subscribe({
      next: data => {
        // console.log(data);
        
        var newarr:any = [];
        if(data.data.length!=0){
          data.data.forEach((element:any) => {
            var arr:any = {name:'',value:1};
            arr.name = element.created_at;
            newarr.push(arr);
            this.totalcontact7day += 1;
          });
          var output:any = [];

          newarr.forEach(function(item:any) {
            var existing = output.filter(function(v: any, i: any) {
              return v.name == item.name;
            });
            if (existing.length) {
              var existingIndex = output.indexOf(existing[0]);
              output[existingIndex].value = (output[existingIndex].value+item.value);
            } else {
              if (typeof item.value == 'string')
                item.value = [item.value];
              output.push(item);
            }
          });

          output.forEach((element3:any) => {
            this.data2date.push(element3.name);
            this.data2.push(element3.value);
          });

        }

      }
    });



  }

  public generateData(count:any, yrange:any) {
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
  

  greetings(){
    var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;

    if (hrs < 12)
      greet = 'Morning';
    else if (hrs >= 12 && hrs <= 17)
      greet = 'Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      greet = 'Evening';

      this.greeting =  greet;
  }



}
