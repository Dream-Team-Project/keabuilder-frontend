import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FunnelService } from '../_services/funnels.service';
import {FormControl, Validators} from '@angular/forms'; 
import { GeneralService } from '../_services/_builder/general.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FileUploadService } from '../_services/file-upload.service';
import { WebsiteService } from '../_services/website.service';

@Component({
  selector: 'app-build-funnel',
  templateUrl: './build-funnel.component.html',
  styleUrls: ['./build-funnel.component.css']
})
export class BuildFunnelComponent implements OnInit {
uniqueid:any;
@Input()
set DialogToggle(val: any) {
    if(this.connectWtParent) {
        this.createfunnel();
    }
    else this.connectWtParent = true;
}  

form: any = {
    funnelname: '',
    funnelfirststep: '',
    badgecolor:'',
    funneltype:'',
    subdomain:''
};
userFormControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
subdomainFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
stepnameFormControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
hidefornow = false;
dataobj:any;
   constructor(private router: Router, 
              private funnelService: FunnelService,
              private route: ActivatedRoute,
              public _general: GeneralService,
              private _snackBar: MatSnackBar,
              private _file: FileUploadService,
              private websiteService: WebsiteService,
              private _route: ActivatedRoute,
              ) { 
                // this._route.paramMap.subscribe((params: ParamMap) => {
                //     this.uniqueid = params.get('uniqueid');
                //     console.log(this.uniqueid)
                //     this.funnelService.getSingleFunnel(this.uniqueid).subscribe((data:any)=>{
                //         console.log(data.data[0].name)
                //     if(data.data.length>0){
                //         this.form.funnelname=data.data[0]?.name;
                //         // this.form.funnelfirststep=data.data?.name;
                //         // this.form.badgecolor=data.data?.name;
                //         // this.form.funneltype=data.data?.name;
                //         this.form.subdomain=data.data[0]?.subdomain;

                       
                //     }
                //     })
                // })
              }

    sidebar = {
        open: false,
        anim: {open: false, close: false, time: 500},
        animtime: 300,
    }
    connectWtParent:boolean = false;
    isneed = false;
    
   
    allcategory = [
        {0:true,
            title:'Survey Funnel',
            paragraph:'Find out who your visitors are first and then send them into the right funnel.',
        },
        {0:true,
            title:'Product Launch Funnel',
            paragraph:'Built anticipation for your new product with our product launch funnels.',
        },
        {0:true,
            title:'Invisible Funnel',
            paragraph:'Sell access to an event, but charge them after it\'s over if they like it.',
        },
        {0:true,
            title:'Hero Funnel',
            paragraph:'Let people know who you are and how to connect with you.',
        },
        {0:true,
            title:'Auto Webinar Funnel',
            paragraph:'Create auto webinars that automatically sell your products around the clock.',
        },
        {0:true,
            title:'Squeeze Page Funnel',
            paragraph:'Use curiosity to generate leads with this simple two page funnel.',
        },
        {0:true,
            title:'Video Sales Letter Funnel',
            paragraph:'Use video to sell your products or services through a VSL funnel.',
        },
        {0:true,
            title:'Lead Magnet Funnel',
            paragraph:'Give people an ethical bribe in exchange for their email address.',
        },
        {0:true,
            title:'Ask Campaign Funnel',
            paragraph:'Find out what your customers actually want before you create it for them.',
        },
        {0:true,
            title:'Live Demo Funnel',
            paragraph:'Demonstrate your product through your own live demo funnel.',
        },
        {0:true,
            title:'Homepage Funnel',
            paragraph:'A traditional "website" that pushes people into your core funnels.',
        },
        {0:true,
            title:'Reverse Squeeze Page Funnel',
            paragraph:'Give value first, then ask for their email with a reverse squeeze funnel.',
        },
        {0:true,
            title:'Webinar Funnel',
            paragraph:'This funnel will get people to registered and attend your webinar events.',
        },
        {0:true,
            title:'Storefront Funnel',
            paragraph:'A traditional ecommerce "website" that pushes people into your core funnels.',
        },
        {0:true,
            title:'Membership Funnel',
            paragraph:'Create a membership site and sell access to it through this funnel.',
        },
        {0:true,
            title:'Application Funnel',
            paragraph:'Have people apply to work with you through an application funnel.',
        },
        {0:true,
            title:'Sales Letter Funnel',
            paragraph:'Use a traditional sales letter to sell your products or services.',
        },
        {0:true,
            title:'Summit Funnel',
            paragraph:'Grow your list and build your following by running a summit funnel.',
        },
        {0:true,
            title:'Bridge Funnel',
            paragraph:'Generate a lead, then bridge the gap before you send them to the next funnel.',
        },
        {0:true,
            title:'2-Step Tripwire Funnel',
            paragraph:'Use a low ticket front end product and then upsell them your others products.',
        },
        {0:true,
            title:'Cancellation Funnel',
            paragraph:'Create a survey asking people why they are leaving then try to save the sale.',
        },
        {0:true,
            title:'Daily Deal Funnel',
            paragraph:'Make an irresistable offer to get new customers (Nickname: Groupon Funnel).',
        },
    ];
    author = false;
    professional = false;
    retail = false;
    ecommerce = false;
    b2b = false;
    network = false;
    other1 = false; 
    generate = false;
    sellaproduct = false;
    createaevent = false;
    other2 = false;
    errorMessage = '';
    searching = false;


