import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResizeEvent } from 'angular-resizable-element';
import { FileUploadService } from '../file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  wireframe = {toggle: false, open: false, close: false};
  showNavAnim = {open: false, close: false, show: false, toggle: true, navopen: false};
  allBlocksIds:Array<number> = [];
  selectedBlock:any = [];
  showBackToRowOption:boolean = false;
  sideFloatBtnAnim = {open: false, close: false};
  blockSelection:string = '';
  imgSelection:boolean = false;
  expand:boolean= false;
  screenWidth:any = 1000;
  screenHeight:any;
  showEditor:boolean = false;
  showInlineEditor:boolean = false;
  insideEditor:boolean = false;
  selectedTab:any;
  expPanelStep = 0;
  config: any = {
    height: 250,
    plugins:
      'print preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen link template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars',
    toolbar:
      'undo redo | bold italic underline strikethrough link blockquote | forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist table outdent indent charmap | formatselect fontselect fontsizeselect | code fullscreen',
    content_css: [
      // '../builder/material.component.css',
      // '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      // '//www.tinymce.com/css/codepen.min.css',
    ],
    importcss_append: true,
    menubar: false,
    statusbar: false,
    branding: false,
    setup: (editor: { ui: any; }) => {
      // console.log(editor.ui);
    },
  };

  constructor(private _snackBar: MatSnackBar, private fileUploadService: FileUploadService) {
    this.screenWidth = window.innerWidth;  
    this.screenHeight = window.innerHeight; 
  }

  saveHTML(main:any) {
    console.log(main.innerHTML);
    var obj = {
      html: main.innerHTML,
    }
    this.fileUploadService.createHTMLpage(obj).subscribe(
      (event:any) => {
        console.log(event);
      },
      error=>{console.log(error)})
  }

  expandAll(ele:any, action:boolean) {
    for(var x = 0; x <= 1; x++) {
      ele.querySelectorAll('UL').forEach((temp: any)=>{
        temp.classList.add('kb-hidden');
        temp.style.maxHeight = (action ? 'fit-content' : '0px');
        setTimeout(()=>{
          if(!action) ele.classList.remove('kb-hidden');
        },300)
        // console.log(row.getAttribute('NAME'));
      })
    }
  }

  expandOnAction(ele:any) {
    setTimeout(()=>{
      ele.style.maxHeight = ele.scrollHeight + 'px';
    },10)
  }

  expandToggle(ele:any) {
    ele.classList.add('kb-hidden');
    if (ele.style.maxHeight != '0px'){
      ele.style.maxHeight = '0px';
    } else {
      ele.style.maxHeight = ele.scrollHeight + 'px';
    } 
    setTimeout(()=>{
      if(ele.style.maxHeight != '0px') ele.classList.remove('kb-hidden');
    },300)
  }

  onResizeEnd(event: ResizeEvent ,rect:any): void {
    var rw:any = event.rectangle.width;
    if(rw < 421 || rw > screen.width/2) {
      rect.style.width = '420px';
    }
    else if( rw > screen.width/2) {
      rect.style.width = screen.width/2;
    }
    else {
      rect.style.width = event.rectangle.width + 'px';
    }
  }

  wireframeToggle(navtoggle:any) {
    if(!this.wireframe.toggle) {
      this.wireframe.open = true;
      this.wireframe.toggle = true;
    }
    else {
      this.wireframe.close = true;
    }
    setTimeout(()=>{
      this.wireframe.close ? this.wireframe.toggle = false : '';
      this.wireframe.open = false;
      this.wireframe.close = false;
    },300)
    navtoggle ? this.showfloatnavtoggle() : '';
  }

  showfloatnavtoggle() {
    if(this.showNavAnim.toggle) {
      this.showNavAnim.open = true;
      this.showNavAnim.show  = true;
      this.showNavAnim.navopen = true;
    }
    else {
      this.showNavAnim.close = true; 
    }
    var temp = this.showNavAnim.toggle;
    setTimeout(()=>{
      this.showNavAnim.open = false;
      this.showNavAnim.close = false;
      if(!temp) {
        this.showNavAnim.show  = false;
        this.showNavAnim.navopen = false;
      }
    },400)
    this.showNavAnim.toggle = !this.showNavAnim.toggle;
  }

  sidefloatbtnopen(action:boolean) {
    if(action) {
      this.sideFloatBtnAnim.open = true;
      this.showBackToRowOption = true;
    } 
    else {
      this.sideFloatBtnAnim.close = true;
    }
    setTimeout(()=>{
      if(!action) {
        this.showBackToRowOption = false;
      }
      this.sideFloatBtnAnim.open = false;
      this.sideFloatBtnAnim.close = false;
    },200);
  }
 
  setExpPanelStep(index: number) {
    this.expPanelStep = index;
  }

  nextExpPanelStep() {
    this.expPanelStep++;
  }

  prevExpPanelStep() {
    this.expPanelStep--;
  }

  resetInlineEditor() {
      this.selectedBlock.content.editor = false;
      this.showInlineEditor = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  selectTabChange(e:any) {
    this.selectedTab = e.tab['textLabel'];
  }
  
  detectTabChange() {
    if(this.selectedBlock.type == 'element') {
        this.showEditor = false;
    }
  }
  
  createBlockId(temp: any):any {
    temp.id = Math.floor(Math.random() * 10000000000);
    if(this.allBlocksIds.includes(temp.id)) {
      return this.createBlockId(temp);
    }
    this.allBlocksIds.push(temp.id);
    return 'kb-'+temp.type+'-'+temp.id;
  }
}
