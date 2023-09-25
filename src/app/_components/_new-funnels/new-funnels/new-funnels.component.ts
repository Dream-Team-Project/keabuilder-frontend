import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FunnelService } from 'src/app/_services/funnels.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { UserService } from 'src/app/_services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { WebsiteService } from 'src/app/_services/website.service';
import {MatDialog,} from '@angular/material/dialog';
import { PageViewService } from 'src/app/_services/page-view.service';

@Component({
  selector: 'app-new-funnels',
  templateUrl: './new-funnels.component.html',
  styleUrls: ['./new-funnels.component.css'],
})
export class NewFunnelsComponent implements OnInit {

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('colorbadgedialog') colorbadgedialog!: TemplateRef<any>;
  @ViewChild('deletedialog') deletedialog!: TemplateRef<any>;
  @ViewChild('funnelduplicatedialog') funnelduplicatedialog!: TemplateRef<any>;
 
  expi: number = -1;
  error=false;
  errormessage:any='';
  dataobj: any;
  errorMessage = '';
  funnels: any = [];
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
  mydomain = '';
  selstatusshow = 'all';
  searching = false;
  selfunnelid = '';
  dupfunnelname = '';
  funnelarchid = '';

  // MatPaginator Inputs
  length = 100;
  pageSize = 8;
  pageSizeOptions: number[] = [8, 16, 24, 100];

