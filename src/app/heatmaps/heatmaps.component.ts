import { Component, OnInit } from '@angular/core';
import { HeatmapsService } from '../_services/heatmaps.service';

@Component({
  selector: 'app-heatmaps',
  templateUrl: './heatmaps.component.html',
  styleUrls: ['./heatmaps.component.css']
})
export class HeatmapsComponent implements OnInit {

  constructor(private heatmapsService: HeatmapsService) { }
  
  visited = [];

  ngOnInit(): void {

    this.heatmapsService.get().subscribe({
      next: data => {
        this.visited = data.data;
        // console.log(this.visited);

      },
      error: err => {
        console.log(err);
      }
    });

  }


  settheurl(){
    var inputval = (<HTMLInputElement>document.getElementById('inpurl')).value;
    if(inputval!=''){
            window.open(inputval+'#kb-heatmaps','_blank');
        }
    }

}
