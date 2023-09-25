import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { HeatmapsService } from '../../../_services/heatmaps.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

declare var html2canvas: any;

@Component({
  selector: 'heatmap-view',
  templateUrl: './heatmap-view.html',
  styleUrls: ['./heatmap-view.css']
})
export class HeatmapViewComponent implements OnInit {
    

    kb_landing_page: SafeResourceUrl = '';
    windoworigin:any;
    kb_height:any = 0;
    kb_width:any = 0;
    data1:any = [];
    data2:any = [];
    data3:any = [];
    totalclicks = 0;
    heatmapready:any = false;
    selectdevice = 'desktop';
    selectheatmap = 'clicks';
    // path = 'http://localhost/heatmaps/html/';
    // generatepath = 'http://localhost/heatmaps/html/#kb-heatmaps';

    path:any = '';
    generatepath:any = '';

    segmentpanel = [false,false,false,false,false,false,false];
    insidesegmentpanel = [false,false,false,false,false];

    kb_bs_segment = [];
    brsegmnt:any = [];
    brsegmntdummy:any = [];

    kb_os_segment = [];
    ossegmnt:any = [];
    ossegmntdummy:any = [];

    kb_country_segment = [];
    countrysegmnt:any = [];
    countrysegmntdummy:any = [];

    numberofvisit_segment = [];
    numberofvisitsegmnt:any = [];

    dtrange:any = ['',''];

    checkhtml2canvas = false;

    heatpageid:any;

  constructor(private sanitizer: DomSanitizer,
    private heatmapsService: HeatmapsService,
    private router: Router,
    private route: ActivatedRoute,) { 

        route.paramMap.subscribe((params: ParamMap) => {
            this.heatpageid = params.get('id');
        });
      

    }

  ngOnInit(): void {

    this.heatmapsService.getheatpagedata(this.heatpageid).subscribe({
        next: data => {
        //   console.log(data);
        if(data.data?.length>0){
                var geturl = data.data[0]?.landing_page;
                this.path = geturl
                this.generatepath = geturl+'#kb-heatmaps'
                // console.log(this.generatepath);

            this.kb_landing_page = this.sanitizer.bypassSecurityTrustResourceUrl(this.generatepath);
            
            this.fetchlocreq();

            this.fetchalldata();

        }else{
            this.router.navigate(['/heatmap']);
        }
    }
    });

  }

  fetchlocreq(){
    this.heatmapsService.heatfetchlocrequest(this.path).subscribe({
        next: data => {
        //   console.log(data.data);

        this.setwidthheight();

        var strng1:any = [];
        var strng2:any = [];

        data.data.forEach((element: any) => {
                if (element['locY'] !== null) {
                    var elm1 = element['locY'].split(',');
                    elm1.forEach((element2: any) => {
                        strng1.push(element2);
                    });
                }
            
                if (element['locx'] !== null) {
                    var elm2 = element['locx'].split(',');
                    elm2.forEach((element3: any) => {
                        var generateelm = 1519 % this.kb_width * 0.5;
                        generateelm = Math.abs(element3 - generateelm);
                        strng2.push(generateelm);
                    });
                }
            });
        
        var div1 = document.createElement("div");
        div1.id = 'kb-heatmap'                

        var div = document.createElement("canvas");
        div.id='heat-map';

        div.setAttribute('width',this.kb_width);
        div.setAttribute('height',this.kb_height);
        div1.append(div);

        var style = document.createElement('STYLE');
        style.id='kb_style';
        style.innerHTML = `#heat-map {
            z-index: 999999;
            position: absolute;
            left: 0px;
            top: 0px;
            display: block;
        }
        #kb-heatmap {
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 999999998;
            transition-property: opacity, background-color;
            transition: .2s ease;
            background-color: rgba(0, 0, 0, 0.75);
            height: 100%;
            width: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        `;

        var x = document.getElementById("lo-website-iframe-container");
        if(x!=null){
            var y = x;
            y.insertBefore(div1,y.children[0]);   
            y.insertBefore(style,y.children[0]);  
            }

            var chkmn = [];
            
            var kb_main = 0;
            strng1.forEach((element:any) => {
                chkmn = [];
                if(strng2[kb_main]!='' || strng2[kb_main]!=0){
                    chkmn.push(strng2[kb_main]);
                    chkmn.push(strng1[kb_main]);
                    this.data1.push(chkmn);
                }
                    kb_main++;
            });

            this.createheatmp(this.data1);

            this.makescroll();

        }
    });
  }

  setwidthheight(){
    var heatOuterDiv = document.getElementById('heatouterdiv');
    if (heatOuterDiv){
    this.kb_width = heatOuterDiv.scrollWidth;
    this.kb_height = heatOuterDiv.scrollHeight;
    } 
  }

