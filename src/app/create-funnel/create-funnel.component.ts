import { Component, ComponentFactoryResolver, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { Options } from 'sortablejs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { FunnelService } from '../_services/funnels.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatAccordion} from '@angular/material/expansion';
import { GeneralService } from '../_services/_builder/general.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FileUploadService } from '../_services/file-upload.service';
import { CheckoutService } from '../_services/checkout.service';
import { UserService } from '../_services/user.service';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-create-funnel',
  templateUrl: './create-funnel.component.html',
  styleUrls: ['./create-funnel.component.css']
})
export class CreateFunnelComponent implements OnInit {
 

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  uniqueid:any;
  uniqueidstep:any;
    
  constructor(private funnelService: FunnelService,
              private router: Router,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              public _general: GeneralService,
              public dialog: MatDialog, 
              private fileuploadService: FileUploadService,
              private checkoutService: CheckoutService,
              private userService: UserService,) {
                this.route.parent?.paramMap.subscribe((params: ParamMap) => { 
                  this.uniqueid = params.get('funnel_id');
                })
                this.route.paramMap.subscribe((params: ParamMap) => {
                  this.uniqueidstep = params.get('step_id');
                  this.funnelService.uniquestepId = params.get('step_id');
                });
              }

  createvariation = false;
  automationaddnewaction = true;
  automationaddnewemail = false;
  automationaddnewtext = false;
  popupsidebar = false;
  tabOpen = 'overview';
  enabled = true;
  steps:any[] = [];
  emailoptintemps:any[] = [];
  id = 2;
  funnelselected:any = 0;
  funnelvariation = 0;
  funnelname = '';
  funnelstepname = '';
  funnelstepurl:any = '';
  selectedstep:any = 0;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags:any[] = [];

  firstpart = true;
  funnelurl = '';
  forarchiveid = '';
  shwobtnfirst = true;

  pageurl = '';
  copylink = false;
  reason = '';
  firstselectedid = '';
  nextstepid = '';
  maintime = '1 mins ago';
  variationtime = '1 min ago';
  funnelstepvariationurl = '';
  isvariationinactive = true;
  splitvalue:any = 50;
  panelOpenState = false;

  archivesteps:any[] = [];
  colortheme = false;
  badgecolor = '';
  selectedcampaign = 'email-optin';
  selectedcampaignname = 'EMAIL OPTIN';
  selectedcampicon = 'fas fa-envelope';

  hidefornow = false;
  addproductpopup = false;

  addstepoption = false;

  crfunnelstepname = '';
  funneltype = '';
  myproductsshowcase = false;

  productname = '';
  productprice = '';
  priceoverride = '';
  myproductsshow:any = [];
  editproid = '';
  editmode = false;
  getthumbnail = '/assets/uploads/images/webpage_thumbnail.jpg';

  editcheckoutdetails = false;
  checkoutstyle:any = {step1headline:'',step1subheadline:'',step1btntext:'', step1btnsubtext:'', step1footertext:'',step2headline:'',step2subheadline:'',step2btntext:'', step2btnsubtext:'', step2footertext:''};
  mydomain = {subdomain:'',domain:''};



  ngOnInit(): void {

    this.showfunnelsteps();

    this.funnelService.funneltemplates().subscribe({
      next: data => {
        // console.log(data);
        this.emailoptintemps = data.data;

        // console.log(this.emailoptintemps);
      }
    });

    this.userService.getUsersDetails().subscribe({
      next: data => {
        this.mydomain.subdomain = data.data[0].subdomain;
        this.mydomain.domain = data.domain;
      }
    });

  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);