  ngOnInit(): void {
  }

  onSubmit(): void {
// console.log(this.userFormControl.status+' '+this.subdomainFormControl.status+' '+this.stepnameFormControl.status);
    if(this.userFormControl.status=='VALID' && this.subdomainFormControl.status=='VALID' && this.stepnameFormControl.status=='VALID'){

        var nwsubdomain:any = this.form.subdomain.toLowerCase();
      var notusesub = ['app','test','developer','admin','kea','keabuilder','keapages','user'];
      if(this.searchStringInArray(nwsubdomain,notusesub)==1){
        this.searching = true;
            this.funnelService.savefunneldb(this.form).subscribe({
                next: data => {
                    console.log(data);
                    this.dataobj=data.data;
                    if(data.exist ==1){
                        this.searching = false;
                        this._snackBar.open("Subdomain is in use, please use another name!", 'OK');
                     }else{
                        this.createwebsitefolder().then((resp)=>{
                            console.log(resp);
                          this.savepage().then((resp1)=>{
                            console.log(resp1);
                            this.websiteService.oncreatesubdomain(this.form.subdomain,data.data.uniqueid).subscribe({
                                next: datanw => {
                                    console.log("hello");
                                this.searching = false;
                                this._snackBar.open('Funnel Created Successfully!', 'OK');
                                this.router.navigate(['/funnels/'+data.data.uniqueid+'/steps/'+data.data.uniqueid2],{relativeTo: this.route});
                                }
                              });
                          })  
                        });
                        

                     }

                
                },
                error: err => {
                this.errorMessage = err.error.message;
                }
            });

        }else{
            this._snackBar.open("Subdomain is in use, please use another name!", 'OK');
        }

    }

  }
  createwebsitefolder(){
    return new Promise((resolve) => {
    var dataobj1 = {website_id:this.dataobj.uniqueid};
    console.log(dataobj1);
    this._file.createwebsitefolder(dataobj1).subscribe(e=>{
        console.log(e);
    resolve(true);
    // }
  },
  (error) => {
    resolve(false);
  }
);
});
  }
  savepage(){
    return new Promise((resolve) => {
        var page = {
            head: '',
            body: '',
            style: '',
            dir: '/pages',
            folder: this.dataobj.pagepath,
            prevFolder: this.dataobj.pagepath,
            website_id:this.dataobj.uniqueid, 
          }
          this._general._file.savePage(page).subscribe((event:any) => {
            console.log(event);
            resolve(true);
          },error=>{
            console.log(error)
            resolve(false);
          }
    );
});
  }
  loopthefor(value: any, which: any){
        if(which=='author'){    
            this.author = !this.author;
        }else if(which=='professional'){  
            this.professional = !this.professional;
        }else if(which=='retail'){  
            this.retail = !this.retail;
        }else if(which=='ecommerce'){  
            this.ecommerce = !this.ecommerce;
        }else if(which=='b2b'){  
            this.b2b = !this.b2b;
        }else if(which=='network'){  
            this.network = !this.network;
        }else if(which=='other1'){  
            this.other1 = !this.other1;
        }else if(which=='generate'){  
            this.generate = !this.generate;
        }else if(which=='sellaproduct'){  
            this.sellaproduct = !this.sellaproduct;
        }else if(which=='createaevent'){  
            this.createaevent = !this.createaevent;
        }else if(which=='other2'){  
            this.other2 = !this.other2;
        }


        for (let index = 0; index <= 21; index++) {  
            if(value.indexOf(index)==-1){
                this.allcategory[index][0] = !this.allcategory[index][0];
            }
        }
  }

  createfunnel(){
    this.openSidebar();
  }

  openSidebar(){
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.open = false;
    },this.sidebar.animtime)
  }
  
  hidepopupsidebar(){
    this.sidebar.anim.close = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
    },this.sidebar.animtime)
  }

  removespecialcharwithsmall(data:any){
    var datagen = (data.replace(/[^a-zA-Z0-9]/g, "")).toLowerCase();
    return datagen;
  }

  searchStringInArray(str:any, strArray:any) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j] == str) return 0;
    }
    return 1;
``}


}
