import { Component, OnInit, TemplateRef } from '@angular/core';
import { Options } from 'sortablejs';
import { FunnelService } from '../_services/funnels.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageEvent} from '@angular/material/paginator';
import { GeneralService } from '../_services/_builder/general.service';
import { FileUploadService } from '../_services/file-upload.service';
import { UserService } from '../_services/user.service';
import {FormControl, Validators} from '@angular/forms';
import { WebsiteService } from '../_services/website.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
              private userService: UserService,
              private _file: FileUploadService,
              private websiteService: WebsiteService,
              public dialog: MatDialog, 
              ) { }

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

  mydomain = '';
  selstatusshow = 'all';
  searching = false;

  selfunnelid = '';
  duplpopupfunnel = false;
  dupfunnelname = '';
  funnelarchid = '';

  funneltitleFormControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  subdomainFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);

  form: any = {
    funnelname: '',
    subdomain:''
  };

  selfunnelstep:any;
  actionname:any = '';
  newfunnelid:any = '';
  dialogfunnelset = '';

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

  isDraggable(item: any) {
      return item != 1;
  }

  funneledit(uniqueid: any, id: any, type:any){

    if(type=='archive'){
      this.forarchiveid = uniqueid;
      this.openSidebar();
      this.firstpart = false;
      this.shwobtnfirst = true;
      this.colortheme = false;
    }else if(type=='duplicate'){

      this.form.funnelname = '';
      this.form.subdomain = '';
      this.dupfunnelname = uniqueid;
      this.selfunnelid = id;
      this.openSidebar();
      this.duplpopupfunnel = true;
     
    }else{

      var obj = {uniqueid:uniqueid, id:id, type: type};
      this.funnelService.makefunnelsettings(obj).subscribe({
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

  removespecialcharwithsmall(data:any){
    var datagen = (data.replace(/[^a-zA-Z0-9]/g, "")).toLowerCase();
    return datagen;
  }

  makeduplicatefunnel(){

      if(this.funneltitleFormControl.status=='VALID' && this.subdomainFormControl.status=='VALID'){

        var nwsubdomain:any = this.form.subdomain.toLowerCase();
        var notusesub = ['app','test','developer','admin','kea','keabuilder','keapages','user'];

        if(this.searchStringInArray(nwsubdomain,notusesub)==1){
          
          this.searching = true;
          var obj:any = {uniqueid:this.selfunnelid, funnelname:this.form.funnelname, subdomain:this.form.subdomain, type:'duplicatefunnel'}
          console.log(obj);

          this.funnelService.makefunnelstepduplicate(obj).subscribe({
            next: data => {
              console.log(data);

              if(data.exist ==1){

                this.searching = false;
                this._snackBar.open("Subdomain is in use, please use another name!", 'OK');

              }else{
              
                if(data.success==1){

                  this._file.createuserlogofavi(data.uniqueid).subscribe(e=>{
                    console.log(e);
                  });
  
                  if(data.uniqueid!=''){
                    var dataobj = {old_website_id:this.selfunnelid, new_website_id:data.uniqueid};
                    this._file.copywebsitefolder(dataobj).subscribe(e=>{
                      console.log(e);
                    });
                  }
  
                  this.websiteService.oncreatesubdomain(this.form.subdomain,data.uniqueid).subscribe({
                    next: data => {
                      // console.log(data);
                      this.showfunnels();
                      this._snackBar.open('Funnel Duplicate Successfully!', 'Close');
                      this.searching = false;
                    }
                  });
        
                }

              }

            }
          });

        }else{
          this._snackBar.open("Subdomain is in use, please use another name!", 'OK');
        }

      }else{
          this._snackBar.open("Error in Title & subdomain Fields!", 'OK');
      }

  }

  searchStringInArray(str:any, strArray:any) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j] == str) return 0;
    }
    return 1;
``}

  makearchive(){

    var obj = {value:this.reason, id:this.forarchiveid, type: 'archive'};
    // console.log(obj);
    this.funnelService.makefunnelsettings(obj).subscribe({
      next: data => {
        console.log(data);
        if(data.status==1){

          data.data.forEach((element:any) => {
              this.draftpublish('0', element.page_path, this.forarchiveid);
          });

          this.reason = '';
          this.hidepopupsidebar();
          this.showfunnels();

        }
      }
    });

  }

  draftpublish(status:any, page_path:any, websiteid:any){

    var getvl = status == '0' ? 'draft' : 'publish';
    var newobjdt = {status:getvl, path:page_path, website_id:websiteid};
    this._file.toggleDraft(newobjdt).subscribe((data:any)=>{
    })

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
    this.duplpopupfunnel = false; 

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
        console.log(data); 
        
        this.generatefunneldt(data);

      },
      error: err => {
        console.log(err);
      }
    });

  }

  generatefunneldt(data:any){

    this.funnels = [];
    if(data.data2?.length!=0){
      this.funnelnotfound = false;

      data.data2.forEach((element: any) => {
          var newob:any = {id:'',uniqueid:'',name:'',grouptags:'',domain:'',subdomain:'',steps:[]};
          newob.uniqueid = element.uniqueid;
          newob.id = element.id;
          newob.name = element.name;
          newob.grouptags = element.grouptags;

          newob.domain = element.domain;
          newob.subdomain = element.subdomain;

            data.data.forEach((element2: any) => {
              var newob2 = {id:'',uniqueid:'',page_name:'',page_path:'',updated_at:'',variation:'',tag:'',color:'',img:'',funnelid:'',funneltype:''};
              if(element2.funnelid==newob.uniqueid){
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
                newob2.page_path = element2.page_path;

                newob.steps.push(newob2);
              }
            });

        this.funnels.push(newob);
        console.log(this.funnels);

      });

    }else{
        this.funnelnotfound = true;
    }

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
      this.funnelurl = window.origin+'/funnels/'+unique1.uniqueid+'/steps/'+unique2.uniqueid;
      
      if(unique1.domain!='' && unique1.domain!=null){
        this.pageurl = 'https://'+unique1.domain+'/'+unique2.page_path;
      }else{
        this.pageurl = 'https://'+unique1.subdomain+'.keapages.com/'+unique2.page_path;
      }

    }else if(type=='archive'){
      this.funnelarchid = unique1;
      this.forarchiveid = unique2;
      this.openSidebar();
      this.firstpart = false;
      this.shwobtnfirst = false;
      this.colortheme = false;
    }else if(type=='duplicate'){
        // console.log(unique1+' - '+unique2);
        var nwobj:any = {uniqueid: unique2, type:'duplicatestep'};
        this.funnelService.makefunnelstepduplicate(nwobj).subscribe({
          next: data => {
            console.log(data);
            if(data.success==1){

              var pathobj  = {oldpath:unique1,newpath:data.newpath, website_id:data.websiteid, dir:'pages'};
              this._file.copypage(pathobj).subscribe({
                next: data => {

                  this.showfunnels();
                  this._snackBar.open('Step Duplicate Successfully!', 'Close');
                }
              });

              var oldscr = 'keaimage-page-'+unique2+'-screenshot.png';
              this._file.validateimg(oldscr).subscribe({
                next: data2 => {
                if(data2.data==1){
                    var imgobj  = {oldname:oldscr, newname:'keaimage-page-'+data.newuniqueid+'-screenshot.png'};
                    this._file.copyimage(imgobj).subscribe({
                      next: data => {
                      }
                    });
                  }
                }
              });

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

  viewpagestep(domain:any, subdomain:any, path:any){
    
    if(domain!='' && domain!=null){
      var url = 'https://'+domain+'/'+path;
    }else{
      var url = 'https://'+subdomain+'.keapages.com/'+path;
    }
    window.open(url, '_blank');

  }

  makearchivestep(){
    var obj = {value: this.reason,id:this.forarchiveid, type: 'archivestep'};
    console.log(obj);
    this.funnelService.makefunnelsettings(obj).subscribe({
      next: data => {
        console.log(data);

        if(data.status==1){

          this.draftpublish('0', data.page_path, this.funnelarchid);

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
    var obj = {value: this.badgecolor,id:this.forarchiveid, type: 'colorbadge'};
   
    this.funnelService.makefunnelsettings(obj).subscribe({
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

  // getthumbnail(id:any){
  //   var genscrn = '/assets/uploads/images/keaimage-'+id+'-screenshot.png';
  //   return genscrn;

  //   // this.fileuploadService.validateimg(genscrn).subscribe({
  //   //   next: data => {

  //   //    if(data.data==1){
  //   //       return '/assets/uploads/images/'+genscrn;
  //   //     }else{
  //   //       return ' ';
  //   //     }

  //   //   }
  //   // });

  // }

  openDialog(e:any) {
    this.DialogParentToggle = !this.DialogParentToggle;
  }

  dupanotherdes(page:any){
    
    console.log(page);
    console.log(this.newfunnelid);

    if(this.newfunnelid!=''){

      console.log(page);
      var getvl = 'pages';
      // var newpath = page.page_path+'-'+this.makeid(20);

      var dtobj = {type:this.actionname, newfunnelid:this.newfunnelid, uniqueid:page.uniqueid, newpath: page.page_path};
      this.funnelService.movecopyfunnel(dtobj).subscribe({
        next: data => {
          console.log(data);

          if(data.foundone==0 && data.success==1){
            console.log('inside');

            var pathobj = {old_website_id:data.oldfunnelid, new_website_id:this.newfunnelid, dir:getvl, oldpath:page.page_path, newpath:data.newpath, trigger:''};
            this.actionname=='Move' ? pathobj.trigger = 'move' : pathobj.trigger = 'copy';
            
            console.log(pathobj);
            this._file.transferPage(pathobj).subscribe({
              next: data => {
                console.log(data);
                this.actionname=='Move' ? this._snackBar.open('Funnel Step Move Successfully!', 'OK'): this._snackBar.open('Funnel Step Copy & Move Successfully!', 'OK');
                this.showfunnels();
              }
            });

          }else{
            this.actionname=='Move' ? this._snackBar.open("Single Step Can't be Move!", 'OK'): this._snackBar.open("Single Step Can't be Copy & Move!", 'OK');
          }

        }
      });

    }else{
      this._snackBar.open("Can't find the Funnel!", 'OK');
    }

  }

  makeid(length:any) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  openDialog2(templateRef: TemplateRef<any>, page:any , type:any): void {

    if(type=='move'){
      this.actionname = 'Move';
    }else if(type=='copymove'){
      this.actionname = 'Copy & Move';
    }else{
      this.actionname = '';
    }

    this.selfunnelstep = page;
    this.dialog.open(templateRef);

  }
  
  searchpage(event: Event) {
    this.searching = true;
    var SearchValue = {search:(event.target as HTMLInputElement).value};
    // console.log(SearchValue);
    this.selstatusshow = 'all';

    this.funnelService.querystringmanagefunnel(SearchValue).subscribe({
      next: data => {
        // console.log(data);
        this.generatefunneldt(data);
        this.searching = false;
      }
    });
  }

  applykbfilter(){
    var dt:any = {order:this.selstatusshow};
    this.searching = true;

    this.funnelService.shortbypaginatorfunnnel(dt).subscribe({
      next: data => {
        console.log(data);
        this.searching = false;
        this.generatefunneldt(data);
      },
      error: err => {
        console.log(err);
      }
    });
  }


}




  // parentOptions: Options = {
  //   group: 'parent',
  //   scroll: true,
  //   sort: true,
  //   // handle: '.kb-handle-section',
  //   // dragoverBubble: false,
  //   // fallbackOnBody: false,
  //   // draggable: "."+this.dragCls,
  //   // draggable: 'steps-group',
  //   scrollSensitivity: 100,
  //   animation: 300,
  //   onUpdate: (event: any) => {
  //     var filterdrag:any = [];
  //     this.funnels.forEach((element: any) => {
  //       filterdrag.push(element.id);
  //     });
  //     // console.log(filterdrag);

  //     this.funnelService.funnelandstepshorting(filterdrag,'funnels').subscribe({
  //       next: data => {
  //         // console.log(data);
  //       }
  //     });
  //   },
  //   onStart: function (/**Event*/evt) {      
  //     // console.log(evt.oldIndex);  // element index within parent
  //   },
  //   onChoose: function (/**Event*/evt) {
  //     // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
  //   },
  // }; 

  // childrenOptions: Options = {
  //   group: 'child',
  //   scroll: true,
  //   sort: true,
  //   // handle: '.kb-handle-section',
  //   // dragoverBubble: false,
  //   // fallbackOnBody: false,
  //   // draggable: "."+this.dragCls,
  //   draggable: '.draggable',
  //   scrollSensitivity: 100,
  //   animation: 300,
  //   onUpdate: (event: any) => {
  //     // console.log('update');
  //     var filterdragobj:any = {};
  //     var filterdrag:any = [];
  //     this.funnels.forEach((element: any) => {
  //       filterdragobj = {id:element.id, steps:[]};
  //       element.steps.forEach((element2: any) => {
  //         var stepelem = {name:element2.page_title, id:element2.id};
  //         filterdragobj.steps.push(stepelem);
  //       });
  //       filterdragobj.steps.reverse();
  //       filterdrag.push(filterdragobj);
  //     });
  //     // console.log(filterdrag);
  //     // console.log(filterdrag.reverse());

  //     this.funnelService.funnelandstepshorting(filterdrag,'steps_update').subscribe({
  //       next: data => {
  //         // console.log(data);
  //         if(data.success==1){
  //           // this.showfunnels();
  //         }
  //       }
  //     });

  //   },
  //   onAdd: () => {
  //     // console.log('added');
  //     // console.log(this.funnels);

  //     var filterdragobj:any = {};
  //     var filterdrag:any = [];
  //     this.funnels.forEach((element: any) => {
  //       filterdragobj = {id:element.id, steps:[]};
  //       element.steps.forEach((element2: any) => {
  //         var stepelem = {name:element2.page_title, id:element2.id};
  //         filterdragobj.steps.push(stepelem);
  //       });
  //       filterdragobj.steps.reverse();
  //       filterdrag.push(filterdragobj);
  //     });

  //     // console.log(filterdrag);

  //     this.funnelService.funnelandstepshorting(filterdrag,'steps').subscribe({
  //       next: data => {
  //         // console.log(data);
  //         if(data.success==1){
  //           this.showfunnels();
  //         }
  //       }
  //     });

  //   },
  //   onStart: function (/**Event*/evt) {
  //     console.log(evt.item.classList.value);
  //   //   console.log(evt.oldIndex);  // element index within parent
  //   //   var splcls:any = evt.item.classList.value.split(' ');
  //   //   console.log(splcls[0]);
  //   //   var id = splcls[0].split('kbstep-');
      
  //   //   var genscrn = '/assets/uploads/images/keaimage-'+id[1]+'-screenshot.png';
  //     // console.log(genscrn);
  //     // (<HTMLStyleElement>document.getElementsByClassName(splcls[0])[0]).style.backgroundImage = "url("+genscrn+")";
      
  //     // this.fileuploadService.validateimg(genscrn).subscribe({
  //     //   next: data => {
        
  //     //      if(data.data==1){
  //     //       console.log(genscrn);
  //     //           // return '/assets/uploads/images/'+genscrn;
  //     //     // (<HTMLStyleElement>document.getElementsByClassName(splcls)[0]).style.background = '';
  //     //     }else{
  //     //       // return '/assets/uploads/images/webpage_thumbnail.jpg';
  //     //     }
  
  //     //   }
  //     // });


  //   },
  //   onChoose: function (/**Event*/evt) {      
  //     // console.log('choose');
  //     // console.log(evt);
  //     // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
  //   },
  // }; 