  fetchalldata(){

    this.heatmapsService.heatallrequest(this.path).subscribe({
        next: data => {
        //   console.log(data.data);
      
                var browser_segment:any = [];
                var os_segment:any = [];
                var country_segment:any = [];
                var numberofvisit_segment:any = [];
               
                data.data.forEach((element: any) => {
                    browser_segment.push(element['browser']);
                    os_segment.push(element['os']);
                    if(element['location']!=null && element['location']!=''){
                        country_segment.push(element['location']);
                    }
                    
                    if (element['created_at'] !== null) {
                        numberofvisit_segment.push(element['created_at'].substr(0, 10));
                    }
                });

                // browser_segment
                var counts:any = {};
                browser_segment.forEach(function (x:any) { counts[x] = (counts[x] || 0) + 1; });
                var arrcnt:any = [];
                arrcnt.push(counts);
                this.kb_bs_segment = arrcnt;
                
                this.kb_bs_segment.forEach((item) => { Object.keys(item).forEach((key) => { this.brsegmnt.push(key); this.brsegmntdummy.push(key); }); });
                
                // os_segment
                var counts2:any = {};
                os_segment.forEach(function (x:any) { counts2[x] = (counts2[x] || 0) + 1; });
                var arrcnt2:any = [];
                arrcnt2.push(counts2);
                this.kb_os_segment = arrcnt2;
                
                this.kb_os_segment.forEach((item) => { Object.keys(item).forEach((key) => { this.ossegmnt.push(key); this.ossegmntdummy.push(key); }); });
                
                // country_segment
                var counts3:any = {};
                country_segment.forEach(function (x:any) { counts3[x] = (counts3[x] || 0) + 1; });
                var arrcnt3:any = [];
                arrcnt3.push(counts3);
                this.kb_country_segment = arrcnt3;
                
                this.kb_country_segment.forEach((item) => { Object.keys(item).forEach((key) => { this.countrysegmnt.push(key); this.countrysegmntdummy.push(key); }); });


                // numberofvisit_segment
                var counts4:any = {};
                numberofvisit_segment.forEach(function (x:any) { counts4[x] = (counts4[x] || 0) + 1; });
                var arrcnt4:any = [];
                arrcnt4.push(counts4);
                this.numberofvisit_segment = arrcnt4;


            }
        });

  }

  uidatepicker1(e:any){

    this.dtrange[0] = e.target.value;
    if(this.dtrange[0]!='' && this.dtrange[1]!=''){
        this.getrequireddata(this.dtrange,'daterange_segment');
    }
    
  }

  uidatepicker2(e:any){

    this.dtrange[1] = e.target.value;
    if(this.dtrange[0]!='' && this.dtrange[1]!=''){
        this.getrequireddata(this.dtrange,'daterange_segment');
    }

  }

  makescroll() {

    let kbHeatmap:any = document.getElementById('kb-heatmap');
    let heatouterdiv:any = document.getElementById('heatouterdiv');
    kbHeatmap.addEventListener('scroll', () => {
        heatouterdiv.scrollTo(0, kbHeatmap.scrollTop);
    })

  }

  showmydrop(num:any){
    this.segmentpanel = Array(7).fill(false);
    this.insidesegmentpanel = Array(7).fill(false);
    this.segmentpanel[num] = !this.segmentpanel[num];
  }

  toggleinside(num:any){
    this.insidesegmentpanel[num] = !this.insidesegmentpanel[num];
  }

  closedropall(){
    this.segmentpanel = Array(7).fill(false);
  }

  devicecheck(value:any){
        var x:any = document.getElementById("heatouterdiv");
        var lowebsiteframe:any = document.getElementById('lo-website-iframe-container');
        var htmp:any = document.getElementById("heat-map");
        var kbhtmp:any = document.getElementById("kb-heatmap");

        lowebsiteframe.classList.remove('tablet');
        lowebsiteframe.classList.remove('phone');

        if(value=='desktop' && lowebsiteframe!=null){
            lowebsiteframe.style.width = '100%';
            this.selectdevice =  'desktop';
            htmp.setAttribute('width','100%');
        }else if(value=='tablet' && lowebsiteframe!=null){
            lowebsiteframe.style.width = '868px';
            lowebsiteframe.classList.add('tablet');
            this.selectdevice =  'tablet';
            htmp.setAttribute('width','868px');
        }else if(value=='phone' && lowebsiteframe!=null){
            lowebsiteframe.style.width = '380px';
            lowebsiteframe.classList.add('phone');
            this.selectdevice =  'phone';
            htmp.setAttribute('width','380px');
        }

        // htmp.setAttribute('height',x.scrollHeight);
        // kbhtmp.style.height = this.kb_height+'px';
        if(this.heatmapready==false){
            this.createheatmp(this.data1); 
        }else{
            this.createheatmpmouse();
        }  
    
    }

