import { Component, ElementRef, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { ImageService } from 'src/app/_services/image.service';
import { ListService } from '../../../_services/_crm/list.service';
import { TagService } from '../../../_services/_crm/tag.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FunnelService } from 'src/app/_services/funnels.service';

@Component({
  selector: 'app-new-funnel-steps',
  templateUrl: './new-funnel-steps.component.html',
  styleUrls: ['./new-funnel-steps.component.css']
})
export class NewFunnelStepsComponent implements OnInit {

   
  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
 
  steps:any[] = [];
  funnel:any;
  funnels:any;
  toggleview = true;
  shortwaiting = true;
  uniqueid:any; 
  delstep:any;
  nodata = true;
  fetching:boolean = true;
  firstpart = true;
  funneltostep = true
  colortheme = false;
  funnelurl = '';
  pageurl = '';
  forarchiveid = '';
  shwobtnfirst = true;
  badgecolor = '';
  selfunnelstep: any;
  actionname: any = '';
  funnelarchid = '';
  reason:any='';
  dialogfunnelset:any;
  funnelnotfound = false;
  selectedstep:any = 0;
  funnelselected:any = 0;
  funnelsteptype = '';
  form:any={
  funneltype: '',
  stepname:'',
  };
  newfunnelid: any = '';
  uniqueidstep:any;
  funnelstepname = '';
  funnelstepurl:any = '';
  getthumbnail = '';
  step:any;

  stepnameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  steppathFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  constructor(private _file: FileUploadService,
              public _image: ImageService,
              public _general: GeneralService,
              public dialog: MatDialog,          
              private fileuploadService: FileUploadService, 
              private route: ActivatedRoute,
              private router: Router,
              private funnelService: FunnelService,
              ) {
                this.route.parent?.paramMap.subscribe((params: ParamMap) => { 
                  this.uniqueid = params.get('funnel_id');
                })
                // console.log(this.uniqueid)
                  
                 
               }

  ngOnInit(): void {
    this.fetchsinglefunnel();
    
  }
  fetchsinglefunnel(){
    this.funnelService.getSingleFunnel(this.uniqueid).subscribe({
      next: data => {
        this.funnel=data?.data[0];
        this.fetchsteps();
        this.showfunnels();
        setTimeout(() => {
          this.shortwaiting = false;
        }, 1000)
      }
    });
  }

  fetchsteps(){
    this.fetching = true;
    this.funnelService.getSingleFunnelpages({funnelid:this.uniqueid,archived:'0'}).subscribe((data:any) => {
       if(data.success){
        this.fetching = false;
        this.adjustdata(data.data);
        this.kb_substeps2(data.data[0].id);
      }
      else{
        this.fetching = false;
      }
    });
  }

  rename(data:any, inp:any){
    var newname = inp.value;
    if(data.name !== newname) {
      if(newname.length>3){
        data.name = newname;
        // this._file.updatestep(data).subscribe({
        //   next: data => {
        //     var msg, err = data.success==0;
        //     if(err){
        //       msg = 'Server Error';
        //     }
        //     else {
        //       msg = 'step name updated successfully!';
        //       this.fetchsteps();
        //     }
        //     this._general.openSnackBar(err, msg, 'OK', 'center', 'top');
        //   }
        // }); 
      }else{
      this._general.openSnackBar(true, 'step name must be at least 3 characters!', 'OK', 'center', 'top');
        inp.value = data.name;
      }
    }
  }

  openDialog(templateRef: TemplateRef<any>, step:any ): void {
    this.delstep = step;
    var dialog  = this.dialog.open(templateRef);
    dialog.afterClosed().subscribe((data:any) => {
      })
  }

  searchsteps(search: any, filter: any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      filter: filter.value,
      archive:'0',
      funnelid:this.uniqueid,
    }
    this.funnelService.searchqueryFunnelsteps(obj).subscribe((data:any) => {
      this.fetching = false;
        if(data.success){ 
        this.steps = data?.data;
        }
        
    });
  }

  adjustdata(data:any){
    this.fetching = false;
    this.steps = [];
    this.nodata = data.length == 0;
    this.steps = data;
  }

  toggleView() {
    this.toggleview = !this.toggleview; 
    this._general.setStorage('step_toggle',this.toggleview);
  }

 viewpagestep(domain: any, subdomain: any, path: any) {
    if (domain != '' && domain != null) {
      var url = 'https://' + domain + '/' + path;
    } else {
      var url = 'https://' + subdomain + '.keapages.com/' + path;
    }
    window.open(url, '_blank');
  }
  funnelstepedit(
    unique1: any,
    unique2: any,
    type: any,
    templateRef: TemplateRef<any>
  ) {
    if (type == 'edit') {
      this.router.navigate(['/funnels/' + unique1 + '/steps/' + unique2], {
        relativeTo: this.route,
      });
    } else if (type == 'copy') {
      this.firstpart = true;
      this.dialog.open(templateRef);
      this.funneltostep = false;
      this.colortheme = false;
      this.funnelurl =
        window.origin +
        '/funnels/' +
        unique1.uniqueid +
        '/steps/' +
        unique2.uniqueid;

      if (unique1.domain != '' && unique1.domain != null) {
        this.pageurl = 'https://' + unique1.domain + '/' + unique2.page_path;
      } else {
        this.pageurl =
          'https://' + unique1.subdomain + '.keapages.com/' + unique2.page_path;
      }
    } else if (type == 'archive') {
      this.funnelarchid = unique1;
      this.forarchiveid = unique2;
      this.dialog.open(templateRef);
      this.firstpart = false;
      this.shwobtnfirst = false;
      this.colortheme = false;
    }else if (type == 'quickedit') {
      this.step=unique2;
      this.dialog.open(templateRef);
    }else if (type == 'duplicate') {
      // console.log(unique1+' - '+unique2);
      var nwobj: any = { uniqueid: unique2, type: 'duplicatestep' };
      this.funnelService.makefunnelstepduplicate(nwobj).subscribe({
        next: (data) => {
          // console.log(data);
          if (data.success == 1) {
            var pathobj = {
              oldpath: unique1,
              newpath: data.newpath,
              website_id: data.websiteid,
              dir: 'pages',
            };
            this._file.copypage(pathobj).subscribe({
              next: (data) => {
                this.fetchsteps();
                this._general.openSnackBar(
                  false,
                  'Step Duplicate Successfully!',
                  'OK',
                  'center',
                  'top'
                );
              },
            });

            var oldscr = 'keaimage-page-' + unique2 + '-screenshot.png';
            this._file.validateimg(oldscr).subscribe({
              next: (data2) => {
                if (data2.data == 1) {
                  var imgobj = {
                    oldname: oldscr,
                    newname:
                      'keaimage-page-' + data.newuniqueid + '-screenshot.png',
                  };
                  this._file.copyimage(imgobj).subscribe({
                    next: (data) => {},
                  });
                }
              },
            });
          }
          else{
            this._general.openSnackBar(
              true,
              data?.message,
              'OK',
              'center',
              'top'
            ); 
          }
        },
      });
    } else if (type == 'colortheme') {
      this.forarchiveid = unique2;
      this.badgecolor = unique1;
      this.dialog.open(templateRef);
      this.firstpart = false;
      this.colortheme = true;
    } else if (type == 'move') {
      this.actionname = 'Move';
      this.selfunnelstep = unique2;
      this.dialog.open(templateRef);
    } else if (type == 'copymove') {
      this.actionname = 'Copy & Move';
      this.selfunnelstep = unique2;
      this.dialog.open(templateRef);
    } else {
      this.actionname = '';

      this.selfunnelstep = unique2;
      this.dialog.open(templateRef);
    }
  }

  copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._general.openSnackBar(
      false,
      'Successfully Copied!',
      'OK',
      'center',
      'top'
    );
  }
  makearchivestep() {
    var obj = {
      value: this.reason,
      id: this.forarchiveid,
      type: 'archivestep',
    };
    // console.log(obj);
    this.funnelService.makefunnelsettings(obj).subscribe({
      next: (data) => {
        // console.log(data);

        if (data.status == 1) {
          this.draftpublish('0', data.page_path, this.funnelarchid);
          this.reason = '';
          this.fetchsteps();
          this._general.openSnackBar(
            false,
            'Successfully Archived!',
            'OK',
            'center',
            'top'
          );
        } else if (data.status == 0) {
          if (data.notallow == 1) {
            this._general.openSnackBar(
              false,
              'Single Step Can not be Archived!',
              'OK',
              'center',
              'top'
            );
          }
        }
        this.shwobtnfirst = true;
        this.dialog.closeAll();
      },
    });
  }
  draftpublish(status: any, page_path: any, websiteid: any) {
    var getvl = status == '0' ? 'draft' : 'publish';
    var newobjdt = { status: getvl, path: page_path, website_id: websiteid };
    this._file.toggleDraft(newobjdt).subscribe((data: any) => {});
  }
  savesteptheme() {
    var obj = {
      value: this.badgecolor,
      id: this.forarchiveid,
      type: 'colorbadge',
    };

    this.funnelService.makefunnelsettings(obj).subscribe({
      next: (data) => {
        // console.log(data);

        if (data.status == 1) {
          this.dialog.closeAll();
          this.fetchsteps();
          this._general.openSnackBar(
            false,
            'Color Successfully Updated!',
            'OK',
            'center',
            'top'
          );
        }
      },
    });
  }
  addstep(){ 
    if(this.form.funneltype!='' && this.form.stepname != ''){
      this.funnelService.setfunneladd(this.uniqueid, this.form).subscribe({
        next: data => {
          this.steps = data.data;
          var page = {
            head: '',
            body: '',
            style: '',
            dir: '/pages',
            folder: data.pagepath,
            prevFolder: data.pagepath,
            website_id:this.uniqueid, 
          }
          this._general._file.savePage(page).subscribe((event:any) => {
            // console.log(event);
          },
          error=>{console.log(error)});
          this.dialog.closeAll();
          this.form.stepname='';
          this.form.funneltype='';
          this._general.openSnackBar(false,'Step Added Successfully!', 'Close','center','top');
        },
        error: err => {
          console.log(err);
        }
      });
    }


  }
  updatesteppath(){
    this.funnelService.updatesteppath(this.step).subscribe({
      next: data => {
        // console.log(data);
        this.funnelstepurl = data.data[0].page_path;
        if(data.data.length!=0 && data.oldpath!=''){
          var pathobj  = {oldpath:data.oldpath,newpath:data.data[0].page_path};
          this.fileuploadService.renamepage(pathobj).subscribe({
            next: data => {
              // console.log(data);
              
            }
          });
        }
        this.fetchsteps();
        this.dialog.closeAll();
        this._general.openSnackBar(false,'Successfully Updated!', 'Close','center','top');
      }
    });
  }
  dupanotherdes(page: any) {
    if (this.newfunnelid != '') {
      // console.log(page);
      var getvl = 'pages';
      var newpath = page.page_path+'-'+this.makeid(20);

      var dtobj = {
        type: this.actionname,
        newfunnelid: this.newfunnelid,
        uniqueid: page.uniqueid,
        newpath: newpath,
      };
      this.funnelService.movecopyfunnel(dtobj).subscribe({
        next: (data) => {
          // console.log(data);

          if (data.foundone == 0 && data.success == 1) {
            // console.log('inside');

            var pathobj = {
              old_website_id: data.oldfunnelid,
              new_website_id: this.newfunnelid,
              dir: getvl,
              oldpath: page.page_path,
              newpath: data.newpath,
              trigger: '',
            };
            this.actionname == 'Move'
              ? (pathobj.trigger = 'move')
              : (pathobj.trigger = 'copy');

            // console.log(pathobj);
            this._file.transferPage(pathobj).subscribe({
              next: (data) => {
                // console.log(data);
                this.actionname == 'Move'
                  ? this._general.openSnackBar(
                      false,
                      'Funnel Step Move Successfully!',
                      'OK',
                      'center',
                      'top'
                    )
                  : this._general.openSnackBar(
                      false,
                      'Funnel Step Copy & Move Successfully!',
                      'OK',
                      'center',
                      'top'
                    );
                this.fetchsteps();
                this.dialog.closeAll();
              },
            });
          } else {
            this.actionname == 'Move'
              ? this._general.openSnackBar(
                  false,
                  "Single Step Can't be Move!",
                  'OK',
                  'center',
                  'top'
                )
              : this._general.openSnackBar(
                  false,
                  "Single Step Can't be Copy & Move!",
                  'OK',
                  'center',
                  'top'
                );
          }
        },
      });
    } else {
      this._general.openSnackBar(
        false,
        "Can't find the Funnel!",
        'OK',
        'center',
        'top'
      );
    }
  }
  showfunnels() {
    this.funnelService.getallfunnelandstep().subscribe({
      next: (data) => {
        // console.log(data);

        this.generatefunneldt(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  generatefunneldt(data: any) {
    this.funnels = [];
    if (data.data2?.length != 0) {
      this.funnelnotfound = false;

      data.data2.forEach((element: any) => {
        var newob: any = {
          id: '',
          uniqueid: '',
          name: '',
          grouptags: '',
          domain: '',
          subdomain: '',
          steps: [],
          created_at: '',
          updated_at: '',
        };
        newob.uniqueid = element.uniqueid;
        newob.id = element.id;
        newob.name = element.name;
        newob.grouptags = element.grouptags;
        newob.created_at = element.created_at;
        newob.updated_at = element.updated_at;

        newob.domain = element.domain;
        newob.subdomain = element.subdomain;
        data.data.forEach((element2: any) => {
          var newob2 = {
            id: '',
            uniqueid: '',
            page_name: '',
            page_path: '',
            created_at: '',
            updated_at: '',
            variation: '',
            tag: '',
            color: '',
            img: '',
            funnelid: '',
            funneltype: '',
          };
          if (element2.funnelid == newob.uniqueid) {
            newob2.id = element2.id;
            newob2.page_name = element2.page_name;
            newob2.uniqueid = element2.uniqueid;
            var subdate = element2.updated_at
              ? new Date(element2.updated_at).toDateString()
              : '';
            var subdate1 = element2.created_at
              ? new Date(element2.created_at).toDateString()
              : '';
            newob2.updated_at = subdate;
            newob2.created_at = subdate1;
            newob2.variation = element2.variation;
            newob2.tag = element2.tags;
            newob2.color = element2.color;
            newob2.img = element2.img;
            newob2.funnelid = element2.funnelid;
            newob2.funneltype = element2.funneltype;
            newob2.page_path = element2.page_path;
            newob.steps.push(newob2);
            if (new Date(subdate) > new Date(newob.updated_at))
              newob.updated_at = subdate;
            if (new Date(subdate1) > new Date(newob.created_at))
              newob.created_at = subdate1;
          }
        });

        this.funnels.push(newob);
        // console.log(this.funnels);
      });
    } else {
      this.funnelnotfound = true;
    }
  }
  makeid(length: any) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  kb_substeps2(value: any) {
    // this.tabOpen2 = value;
    console.log(value);

    this.funnelService.setfunnelselect(value).subscribe({
      next: data => {
        
        data.data.forEach((stepdata:any) => {
          // console.log(stepdata);

          this.funnelsteptype = stepdata.funneltype;
            
            this.uniqueidstep = stepdata.uniqueid;
            this.funnelService.uniquestepId = stepdata.uniqueid;
            this.router.navigate(['/funnels/'+this.uniqueid+'/steps/'+stepdata.uniqueid],{relativeTo: this.route});
            
            if(stepdata.funnelselected==1){
            
              this.funnelselected = 1;
            }else{
              
              this.funnelselected = 0;
            }

          

            this.funnelstepname = stepdata.page_name;
            this.funnelstepurl = stepdata.page_path;

         
            
            this.selectedstep = value;
            
          

            var genscrn = 'keaimage-page-'+this.uniqueidstep+'-screenshot.png';

            this.fileuploadService.validateimg(genscrn).subscribe({
              next: data => {

              if(data.data==1){
                  this.getthumbnail = genscrn;
                }else{
                  this.getthumbnail = 'webpage_thumbnail.jpg';
                }

              }
            });

            // this.maintime = this.fromNow(new Date(stepdata.updated_at));
          
        });
        
      },
      error: err => {
        console.log(err);
      }
    });   

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
          this.funnelselected = 1;
        }else{
          
          this.funnelselected = 0;
        }

      },
      error: err => {
        console.log(err);
      }
    });
  }
}

