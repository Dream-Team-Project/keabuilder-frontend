import { Component, OnInit, ViewChild } from '@angular/core';
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
import { FunnelService } from '../_services/funnels.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  selector: 'app-create-funnel-stats',
  templateUrl: './create-funnel-stats.component.html',
  styleUrls: ['./create-funnel-stats.component.css']
})
export class CreateFunnelStatsComponent implements OnInit {
  
  mainOpen = 'stats';

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;

  constructor(private funnelService: FunnelService,
    private router: Router,
    private route: ActivatedRoute,) { 

    this.chartOptions = {
        series: [
          {
            name: "Inflation",
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
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
          formatter: function(val: string) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        },
  
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
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
            formatter: function(val: string) {
              return val + "%";
            }
          }
        },
        title: {
          text: "Monthly Inflation in Argentina, 2002",
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
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }
        ],
        chart: {
          height: 350,
          type: "line",
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
          text: "Product Trends by Month",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep"
          ]
        }
    };

    this.chartOptions3 = {
        series: [{
            name: 'Jan',
            data: [-30, 55]
        },
        {
            name: 'Feb',
            data: [80, 15]
        },
        {
            name: 'Mar',
            data: [-10, 15]
        },
        {
            name: 'Apr',
            data: [30, -15]
        },
        {
            name: 'May',
            data: [-130, 15]
        }, {
            name: 'June',
            data: [70, 15]
        }, {
            name: 'July',
            data: [30, 45]
        }, {
            name: 'Aug',
            data: [50, 15]
        },
        {
            name: 'Sep',
            data: [-30, 15]
        }
    ],
        chart: {
          height: 350,
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
        title: {
          text: "HeatMap Chart with Color Range"
        }
    };

    this.chartOptions4 = {
        series: [
          {
            name: "TEAM A",
            type: "column",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
          },
          {
            name: "TEAM B",
            type: "area",
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
          },
          {
            name: "TEAM C",
            type: "line",
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
          }
        ],
        chart: {
          height: 350,
          type: "line",
          stacked: false
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth"
        },
        plotOptions: {
          bar: {
            columnWidth: "50%"
          }
        },
  
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: [
          "01/01/2003",
          "02/01/2003",
          "03/01/2003",
          "04/01/2003",
          "05/01/2003",
          "06/01/2003",
          "07/01/2003",
          "08/01/2003",
          "09/01/2003",
          "10/01/2003",
          "11/01/2003"
        ],
        markers: {
          size: 0
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          title: {
            text: "Points"
          },
          min: 0
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function(y: number) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
            }
          }
        }
    };
    
  }
  uniqueid:any = '';
  uniqueidstep:any = '';
  funnelname = '';

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params: ParamMap) => { 
      this.uniqueid = params.get('funnel_id');
    })
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uniqueidstep = params.get('step_id');
    });
    this.funnelService.getuniquefunnelstep(this.uniqueid,'funnelstep').subscribe({
      next: data => {
        this.funnelname = data.data2[0].name;
        this.uniqueidstep = data.data[0].uniqueid;
        // console.log(data); 
      },
      error: err => {
        console.log(err);
      }
    });
  }

  kb_mainsteps(value: string) {
      this.mainOpen = value;
  } 


}