    createheatmp(data:any){

        // ===================================
        // ========== HEATMAP START ==========
        // ===================================
        
        "use strict";
        class HeatMap {
            canvas: any;
            ctx: any;
            width: any;
            height: any;
            data: any;
            circle: HTMLCanvasElement;
            radius: number;
            unit8Gradient: Uint8ClampedArray;
            constructor(canvas:any, data:any) {
                this.canvas = canvas;
                this.ctx = canvas.getContext("2d");
                this.width = canvas.width;
                this.height = canvas.height;
                this.data = data;
                this.circle = HeatMap.createCanvas();
                this.radius = 15 + 15;
                this.computeRadius(15, 15);
                this.unit8Gradient = HeatMap.computeGradient({
                    0.4: "blue",
                    0.6: "cyan",
                    0.7: "lime",
                    0.8: "yellow",
                    1.0: "red"
                });
            }
            computeRadius(r:any, blur:any) {
                const { circle } = this;
                const ctx = circle.getContext("2d");
                if (!ctx) {
                    throw new Error("The ctx is undefined");
                }
                const r2 = this.radius;
                circle.height = r2 * 2;
                circle.width = r2 * 2;
                ctx.shadowOffsetY = r2 * 2;
                ctx.shadowOffsetX = r2 * 2;
                ctx.shadowBlur = blur;
                ctx.shadowColor = "black";
                ctx.beginPath();
                ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();
            }
            resize() {
                this.width = this.canvas.width;
                this.height = this.canvas.height;
            }
            draw(minOpacity:any) {
                const { ctx } = this;
                if (!ctx) {
                    throw new Error("The ctx is undefined");
                }
                ctx.clearRect(0, 0, this.width, this.height);
                for (let i = 0, len = this.data.length, p; i < len; i++) {
                    p = this.data[i];
                    ctx.globalAlpha = Math.min(minOpacity, 1);
                    if (!this.circle || !this.radius) {
                        throw new Error("The circle || radius is undefined");
                    }
                    ctx.drawImage(this.circle, p[0] - this.radius, p[1] - this.radius,30,30);
                }
                const colored = HeatMap.colorize(ctx.getImageData(0, 0, this.width, this.height), this.unit8Gradient);
                ctx.putImageData(colored, 0, 0);
            }
            static computeGradient(grad:any) {
                const canvas = HeatMap.createCanvas();
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    throw new Error("The ctx is undefined");
                }
                const gradient = ctx.createLinearGradient(0, 0, 0, 256);
                canvas.width = 1;
                canvas.height = 256;
                Object.keys(grad).forEach((i) => {
                    gradient.addColorStop(+i, grad[+i]);
                });
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 1, 256);
                return ctx.getImageData(0, 0, 1, 256).data;
            }
            static colorize(imageData:any, gradient:any) {
                const pixels = imageData.data;
                for (let i = 0, len = pixels.length, j; i < len; i += 4) {
                    j = pixels[i + 3] * 4;
                    if (j) {
                        pixels[i] = gradient[j];
                        pixels[i + 1] = gradient[j + 1];
                        pixels[i + 2] = gradient[j + 2];
                    }
                }
                return imageData;
            }
            static createCanvas() {
                return document.createElement("canvas");
            }
        }

        const canvas = document.getElementById("heat-map");

        this.totalclicks = data.length;

        const heat = new HeatMap(canvas, data);
        heat.draw(0.85);

        // ===================================
        // =========== HEATMAP END ===========
        // ===================================

    }

    createheatmpmouse(){

        this.heatmapsService.heatfetchmourequest(this.path).subscribe({
            next: data => {
                // console.log(data);

                this.data2 = [];

                var strng1:any = [];
                var strng2:any = [];
        
                data.data.forEach((element:any) => {
                    if(element['mouseY']!=null){
                        var elm1 =  element['mouseY'].split(',')
                        elm1.forEach((element2:any) => {
                            strng1.push(element2);
                        });
                    }
                    if(element['mouseX']!=null){
                        var elm2 =  element['mouseX'].split(',')
                        elm2.forEach((element3:any) => {
                            var generateelm = 1519%this.kb_width*0.5;
                            generateelm = Math.abs(element3-generateelm);
                            strng2.push(generateelm);
                        });
                    }
                });

                var chkmn = [];
            
                var kb_main = 0;
                strng1.forEach((element:any) => {
                    chkmn = [];
                    if(strng2[kb_main]!='' || strng2[kb_main]!=0){
                        chkmn.push(strng2[kb_main]);
                        chkmn.push(strng1[kb_main]);
                        this.data2.push(chkmn);
                    }
                        kb_main++;
                });

                this.createheatmp(this.data2);

            

            }
        });

    }

    kbclicks(){
        this.selectheatmap = 'clicks';
        this.createheatmp(this.data1);
        this.heatmapready = false;
    }
    
    kbmoves(){
        this.selectheatmap = 'moves';
        this.createheatmpmouse();
        this.heatmapready = true;
    }

    heatopacity(e:any){
        document.getElementsByClassName('heatmapopacity')[0].innerHTML = e.target.value*100+'%';

        var x = document.getElementById('kb-heatmap');
        if(x!=null){
            x.style.opacity = e.target.value;
        }
    }

    showheatmap(){

        var checkBox:any = document.getElementsByName("show-heatmap")[0];
        var x:any = document.getElementById("kb-heatmap");

        if (checkBox.checked) x.style.backgroundColor = "transparent";   
        else x.style.backgroundColor = "rgba(0, 0, 0, 0.75)";

    }

    showbackground(){
        var checkBox:any = document.getElementsByName("show-background")[0];
        var x:any = document.getElementById("kb-heatmap");

        if (checkBox.checked) x.style.display = "block";   
       else x.style.display = "none";

    }

    adjustfrmnt(data:any, check:any, value:any){

        if (check) {
            data.push(value);
        }else{
            var index = data.indexOf(value);
            if (index > -1) {
                data.splice(index, 1);
            }
        }

    }

    getrequireddata(e:any,value2:any){
        console.log( this.ossegmntdummy);
        console.log( this.brsegmntdummy);

        var brows:any = [];
        if(value2=='browser'){
            this.adjustfrmnt(this.brsegmnt, e.target.checked, e.target.value);
            brows = this.brsegmnt;

            this.ossegmnt = this.ossegmntdummy;
            this.countrysegmnt = this.countrysegmntdummy;
            this.numberofvisitsegmnt = [];

            // console.log( this.ossegmnt);
            // console.log( this.ossegmntdummy);

        }else if(value2=='os'){
            this.adjustfrmnt(this.ossegmnt, e.target.checked, e.target.value);
            brows = this.ossegmnt;

            this.brsegmnt = this.brsegmntdummy;
            this.countrysegmnt = this.countrysegmntdummy;
            this.numberofvisitsegmnt = [];

            // console.log( this.brsegmnt);
            // console.log( this.brsegmntdummy);
        }else if(value2=='location'){
            this.adjustfrmnt(this.countrysegmnt, e.target.checked, e.target.value);
            brows = this.countrysegmnt;

            this.brsegmnt = this.brsegmntdummy;
            this.ossegmnt = this.ossegmntdummy;
            this.numberofvisitsegmnt = [];
        }else if(value2=='created_at'){
            this.numberofvisitsegmnt = [];
            this.adjustfrmnt(this.numberofvisitsegmnt, e.target.checked, e.target.value);
            brows = this.numberofvisitsegmnt;

            this.brsegmnt = this.brsegmntdummy;
            this.ossegmnt = this.ossegmntdummy;
            this.countrysegmnt = this.countrysegmntdummy;
        }else if(value2=='daterange_segment'){
            brows = e;
        }
        
        var dataobj:any = {
            url: this.path,
            browser_segment:brows,
            whichvalue:value2
          };
        this.heatmapsService.heatshomerequest(dataobj).subscribe({
            next: data => {
            //   console.log(data.data);

              this.data3 = [];

                var strng1:any = [];
                var strng2:any = [];
        
                data.data.forEach((element: any) => {
                    if (element['locY'] !== null) {
                        var elm1 = element['locY'].split(',');
                        elm1.forEach((element2: any) => {
                            strng1.push(element2);
                        });
                    }
                
                    if (element['locx'] !== null) {
                        var elm2 = element['locx'].split(',');
                        elm2.forEach((element3: any) => {
                            var generateelm = 1519 % this.kb_width * 0.5;
                            generateelm = Math.abs(element3 - generateelm);
                            strng2.push(generateelm);
                        });
                    }
                });

                var chkmn = [];
            
                var kb_main = 0;
                strng1.forEach((element:any) => {
                    chkmn = [];
                    if(strng2[kb_main]!='' || strng2[kb_main]!=0){
                        chkmn.push(strng2[kb_main]);
                        chkmn.push(strng1[kb_main]);
                        this.data3.push(chkmn);
                    }
                        kb_main++;
                });

                this.createheatmp(this.data3);

            }
        });






    }







}


