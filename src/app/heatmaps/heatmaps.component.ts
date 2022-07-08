import { Component, OnInit } from '@angular/core';
import { HeatmapsService } from '../_services/heatmaps.service';

@Component({
  selector: 'app-heatmaps',
  templateUrl: './heatmaps.component.html',
  styleUrls: ['./heatmaps.component.css']
})
export class HeatmapsComponent implements OnInit {

  constructor(private heatmapsService: HeatmapsService,) { }
  
  visited = [];

  bgImg = './assets/images/heatmap/bk-heatmap1.jpg';
  min = 1;
  max = 2;

  ngOnInit(): void {
    
    this.heatmapsService.get().subscribe({
      next: data => {
        console.log(data.data);
        this.visited = data.data;
        // console.log(this.visited);
      },
      error: err => {
        console.log(err);
      }
    });

    this.createNewImg();

  }

  settheurl(){
    var inputval = (<HTMLInputElement>document.getElementById('inpurl')).value;
    if(inputval!=''){
          window.open(inputval+'#kb-heatmaps','_blank');
      }
  }

  createNewImg(){
    var genNum = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
      this.bgImg = './assets/images/heatmap/bk-heatmap'+genNum+'.jpg';
  }

}
