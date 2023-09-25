import { Component, OnInit } from '@angular/core';
import { HeatmapsService } from '../../../_services/heatmaps.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { WebpagesService } from 'src/app/_services/webpages.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-heatmaps',
  templateUrl: './heatmaps.component.html',
  styleUrls: ['./heatmaps.component.css']
})
export class HeatmapsComponent implements OnInit {

  constructor(private heatmapsService: HeatmapsService,
    private router: Router,
    private _general :GeneralService,
    private webpagesService: WebpagesService,
    private websiteService: WebsiteService) { }
  
  visited = [];

  bgImg = './assets/images/heatmap/bk-heatmap1.jpg';
  min = 1;
  max = 2;
  searching = false;


  ngOnInit(): void {

    this.websiteService.getWebsite().subscribe({
      next: data => {
        // console.log(data);

        var fullobjsite = data.data;
        
        this.webpagesService.getWebpages().subscribe({
          next: data2 => {
            // console.log(data);
            var fullobjpage = data2.data;

            if(fullobjsite.length>0){

              fullobjpage.forEach((elm:any) => {
                elm.insideweb = [];
                
                fullobjsite.forEach((em:any) => {
                  if(em.uniqueid==elm.website_id){
                    elm.insideweb.push(em);
                  }

                });

              });

            }

            this.visited = fullobjpage;
            console.log(fullobjpage);

            

          }
        });

      }
    });
    
   
    
    // this.heatmapsService.get().subscribe({
    //   next: data => {
    //     // console.log(data.data);
    //     this.visited = data.data;
    //     // console.log(this.visited);
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });

    this.createNewImg();

  }
  
  makeurl(visit:any){
      return 'https://'+visit['insideweb'][0]['subdomain']+'.keapages.com/'+visit['page_path'];
  }

  sendurl(visit:any){
    var mkurl = 'https://'+visit['insideweb'][0]['subdomain']+'.keapages.com/'+visit['page_path'];
    var dtobj = {url: mkurl};
    this.makeheatunique(dtobj);
  }

  settheurl(){
    var inputval = (<HTMLInputElement>document.getElementById('inpurl')).value;
    if(inputval!=''){
      
      this.searching = true;
      var dtobj = {url: inputval};
      this.makeheatunique(dtobj);

      }
  }

  makeheatunique(dtobj:any){
    this.heatmapsService.getheatunique(dtobj).subscribe({
      next: data => {
        console.log(data);
        this.searching = false;

        if(data.data.length>0){
          this.router.navigate(['/heatmap/'+data.data[0].uniqueid]);
        }else{
          this._general.openSnackBar(false,'No heatmap found!', 'OK','center','top');
        }

      }
    });
  }

  createNewImg(){
    var genNum = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
      this.bgImg = './assets/images/heatmap/bk-heatmap'+genNum+'.jpg';
  }

}