  // MatPaginator Output
  pageEvent!: PageEvent;  
  userFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  subdomainFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]);
  stepnameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  funneltitleFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  form: any = {
    funnelname: '',
    funnelfirststep: '',
    badgecolor: '',
    funneltype: '',
    subdomain: '',
  };
  selfunnelstep: any;
  actionname: any = '';
  newfunnelid: any = '';
  dialogfunnelset = '';
  hidefornow = false;

  username:any = '';


  constructor(
    private funnelService: FunnelService,
    private router: Router,
    private route: ActivatedRoute,
    public _general: GeneralService,
    private userService: UserService,
    private _file: FileUploadService,
    private websiteService: WebsiteService,
    public dialog: MatDialog,
    public _pageviewService:PageViewService,
  ) {
    
  }

  ngOnInit(): void {
    this.showfunnels();

    this.userService.getUsersDetails().subscribe({
      next: data => {
        if(data.data.length>0){
          this.username = data.data[0].username;
        }
      }
    });

  }

  getServerData(event?: PageEvent) {
    var length = event?.length;
    var pageindex = event?.pageIndex;
    var pageSize = event?.pageSize;
    var previousPageIndex = event?.previousPageIndex;
    // console.log(length+' - '+pageindex+' - '+pageSize+' - '+' - '+previousPageIndex);
  }

  funneledit(uniqueid: any, id: any, type: any, templateRef: TemplateRef<any>) {
    if (type != 'edit') this.dialog.open(templateRef);
    if (type == 'duplicate') {
      this.form.funnelname = '';
      this.form.subdomain = '';
      this.dupfunnelname = uniqueid;
      this.selfunnelid = id;
    } else if (type == 'archive') {
      this.forarchiveid = uniqueid;
    } else {
      var obj = { uniqueid: uniqueid, id: id, type: type };
      this.funnelService.makefunnelsettings(obj).subscribe({
        next: (data) => {
          if (type == 'edit') {
            this.funnelService.funnel_id=uniqueid;
            this.funnelService.step_id=id;
            this.router.navigate(
              ['/funnels/' + uniqueid + '/steps/' + data.data[0].uniqueid],
              { relativeTo: this.route }
            );
          } else if (type == 'copy') {
            this.firstpart = true;
            this.funneltostep = true;
            this.colortheme = false;
            this.funnelurl =
              window.origin +
              '/funnels/' +
              uniqueid +
              '/steps/' +
              data.data[0].uniqueid;
              
          }
        },
      });
    }
  }

  removespecialcharwithsmall(data: any) {
    var datagen = data.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return datagen;
  }

  makeduplicatefunnel() {
    this.createsubdomainname();

    if (this.funneltitleFormControl.status == 'VALID' && this.form.subdomain!='') {

        this.searching = true;
        var obj: any = {
          uniqueid: this.selfunnelid,
          funnelname: this.form.funnelname,
          subdomain: this.form.subdomain,
          type: 'duplicatefunnel',
        };
        // console.log(obj);

        this.funnelService.makefunnelstepduplicate(obj).subscribe({
          next: (data) => {
            // console.log(data);
            
            if (data.exist == 1) {
              this.error=true;
      this.errormessage="Title & subdomain Fields required !";
      this.dialog.open(this.funnelduplicatedialog);
            } else {

              if (data.success == 1) {
                this._file.createuserlogofavi(data.uniqueid).subscribe((e) => {
                  // console.log(e);
                });

                if (data.uniqueid != '') {
                  var dataobj = {
                    old_website_id: this.selfunnelid,
                    new_website_id: data.uniqueid,
                  };
                  this._file.copywebsitefolder(dataobj).subscribe((e) => {
                    // console.log(e);
                  });
                }

                this.websiteService
                  .oncreatesubdomain(this.form.subdomain, data.uniqueid)
                  .subscribe({
                    next: (data) => {
                      // console.log(data);
                      this.showfunnels();
                      this._general.openSnackBar(
                        false,
                        'Funnel Duplicate Successfully!',
                        'Ok',
                        'center',
                        'top'
                      );
                     this.resetobj();
                    },
                  });
              }
              else{
                this.error=true;
      this.errormessage="Server Error!";
      this.dialog.open(this.funnelduplicatedialog);
              }
            }
          },
        });
      
    } else {
      this.error=true;
      this.errormessage="Something went Wrong!";
      this.dialog.open(this.funnelduplicatedialog);
      // this._general.openSnackBar(
      //   false,
      //   'Error in Title & subdomain Fields!',
      //   'OK',
      //   'center',
      //   'top'
      // );
    }
  }

  searchStringInArray(str: any, strArray: any) {
    for (var j = 0; j < strArray.length; j++) {
      if (strArray[j] == str) return 0;
    }
    return 1;
  }

  makearchive() {
    var obj = { value: this.reason, id: this.forarchiveid, type: 'archive' };
    // console.log(obj);
    this.funnelService.makefunnelsettings(obj).subscribe({
      next: (data) => {
        // console.log(data);
        if (data.status == 1) {
          data.data.forEach((element: any) => {
            this.draftpublish('0', element.page_path, this.forarchiveid);
          });
          this._general.openSnackBar(
            false,
            'Successfully Archived!',
            'Ok',
            'center',
            'top'
          );
          
          this.showfunnels();
         this.resetobj();
          this.shwobtnfirst = true;
        }
        else{
          this.error=true;
          this.errormessage='Server Error';
          this.dialog.open(this.deletedialog);
        }
      },
    });
  }

  draftpublish(status: any, page_path: any, websiteid: any) {
    var getvl = status == '0' ? 'draft' : 'publish';
    var newobjdt = { status: getvl, path: page_path, website_id: websiteid };
    this._file.toggleDraft(newobjdt).subscribe((data: any) => {});
  }

  copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._general.openSnackBar(
      false,
      'Successfully Copied!',
      'Ok',
      'center',
      'top'
    );
  }

  showfunnels() {
    this.funnelService.getallfunnelandstep().subscribe({
      next: (data) => {
        // console.log(data);

        this.generatefunneldt(data);
      },
      error: (err) => {
        // console.log(err);
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
        newob.contentVisible = false;

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
    } else if (type == 'duplicate') {
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
                this.showfunnels();
                this._general.openSnackBar(
                  false,
                  'Step Duplicate Successfully!',
                  'Ok',
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
            this.resetobj();
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

  viewpagestep(domain: any, subdomain: any, path: any) {
    if (domain != '' && domain != null) {
      var url = 'https://' + domain + '/' + path;
    } else {
      var url = 'https://' + subdomain + '.keapages.com/' + path;
    }
    window.open(url, '_blank');
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
         this.resetobj();
          this.showfunnels();
          this._general.openSnackBar(
            false,
            'Successfully Archived!',
            'Ok',
            'center',
            'top'
          );
        } else if (data.status == 0) {
          if (data.notallow == 1) {
            this.shwobtnfirst = true;
            this.resetobj();
            this._general.openSnackBar(
              false,
              'Single Step Can not be Archived!',
              'Ok',
              'center',
              'top'
            );
          }
          else{
            this.error=true;
          this.errormessage='Server Error';
          this.dialog.open(this.deletedialog);
          }
        }
      
      },
    });
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
          this.resetobj();
          this.showfunnels();
          this._general.openSnackBar(
            false,
            'Color Successfully Updated!',
            'Ok',
            'center',
            'top'
          );
        }
        else{
          this.error=true;
          this.errormessage='Server Error';
          this.dialog.open(this.colorbadgedialog);

        }
      },
    });
  }

  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
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
                this.showfunnels();
                this.resetobj();
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

  searchfunnels(search: any, filter: any) {
    this.searching = true;
    var obj = {
      search: search.value,
      filter: filter.value,
      archive:'0',
    }
    this.funnelService.searchqueryFunnel(obj).subscribe((data:any) => {
      this.searching = false;
        if(data.success){ 
        this.generatefunneldt(data);
        }
        
    });
    
  }

  createsubdomainname(){
    var uniqid = this._general.makeid(15);
    this.form.subdomain = this.username+uniqid;
  }

  onSubmit(): void {
    this.createsubdomainname();
    // console.log(this.userFormControl.status+' '+this.subdomainFormControl.status+' '+this.stepnameFormControl.status);
    if (
      this.userFormControl.status == 'VALID' &&
      this.stepnameFormControl.status == 'VALID'
    ) {
     
      if (this.form.subdomain != '') {
        this.searching = true;
        this.dialog.closeAll();
        this.funnelService.savefunneldb(this.form).subscribe({
          next: (data) => {
            // console.log(data);
            this.dataobj = data.data;
            if (data.exist == 1) {
              this.searching = false;
              this.error=true;
              this.errormessage='Subdomain is in use, please use another name!';
              this.dialog.open(this.adddialog);
              // this._general.openSnackBar(
              //   false,
              //   'Subdomain is in use, please use another name!',
              //   'OK',
              //   'center',
              //   'top'
              // );
            } else {
              if(data.data.success){
                // console.log(data);
              this.createwebsitefolder().then((resp) => {
                // console.log(resp);
                this.savepage().then((resp1) => {
                  // console.log(resp1);
                  this.websiteService
                    .oncreatesubdomain(this.form.subdomain, data.data.uniqueid)
                    .subscribe({
                      next: (datanw) => {
                        this._general.openSnackBar(
                          false,
                          'Funnel Created Successfully!',
                          'OK',
                          'center',
                          'top'
                        );
                        this.router.navigate(
                          [
                            '/funnels/' +
                              data.data.uniqueid +
                              '/steps/' +
                              data.data.uniqueid2,
                          ],
                          { relativeTo: this.route }
                        );
                        this.resetobj();
                      },
                    });
                });
              });
            }
              else{
                this.error=true;
                this.errormessage=data?.data.message;
                this.dialog.open(this.adddialog);
              }
            }
          },
          error: (err) => {
            this.errorMessage = err.error.message;
          },
        });
      } else {
        this.error=true;
        this.errormessage='Something went Wrong!';
        this.dialog.open(this.adddialog);
        // this._general.openSnackBar(
        //   false,
        //   'Subdomain is in use, please use another name!',
        //   'OK',
        //   'center',
        //   'top'
        // );
      }
    }

  }

  resetobj(){
    this.searching=false;
    this.error=false;
    this.errormessage='';
    this.newfunnelid='';
    this.form = {
      funnelname: '',
      funnelfirststep: '',
      badgecolor: '',
      funneltype: '',
      subdomain: '',
    };
    this.pageurl='';
    this.mydomain = '';
    this.funnelurl = '';
  this.reason = '';
  this.selfunnelid = '';
  this.dupfunnelname = '';
  this.funnelarchid = '';
    this.dialog.closeAll();
  }
  createwebsitefolder() {
    return new Promise((resolve) => {
      var dataobj1 = { website_id: this.dataobj.uniqueid };
      // console.log(dataobj1);
      this._file.createwebsitefolder(dataobj1).subscribe(
        (e) => {
          // console.log(e);
          resolve(true);
          // }
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }
  savepage() {
    return new Promise((resolve) => {
      var page = {
        head: '',
        body: '',
        style: '',
        dir: '/pages',
        folder: this.dataobj.pagepath,
        prevFolder: this.dataobj.pagepath,
        website_id: this.dataobj.uniqueid,
      };
      this._general._file.savePage(page).subscribe(
        (event: any) => {
          // console.log(event);
          resolve(true);
        },
        (error) => {
          // console.log(error);
          resolve(false);
        }
      );
    });
  }
}
