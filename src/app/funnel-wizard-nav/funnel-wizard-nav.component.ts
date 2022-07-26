import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FunnelService } from '../_services/funnels.service';


@Component({
  selector: 'app-funnel-wizard-nav',
  templateUrl: './funnel-wizard-nav.component.html',
  styleUrls: ['./funnel-wizard-nav.component.css']
})
export class FunnelWizardNavComponent implements OnInit {

  uniqueid:any;
  uniqueidstep:any;
  funnelname:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public funnelService: FunnelService
  ) { 
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uniqueid = params.get('funnel_id');
      funnelService.getuniquefunnelstep(this.uniqueid,'funnelstep').subscribe((data:any)=>{
        this.funnelname = data.data2[0].name;
      })
    })
  }
  ngOnInit(): void {
  }

}
