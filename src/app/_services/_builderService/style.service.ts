import { Injectable } from '@angular/core';
import { ConnectableObservable } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})

export class StyleService {
  // content
  font= {value: '16px'};
  fontRange:any= {value: 16, max: 120, type: 'px'};
  // general
  width= {value: '100%'};
  widthRange:any= {value: 100, max: 100, type: '%'};
  height= {value: 'auto'};
  heightRange:any= {value: 100, max: 100, type: '%'};
  blockAlign= '';
  m_link= {tb: false, lr: false, a: false};
  margin= {top: '0px', bottom: '0px', left: '0px', right: '0px'};
  p_link= {tb: false, lr: false, a: false};
  padding= {top: '0px', bottom: '0px', left: '0px', right: '0px'};
  // general
  // border
  b_link= {tb: true, lr: true, a: true};
  border= {top: '0px', bottom: '0px', left: '0px', right: '0px'};
  br_link:boolean = true;
  border_radius= {top_left: '0px', top_right: '0px', bottom_left: '0px', bottom_right: '0px'};
  border_color:string = 'rgba(0,0,0,1)';
  border_style:string = 'solid';
  border_style_types= ['solid','dashed','dotted','double','groove','ridge','inset','outset','none'];
  // border
  // background
  background_color:string = 'rgba(0,0,0,0)';
  background_gradient:any= {type: 'linear', radial_direction: 'center', start:'#1867c0', end:'#1BC5BD', direction: 45, startPosition: 0, endPosition: 100};
  background_gradient_types:any=['linear','radial']
  background_gradient_radial_directions:any=['center','top left','top','top right','right','bottom left','bottom','bottom right','left']
  background_image= {name: 'no-image.png', size: 'cover', position: 'center', repeat: {name: 'no repeat', value: 'no-repeat'}};
  background_image_sizes= ['cover','contain','auto'];
  background_image_positions= ['top left', 'top center', 'top right', 'center', 'bottom left', 'bottom center', 'bottom right'];
  background_image_repeats= [{name: 'no repeat', value: 'no-repeat'}, {name: 'repeat', value: 'repeat'}, {name: 'repeat x (horizontal)', value: 'repeat-x'}, {name: 'repeat y (vertical)', value: 'repeat-y'}, {name: 'space', value: 'sapce'}, {name: 'round', value: 'round'}];
  background_type:string='color';
  newImg:any = {id:'', upload: '', name: '', path: ''};
  galleryImg:string[] = [];
  galleryImgName:string[] = [];
  imgSelection:boolean = false;
  // background
  // advance
  zindex:number=0;
  // advance

  constructor(private _general: GeneralService) {
  }

  curS() {
    var css = this.currentStyling();
    return  'margin:'+css['margin']+
            ';padding:'+css['padding']+
            ';border-width:'+css['border-width']+
            ';border-radius:'+css['border-radius']+
            ';border-color:'+css['border-color']+
            ';border-style:'+css['border-style']+
            ';background-color:'+css['background-color']+
            (css['background-image'] != 'none' ? ';background-image:'+css['background-image'] : '')+ 
            (css['background-size'] ? ';background-size:'+css['background-size'] : '')+
            (css['background-position'] ? ';background-position:'+css['background-position'] : '')+
            (css['background-repeat'] ? ';background-repeat:'+css['background-repeat'] : '')+
            ';width:'+css['width']+
            ';height:'+css['height']+
            ';z-index:'+css['z-index'];
  }

  currentStyling() {        
    return { 
      'margin': this.getMargin(),
      'padding': this.getPadding(),
      'border-width': this.border.top + ' '  + this.border.right + ' ' + this.border.bottom + ' ' + this.border.left,
      'border-radius': this.border_radius.top_left + ' '  + this.border_radius.top_right + ' ' + this.border_radius.bottom_right + ' ' + this.border_radius.bottom_left, 
      'border-color': this.border_color,
      'border-style': this.border_style,
      'background-color': this.background_color,
      'background-image': this.background_type == 'image' ? 'url(../assets/images/builder/upload_images/'+this.background_image.name+')' : this.background_type == 'gradient' ? this.getBackgroundGradient() : '',
      'background-size': this.background_type == 'image' ? this.background_image.size : '',
      'background-position': this.background_type == 'image' ? this.background_image.position : '',
      'background-repeat': this.background_type == 'image' ? this.background_image.repeat.value : '',
      'width': this.width.value,
      'height': this.height.value,
      'z-index': this.zindex == 0 ? 'auto' : this.zindex,
    }
  }

