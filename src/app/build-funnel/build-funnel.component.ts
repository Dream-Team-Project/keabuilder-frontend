import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FunnelService } from '../_services/funnels.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-build-funnel',
  templateUrl: './build-funnel.component.html',
  styleUrls: ['./build-funnel.component.css']
})
export class BuildFunnelComponent implements OnInit {

  constructor(private router: Router, 
              private funnelService: FunnelService,
              private route: ActivatedRoute) { }

    form: any = {
        funnelname: null,
        funnelfirststep: '',
        badgecolor:''
    };
    userFormControl = new FormControl('',[Validators.required ]);
    
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
    poupsidebar = false;
    errorMessage = '';

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { funnelname, funnelfirststep, badgecolor } = this.form;

    if(this.userFormControl.status=='VALID'){
        this.funnelService.saveondb(funnelname, funnelfirststep, badgecolor).subscribe({
            next: data => {
                // console.log(data);
                this.router.navigate(['/funnels/create/'+data.data.hash+'/'+data.data.hash2],{relativeTo: this.route});
            
            },
            error: err => {
            this.errorMessage = err.error.message;
            }
      });
    }

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
    this.poupsidebar = true;
  }
  
  hidepopupsidebar(){
    this.poupsidebar = false;
  }



}
