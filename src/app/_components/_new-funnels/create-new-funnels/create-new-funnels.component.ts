import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { FunnelService } from 'src/app/_services/funnels.service';

@Component({
  selector: 'app-create-new-funnels',
  templateUrl: './create-new-funnels.component.html',
  styleUrls: ['./create-new-funnels.component.css']
})
export class CreateNewFunnelsComponent implements OnInit {
 
funnel_id:any;
funnel:any;
funnel_step:any;
fetch=false;
  constructor(private route: ActivatedRoute,
    public funnelService: FunnelService,
    public _general: GeneralService,) {
    this.route.paramMap.subscribe((params: ParamMap) => { 
      this.funnelService.funnel_id = params.get('funnel_id');
        this.funnel_id = params.get('funnel_id');
      // console.log(this.funnelService.funnel_id)

    })
   
   }

  ngOnInit(): void {
    this.fetchsinglefunnel();
    this.fetchsinglefunnelsteps();
  }
  fetchsinglefunnel(){
    this.funnelService.getSingleFunnel(this.funnel_id).subscribe({
      next: data => {
        // console.log(data);
        this.funnel=data?.data[0];
      }
    });
  }
  fetchsinglefunnelsteps(){
    this.funnelService.getSingleFunnelpages({funnelid:this.funnel_id,archived:'0'}).subscribe((data:any)=>{
      this.funnel_step=data?.data[0];
      this.funnelService.uniquestepId=data?.data[0].uniqueid;
      // console.log(this.funnel_step)
      this.fetch=true;
    })
  }
}