  getFontStyling() {
    return {
      'font-size': this.font.value,
    }
  }

  getMargin() {
    var tempMar:any = {};
    if(this.m_link.a) {
      tempMar.top = this.margin.top;
      tempMar.bottom = this.margin.top;
      tempMar.left = this.margin.top;
      tempMar.right = this.margin.top;
    }
    else if(this.m_link.tb && this.m_link.lr) {
      tempMar.top = this.margin.top;
      tempMar.bottom = this.margin.top;
      tempMar.left = this.margin.left;
      tempMar.right = this.margin.left;
    }
    else if(this.m_link.tb) {
      tempMar.top = this.margin.top;
      tempMar.bottom = this.margin.top;
      tempMar.left = this.margin.left;
      tempMar.right = this.margin.right;
    }
    else if(this.m_link.lr) {
      tempMar.top = this.margin.top;
      tempMar.bottom = this.margin.bottom;
      tempMar.left = this.margin.left;
      tempMar.right = this.margin.left;
    }
    else {
      tempMar.top = this.margin.top;
      tempMar.bottom = this.margin.bottom;
      tempMar.left = this.margin.left;
      tempMar.right = this.margin.right;
    }
    return tempMar.top + ' '  + ((this.blockAlign == 'left' || this.blockAlign == 'center' 
    || (this.blockAlign == '' && tempMar.right == '0px' && tempMar.left != 'auto') 
    && this._general.selectedBlock.type != 'element') 
    ? 'auto' : tempMar.right) + ' ' + tempMar.bottom + ' ' 
    + ((this.blockAlign == 'right' || this.blockAlign == 'center' 
    || (this.blockAlign == '' && tempMar.left == '0px' && tempMar.right != 'auto') 
    && this._general.selectedBlock.type != 'element') ? 'auto' : tempMar.left);
  }

  getPadding() {
    if(this.p_link.a) return this.padding.top;
    else if(this.p_link.tb && this.p_link.lr) return this.padding.top + ' ' + this.padding.left;
    else if(this.p_link.tb) return this.padding.top + ' '  + this.padding.right + ' ' + this.padding.top + ' ' + this.padding.left;
    else if(this.p_link.lr) return this.padding.top + ' ' + this.padding.left + ' '  + this.padding.bottom;
    else return this.padding.top + ' '  + this.padding.right + ' ' + this.padding.bottom + ' ' + this.padding.left;
  }

  getBackgroundGradient() {
    return this.background_gradient.type+'-gradient('+(this.background_gradient.type=='radial'?'circle at '+this.background_gradient.radial_direction:this.background_gradient.direction + 'deg') + ', ' +this.background_gradient.start+ ' ' + this.background_gradient.startPosition + '%, ' +this.background_gradient.end+ ' ' + this.background_gradient.endPosition +'%)';
  }

  demoBorder() {
    return {
      'border-radius': this.br_link ? this.border_radius.top_left : this.border_radius.top_left + ' ' + this.border_radius.top_right + ' ' + this.border_radius.bottom_left + ' ' + this.border_radius.bottom_right,
      'border-color': this.border_color,
      'border-style': this.border_style
    }
  }

  iconMotion(e:any) {
    e.classList.add('fa-spin');
    setTimeout(()=>{
      e.classList.remove('fa-spin');
    },150)
  }

  bgGradColorSwitch($event: { target: any; }) {
    this.iconMotion($event.target);
    var start = this.background_gradient.start;
    var end = this.background_gradient.end;
    this.background_gradient.start = end;
    this.background_gradient.end = start;
  }

  setBlockAlign(pos: string) {
    if(this.blockAlign == pos) this.blockAlign = '';
    else this.blockAlign = pos;
  }
  
  compareImgRepeat(imgR1:any, imgR2:any) {
    return imgR1.name === imgR2.name && imgR1.value === imgR2.value;
  }