      var gentags = this.tags.toString();
      this.funnelService.addnewtags(this.selectedstep,gentags).subscribe({
        next: data => {
          // console.log(data);
          this._snackBar.open('Successfully Tag Added!', 'Close');

        }
      });

    }
  
    // Clear the input value
    event.chipInput!.clear();
  }
  remove(tags: any): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    var gentags = this.tags.toString();
    this.funnelService.addnewtags(this.selectedstep,gentags).subscribe({
      next: data => {
        // console.log(data);
        this._snackBar.open('Successfully Tag removed!', 'Close');

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
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      // console.log(event);

      var filterdrag:any = [];
      this.steps.forEach((element: any) => {
        filterdrag.push(element.id);
      });

      // console.log(filterdrag);

      this.funnelService.funnelandstepshorting(filterdrag,'funnelsteponly').subscribe({
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
  showvariation() {
    this.createvariation = true;
  }
  hidevariation() {
      this.createvariation = false;
  }
  totalmy() {
      this.splitvalue = (<HTMLInputElement>document.getElementById('kb-splittestmake')).value;
      (<HTMLInputElement>document.getElementById('kb-changemyprogress')).style.width = this.splitvalue + '%';
      (<HTMLElement>document.getElementById('kb-control')).innerHTML = this.splitvalue + '%';
      (<HTMLElement>document.getElementById('kb-variation')).innerHTML = (100 - parseInt(this.splitvalue)) + '%';
  }
  automation_show(value: string) {
      if (value == 'action') {
          this.automationaddnewaction = true;
          this.automationaddnewemail = false;
          this.automationaddnewtext = false;
          this.copylink = false;
      } else if (value == 'email') {
          this.automationaddnewaction = false;
          this.automationaddnewemail = true;
          this.automationaddnewtext = false;
          this.copylink = false;
      } else if (value == 'sms') {
          this.automationaddnewaction = false;
          this.automationaddnewemail = false;
          this.automationaddnewtext = true;
          this.copylink = false;
      }
      this.popupsidebar = true;
  }
  hidepopupsidebar() {
      this.popupsidebar = false;
    this.addstepoption = false;
    this.automationaddnewaction = false;
    this.automationaddnewemail = false;
    this.automationaddnewtext = false;
    this.copylink = false;
    this.colortheme = false;
    this.addproductpopup = false;
    this.editcheckoutdetails = false;

  }
  kb_substeps(value: string) {
      this.tabOpen = value;
      // console.log(this.funnelselected);
      if(value=='overview' && this.funnelselected==1){
        this.tabOpen = 'overviewstep';
      }

      if(value!='publishing'){
        this.isvariationinactive = true;
      }
  }
  kb_substeps2(value: any) {
      // this.tabOpen2 = value;
      // console.log(value);

      this.funnelService.setfunnelselect(value).subscribe({
        next: data => {
          this.uniqueidstep = data.data[0].uniqueid;
          this.funnelService.uniquestepId = data.data[0].uniqueid;
          this.router.navigate(['/funnels/'+this.uniqueid+'/steps/'+data.data[0].uniqueid],{relativeTo: this.route});

          if(data.data[0].funnelselected==1){
            this.tabOpen = 'overviewstep';
            this.funnelselected = 1;
          }else{
            this.tabOpen = 'overview';
            this.funnelselected = 0;
          }

          if(data.data[0].funneltype!='regular' && data.data[0].funneltype!='thankyou'){
            this.myproductsshowcase = true;
            this.showproductset();
          }else{
            this.tabOpen = 'overview'
            this.myproductsshowcase = false;
          }

          this.funnelstepname = data.data[0].title;
          this.funnelstepurl = data.data[0].page_path;

          if(data.data[0].variation==1){
            this.funnelvariation = 1;
          }else{
            this.funnelvariation = 0;
          }

          this.selectedstep = value;

          var gettag = data.data[0].tags;
          if(gettag!=''){
            var crtag = gettag.split(',');
            this.tags = crtag; 
          }else{
            this.tags = [];
          }

          if(data.data[0].variationlink!=null && data.data[0].variationlink!=''){
            this.funnelstepvariationurl = data.data[0].variationlink;
          }

          if(data.data[0].variation==1){
            // console.log(data.data[0].splittestper);
            if(data.data[0].splittestper!=null && data.data[0].splittestper!=''){
              this.splitvalue = data.data[0].splittestper;
              setTimeout(() => {
                (<HTMLInputElement>document.getElementById('kb-splittestmake')).setAttribute('value',data.data[0].splittestper);
                (<HTMLInputElement>document.getElementById('kb-changemyprogress')).style.width = this.splitvalue + '%';
                (<HTMLElement>document.getElementById('kb-control')).innerHTML = this.splitvalue + '%';
                (<HTMLElement>document.getElementById('kb-variation')).innerHTML = (100 - parseInt(this.splitvalue)) + '%';
              }, 500);
            }
          }

          
        },
        error: err => {
          console.log(err);
        }
      });   

  }
  addsteps() {

    this.popupsidebar = true;
    this.addstepoption = true;

    this.automationaddnewaction = false;
    this.automationaddnewemail = false;
    this.automationaddnewtext = false;
    this.copylink = false;
    this.colortheme = false;
    this.addproductpopup = false;

  }

  updatestep(){

    // console.log(this.funneltype);
    var data = {funneltype:this.funneltype, stepname: this.crfunnelstepname};
    
    if(this.funneltype!='' && this.crfunnelstepname != ''){
      this.funnelService.setfunneladd(this.uniqueid, data).subscribe({
        next: data => {
          // console.log(data);
          this.popupsidebar = false;
          this.addstepoption = false;
          this._snackBar.open('Step Added Successfully!', 'Close');

          this.steps = data.data;

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



          // console.log(data);
          // if(data.success==1){
          //   this.createvariation = false;
          //   this.funnelvariation = 1;
          // }
        },
        error: err => {
          console.log(err);
        }
      });
    }


  }

  usertemplateselected(value:any){
    // console.log(this.selectedstep);
    this.funnelService.setfunnelstep(this.selectedstep).subscribe({
      next: data => {
        // console.log(data);
        // console.log(this.uniqueidstep);

        if(data.data[0].funnelselected==1){
          this._general.redirectToBuilder(this.uniqueidstep, 'funnel');
        }

        if(data.data[0].funnelselected==1){
          this.tabOpen = 'overviewstep';
          this.funnelselected = 1;
        }else{
          this.tabOpen = 'overview';
          this.funnelselected = 0;
        }

      },
      error: err => {
        console.log(err);
      }
    });
  }

  duplicatemain(){

    this.funnelService.setfunnelvariation(this.uniqueidstep).subscribe({
      next: data => {
        // console.log(data);
        if(data.success==1){
          this.createvariation = false;
          this.funnelvariation = 1;
        }
      },
      error: err => {
        console.log(err);
      }
    });

  }
  declarewinner(){

    this.funnelService.setfunnelvariationdeclare(this.uniqueidstep).subscribe({
      next: data => {
        if(data.success==1){
          this.createvariation = false;
          this.funnelvariation = 0;
        }
      },
      error: err => {
        console.log(err);
      }
    });    

  }
  changestepnames(value:any){
    // console.log('check it');
    var mainvalue = '';
    if(value=='stepname'){
      mainvalue = this.funnelstepname;
    }else if(value=='page_path'){
      mainvalue = this.funnelstepurl;
    }else if(value=='variationpage_path'){
      mainvalue = this.funnelstepvariationurl;
    }
    // console.log(this.selectedstep)
    this.funnelService.namepathchanges(this.selectedstep,mainvalue,value).subscribe({
      next: data => {
        console.log(data);
        this.funnelstepurl = data.data[0].page_path;
        this.funnelstepvariationurl = data.data[0].variationlink;
        
        if(data.data.length!=0 && data.oldpath!=''){
          var pathobj  = {oldpath:data.oldpath,newpath:data.data[0].page_path};
          this.fileuploadService.renamepage(pathobj).subscribe({
            next: data => {
              // console.log(data);
            }
          });
        }


        this._snackBar.open('Successfully Updated!', 'Close');


        if(value=='stepname'){
            this.steps = data.data2;
        }

      }
    });
  }
  changestepnamesoutside(id:any,title:any){
    // console.log(id+''+title);
    this.funnelService.namepathchanges(id,title,'stepname').subscribe({
      next: data => {
        // console.log(data);
        // console.log('--data');
        // console.log(this.selectedstep);
        this._snackBar.open('Successfully Name Changed!', 'Close');
        if(this.selectedstep==data.data[0].id){
          this.funnelstepname = data.data[0].page_name;
        }
        this.showfunnelsteps();
      }
    });

  }
  showfunnelsteps(){
    this.funnelService.getuniquefunnelstep(this.uniqueid,'funnelstep').subscribe({
      next: data => {
        // console.log(data);
        this.steps = data.data;
        // if(data.data.length>1){
        //   this.firstselectedid = data.data[1].id;
        // }else if(data.data.length==1){
        // }
        this.firstselectedid = data.data[0].id;
        this.nextstepid = data.data[0].uniqueid;

        // console.log(this.firstselectedid +' selectid');
        // console.log(this.nextstepid +' stepid');

          if(data.data[0].funnelselected==1){
            this.tabOpen = 'overviewstep';
            this.funnelselected = 1;
          }else{
            this.funnelselected = 0;
          }

          this.funnelname = data.data2[0].name;

          if(data.data[0].variation==1){
            this.funnelvariation = 1;
          }

          this.selectedstep = data.data[0].id;

          data.data.forEach((element: any) => {
              if(element.uniqueid==this.uniqueidstep){
                  if(element.funneltype!='regular' && element.funneltype!='thankyou'){
                    this.myproductsshowcase = true;

                    this.showproductset();

                  }else{
                    this.tabOpen = 'overview'
                    this.myproductsshowcase = false;
                  }
                  
                  this.selectedstep = element.id;
                  this.funnelstepurl = element.page_path;

                  if(element.variation==1){
                    this.funnelvariation = 1;
                  }

                  if(element.funnelselected==1){
                    this.tabOpen = 'overviewstep';
                    this.funnelselected = 1;

                    var genscrn = 'keaimage-'+this.uniqueidstep+'-screenshot.png';

                    this.fileuploadService.validateimg(genscrn).subscribe({
                      next: data => {
          
                       if(data.data==1){
                          this.getthumbnail = '/assets/uploads/images/'+genscrn;
                        }
          
                      }
                    });

                  }else{
                    this.funnelselected = 0;
                  }

                  this.funnelstepname  = element.page_name;

                  var gettag = element.tags;
                  if(gettag!=''){
                    var crtag = gettag.split(',');
                    this.tags = crtag; 
                  }

                  this.maintime = this.fromNow(new Date(element.updated_at));

                  this.variationtime =  this.fromNow(new Date(element.variation_updated_ate));

                  this.funnelstepvariationurl = element.variationlink;

                  // console.log(element.updated_at);
                  this.splitvalue = element.splittestper;

                  if(element.variation==1){
                    if(element.splittestper!=null && element.splittestper!=''){
                      setTimeout(() => {
                        (<HTMLInputElement>document.getElementById('kb-splittestmake')).setAttribute('value',element.splittestper);
                        (<HTMLInputElement>document.getElementById('kb-changemyprogress')).style.width = this.splitvalue + '%';
                        (<HTMLElement>document.getElementById('kb-control')).innerHTML = this.splitvalue + '%';
                        (<HTMLElement>document.getElementById('kb-variation')).innerHTML = (100 - parseInt(this.splitvalue)) + '%';
                      }, 500);
                    }
                  }


              }
          });

      },
      error: err => {
        console.log(err);
      }
    });
  }
  fromNow(date:any, nowDate:any = Date.now(), rft:any = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })) {
      const SECOND = 1000;
      const MINUTE = 60 * SECOND;
      const HOUR = 60 * MINUTE;
      const DAY = 24 * HOUR;
      const WEEK = 7 * DAY;
      const MONTH = 30 * DAY;
      const YEAR = 365 * DAY;
      const intervals = [
          { ge: YEAR, divisor: YEAR, unit: 'year' },
          { ge: MONTH, divisor: MONTH, unit: 'month' },
          { ge: WEEK, divisor: WEEK, unit: 'week' },
          { ge: DAY, divisor: DAY, unit: 'day' },
          { ge: HOUR, divisor: HOUR, unit: 'hour' },
          { ge: MINUTE, divisor: MINUTE, unit: 'minute' },
          { ge: 30 * SECOND, divisor: SECOND, unit: 'seconds' },
          { ge: 0, divisor: 1, text: 'just now' },
      ];
      const now = typeof nowDate === 'object' ? nowDate.getTime() : new Date(nowDate).getTime();
      const diff = now - (typeof date === 'object' ? date : new Date(date)).getTime();
      const diffAbs = Math.abs(diff);
      for (const interval of intervals) {
          if (diffAbs >= interval.ge) {
              const x = Math.round(Math.abs(diff) / interval.divisor);
              const isFuture = diff < 0;
              return interval.unit ? rft.format(isFuture ? x : -x, interval.unit) : interval.text;
          }
      }
  }
  
 viewpagestep(page_path:any){
      var url = 'https://'+this.mydomain.subdomain+'.'+this.mydomain.domain+'/'+page_path;
      window.open(url, '_blank');
  }

  funnelstepedit(unique1:any, unique2:any,type:any){

    // console.log(unique1+' - '+unique2+' - '+type);

    this.automationaddnewaction = false;
    this.automationaddnewemail = false;
    this.automationaddnewtext = false;

    if(type=='copy'){
      this.copylink = true;
      this.popupsidebar = true;
      this.firstpart = true;
      this.colortheme = false;
      this.funnelurl = window.origin+'/funnels/'+this.uniqueid+'funnel/steps/'+unique2;
      this.pageurl = 'https://'+this.mydomain.subdomain+'.'+this.mydomain.domain+'/'+unique1;
    }else if(type=='duplicate'){
        this.funnelService.makefunnelstepduplicate(unique2, 'duplicatestep').subscribe({
          next: data => {
            // console.log(data);
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

              this.showfunnelsteps();
              this._snackBar.open('Successfully Duplicate Step!', 'Close');
              this.kb_substeps2(data.data.insertId);
            }
          }
        });
    }else if(type=='archive'){
      this.forarchiveid = unique2;
      this.firstpart = false;
      this.popupsidebar = true;
      this.copylink = true;
      this.colortheme = false;
      // console.log(this.panelOpenState);
      // console.log(this.panelOpenState);
    }else if(type=='colortheme'){
      this.forarchiveid = unique2;
      this.badgecolor = unique1;
      this.popupsidebar = true;
      this.firstpart = false;
      this.colortheme = true;
    } 

  }
  makearchivestep(){
    this.funnelService.makefunnelsettings(this.reason, this.forarchiveid, 'archivestep').subscribe({
      next: data => {
        // console.log(data);

        if(data.status==1){
          this.accordion.closeAll();
          this.reason = '';
          this.popupsidebar = false;
          this.showfunnelsteps();
          this._snackBar.open('Successfully Archived!', 'Close');

          setTimeout(() => {
            
            // console.log(this.nextstepid+'  --1');
            // console.log(this.uniqueidstep+'  --2');
            // console.log(this.firstselectedid+' --id');
            // if(this.nextstepid==this.uniqueidstep){
              // console.log('work -'+this.nextstepid);
              this.kb_substeps2(this.firstselectedid);
              // }
            }, 500);

        }else if(data.status==0){
          if(data.notallow==1){
            this._snackBar.open('Single Step Can not be Archived!', 'Close');
          }
        }

      }
    });
  }
  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
  kbfootersteps(value:any){
    // console.log(this.uniqueidstep);

    if(value=='clonefunnelstep'){
      this.funnelService.makefunnelstepduplicate(this.uniqueidstep, 'duplicatestep').subscribe({
        next: data => {
          // console.log(data);
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

            this.showfunnelsteps();
            this._snackBar.open('Successfully Duplicate Step!', 'Close');
            this.kb_substeps2(data.data.insertId);
          }
        }
      });
    }else if(value=='archivefunnelstep'){
      this.automationaddnewaction = false;
        this.forarchiveid = this.uniqueidstep;
        this.firstpart = false;
        this.popupsidebar = true;
        this.copylink = true;
    }else if(value=='deletefunnelstep'){

      this.funnelService.makefunnelsettings('', this.uniqueidstep, 'deletestep').subscribe({
        next: data => {
          // console.log(data);
  
          if(data.status==1){

            this.fileuploadService.deletepage(data.path).subscribe({
              next: data => {
                // console.log(data);
              }
            });

            this.showfunnelsteps();
            this._snackBar.open('Successfully Deleted!', 'Close');
            this.kb_substeps2(data.id);
          }else if(data.status==0){
            if(data.notallow==1){
              this._snackBar.open('Single Step Can not be Deleted!', 'Close');
            }
          }
  
  
        }
      });

    }

  }
  checkpagesettings(value:any){
    if(value=='redirect'){
      var url = 'https://'+this.mydomain.subdomain+'.'+this.mydomain.domain+'/'+this.funnelstepurl;
      window.open(url, '_blank')
    }else if(value=='settings'){
      this.tabOpen = 'publishing';
      this.isvariationinactive = true;
    }else if(value=='variationsetting'){
      this.tabOpen = 'publishing';
      this.isvariationinactive = false;
    }else if(value=='variationnewtab'){
      var url = window.origin+'/'+this.funnelstepvariationurl;
      window.open(url, '_blank')
    }
  }
  splitapply(){
    // console.log(this.splitvalue); 
    this.funnelService.makefunnelsettings(this.splitvalue, this.uniqueidstep, 'splitapply').subscribe({
      next: data => {
        // console.log(data);
        if(data.status==1){
          this._snackBar.open('Successfully Changes Applied!', 'Close');
        }

      }
    });
  }
  archivepanel(value:any,selectedid:any){
    // console.log(this.panelOpenState);

    if(value=='archivefunnelstep'){

      if(this.panelOpenState){
        this.funnelService.getuniquefunnelstep(this.uniqueid, value).subscribe({
          next: data => {
            this.archivesteps = data.data;
            // console.log(this.archivesteps);
          }
        });
      }

    }else if(value=='unarchiveit'){
        this.funnelService.getuniquefunnelstep(selectedid, value).subscribe({
          next: data => {
            // console.log(data);
            // console.log('--unarchiveit')
            this.steps = data.data;
            this.archivesteps = data.data2;
            this.kb_substeps2(this.firstselectedid);

            if(data.data2.length==0){
               this.accordion.closeAll();
            }

          }
        });
    }else if(value=='deleteit'){
      this.funnelService.getuniquefunnelstep(selectedid, value).subscribe({
        next: data => {
          // console.log(data);
          if(data.status==1){

            this.fileuploadService.deletepage(data.path).subscribe({
              next: data => {
                // console.log(data);
              }
            });
          
            this.archivesteps = data.data;
            this._snackBar.open('Successfully Deleted!', 'Close');

          }
        }
      });
    }


  }
  savesteptheme(){
   
    this.funnelService.makefunnelsettings(this.badgecolor, this.forarchiveid, 'colorbadge').subscribe({
      next: data => {
        // console.log(data);

        if(data.status==1){
          this.popupsidebar = false;
          this.showfunnelsteps();
          this._snackBar.open('Color Successfully Updated!', 'Close');
        }

      }
    });

  }
  changetemplate(value:any){
    if(value=='emailoptin'){
      this.selectedcampaign = 'email-optin';
      this.selectedcampaignname = 'EMAIL OPTIN';
      this.selectedcampicon = 'fas fa-envelope';
    }else  if(value=='thankyou'){
      this.selectedcampaign = 'thankyou-optin';
      this.selectedcampaignname = 'THANK YOU';
      this.selectedcampicon = 'fas fa-download';
    }else if(value=='salespage'){
      this.selectedcampaign = 'sales-page';
      this.selectedcampaignname = 'SALES PAGE';
      this.selectedcampicon = 'fas fa-search-dollar';
    }else if(value=='productlaunch'){
      this.selectedcampaign = 'product-launch-sales-page';
      this.selectedcampaignname = 'PRODUCT LAUNCH';
      this.selectedcampicon = 'fas fa-rocket';
    }else if(value=='orderform'){
      this.selectedcampaign = 'order-form-sales-page';
      this.selectedcampaignname = 'ORDER FORM';
      this.selectedcampicon = 'fas fa-shopping-cart';
    }else if(value=='oneclickupsell'){
      this.selectedcampaign = 'upsell-sales-page';
      this.selectedcampaignname = 'ONE-CLICK UPSELL (OTO)';
      this.selectedcampicon = 'fas fa-download';
    }else if(value=='oneclickdownsell'){
      this.selectedcampaign = 'downsell-sales-page';
      this.selectedcampaignname = 'ONE-CLICK DOWNSELL';
      this.selectedcampicon = 'fas fa-level-up-alt';
    }else if(value=='orderconfirmation'){
      this.selectedcampaign = 'order-confirm-sales-page';
      this.selectedcampaignname = 'ORDER CONFIRMATION';
      this.selectedcampicon = 'fas fa-check-circle';
    }else if(value=='webinarregistration'){
      this.selectedcampaign = 'registration-webinar';
      this.selectedcampaignname = 'WEBINAR REGISTRATION';
      this.selectedcampicon = 'fas fa-mail-bulk';
    }else if(value=='webinarthankyou'){
      this.selectedcampaign = 'thank-you-webinar';
      this.selectedcampaignname = 'WEBINAR THANK YOU';
      this.selectedcampicon = 'fas fa-download';
    }else if(value=='bodcastroom'){
      this.selectedcampaign = 'boadcast-room-webinar';
      this.selectedcampaignname = 'WEBINAR BOADCAST ROOM';
      this.selectedcampicon = 'fas fa-microphone';
    }else if(value=='clickpopup'){
      this.selectedcampaign = 'clickpop';
      this.selectedcampaignname = 'CLICKPOPUP';
      this.selectedcampicon = 'fas fa-external-link-square-alt';
    }else if(value=='other'){
      this.selectedcampaign = 'misc';
      this.selectedcampaignname = 'OTHER';
      this.selectedcampicon = 'fas fa-bars';
    }

  }
  addproduct(){
    this.productname = '';
    this.productprice = '';
    this.priceoverride = '';
    
    this.popupsidebar = true;
    this.addproductpopup = true;
    this.automationaddnewaction = false;
    this.automationaddnewemail = false;
    this.automationaddnewtext = false;
    this.copylink = false;
    this.colortheme = false;
  }
  saveproduct(){
    // console.log(this.productprice);
    if(this.productname!='' && this.productprice!=''){
        var dataobj = {stepid: this.uniqueidstep,name: this.productname, price: this.productprice, priceoverride: this.priceoverride,type:'insert'};

        this.funnelService.funneladdeditproduct(dataobj).subscribe({
          next: data => {
            // console.log(data);
            this._snackBar.open('Product Added Successfully!', 'Close');

            this.productname = '';
            this.priceoverride = '';
            this.productprice = '';
            this.showproductset();

          }
        });

    }

  }

  editproduct(id:any){
    this.editproid = id;

    this.editmode = true;

    this.popupsidebar = true;
    this.addproductpopup = true;
    this.automationaddnewaction = false;
    this.automationaddnewemail = false;
    this.automationaddnewtext = false;
    this.copylink = false;
    this.colortheme = false;

    var dataobj = {stepid: this.uniqueidstep,name: '', price: '', priceoverride: '',type:'singleproduct',id:id};

    this.funnelService.funneladdeditproduct(dataobj).subscribe({
      next: data => {

        // console.log(data);
        if(data.data.length!=0){

          this.productname = data.data[0].productname;
          this.productprice = data.data[0].productprice;
          this.priceoverride = data.data[0].priceoverride;

        }

      }
    });

  }

  editcheckout(){
    this.popupsidebar = true;
   this.editcheckoutdetails = true;

   this.addproductpopup = false;
   this.automationaddnewaction = false;
   this.automationaddnewemail = false;
   this.automationaddnewtext = false;
   this.copylink = false;
   this.colortheme = false;

  }
  
  savemycheckout(){

    this.checkoutstyle.id = this.uniqueidstep;
    // console.log(this.checkoutstyle);

    this.checkoutService.updatecheckoutstyle(this.checkoutstyle).subscribe({
      next: data => {
        // console.log(data);

      }
    });

  }

  showproductset(){
    var dataobj = {stepid: this.uniqueidstep,name: '', price: '', priceoverride: '',type:'get'};

    this.funnelService.funneladdeditproduct(dataobj).subscribe({
      next: data => {
        // console.log(data);

        if(data.data.length!=0){
            this.myproductsshow = data.data;
        }else{
          this.myproductsshow = [];
        }

      }
    });

    var dataobj2 = {id: this.uniqueidstep};
    this.checkoutService.getallcheckoutdata(dataobj2).subscribe({
      next: data => {
        // console.log(data);

        if(data.data.length!=0){
          this.checkoutstyle = {step1headline:data.data[0].step1headline,step1subheadline:data.data[0].step1subheadline,step1btntext:data.data[0].step1btntext, step1btnsubtext:data.data[0].step1btnsubtext, step1footertext:data.data[0].step1footertext,step2headline:data.data[0].step2headline,step2subheadline:data.data[0].step2subheadline,step2btntext:data.data[0].step2btntext, step2btnsubtext:data.data[0].step2btnsubtext, step2footertext:data.data[0].step2footertext};
        }else{
          this.checkoutstyle = {step1headline:'',step1subheadline:'',step1btntext:'', step1btnsubtext:'', step1footertext:'',step2headline:'',step2subheadline:'',step2btntext:'', step2btnsubtext:'', step2footertext:''};
        }

      }
    });

   





  }

  edtdelpro(type:any, id:any){

    if(type=='update'){
      id = this.editproid;
    }
    // console.log(this.productprice);
    if((this.productname!='' && this.productprice!='') || type=='delete'){
      var dataobj = {stepid: this.uniqueidstep, name: this.productname, price: this.productprice, priceoverride: this.priceoverride, type:type, id:id};

      this.funnelService.funneladdeditproduct(dataobj).subscribe({
        next: data => {
          // console.log(data);

          if(type=='update'){
            if(data.status==1){
              this._snackBar.open('Product Updated Successfully!', 'Close');
            }  
          }
          this.showproductset();

        }
      });

    }

  }

  openDialog(id:any): void {
    
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '255px',
      data: {name: 'Product'},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // console.log(id);

      if(result.event == 'Delete'){
        
        var dataobj = {stepid: this.uniqueidstep, name: this.productname, price: this.productprice, priceoverride: this.priceoverride, type:'delete', id:id};

        this.funnelService.funneladdeditproduct(dataobj).subscribe({
          next: data => {
            // console.log(data);

              if(data.status==1){
                this._snackBar.open('Product Deleted Successfully!', 'Close');
                this.showproductset();
              }

          }
        });

      }
      
    });

  }

  
 


}



@Component({
  selector: 'tags-dialog',
  templateUrl: '../delete-dialog/delete-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close({event:'nothanks'});
  }
  onClick(){
    this.dialogRef.close({event:'Delete'});
  }
}
