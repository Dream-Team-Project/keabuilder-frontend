import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';


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

  constructor( private tokenStorage: TokenStorageService,
              private router: Router) {
                this.chartOptions = {
                  series: [
                    {
                      name: "Website",
                      type: "column",
                      data: [440, 505, 414, 671, 227, 413, 201]
                    },
                    {
                      name: "Funnels",
                      type: "line",
                      data: [23, 42, 35, 27, 43, 22, 17]
                    }
                  ],
                  chart: {
                    height: 350,
                    type: "line"
                  },
                  stroke: {
                    width: [0, 4]
                  },
                  title: {
                    text: "Total Earnings in $"
                  },
                  dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                  },
                  labels: [
                    "2022-08-01",
                    "2022-08-02",
                    "2022-08-03",
                    "2022-08-04",
                    "2022-08-05",
                    "2022-08-06",
                    "2022-08-07"
                  ],
                  xaxis: {
                    type: "datetime"
                  },
                  yaxis: [
                    {
                      title: {
                        text: "Website"
                      }
                    },
                    {
                      opposite: true,
                      title: {
                        text: "Funnel"
                      }
                    }
                  ]
                };
                this.chartOptions2 = {
                  series: [
                    {
                      name: "Website",
                      data: [31, 40, 28, 51, 42, 109, 100]
                    },
                    {
                      name: "Funnels",
                      data: [11, 32, 45, 32, 34, 52, 41]
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
                    categories: [
                      "2022-08-01",
                      "2022-08-02",
                      "2022-08-03",
                      "2022-08-04",
                      "2022-08-05",
                      "2022-08-06",
                      "2022-08-07"
                    ]
                  },
                  tooltip: {
                    x: {
                      format: "dd/MM/yy"
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