  reverseValue(val:any, $event: { target: any; }) {
    this.iconMotion($event.target);
    var num = parseInt(val)*-1;
    return num;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  fontChange(val:any) {
    var vm = this;
    vm.font.value = vm.updateRexVal(val, 'wh');
    vm.fontRange.value = vm.font.value != 'auto' ? vm.font.value.replace(/[^0-9]/g, '') : 100;
    if(vm.font.value[vm.font.value.length-1] != '%' && vm.font.value != 'auto') {
      vm.fontRange.max = '120';
      vm.fontRange.type = 'px';
    }
    else {
      vm.fontRange.max = '100';
      vm.fontRange.type = '%';
    }
  }

  widthChange(val:any) {
    var vm = this;
    vm.width.value = vm.updateRexVal(val, 'wh');
    vm.widthRange.value = vm.width.value != 'auto' ? vm.width.value.replace(/[^0-9]/g, '') : 100;
    if(vm.width.value[vm.width.value.length-1] != '%' && vm.width.value != 'auto') {
      vm.widthRange.max = screen.width;
      vm.widthRange.type = 'px';
    }
    else {
      vm.widthRange.max = '100';
      vm.widthRange.type = '%';
    }
  }

  heightChange(val:any) {
    var vm = this;
    vm.height.value = vm.updateRexVal(val, 'wh');
    vm.heightRange.value = vm.height.value != 'auto' ? vm.height.value.replace(/[^0-9]/g, '') : 100;
    if(vm.height.value[vm.height.value.length-1] != '%' && vm.height.value != 'auto') {
      vm.heightRange.max = screen.height;
      vm.heightRange.type = 'px';
    }
    else {
      vm.heightRange.max = '100';
      vm.heightRange.type = '%';
    }
  }

  operateNumVal(eKey: string, val: string) {
    val == 'auto' ? val = '0' : '';
    return eKey == 'ArrowUp' ? this.updateRexVal(val, 'inc') : eKey == 'ArrowDown' ?  this.updateRexVal(val, 'dec') : val;
  }

  getNumVal(val: any | string[]) {
    var i = 0;
    return val.replace(/[^0-9]/g, (m: string)  => !i++ ? (m == '-' ? (val[0] != '-' ? '' : m) : '') : '');
  }

  // general values

  updateRexVal(val: any | string[], op: string | undefined | void) {
    if(val[0] != 'a') {
      let unit = 'px', len = val.length;
      val.includes('px') && val.lastIndexOf('px') == len - 2 ? unit = 'px' : '';
      val.includes('%') && val.lastIndexOf('%') == len - 1 ? unit = '%' : '';
      val.includes('em') && val.lastIndexOf('em') == len - 2 ? unit = 'em' : '';
      val.includes('pt') && val.lastIndexOf('pt') == len - 2 ? unit = 'pt' : '';
      val.includes('cm') && val.lastIndexOf('cm') == len - 2 ? unit = 'cm' : '';
      val.includes('in') && val.lastIndexOf('in') == len - 2 ? unit = 'in' : '';
      val.includes('rem') && val.lastIndexOf('rem') == len - 3 ? unit = 'rem' : '';
      val.includes('vh') && val.lastIndexOf('vh') == len - 2 ? unit = 'vh' : '';
      val.includes('vw') && val.lastIndexOf('vw') == len - 2 ? unit = 'vw' : '';
      var result = val.replace(/[^0-9]/g, '') ? this.getNumVal(val) : '0';
      if(op == 'inc') {
        return (parseInt(result)+1).toString() + unit;
      }
      else if(op == 'dec') {
        return (parseInt(result)-1).toString() + unit;
      }
      else if(op == 'wh') {
        return result == '0' ? '100%' : result + unit;
      }
      else {
        return result + unit;
      }
    }
    else {
      return 'auto';
    }
  }

  updateSideUnits(val: { top: string; bottom: string; left: string; right: string; }) {
    val.top = this.updateRexVal(val.top);
    val.bottom = this.updateRexVal(val.bottom);
    val.left = this.updateRexVal(val.left);
    val.right = this.updateRexVal(val.right);
  }

  marginUpdate(val: { right: any; left: any; bottom: any; top: any; }) {
      if(this.m_link.a) {
          val.right = val.left = val.bottom = val.top;
      }
      else {
        if(this.m_link.tb) {
            val.bottom = val.top = val.top;
        }
        if(this.m_link.lr) {
            val.right = val.left = val.left;
        }
      }
      this.updateSideUnits(val);
  }

  paddingUpdate(val: { right: any; left: any; bottom: any; top: any; }) {
      if(this.p_link.a) {
          val.right = val.left = val.bottom = val.top; 
      }
      else {
        if(this.p_link.tb) {
            val.bottom = val.top; 
        }
        if(this.p_link.lr) {
            val.right = val.left; 
        }
      }
      this.updateSideUnits(val);
  }

  borderUpdate(val: { right: any; left: any; bottom: any; top: any; }) {
      if(this.b_link.a) {
          val.right = val.left = val.bottom = val.top; 
      }
      else {
        if(this.b_link.tb) {
            val.bottom = val.top; 
        }
        if(this.b_link.lr) {
            val.right = val.left; 
        }
      }
      this.updateSideUnits(val);
  }

  borderRadiusUpdate(val: { bottom_left: string; bottom_right: string; top_right: string; top_left: string; }) {
      this.br_link ? val.bottom_left = val.bottom_right = val.top_right = val.top_left : '';
      val.top_left = this.updateRexVal(val.top_left);
      val.top_right = this.updateRexVal(val.top_right);
      val.bottom_left = this.updateRexVal(val.bottom_left);
      val.bottom_right = this.updateRexVal(val.bottom_right);
  }

  updateStyle() {
    this._general.selectedBlock.style = this.currentStyling();
    if(this._general.selectedBlock.type != "column") {
      this._general.selectedBlock = '';
    }
  }

  resetStyling() {
    this.margin.top = '0px';
    this.margin.right = '0px';
    this.margin.bottom = '0px';
    this.margin.left = '0px';

    var ptb = this._general.selectedBlock.type == 'element' || this._general.selectedBlock.type == 'column' ? '0px' : this._general.selectedBlock.type == 'row' ? '30px' : '60px';
    var plr = this._general.selectedBlock.type == 'column' ? '20px' :'0px';

    this.padding.top = ptb;
    this.padding.right = plr;
    this.padding.bottom = ptb;
    this.padding.left = plr;

    this.border.top = '0px';
    this.border.right = '0px';
    this.border.bottom = '0px';
    this.border.left = '0px';

    this.border_radius.top_left = '0px';
    this.border_radius.top_right = '0px';
    this.border_radius.bottom_left = '0px';
    this.border_radius.bottom_right = '0px';

    this.border_style = 'solid';
    this.border_color = 'rgba(0,0,0,1)';

    this.background_color = 'rgba(0,0,0,0)';

    this.blockAlign = '';

    if(this._general.selectedBlock.type == 'row') {
      this.width.value = '80%';
      this.widthRange.value = '80';
    }
    else {
      this.width.value = '100%';
      this.widthRange.value = '100';
    }

    this.height.value = 'auto';
    this.heightRange.value = '100';

    this.zindex = 0;

    this.m_link.a = false;
    this.m_link.tb = false;
    this.m_link.lr = false;

    this.p_link.a = false;
    this.p_link.tb = false;
    this.p_link.lr = false;

    this.b_link.a = true;
    this.b_link.tb = true;
    this.b_link.lr = true;

    this.br_link = true;

    this.resetBackgroundImage();
    this.resetBackgroundGradient();
  }

  resetBackgroundImage() {
      this.background_type = 'color';
      this.background_image.name = '';
      this.background_image.size = 'cover';
      this.background_image.position = 'center';
      this.background_image.repeat = {name: 'no repeat', value: 'no-repeat'};
  }

  resetBackgroundGradient() {
      this.background_type = 'color';
      this.background_gradient.type = 'linear'; 
      this.background_gradient.radial_direction = 'center'; 
      this.background_gradient.start = '#1867c0'; 
      this.background_gradient.end = '#1BC5BD'; 
      this.background_gradient.direction = 45; 
      this.background_gradient.startPosition = 0; 
      this.background_gradient.endPosition = 100; 
  }

  strToObjCss(css:any) {
    var cssStr = '';
    css.split(';').forEach((val: any) => {
      var attr = val.split(':');
      cssStr += '"'+attr[0]+'":"'+attr[1]+'",';
    });
    return JSON.parse('{'+cssStr.slice(0, -1)+'}');
  }

  blockSetting(build: any) {
    console.log(build);
    if(build.style) {
        var obj = build.style;
        if(obj['background-image']) {
          console.log(obj['background-image']);
          var bgImg = obj['background-image'].trim().split('(');
          if(bgImg[0] == 'url') {
              this.background_image.name = 'url(../assets/images/builder/upload_images/'+bgImg[1].split(')')[0]+')';
              this.background_image.size = obj['background-size'];
              this.background_image.position = obj['background-position'];
              this.background_image.repeat.value = obj['background-repeat'];
              this.resetBackgroundGradient();
              this.background_type = 'image';
          }
          else {
            var bgGrad = bgImg[1].split(')')[0].split(',');
            if(bgImg[0] == 'linear-gradient') {
              this.background_gradient.type = 'linear';
              this.background_gradient.direction = bgGrad[0].split('deg')[0];
            }
            else {
              this.background_gradient.type = 'radial';
              this.background_gradient.radial_direction = bgGrad[0].split('circle at ')[1];
            }
            
            this.background_gradient.start = bgGrad[1].split(' ')[1];
            this.background_gradient.end = bgGrad[2].split(' ')[1];

            this.background_gradient.startPosition = bgGrad[1].split(' ')[2].split('%')[0];
            this.background_gradient.endPosition = bgGrad[2].split(' ')[2].split('%')[0];

            this.resetBackgroundImage();
            this.background_type = 'gradient';
          }
        }
        else {
            this.resetBackgroundImage();
            this.resetBackgroundGradient();
        }
        this.width.value = obj.width ? obj.width : '100%';
        this.height.value = obj.height ? obj.height : '100%';

        this.margin.top = obj.margin.split(' ')[0];
        this.margin.right = obj.margin.split(' ')[1] != 'auto' ? obj.margin.split(' ')[1] : '0px';
        this.margin.bottom = obj.margin.split(' ')[2];
        this.margin.left = obj.margin.split(' ')[3] != 'auto' ? obj.margin.split(' ')[3] : '0px';

        obj['margin-left'] == 'auto!important' ? this.blockAlign = 'right' : '';
        obj['margin-right'] == 'auto!important' ? this.blockAlign = 'left' : '';
        obj['margin-left'] == 'auto!important' && obj['margin-right'] == 'auto!important' ? this.blockAlign = 'center' : '';

        this.padding.top = obj.padding.split(' ')[0];
        this.padding.right = obj.padding.split(' ')[1];
        this.padding.bottom = obj.padding.split(' ')[2];
        this.padding.left = obj.padding.split(' ')[3];

        this.border.top = obj['border-width'].split(' ')[0];
        this.border.right = obj['border-width'].split(' ')[1];
        this.border.bottom = obj['border-width'].split(' ')[2];
        this.border.left = obj['border-width'].split(' ')[3];

        this.border_radius.top_left = obj['border-radius'].split(' ')[0];
        this.border_radius.top_right = obj['border-radius'].split(' ')[1];
        this.border_radius.bottom_left = obj['border-radius'].split(' ')[2];
        this.border_radius.bottom_right = obj['border-radius'].split(' ')[3];
        
        this.border_style = obj['border-style'];

        this.border_color = obj['border-color'];

        this.background_color = obj['background-color'];
    }
    else {
      this.resetStyling();
    }
  }

  addImage(_img:any) {
    // if(this.selectedTab == 'Background') {
    //   this.background_image.name = this.uploadImgPath+img.name; 
    //   this.background_image.active = true;
    // }
    // else {
    //   this._general.selectedBlock.content.src = this.uploadImgPath+img.name;
    // }
    this.imgSelection = !this.imgSelection;
  }

  // onSelected(img:any){
  //   let files = img.target.files || img.dataTransfer.files;
  //   if (!files.length)
  //       return;
  //   let reader = new FileReader();
  //   let vm = this;
  //   reader.onload = (e) => {
  //       vm.newImg.upload = e.target.result;
  //       vm.newImg.id = this.galleryImg.length;
  //       vm.newImg.path = URL.createObjectURL(img.target.files[0]);
  //       var strn = img.target.files[0].name;
  //       vm.newImg.name = vm.galleryImgName.includes(strn) ? strn.slice(0, strn.lastIndexOf(".")) + '-' + new Date().getTime() + strn.slice(strn.lastIndexOf("."), strn.length) : strn;
  //       var obj = new Object();
  //       obj.name = 'loading.gif';
  //       vm.galleryImg.unshift(obj);
  //       axios.post('api/upload_image',vm.newImg)
  //       .then(response=>{
  //         this.getUploadImages();
  //         vm.newImg = {};
  //       })
  //   };
  //   reader.readAsDataURL(files[0]);
  // }

  selectImg() {
    // document.getElementById('imgInp').click();
  }
}
