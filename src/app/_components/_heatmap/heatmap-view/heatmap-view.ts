import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { HeatmapsService } from '../../../_services/heatmaps.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


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
    path = 'http://localhost/heatmaps/html/';

    segmentpanel = [false,false,false,false,false,false,false];
    insidesegmentpanel = [false,false,false,false,false];

    kb_bs_segment = [];

  constructor(private sanitizer: DomSanitizer,
    private heatmapsService: HeatmapsService) { }

  ngOnInit(): void {

    this.kb_landing_page = this.sanitizer.bypassSecurityTrustResourceUrl(this.path);
    
    this.heatmapsService.heatfetchlocrequest(this.path).subscribe({
        next: data => {
          console.log(data.data);

         this.setwidthheight();

          var strng1:any = [];
          var strng2:any = [];

          data.data.forEach((element:any) => {
              var elm1 =  element['locY'].split(',')
              elm1.forEach((element2:any) => {
                  strng1.push(element2);
              });

              var elm2 =  element['locx'].split(',')
              elm2.forEach((element3:any) => {
                  var generateelm = 1519%this.kb_width*0.5;
                  generateelm = Math.abs(element3-generateelm);
                  strng2.push(generateelm);
              });
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

    this.fetchalldata();

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
          console.log(data.data);
      
                var browser_segment:any = [];
                var os_segment:any = [];
                var country_segment:any = [];
                var numberofvisit_segment:any = [];
                data.data.forEach((element:any) => {
                        browser_segment.push(element['browser']);
                        os_segment.push(element['os']);
                        country_segment.push(element['location']);
                        numberofvisit_segment.push(element['created_at'].substr(0, 10));
                });

                // browser_segment
                var counts:any = {};
                browser_segment.forEach(function (x:any) { counts[x] = (counts[x] || 0) + 1; });

                var arrcnt:any = [];
                arrcnt.push(counts);
                this.kb_bs_segment = arrcnt;
                

                // var brsegmnt:any = [];
                // document.getElementsByName('browser_segment').forEach((brseg) => {
                // brsegmnt.push(brseg.value);
                //     brseg.addEventListener('click',function(){
                //         data3 = [];
                //         if (this.checked) {
                //             brsegmnt.push(this.value);
                //             getrequireddata(brsegmnt,'browser');
                //         }else{
                //             var index = brsegmnt.indexOf(this.value);
                //             if (index > -1) {
                //                 brsegmnt.splice(index, 1);
                //             }
                //             getrequireddata(brsegmnt,'browser');
                //         }
                //     });
                
                // });
                // // browser_segment

                // // os_segment
                // var counts2 = {};
                // os_segment.forEach(function (x) { counts2[x] = (counts2[x] || 0) + 1; });
                // for (bs in counts2) {
                //     document.getElementById('kb_os_segment').innerHTML+=`<div class="padding-bottom-half"><label
                //         class="layout-row layout-align-start-center margin-none">
                //         <div class="padding-right-half"><input type="checkbox"
                //                 value="`+bs+`" name="os_segment" checked /></div>
                //         <div aria-label="" role="listitem"
                //             class="ui-list-item padding-none flex">
                //             <div
                //                 class="flex layout-row layout-align-start-center text-truncate padding-right-half">
                //                 `+bs+`
                //             </div> <strong>`+counts2[bs]+`</strong>
                //                 </div>
                //             </label>
                //         </div>`;
                // }
                // var ossegmnt = [];
                // document.getElementsByName('os_segment').forEach((osseg) => {
                //     ossegmnt.push(osseg.value);
                //         osseg.addEventListener('click',function(){
                //             data3 = [];
                //             if (this.checked) {
                //                 ossegmnt.push(this.value);
                //                 getrequireddata(ossegmnt,'os');
                //             }else{
                //                 var index = ossegmnt.indexOf(this.value);
                //                 if (index > -1) {
                //                     ossegmnt.splice(index, 1);
                //                 }
                //                 getrequireddata(ossegmnt,'os');
                //             }
                //         });
                    
                //     });
                // // os_segment

                // // country_segment
                // var counts3 = {};
                // country_segment.forEach(function (x) { counts3[x] = (counts3[x] || 0) + 1; });
                // for (bs in counts3) {
                //     document.getElementById('kb_country_segment').innerHTML+=`<div class="padding-bottom-half"><label
                //         class="layout-row layout-align-start-center margin-none">
                //         <div class="padding-right-half"><input type="checkbox"
                //                 value="`+bs+`" name="country_segment" checked /></div>
                //         <div aria-label="" role="listitem"
                //             class="ui-list-item padding-none flex">
                //             <div
                //                 class="flex layout-row layout-align-start-center text-truncate padding-right-half">
                //                 `+bs+`
                //             </div> <strong>`+counts3[bs]+`</strong>
                //                 </div>
                //             </label>
                //         </div>`;
                // }
                // var countrysegmnt = [];
                // document.getElementsByName('country_segment').forEach((countryseg) => {
                //     countrysegmnt.push(countryseg.value);
                //     countryseg.addEventListener('click',function(){
                //             data3 = [];
                //             if (this.checked) {
                //                 countrysegmnt.push(this.value);
                //                 getrequireddata(countrysegmnt,'location');
                //             }else{
                //                 var index = countrysegmnt.indexOf(this.value);
                //                 if (index > -1) {
                //                     countrysegmnt.splice(index, 1);
                //                 }
                //                 getrequireddata(countrysegmnt,'location');
                //             }
                //         });
                    
                //     });
                // // country_segment

                // // numberofvisit_segment
                // var counts4 = {};
                // numberofvisit_segment.forEach(function (x) { counts4[x] = (counts4[x] || 0) + 1; });
                // for (bs in counts4) {
                //     document.getElementById('kb_nuofvisit_segment').innerHTML+=`<div class="padding-bottom-half"><label
                //         class="layout-row layout-align-start-center margin-none">
                //         <div class="padding-right-half"><input type="radio"
                //                 value="`+bs+`" name="numberofvisit_segment" /></div>
                //         <div aria-label="" role="listitem"
                //             class="ui-list-item padding-none flex">
                //             <div
                //                 class="flex layout-row layout-align-start-center text-truncate padding-right-half">
                //                 `+bs+`
                //             </div> <strong>`+counts4[bs]+`</strong>
                //                 </div>
                //             </label>
                //         </div>`;
                // }
                // document.getElementsByName('numberofvisit_segment').forEach((numberofvisitseg) => {
                //     // numberofvisitsegmnt.push(numberofvisitseg.value);
                //     numberofvisitseg.addEventListener('click',function(){
                //         var numberofvisitsegmnt = [];
                //         data3 = [];
                //             if (this.checked) {
                //                 numberofvisitsegmnt.push(this.value);
                //                 getrequireddata(numberofvisitsegmnt,'created_at');
                //             }else{
                //                 var index = numberofvisitsegmnt.indexOf(this.value);
                //                 if (index > -1) {
                //                     numberofvisitsegmnt.splice(index, 1);
                //                 }
                //                 getrequireddata(numberofvisitsegmnt,'created_at');
                //             }
                //         });
                    
                //     });
                // // numberofvisit_segment


                // //  date_range_segment
                // var dtrange = ['',''];
                // document.getElementById('ui-datepicker1').addEventListener('change',function(){
                //     data3 = [];
                //     dtrange[0] = this.value;
                //     if(dtrange[0]!='' && dtrange[1]!=''){
                //         getrequireddata(dtrange,'daterange_segment');
                //     }
                // });

                // document.getElementById('ui-datepicker2').addEventListener('change',function(){
                //     data3 = [];
                //     dtrange[1] = this.value;
                //     if(dtrange[0]!='' && dtrange[1]!=''){
                //         getrequireddata(dtrange,'daterange_segment');
                //     }
                // });
                // //  date_range_segment
                
            }
        });


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
                    var elm1 =  element['mouseY'].split(',')
                    elm1.forEach((element2:any) => {
                        strng1.push(element2);
                    });
        
                    var elm2 =  element['mouseX'].split(',')
                    elm2.forEach((element3:any) => {
                        var generateelm = 1519%this.kb_width*0.5;
                        generateelm = Math.abs(element3-generateelm);
                        strng2.push(generateelm);
                    });
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

    getrequireddata(e:any,value2:any){

        console.log(e.target.value);
        console.log(e.target.checked);
        console.log(this.kb_bs_segment);
        
        var brsegmnt:any = [];

        this.kb_bs_segment.forEach((item) => { Object.keys(item).forEach((key) => { brsegmnt.push(key); }); });

        if (e.target.checked) {
            // brsegmnt.push(e.target.value);
            console.log(brsegmnt);
        }else{
            var index = brsegmnt.indexOf(e.tablet.value);
            if (index > -1) {
                brsegmnt.splice(index, 1);
            }
            console.log(brsegmnt);
        }


        // var dataobj:any = {
        //     url: this.path,
        //     browser_segment:value1,
        //     whichvalue:value2
        //   };
        // this.heatmapsService.heatshomerequest(dataobj).subscribe({
        //     next: data => {
        //       console.log(data.data);

        //     }
        // });


        // $.ajax({
        //     url: windoworigin+"/heatshome-request",
        //     type: "POST",
        //     dataType: 'json',
        //     data:  {
        //         url: window.location.href.toString().split('#kb-heatmaps')[0],
        //         browser_segment: value1,
        //         whichvalue: value2
        //     },
        //     success: function (data) {
        //         // console.log(data);

        //     var strng1 = [];
        //     var strng2 = [];

        //     data.data.forEach(element => {
        //         var elm1 =  element['locY'].split(',')
        //         elm1.forEach(element2 => {
        //             strng1.push(element2);
        //         });

        //         var elm2 =  element['locx'].split(',')
        //         elm2.forEach(element3 => {
        //             var generateelm = 1519%kb_width*0.5;
        //             generateelm = Math.abs(element3-generateelm);
        //             strng2.push(generateelm);
        //         });
        //     });

        //     // ===================================
        //     // ========== HEATMAP START ==========
        //     // ===================================
        //     "use strict";
        //     class HeatMap {
        //         constructor(canvas, data) {
        //             this.canvas = canvas;
        //             this.ctx = canvas.getContext("2d");
        //             this.width = canvas.width;
        //             this.height = canvas.height;
        //             this.data = data;
        //             this.circle = HeatMap.createCanvas();
        //             this.radius = 15 + 15;
        //             this.computeRadius(15, 15);
        //             this.unit8Gradient = HeatMap.computeGradient({
        //                 0.4: "blue",
        //                 0.6: "cyan",
        //                 0.7: "lime",
        //                 0.8: "yellow",
        //                 1.0: "red"
        //             });
        //         }
        //         computeRadius(r, blur) {
        //             const { circle } = this;
        //             const ctx = circle.getContext("2d");
        //             if (!ctx) {
        //                 throw new Error("The ctx is undefined");
        //             }
        //             const r2 = this.radius;
        //             circle.height = r2 * 2;
        //             circle.width = r2 * 2;
        //             ctx.shadowOffsetY = r2 * 2;
        //             ctx.shadowOffsetX = r2 * 2;
        //             ctx.shadowBlur = blur;
        //             ctx.shadowColor = "black";
        //             ctx.beginPath();
        //             ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
        //             ctx.closePath();
        //             ctx.fill();
        //         }
        //         resize() {
        //             this.width = this.canvas.width;
        //             this.height = this.canvas.height;
        //         }
        //         draw(minOpacity) {
        //             const { ctx } = this;
        //             if (!ctx) {
        //                 throw new Error("The ctx is undefined");
        //             }
        //             ctx.clearRect(0, 0, this.width, this.height);
        //             for (let i = 0, len = this.data.length, p; i < len; i++) {
        //                 p = this.data[i];
        //                 ctx.globalAlpha = Math.min(minOpacity, 1);
        //                 if (!this.circle || !this.radius) {
        //                     throw new Error("The circle || radius is undefined");
        //                 }
        //                 ctx.drawImage(this.circle, p[0] - this.radius, p[1] - this.radius,30,30);
        //             }
        //             const colored = HeatMap.colorize(ctx.getImageData(0, 0, this.width, this.height), this.unit8Gradient);
        //             ctx.putImageData(colored, 0, 0);
        //         }
        //         static computeGradient(grad) {
        //             const canvas = HeatMap.createCanvas();
        //             const ctx = canvas.getContext("2d");
        //             if (!ctx) {
        //                 throw new Error("The ctx is undefined");
        //             }
        //             const gradient = ctx.createLinearGradient(0, 0, 0, 256);
        //             canvas.width = 1;
        //             canvas.height = 256;
        //             Object.keys(grad).forEach((i) => {
        //                 gradient.addColorStop(+i, grad[+i]);
        //             });
        //             ctx.fillStyle = gradient;
        //             ctx.fillRect(0, 0, 1, 256);
        //             return ctx.getImageData(0, 0, 1, 256).data;
        //         }
        //         static colorize(imageData, gradient) {
        //             const pixels = imageData.data;
        //             for (let i = 0, len = pixels.length, j; i < len; i += 4) {
        //                 j = pixels[i + 3] * 4;
        //                 if (j) {
        //                     pixels[i] = gradient[j];
        //                     pixels[i + 1] = gradient[j + 1];
        //                     pixels[i + 2] = gradient[j + 2];
        //                 }
        //             }
        //             return imageData;
        //         }
        //         static createCanvas() {
        //             return document.createElement("canvas");
        //         }
        //     }

        //     var chkmn = [];


        //     var kb_main = 0;
        //     strng1.forEach(element => {
        //         chkmn = [];
        //         if(strng2[kb_main]!='' || strng2[kb_main]!=0){
        //             chkmn.push(strng2[kb_main]);
        //             chkmn.push(strng1[kb_main]);
        //             data3.push(chkmn);
        //         }
        //             kb_main++;
        //         });

        //     var x = document.getElementById("lo-website-iframe");
        //     const canvas2 = x.contentWindow.document.getElementById("heat-map");

        //     document.getElementsByClassName('filtered')[0].innerText = data3.length+' Clicks';
        //     const heat = new HeatMap(canvas2, data3);
        //     heat.draw(0.85);

        //     // ===================================
        //     // =========== HEATMAP END ===========
        //     // ===================================


        //     }
        // });
    }






}
