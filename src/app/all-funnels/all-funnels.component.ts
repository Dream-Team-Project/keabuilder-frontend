import { Component, OnInit } from '@angular/core';
import { Options } from 'sortablejs';
import { FunnelService } from '../_services/funnels.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageEvent} from '@angular/material/paginator';
import { GeneralService } from '../_services/_builder/general.service';
import { FileUploadService } from '../_services/file-upload.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-all-funnels',
  templateUrl: './all-funnels.component.html',
  styleUrls: ['./all-funnels.component.css']
})
export class AllFunnelsComponent implements OnInit {

  constructor(private funnelService: FunnelService,
              private router: Router, 
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              public _general: GeneralService,
              private fileuploadService: FileUploadService,
              private userService: UserService,) { }

  funnels:any = [];
  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }
  popupsidebar = false;
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
  DialogParentToggle:boolean = false;
  mydomain = {subdomain:'',domain:''};



  getServerData(event?:PageEvent){
      var length = event?.length;
      var pageindex = event?.pageIndex;
      var pageSize = event?.pageSize;
      var previousPageIndex = event?.previousPageIndex;
      // console.log(length+' - '+pageindex+' - '+pageSize+' - '+' - '+previousPageIndex);
  }

  ngOnInit(): void {

    this.showfunnels();

    this.userService.getUsersDetails().subscribe({
      next: data => {
        this.mydomain.subdomain = data.data[0].subdomain;
        this.mydomain.domain = data.domain;
      }
    });

  }

  parentOptions: Options = {
    group: 'parent',
    scroll: true,
    sort: true,
    // handle: '.kb-handle-section',
    // dragoverBubble: false,
    // fallbackOnBody: false,
    // draggable: "."+this.dragCls,
    // draggable: 'steps-group',
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
    draggable: '.draggable',
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      // console.log('update');
      var filterdragobj:any = {};
      var filterdrag:any = [];
      this.funnels.forEach((element: any) => {
        filterdragobj = {id:element.id, steps:[]};
        element.steps.forEach((element2: any) => {
          var stepelem = {name:element2.page_title, id:element2.id};
          filterdragobj.steps.push(stepelem);
        });
        filterdragobj.steps.reverse();
        filterdrag.push(filterdragobj);
      });
      // console.log(filterdrag);
      // console.log(filterdrag.reverse());

      this.funnelService.funnelandstepshorting(filterdrag,'steps_update').subscribe({
        next: data => {
          // console.log(data);
          if(data.success==1){
            // this.showfunnels();
          }
        }
      });

    },
    onAdd: () => {
      // console.log('added');
      // console.log(this.funnels);

      var filterdragobj:any = {};
      var filterdrag:any = [];
      this.funnels.forEach((element: any) => {
        filterdragobj = {id:element.id, steps:[]};
        element.steps.forEach((element2: any) => {
          var stepelem = {name:element2.page_title, id:element2.id};
          filterdragobj.steps.push(stepelem);
        });
        filterdragobj.steps.reverse();
        filterdrag.push(filterdragobj);
      });

      // console.log(filterdrag);

      this.funnelService.funnelandstepshorting(filterdrag,'steps').subscribe({
        next: data => {
          // console.log(data);
          if(data.success==1){
            this.showfunnels();
          }
        }
      });

    },
    onStart: function (/**Event*/evt) {
      console.log(evt.item.classList.value);
    //   console.log(evt.oldIndex);  // element index within parent
    //   var splcls:any = evt.item.classList.value.split(' ');
    //   console.log(splcls[0]);
    //   var id = splcls[0].split('kbstep-');
      
    //   var genscrn = '/assets/uploads/images/keaimage-'+id[1]+'-screenshot.png';
      // console.log(genscrn);
      // (<HTMLStyleElement>document.getElementsByClassName(splcls[0])[0]).style.backgroundImage = "url("+genscrn+")";
      
      // this.fileuploadService.validateimg(genscrn).subscribe({
      //   next: data => {
        
      //      if(data.data==1){
      //       console.log(genscrn);
      //           // return '/assets/uploads/images/'+genscrn;
      //     // (<HTMLStyleElement>document.getElementsByClassName(splcls)[0]).style.background = '';
      //     }else{
      //       // return '/assets/uploads/images/webpage_thumbnail.jpg';
      //     }
  
      //   }
      // });


    },
    onChoose: function (/**Event*/evt) {      
      // console.log('choose');
      // console.log(evt);
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  }; 

  isDraggable(item: any) {
      return item != 1;
  }

  funneledit(uniqueid: any, id: any, type:any){

    if(type=='archive'){
      this.forarchiveid = id;
      this.openSidebar();
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

            if(data.objpath.length!=0){
              data.objpath.forEach((element:any) => {
                var page = {
                  head: '',
                  body: '',
                  style: '',
                  folder: element,
                  prevFolder: element
                };
                this._general.fileUploadService.createpage(page).subscribe((event:any) => {
                  // console.log(event);
                },
                error=>{console.log(error)});
              });
            }

            this.showfunnels();
            this._snackBar.open('Successfully Duplicate Funnel!', 'Close');
          }
        }
      });
    }else{
      this.funnelService.makefunnelsettings(uniqueid,id,type).subscribe({
        next: data => {
          // console.log(data); 
          
          if(type=='edit'){
            this.router.navigate(['/funnels/'+uniqueid+'/steps/'+data.data[0].uniqueid],{relativeTo: this.route});
          }else if(type=='copy'){
            this.firstpart = true;
            this.openSidebar();
            this.funneltostep = true;
            this.colortheme = false;
            this.funnelurl = window.origin+'/funnels/'+uniqueid+'/steps/'+data.data[0].uniqueid;
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
            this.hidepopupsidebar();
            this.showfunnels();
        }
      }
    });
  }

  hidepopupsidebar(){
    this.popupsidebar = false;

    this.sidebar.anim.close = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
    },this.sidebar.animtime)
  }

  openSidebar(){
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.open = false;
    },this.sidebar.animtime)
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
                  var newob2 = {id:'',uniqueid:'',page_name:'',updated_at:'',variation:'',tag:'',color:'',img:'',funnelid:'',funneltype:''};
                  if(element2.funnelid==newob.id){
                    newob2.id = element2.id;
                    newob2.page_name = element2.page_name;
                    newob2.uniqueid = element2.uniqueid;

                    var subdate = (new Date(element2.updated_at).toDateString()).substr(3, 7);
                    newob2.updated_at = subdate;
                    newob2.variation = element2.variation;
                    newob2.tag = element2.tags;
                    newob2.color = element2.color;
                    newob2.img = element2.img;
                    newob2.funnelid = element2.funnelid;
                    newob2.funneltype = element2.funneltype;

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
    // console.log(unique1+' - '+unique2+' - '+type);

    if(type=='edit'){
      this.router.navigate(['/funnels/'+unique1+'/steps/'+unique2],{relativeTo: this.route});
    }else if(type=='copy'){
      this.firstpart = true;
      this.openSidebar();
      this.funneltostep = false;
      this.colortheme = false;
      this.funnelurl = window.origin+'/funnels/'+unique1+'/steps/'+unique2;
      this.pageurl = '';

      this.funnelService.makefunnelsettings('',unique2,'stepdetails').subscribe({
          next: data => {
            // console.log(data); 
            this.pageurl = 'https://'+this.mydomain.subdomain+'.'+this.mydomain.domain+'/'+data.data[0].page_path;
          }
      });

    }else if(type=='archive'){
      this.forarchiveid = unique2;
      this.openSidebar();
      this.firstpart = false;
      this.shwobtnfirst = false;
      this.colortheme = false;
    }else if(type=='duplicate'){
        console.log(unique1+' - '+unique2);
        this.funnelService.makefunnelstepduplicate(unique2, 'duplicatestep').subscribe({
          next: data => {
            console.log(data);
            if(data.success==1){

              var page = {
                head: '',
                body: '',
                style: '',
                folder: data.pagepath,
                prevFolder: data.pagepath
              };
              this._general.fileUploadService.createpage(page).subscribe((event:any) => {
                // console.log(event);
              },
              error=>{console.log(error)});

              this.showfunnels();
              this._snackBar.open('Successfully Duplicate Step!', 'Close');
            }
          }
        });
    }else if(type=='colortheme'){
      this.forarchiveid = unique2;
      this.badgecolor = unique1;
      this.openSidebar();
      this.firstpart = false;
      this.colortheme = true;
    } 

  }

  viewpagestep(unique:any){
    this.funnelService.makefunnelsettings('',unique,'stepdetails').subscribe({
      next: data => {
        // console.log(data); 
        var url = 'https://'+this.mydomain.subdomain+'.'+this.mydomain.domain+'/'+data.data[0].page_path;
        window.open(url, '_blank');

      }
    });
  }

  makearchivestep(){
    this.funnelService.makefunnelsettings(this.reason, this.forarchiveid, 'archivestep').subscribe({
      next: data => {
        // console.log(data);

        if(data.status==1){
          this.reason = '';
          this.hidepopupsidebar();
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
    // console.log(id+''+title);
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
        // console.log(data);

        if(data.status==1){
          this.popupsidebar = false;
          this.showfunnels();
          this._snackBar.open('Color Successfully Updated!', 'Close');
        }

      }
    });
  }

  getthumbnail(id:any){
    var genscrn = '/assets/uploads/images/keaimage-'+id+'-screenshot.png';
    return genscrn;

    // this.fileuploadService.validateimg(genscrn).subscribe({
    //   next: data => {

    //    if(data.data==1){
    //       return '/assets/uploads/images/'+genscrn;
    //     }else{
    //       return ' ';
    //     }

    //   }
    // });

  }

  openDialog(e:any) {
    this.DialogParentToggle = !this.DialogParentToggle;
  }




}


