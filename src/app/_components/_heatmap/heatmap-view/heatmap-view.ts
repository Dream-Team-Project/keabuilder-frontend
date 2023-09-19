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
    scrheight:any = 0;
    scrwidth:any = 0;
    heatmapready:any = false;

    segmentpanel = [false,false,false,false,false,false,false];
    insidesegmentpanel = [false,false,false,false,false];

  constructor(private sanitizer: DomSanitizer,
    private heatmapsService: HeatmapsService) { }

  ngOnInit(): void {
    var path = 'http://localhost/heatmaps/html/';
    this.kb_landing_page = this.sanitizer.bypassSecurityTrustResourceUrl(path);
    
    this.heatmapsService.heatfetchlocrequest(path).subscribe({
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

            this.totalclicks = this.data1.length;

            const heat = new HeatMap(canvas, this.data1);
            heat.draw(0.85);


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
        var lowebsiteframe = document.getElementById('lo-website-iframe-container');
        var htmp:any = document.getElementById("heat-map");
        var kbhtmp:any = document.getElementById("kb-heatmap");

        // switch (value) {
        //     case 'desktop':

        //         if(lowebsiteframe!=null){
        //             lowebsiteframe.style.width = '100%';
        //             this.removeactiveclass('kb-devicebtn',0);
        //             lowebsiteframe.classList.remove('tablet');
        //             lowebsiteframe.classList.remove('phone');
        //         }

        //         this.setwidthheight();
        //         htmp.setAttribute('width',scrwidth);
        //         htmp.setAttribute('height',scrheight);
        //         kbhtmp.style.height = scrheight+'px';

        //         if(this.heatmapready==false){
        //             this.createheatmp(); 
        //         }else{
        //             this.createheatmpmouse();
        //         }              

        //         break;
        //     case 'tablet':
        //         document.getElementById('lo-website-iframe-container').style.width = '868px';
        //         x.contentWindow.document.getElementById("heat-map").setAttribute('width','768');
        //         document.getElementById("lo-website-iframe-container").classList.add('tablet');
        //         document.getElementById("lo-website-iframe-container").classList.remove('phone');

        //         removeactiveclass('kb-devicebtn',1);

        //         setTimeout(function(){
        //             scrheight = x.contentDocument.body.scrollHeight;
        //             scrwidth = (x.contentDocument.body.scrollWidth)-60;
        //             x.contentWindow.document.getElementById("heat-map").setAttribute('height',scrheight);
        //             x.contentWindow.document.getElementById("kb-heatmap").style.height = scrheight+'px';

        //             if(heatmapready==false){
        //                 createheatmp(); 
        //             }else{
        //                 createheatmpmouse();
        //             }
                    
        //         },500);               

        //         break;
        //     case 'phone':
        //         document.getElementById('lo-website-iframe-container').style.width = '380px';
        //         x.contentWindow.document.getElementById("heat-map").setAttribute('width','342');
        //         document.getElementById("lo-website-iframe-container").classList.add('phone');
        //         document.getElementById("lo-website-iframe-container").classList.remove('tablet');

        //         removeactiveclass('kb-devicebtn',2);

        //         setTimeout(function(){
        //             scrheight = x.contentDocument.body.scrollHeight;
        //             scrwidth = (x.contentDocument.body.scrollWidth)-60;
        //             x.contentWindow.document.getElementById("heat-map").setAttribute('height',scrheight);
        //             x.contentWindow.document.getElementById("kb-heatmap").style.height = scrheight+'px';

        //             if(heatmapready==false){
        //                 createheatmp(); 
        //             }else{
        //                 createheatmpmouse();
        //             }

        //         },500);               

        //         break;
        //     default:
        //         break;
        // }
    
    }

    removeactiveclass(value:any,position:any){
        var array = document.getElementsByClassName(value);
        Array.from(array).forEach(element => {
            element.classList.remove('active');
        });
        document.getElementsByClassName(value)[position].classList.add('active');
    }

    // createheatmp(){
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

    //     // const canvas = document.getElementById("heat-map");
    //     var x = document.getElementById("lo-website-iframe");
    //     const canvas = x.contentWindow.document.getElementById("heat-map");

    //     document.getElementsByClassName('filtered')[0].innerText = data1.length+' clicks';

    //     const heat = new HeatMap(canvas, data1);
    //     heat.draw(0.85);

    //     // ===================================
    //     // =========== HEATMAP END ===========
    //     // ===================================

    // }

    // createheatmpmouse(){
    //         $.ajax({
    //             url: windoworigin+"/api/heatfetchmou-request",
    //             type: "POST",
    //             dataType: 'json',
    //             data:  {
    //                 url: window.location.href.toString().split('#kb-heatmaps')[0]
    //             },
    //             success: function (data) {

    //                 var strng1 = [];
    //                 var strng2 = [];

    //                 data.data.forEach(element => {
    //                     var elm1 =  element['mouseY'].split(',')
    //                     elm1.forEach(element2 => {
    //                         strng1.push(element2);
    //                     });

    //                     var elm2 =  element['mouseX'].split(',')
    //                     elm2.forEach(element3 => {
    //                         var generateelm = 1519%kb_width*0.5;
    //                         generateelm = Math.abs(element3-generateelm);
    //                         strng2.push(generateelm);
    //                     });
    //                 });

    //                 // ===================================
    //                 // ========== HEATMAP START ==========
    //                 // ===================================
    //                 "use strict";
    //                 class HeatMap {
    //                     constructor(canvas, data) {
    //                         this.canvas = canvas;
    //                         this.ctx = canvas.getContext("2d");
    //                         this.width = canvas.width;
    //                         this.height = canvas.height;
    //                         this.data = data;
    //                         this.circle = HeatMap.createCanvas();
    //                         this.radius = 15 + 15;
    //                         this.computeRadius(15, 15);
    //                         this.unit8Gradient = HeatMap.computeGradient({
    //                             0.4: "blue",
    //                             0.6: "cyan",
    //                             0.7: "lime",
    //                             0.8: "yellow",
    //                             1.0: "red"
    //                         });
    //                     }
    //                     computeRadius(r, blur) {
    //                         const { circle } = this;
    //                         const ctx = circle.getContext("2d");
    //                         if (!ctx) {
    //                             throw new Error("The ctx is undefined");
    //                         }
    //                         const r2 = this.radius;
    //                         circle.height = r2 * 2;
    //                         circle.width = r2 * 2;
    //                         ctx.shadowOffsetY = r2 * 2;
    //                         ctx.shadowOffsetX = r2 * 2;
    //                         ctx.shadowBlur = blur;
    //                         ctx.shadowColor = "black";
    //                         ctx.beginPath();
    //                         ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
    //                         ctx.closePath();
    //                         ctx.fill();
    //                     }
    //                     resize() {
    //                         this.width = this.canvas.width;
    //                         this.height = this.canvas.height;
    //                     }
    //                     draw(minOpacity) {
    //                         const { ctx } = this;
    //                         if (!ctx) {
    //                             throw new Error("The ctx is undefined");
    //                         }
    //                         ctx.clearRect(0, 0, this.width, this.height);
    //                         for (let i = 0, len = this.data.length, p; i < len; i++) {
    //                             p = this.data[i];
    //                             ctx.globalAlpha = Math.min(minOpacity, 1);
    //                             if (!this.circle || !this.radius) {
    //                                 throw new Error("The circle || radius is undefined");
    //                             }
    //                             ctx.drawImage(this.circle, p[0] - this.radius, p[1] - this.radius,30,30);
    //                         }
    //                         const colored = HeatMap.colorize(ctx.getImageData(0, 0, this.width, this.height), this.unit8Gradient);
    //                         ctx.putImageData(colored, 0, 0);
    //                     }
    //                     static computeGradient(grad) {
    //                         const canvas = HeatMap.createCanvas();
    //                         const ctx = canvas.getContext("2d");
    //                         if (!ctx) {
    //                             throw new Error("The ctx is undefined");
    //                         }
    //                         const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    //                         canvas.width = 1;
    //                         canvas.height = 256;
    //                         Object.keys(grad).forEach((i) => {
    //                             gradient.addColorStop(+i, grad[+i]);
    //                         });
    //                         ctx.fillStyle = gradient;
    //                         ctx.fillRect(0, 0, 1, 256);
    //                         return ctx.getImageData(0, 0, 1, 256).data;
    //                     }
    //                     static colorize(imageData, gradient) {
    //                         const pixels = imageData.data;
    //                         for (let i = 0, len = pixels.length, j; i < len; i += 4) {
    //                             j = pixels[i + 3] * 4;
    //                             if (j) {
    //                                 pixels[i] = gradient[j];
    //                                 pixels[i + 1] = gradient[j + 1];
    //                                 pixels[i + 2] = gradient[j + 2];
    //                             }
    //                         }
    //                         return imageData;
    //                     }
    //                     static createCanvas() {
    //                         return document.createElement("canvas");
    //                     }
    //                 }

    //                 var chkmn = [];
                    
    //                 // var kb_main = 0;
    //                 // strng1.forEach(element => {
    //                 //     chkmn = [];
    //                 //     chkmn.push(strng2[kb_main]);
    //                 //     chkmn.push(strng1[kb_main]);
    //                 //     console.log(chkmn);
    //                 //         data2.push(chkmn);
    //                 //         kb_main++;
    //                 //     });


    //                 var kb_main = 0;
    //                 strng1.forEach(element => {
    //                     chkmn = [];
    //                     if(strng2[kb_main]!='' || strng2[kb_main]!=0){
    //                         chkmn.push(strng2[kb_main]);
    //                         chkmn.push(strng1[kb_main]);
    //                         data2.push(chkmn);
    //                     }
    //                         kb_main++;
    //                     });

    //                 var x = document.getElementById("lo-website-iframe");
    //                 const canvas2 = x.contentWindow.document.getElementById("heat-map");

    //                 document.getElementsByClassName('filtered')[0].innerText = data2.length+' Moves';

    //                 const heat = new HeatMap(canvas2, data2);
    //                 heat.draw(0.85);

    //                 // ===================================
    //                 // =========== HEATMAP END ===========
    //                 // ===================================



    //             },
    //             error: function (xhr, ajaxOptions, thrownError) {
    //                 console.log(xhr.status);
    //                 console.log(xhr.responseText);

    //             }
    //         });
    // }



}
