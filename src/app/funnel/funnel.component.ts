import { Component, OnInit } from '@angular/core';
import { Options } from 'sortablejs';
import { FunnelService } from '../_services/funnels.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.css']
})
export class FunnelComponent implements OnInit {

  constructor(private funnelService: FunnelService,
              private router: Router, 
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar) { }

  funnels:any = [];
  poupsidebar = false;
  funnelurl = '';
  reason = '';
  firstpart = true;
  forarchiveid = '';
  funnelnotfound = false;
  shwobtnfirst = true;
  funneltostep = true;
  pageurl = '';
  colortheme = false;
  badgecolor = '';

  // MatPaginator Inputs
  length = 100;
  pageSize = 8;
  pageSizeOptions: number[] = [8, 16, 24, 100];

  // MatPaginator Output
  pageEvent!: PageEvent;

  getServerData(event?:PageEvent){
      var length = event?.length;
      var pageindex = event?.pageIndex;
      var pageSize = event?.pageSize;
      var previousPageIndex = event?.previousPageIndex;
      // console.log(length+' - '+pageindex+' - '+pageSize+' - '+' - '+previousPageIndex);
  }

  ngOnInit(): void {

    this.showfunnels();

  }

  parentOptions: Options = {
    group: 'parent',
    scroll: true,
    sort: true,
    // handle: '.kb-handle-section',
    // dragoverBubble: false,
    // fallbackOnBody: false,
    // draggable: "."+this.dragCls,
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      var filterdrag:any = [];
      this.funnels.forEach((element: any) => {
        filterdrag.push(element.id);
      });
      // console.log(filterdrag);

      this.funnelService.funnelandstepshorting(filterdrag,'funnels').subscribe({
        next: data => {
          // console.log(data);
        }
      });
    },
    onStart: function (/**Event*/evt) {      
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  }; 
  
  childrenOptions: Options = {
    group: 'child',
    scroll: true,
    sort: true,
    // handle: '.kb-handle-section',
    // dragoverBubble: false,
    // fallbackOnBody: false,
    // draggable: "."+this.dragCls,
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      console.log('update');
      console.log(this.funnels);

      var filterdragobj:any = {};
      var filterdrag:any = [];
      this.funnels.forEach((element: any) => {
        filterdragobj = {id:element.id, steps:[]};
        element.steps.forEach((element2: any) => {
          var stepelem = {name:element2.title, id:element2.id};
          filterdragobj.steps.push(stepelem);
        });
        filterdragobj.steps.reverse();
        filterdrag.push(filterdragobj);
      });
      console.log(filterdrag);
      // console.log(filterdrag.reverse());

      this.funnelService.funnelandstepshorting(filterdrag,'steps_update').subscribe({
        next: data => {
          console.log(data);
          if(data.success==1){
            // this.showfunnels();
          }
        }
      });

    },
    onAdd: () => {
      console.log('added');
      console.log(this.funnels);

      var filterdragobj:any = {};
      var filterdrag:any = [];
      this.funnels.forEach((element: any) => {
        filterdragobj = {id:element.id, steps:[]};
        element.steps.forEach((element2: any) => {
          var stepelem = {name:element2.title, id:element2.id};
          filterdragobj.steps.push(stepelem);
        });
        filterdragobj.steps.reverse();
        filterdrag.push(filterdragobj);
      });

      console.log(filterdrag);

      this.funnelService.funnelandstepshorting(filterdrag,'steps').subscribe({
        next: data => {
          console.log(data);
          if(data.success==1){
            this.showfunnels();
          }
        }
      });

    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {      
      // console.log('choose');
      // console.log(evt);
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  }; 

  funneledit(uniqueid: any, id: any, type:any){

    if(type=='archive'){
      this.forarchiveid = id;
      this.poupsidebar = true;
      this.firstpart = false;
      this.shwobtnfirst = true;
      this.colortheme = false;
    }else if(type=='duplicate'){
      // console.log(uniqueid+'--'+id);
      this._snackBar.open('Duplicate In Progress!', 'Close');

      this.funnelService.makefunnelstepduplicate(id, 'duplicatefunnel').subscribe({
        next: data => {
          // console.log(data);
          if(data.success==1){
            this.showfunnels();
            this._snackBar.open('Successfully Duplicate Funnel!', 'Close');
          }
        }
      });
    }else{
      this.funnelService.makefunnelsettings(uniqueid,id,type).subscribe({
        next: data => {
          console.log(data); 
          
          if(type=='edit'){
            this.router.navigate(['/create-funnel/'+uniqueid+'/'+data.data[0].uniqueid],{relativeTo: this.route});
          }else if(type=='copy'){
            this.firstpart = true;
            this.poupsidebar = true;
            this.funneltostep = true;
            this.colortheme = false;
            this.funnelurl = 'http://localhost:4200/create-funnel/'+uniqueid+'/'+data.data[0].uniqueid;
          }
          
        }
      });
    }

  }

  makearchive(){
    this.funnelService.makefunnelsettings(this.reason,this.forarchiveid,'archive').subscribe({
      next: data => {
        if(data.status==1){
            this.reason = '';
            this.poupsidebar = false;
            this.showfunnels();
        }
      }
    });
  }

  hidepopupsidebar(){
    this.poupsidebar = false;
  }

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._snackBar.open('Successfully Copied!', 'Close');
  }

