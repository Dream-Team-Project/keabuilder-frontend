import { Component, OnInit } from '@angular/core';
import { HeatmapsService } from '../../../_services/heatmaps.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { WebpagesService } from 'src/app/_services/webpages.service';
import { WebsiteService } from 'src/app/_services/website.service';
import { FunnelService } from 'src/app/_services/funnels.service';

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
    private websiteService: WebsiteService,
    private funnelService: FunnelService) { }
  
  visited = [];
  visitedfunnel = [];

  bgImg = './assets/images/heatmap/bk-heatmap1.jpg';
  min = 1;
  max = 2;
  searching = false;
  toggleweb = true;

  ngOnInit(): void {

    this.websiteService.getWebsite().subscribe({
      next: data => {

        var fullobjsite = data.data;
        this.webpagesService.getWebpages().subscribe({
          next: data2 => {
            // console.log(data2);
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

          }
        });

      }
    });

    this.funnelService.getallfunnelandstep().subscribe({
      next: data => {
        // console.log(data);

        var fullobjsite = data.data2;
        var fullobjpage = data.data;

        if(fullobjsite.length>0){

          fullobjpage.forEach((elm:any) => {
            elm.insideweb = [];
            
            fullobjsite.forEach((em:any) => {
              if(em.uniqueid==elm.funnelid){
                elm.insideweb.push(em);
              }

            });

          });

        }

        this.visitedfunnel = fullobjpage;

      }
    });
    
    this.createNewImg();

  }
  
  makeurl(visit:any){
    return 'https://'+visit['subdomain']+'.keapages.com/'+visit['pages'][0]['page_path'];
  }
  makeurl2(visit:any){
    return 'https://'+visit['insideweb'][0]['subdomain']+'.keapages.com/'+visit['page_path'];
  }

  sendurl(visit:any){
    var mkurl = this.makeurl(visit);
    var dtobj = {url: mkurl};
    this.makeheatunique(dtobj);
  }

  sendurl2(visit:any){
    var mkurl = this.makeurl2(visit);
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
        // console.log(data);
        this.searching = false;

        if(data.data.length>0){

          var url = dtobj.url+'#kb-heatmaps';
          window.open(url, '_blank');
          // this.router.navigate(['/heatmap/'+data.data[0].uniqueid]);
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
