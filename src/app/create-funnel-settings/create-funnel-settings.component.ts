import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FunnelService } from '../_services/funnels.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-create-funnel-settings',
  templateUrl: './create-funnel-settings.component.html',
  styleUrls: ['./create-funnel-settings.component.css']
})
export class CreateFunnelSettingsComponent implements OnInit {

  constructor(private funnelService: FunnelService,
              private router: Router, 
              private route: ActivatedRoute) { }

  form: any = {
    reason: '',
  };
  userFormControl = new FormControl('',[Validators.required ]);

  uniqueid:any = '';
  uniqueidstep:any = '';
  funnelpath = '';
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  funnelname = '';
  domainname = '';
  tags:any[] = [];
  faviconurl = '';
  headertracking = '';
  bodytracking = '';
  processon = false;
  processondata = 'Update Settings';
  popupsidebar = false;
  hidefornow = false;


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

        this.funnelpath = '/funnels/'+this.uniqueid+'/steps/'+data.data2[0].uniqueid;
      },
      error: err => {
        console.log(err);
      }
    });

    this.funnelService.getfunnelsetting(this.uniqueid).subscribe({
      next: data => {

        console.log(data); 

        if(data.data.length!=0){
          this.funnelname = data.data[0].name;
          var gettag = data.data[0].tags;
          if(gettag!=''){
            var crtag = gettag.split(',');
            this.tags = crtag; 
          }
          this.faviconurl = data.data[0].favicon_url;
          this.headertracking = decodeURIComponent(data.data[0].headtracking);
          this.bodytracking = decodeURIComponent(data.data[0].bodytracking);
        }

      },
      error: err => {
        console.log(err);
      }
    });


  }

  tabOpen3 = 'basic';
  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }
  
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tags: any): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  kb_settingsteps(value: string) {
    this.tabOpen3 = value;
  }

  updatesetting(){

    this.processon = true;
    
    var gentags = this.tags.toString();
    this.funnelService.updatebasicdetails(this.uniqueid, this.funnelname,this.domainname, gentags, this.faviconurl, this.headertracking, this.bodytracking).subscribe({
      next: data => {
          console.log(data);

          setTimeout(() => {
            this.processondata = 'Done';
            this.processon = false;
          }, 500);

          setTimeout(() => {
            this.processondata = 'Update Settings';
          }, 1000);

        }
      });

  }

  viewarchivefunnel(){
    this.router.navigate(['/funnels/archieve'],{relativeTo: this.route});
  }

  showpopup(){
    this.popupsidebar = true;
  }

  onSubmit(): void {
    const { reason } = this.form;
      this.funnelService.archivefunnelstep(this.uniqueid, reason).subscribe({
        next: data => {
          // console.log(data); 
          if(data.success==1){
            this.router.navigate(['/funnel'],{relativeTo: this.route});
          }
        },
        error: err => {
          console.log(err);
        }
      });


  }

  hidepopupsidebar(){
    this.popupsidebar = false;
  }



}
