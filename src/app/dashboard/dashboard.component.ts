import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
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

  users:any = [];
  error?: string;
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private router: Router) { 
                this.chartOptions = {
                  series: [44, 55, 67, 83],
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
                  labels: ["Author Sales", "Commission", "Average Bid", "All Time Sales"]
                };
                this.chartOptions2 = {
                  series: [67],
                  chart: {
                    height: 350,
                    type: "radialBar",
                    offsetY: -10
                  },
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 135,
                      dataLabels: {
                        name: {
                          fontSize: "16px",
                          color: undefined,
                          offsetY: 120
                        },
                        value: {
                          offsetY: 76,
                          fontSize: "22px",
                          color: undefined,
                          formatter: function(val:any) {
                            return val + "%";
                          }
                        }
                      }
                    }
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      shadeIntensity: 0.15,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 50, 65, 91]
                    }
                  },
                  stroke: {
                    dashArray: 4
                  },
                  labels: ["Median Ratio"]
                };
              }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: data => {
        this.users = data.data;
      },
      error: err => {
        this.error = JSON.parse(err.error).message;
      }
    });

  }
}