  showfunnels(){
    this.funnelService.getallfunnelandstep().subscribe({
      next: data => {
        // console.log(data); 
        this.funnels = [];
        if(data.data2.length!=0){
          this.funnelnotfound = false;

          data.data2.forEach((element: any) => {
              var newob:any = {id:'',uniqueid:'',name:'',grouptags:'',steps:[]};
              newob.uniqueid = element.uniqueid;
              newob.id = element.id;
              newob.name = element.name;
              newob.grouptags = element.grouptags;

                data.data.forEach((element2: any) => {
                  var newob2 = {id:'',uniqueid:'',title:'',updated_at:'',variation:'',tag:'',color:'',img:'',funnelid:''};
                  if(element2.funnelid==newob.id){
                    newob2.id = element2.id;
                    newob2.title = element2.title;
                    newob2.uniqueid = element2.uniqueid;

                    var subdate = (new Date(element2.updated_at).toDateString()).substr(3, 7);
                    newob2.updated_at = subdate;
                    newob2.variation = element2.variation;
                    newob2.tag = element2.tags;
                    newob2.color = element2.color;
                    newob2.img = element2.img;
                    newob2.funnelid = element2.funnelid;
                    newob.steps.push(newob2);
                  }
                });

            this.funnels.push(newob);
            // console.log(this.funnels);

          });

        }else{
            this.funnelnotfound = true;
        }


      },
      error: err => {
        console.log(err);
      }
    });
  }

  funnelstepedit(unique1:any, unique2:any,type:any){
    console.log(unique1+' - '+unique2+' - '+type);

    if(type=='edit'){
      this.router.navigate(['/create-funnel/'+unique1+'/'+unique2],{relativeTo: this.route});
    }else if(type=='copy'){
      this.firstpart = true;
      this.poupsidebar = true;
      this.funneltostep = false;
      this.colortheme = false;
      this.funnelurl = 'http://localhost:4200/create-funnel/'+unique1+'/'+unique2;
      this.pageurl = '';

      this.funnelService.makefunnelsettings('',unique2,'stepdetails').subscribe({
          next: data => {
            // console.log(data); 
            this.pageurl = 'http://localhost:4200/'+data.data[0].steppath;
          }
      });
    }else if(type=='archive'){
      this.forarchiveid = unique2;
      this.poupsidebar = true;
      this.firstpart = false;
      this.shwobtnfirst = false;
      this.colortheme = false;
    }else if(type=='duplicate'){
        // console.log(unique1+' - '+unique2);
        this.funnelService.makefunnelstepduplicate(unique2, 'duplicatestep').subscribe({
          next: data => {
            if(data.success==1){
              this.showfunnels();
              this._snackBar.open('Successfully Duplicate Step!', 'Close');
            }
          }
        });
    }else if(type=='colortheme'){
      this.forarchiveid = unique2;
      this.badgecolor = unique1;
      this.poupsidebar = true;
      this.firstpart = false;
      this.colortheme = true;
    } 

  }

  makearchivestep(){
    this.funnelService.makefunnelsettings(this.reason, this.forarchiveid, 'archivestep').subscribe({
      next: data => {
        console.log(data);

        if(data.status==1){
          this.reason = '';
          this.poupsidebar = false;
          this.showfunnels();
          this._snackBar.open('Successfully Archived!', 'Close');
        }else if(data.status==0){
          if(data.notallow==1){
            this._snackBar.open('Single Step Can not be Archived!', 'Close');
          }
        }


      }
    });
  }

  changestepnamesoutside(id:any,title:any){
    console.log(id+''+title);
    this.funnelService.namepathchanges(id,title,'changefunnelname').subscribe({
      next: data => {
        // console.log(data);
        if(data.success==1){
          this._snackBar.open('Successfully Name Changed!', 'Close');
          this.showfunnels();
        }
      }
    });

  }

  savesteptheme(){
   
    this.funnelService.makefunnelsettings(this.badgecolor, this.forarchiveid, 'colorbadge').subscribe({
      next: data => {
        console.log(data);

        if(data.status==1){
          this.poupsidebar = false;
          this.showfunnels();
          this._snackBar.open('Color Successfully Updated!', 'Close');
        }

      }
    });
  }




}


