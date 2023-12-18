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
  selector: 'app-membership-reports',
  templateUrl: './membership-reports.component.html',
  styleUrls: ['./membership-reports.component.css']
})
export class MembershipReportsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;

  currentDate:any = '';
  fetching=false;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  report_type:any='last_week';
  
  courses:any = {
    recents: [],
    monthly: [],
    courses:'0',
    new_course:'0',
    modules:'0',
    lessons:'0',
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
  

  constructor(private _reportingService : ReportingService) { 
    this.currentDate = new Date();
    this.courses.date.from = new Date(this.currentDate.setDate(this.currentDate.getDate() - 30));
    this.fetchData();
    
  }

  ngOnInit(): void {
    // this.courseChart();
    this.memberChart(); 
     
  }

  fetchData(){
    this.fetching=true; 
    this.fetchRecentCourses();
    this.fetchRecentMembers();
    this.fetchDateReportCourses();
  }

  courseChart(){
    this.chartOptions = {
      series: [
        {
          name: "Courses",
          data:  this.courses.chartData.y,
        }
      ],
        chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: '',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3'], // takes an array which will be repeated on columns
          opacity: 0.1
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: this.courses.chartData.x,
        title: {
          text: ''
        }
      },
      yaxis: {
        title: {
          text: ''
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }

      // series: [
      //   {
      //     name: "Members",
      //     data: [44, 55, 57, 56, 61, 58, 63, 60, 66,10,500]
      //   },
      // ],
      // chart: {
      //   type: "bar",
      //   height: 350
      // },
      // plotOptions: {
      //   bar: {
      //     horizontal: false,
      //     columnWidth: "55%",
      //   }
      // },
      // dataLabels: {
      //   enabled: false
      // },
      // stroke: {
      //   show: true,
      //   width: 2,
      //   colors: ["transparent"]
      // },
      // xaxis: {
      //   categories: [
      //     "Feb",
      //     "Mar",
      //     "Apr",
      //     "May",
      //     "Jun",
      //     "Jul",
      //     "Aug",
      //     "Sep",
      //     "Oct",
      //     "Nov",
      //     "Dec"
      //   ]
      // },
      // yaxis: {
      //   title: {
      //     text: "Members Per Month"
      //   }
      // },
      // fill: {
      //   opacity: 1
      // },
      // tooltip: {
      //   y: {
      //     formatter: function(val: string) {
      //       return val;
      //     }
      //   }
      // }
    };
  }
  memberChart(){
    this.chartOptions2 = {
      series: [
        {
          data: [
            {
              x: "Courses",
              y: [
                new Date("2019-03-02").getTime(),
                new Date("2019-03-04").getTime()
              ]
            },
            {
              x: "Members",
              y: [
                new Date("2019-03-04").getTime(),
                new Date("2019-03-08").getTime()
              ]
            },
            // {
            //   x: "Contacts",
            //   y: [
            //     new Date("2019-03-08").getTime(),
            //     new Date("2019-03-12").getTime()
            //   ]
            // },
            // {
            //   x: "Forms",
            //   y: [
            //     new Date("2019-03-12").getTime(),
            //     new Date("2019-03-18").getTime()
            //   ]
            // }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: "datetime"
      }
    };
  }

  fetchRecentCourses() {
    this.fetching=true;
    this._reportingService.recentCourses(this.courses.limit).subscribe((resp:any)=>{
      if(resp.success) this.courses.recents = resp.data;
      this.fetching=false;
    })
  }
  fetchRecentMembers() {
    this.fetching=true;
    this._reportingService.recentMembers(this.courses.limit).subscribe((resp:any)=>{
      if(resp.success) this.courses.members = resp.data;
      this.fetching=false;
    })
  }

  fetchDateReportCourses() {
    this.fetching=true;
    // if(this.report_type == 'last_week') {
      this.courses.date.to = new Date();
    //   this.contact.date.from = new Date();
    //   this.contact.date.from.setDate(this.currentDate.getDate() - 7);
    // }
    // if(this.report_type == 'monthly') {
    //   this.contact.date.from = new Date(this.currentDate.getFullYear(), this.months.indexOf(this.report_month), 1);
    //   const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.months.indexOf(this.report_month) + 1, 0).getDate();
    //   this.contact.date.to = new Date(this.currentDate.getFullYear(), this.months.indexOf(this.report_month), lastDayOfMonth);
    // }
    this._reportingService.datefilterCourses(this.courses.date.from, this.courses.date.to).subscribe((resp:any)=>{
      
      if(resp.success) {
        this.courses.monthly = resp?.data || [];
        this.courses.chartData.x = this.courses.monthly.map((m:any) => m.date) || [];
        this.courses.chartData.y = this.courses.monthly.map((m:any) => m.count.toString()) || [];
        // this.courses.courses = resp?.data[0]?.courses || '0';
        // this.courses.modules = resp?.data[0]?.modules || '0';
        // this.courses.lessons = resp?.data[0]?.lessons || '0';
        this.courseChart();
        this.fetching=false;
      }
    })
  }

}
