import { Component, OnInit } from '@angular/core';
import { HeatmapsService } from '../../../_services/heatmaps.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';

@Component({
  selector: 'app-heatmaps',
  templateUrl: './heatmaps.component.html',
  styleUrls: ['./heatmaps.component.css']
})
export class HeatmapsComponent implements OnInit {

  constructor(private heatmapsService: HeatmapsService,
    private router: Router,
    private _general :GeneralService,) { }
  
  visited = [];

  bgImg = './assets/images/heatmap/bk-heatmap1.jpg';
  min = 1;
  max = 2;
  searching = false;

  ngOnInit(): void {
    
    this.heatmapsService.get().subscribe({
      next: data => {
        // console.log(data.data);
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
      
      this.searching = true;
      var dtobj = {url: inputval};
      this.heatmapsService.getheatunique(dtobj).subscribe({
        next: data => {
          console.log(data);
          this.searching = false;

          if(data.data.length>0){
            this.router.navigate(['/heatmap/'+data.data[0].uniqueid]);
          }else{
            this._general.openSnackBar(false,'Url not found!', 'OK','center','top');
          }

        }
      });

      }
  }

  createNewImg(){
    var genNum = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
      this.bgImg = './assets/images/heatmap/bk-heatmap'+genNum+'.jpg';
  }

}
