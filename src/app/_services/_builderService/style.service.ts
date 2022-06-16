import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { ImageService } from '../image.service';

@Injectable({
  providedIn: 'root',
})

export class StyleService {
  // content/element styling
  // text
  font_size = {value: '16px'};
  font_sizeRange:any = {value: 16, max: 100, type: 'px'};
  font_weight = {name: 'normal', value:400};
  font_weight_types = [
    {name:'thin', value:100},
    {name:'extra light (ultra light)', value:200},
    {name:'light', value:300},
    {name:'normal', value:400},
    {name:'medium', value:500},
    {name:'semi bold (demi bold)', value:600},
    {name:'bold', value:700},
    {name:'extra bold (ultra bold)', value:800},
    {name:'black (heavy)', value:900},];
  font_style = 'normal';
  font_style_types = ['normal','italic','oblique'];
  font_family = 'poppins';
  font_family_types = ['Arial','Arial Black','Courier New','cursive','fantasy','Georgia','Helvetica','Impact','Lucida Console','Lucida Sans Unicode','monospace','poppins','sans-serif','serif','Tahoma','Times New Roman','Verdana'];
  text_color = 'rgba(0,0,0,1)';
  text_align = 'left';
  text_transform = 'none';
  text_transform_types = ['capitalize','uppercase','lowercase', 'none'];
  line_height = {value: 'normal'};
  line_heightRange:any = {value: 0, max: 100, type: 'px'};
  letter_spacing = {value: 'normal'};
  letter_spacingRange:any = {value: 0, min: -50, max: 50, type: 'px'};
  // text
  // image
  image_objectfit='fill';
  image_objectfit_types= ['fill','cover','contain','scale-down','none'];
  // image
  // button
  button_text='Read More';
  button_subtext='Sub Text';
  button_link='#';
  button_subfont_size = {value: '80'};
  button_subfont_sizeRange:any = {value: 80, max: 200, type: '%'};
  // button
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
  columnGap = 0;
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
  // background
  // advance
  zindex:number=0;
  // advance

  constructor(private _general: GeneralService, private _image: ImageService) {
  }

  // important functions will be used in future

  strToObjCss(css:any) {
    var cssStr = '';
    css.split(';').forEach((val: any) => {
      var attr = val.split(':');
      cssStr += '"'+attr[0]+'":"'+attr[1]+'",';
    });
    return JSON.parse('{'+cssStr.slice(0, -1)+'}');
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

  // important functions will be used in future

  currentStyling() {  
      return { 
        'margin': this.getMargin(),
        'padding': this.getPadding(),
        'border-width': this.getBorder(),
        'border-radius': this.getBorderRadius(), 
        'border-color': this.border_color,
        'border-style': this.border_style,
        'background-color': this.background_color,
        'background-image': this.background_type == 'image' ? 'url('+this.background_image.name+')' : this.background_type == 'gradient' ? this.getBackgroundGradient() : '',
        'background-size': this.background_type == 'image' ? this.background_image.size : '',
        'background-position': this.background_type == 'image' ? this.background_image.position : '',
        'background-repeat': this.background_type == 'image' ? this.background_image.repeat.value : '',
        'width': this.width.value,
        'height': this.height.value,
        'z-index': this.zindex == 0 ? 'auto' : this.zindex,
      }
  }

  textStyling() {
    return {
      'font-size': this.font_size.value,
      'font-weight': this.font_weight.value,
      'font-style': this.font_style,
      'font-family': this.font_family,
      'color': this.text_color,
      'text-align': this.text_align,
      'text-transform': this.text_transform,
      'line-height': this.line_height.value,
      'letter-spacing': this.letter_spacing.value
    }
  }

  imageStyling() {
    return {
      'object-fit': this.image_objectfit
    }
  }

  buttonStyling() {
    var btnS = {
      'font-size': this.font_size.value,
      'font-weight': this.font_weight.value,
      'font-style': this.font_style,
      'font-family': this.font_family,
      'color': this.text_color,
      'text-align': this.text_align,
      'text-transform': this.text_transform,
      'line-height': this.line_height.value,
      'letter-spacing': this.letter_spacing.value
    }
    return {...btnS, ...this.currentStyling()}
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

  getBorder() {
    if(this.b_link.a) return this.border.top;
    else if(this.b_link.tb && this.b_link.lr) return this.border.top + ' ' + this.border.left;
    else if(this.b_link.tb) return this.border.top + ' '  + this.border.right + ' ' + this.border.top + ' ' + this.border.left;
    else if(this.b_link.lr) return this.border.top + ' ' + this.border.left + ' '  + this.border.bottom;
    else return this.border.top + ' '  + this.border.right + ' ' + this.border.bottom + ' ' + this.border.left;
  }

  getBorderRadius() {
    if(this.br_link) return this.border_radius.top_left;
    else return this.border_radius.top_left + ' '  + this.border_radius.top_right + ' ' + this.border_radius.bottom_right + ' ' + this.border_radius.bottom_left;
  }

  getBackgroundGradient() {
    return this.background_gradient.type+'-gradient('+(this.background_gradient.type=='radial'?'circle at '+this.background_gradient.radial_direction:this.background_gradient.direction + 'deg') + ', ' +this.background_gradient.start+ ' ' + this.background_gradient.startPosition + '%, ' +this.background_gradient.end+ ' ' + this.background_gradient.endPosition +'%)';
  }

  demoBorder() {
    return {
      'border-radius': this.getBorderRadius(),
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
  
  compareOptValue(item1:any, item2:any) {
    return item1.name === item2.name && item1.value === item2.value;
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

  fontSizeChange(val:any) {
    var vm = this;
    if(val) {
      vm.font_size.value = vm.updateRexVal(val, 'fs');
      vm.font_sizeRange.value = vm.font_size.value != 'auto' ? vm.font_size.value.replace(/[^0-9]/g, '') : 100;
      if(vm.font_size.value[vm.font_size.value.length-1] != '%' && vm.font_size.value != 'auto') {
        vm.font_sizeRange.type = 'px';
      }
      else {
        vm.font_sizeRange.type = '%';
      }
    }
    else {
      vm.font_size.value = this._general.selectedBlock.content.name == 'button' ? '14px' : '16px';
      vm.font_sizeRange.value = this._general.selectedBlock.content.name == 'button' ? 14 : 16;
      vm.font_sizeRange.type = 'px';
    }
  }

  lineHeightChange(val:any) {
    var vm = this;
    if(val) {
      if(isNaN(val)) {
        console.log(val);
          vm.line_height.value = vm.updateRexVal(val, 'lh');
          vm.line_heightRange.value = vm.line_height.value != 'auto' ? vm.line_height.value.replace(/[^0-9]/g, '') : 0;
          if(vm.line_height.value[vm.line_height.value.length-1] != '%' && vm.line_height.value != 'auto') {
            vm.line_heightRange.type = 'px';
          }
          else {
            vm.line_height.value = val;
            vm.line_heightRange.type = '%';
          }
      }
      else {
        vm.line_heightRange.value = val;
      }
    }
    else {
      vm.line_height.value = 'normal';
      vm.line_heightRange.value = '0';
      vm.line_heightRange.type = 'px';
    }
  }

  letterSpacingChange(val:any) {
    var vm = this;
    vm.letter_spacing.value = vm.updateRexVal(val, 'ls');
    vm.letter_spacingRange.value = vm.letter_spacing.value != 'auto' ? vm.letter_spacing.value.replace(/[^0-9]/g, '') : 0;
    if(vm.letter_spacing.value[vm.letter_spacing.value.length-1] == '%' || vm.letter_spacingRange.value == 0) {
      vm.letter_spacing.value = 'normal';
      vm.letter_spacingRange.type = 'px';
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
    if(val[0].toLowerCase() != 'a') {
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
      result = result.replace(/-/g, '');
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
    if(this._general.selectedBlock.type == 'element') {
      if(this._general.selectedBlock.content.name == 'text' || this._general.selectedBlock.content.name == 'heading') {
        this._general.selectedBlock.content.style = this.textStyling();
      }
      else if(this._general.selectedBlock.content.name == 'image') {
        this._general.selectedBlock.content.style = this.imageStyling();
      }
      else if(this._general.selectedBlock.content.name == 'button') {
        this._general.selectedBlock.content.style = this.buttonStyling();
        this._general.selectedBlock.content.text = this.button_text;
        this._general.selectedBlock.content.subtext = this.button_subtext;
        this._general.selectedBlock.content.subfont_size = this.button_subfont_size.value;
        this._general.selectedBlock.content.link = this.button_link;
      }
    }
    if(this._general.selectedBlock.type != "column") {
      this._general.selectedBlock = '';
    }
    this._general.openSnackBar('Changes has been saved','Done');
  }

  resetStyling() {
    this.margin.top = '0px';
    this.margin.right = '0px';
    this.margin.bottom = this._general.selectedBlock.type == 'element' ? '10px' : '0px';
    this.margin.left = '0px';

    var ptb, plr, brw, br, bclr, bgclr;

    if(this._general.selectedBlock.content?.name == 'button') {
      ptb = '4px';
      plr = '16px';
      brw = '2px';
      br = '5px';
      bclr = '#1BC5BD';
      bgclr = '#1BC5BD';
    }
    else {
      ptb = this._general.selectedBlock.type == 'element' || this._general.selectedBlock.type == 'column' ? '0px' : this._general.selectedBlock.type == 'row' ? '30px' : '60px';
      plr = this._general.selectedBlock.type == 'column' ? '20px' :'0px';
      brw = '0px';
      br = '0px';
      bclr = 'rgba(0,0,0,1)';
      bgclr = 'rgba(0,0,0,0)';
    }

    this.padding.top = ptb;
    this.padding.right = plr;
    this.padding.bottom = ptb;
    this.padding.left = plr;

    this.border.top = brw;
    this.border.right = brw;
    this.border.bottom = brw;
    this.border.left = brw;

    this.border_radius.top_left = br;
    this.border_radius.top_right = br;
    this.border_radius.bottom_left = br;
    this.border_radius.bottom_right = br;

    this.border_style = 'solid';
    this.border_color = bclr;

    this.background_color = bgclr;

    this.blockAlign = '';

    if(this._general.selectedBlock.type == 'row') {
      this.width.value = '80%';
      this.widthRange.value = 80;
    }
    else if(this._general.selectedBlock.content?.name == 'button') {
      this.width.value = 'auto';
      this.widthRange.value = 100;
    }
    else {
      this.width.value = '100%';
      this.widthRange.value = 100;
    }

    this.height.value = 'auto';
    this.heightRange.value = 100;

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
    if(this._general.selectedBlock.type == 'element') this.resetElementStyling();
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

  resetElementStyling() {
    // text
    var fsv, fsr, fwn, fwv, tc, ta;
    if(this._general.selectedBlock.content.name == 'button'){
      fsv = '14px';
      fsr = 14;
      fwn = 'semi bold (demi bold)';
      fwv = 600;
      tc = 'rgba(255, 255, 255, 1)';
      ta = 'center';
    }
    else {
      fsv = '16px';
      fsr = 16;
      fwn = 'normal';
      fwv = 400;
      tc = 'rgba(0,0,0,1)';
      ta = 'left';
    }
    this.font_size.value = fsv;
    this.font_sizeRange.value = fsr;
    this.font_weight.name = fwn;
    this.font_weight.value = fwv;
    this.text_color = tc;
    this.text_align = ta;
    this.font_style = 'normal';
    this.font_family = 'poppins';
    this.text_transform = 'none';
    this.line_height.value = 'normal'
    this.line_heightRange.value = 0;
    this.letter_spacing.value = 'normal';
    this.letter_spacingRange.value = 0;
    // text
    // image
    this.image_objectfit = 'fill';
    // image
    // button
    this.button_text='Read More';
    this.button_subtext='Sub Text';
    this.button_subfont_size.value='80%';
    this.button_subfont_sizeRange.value='80';
    this.button_link='#';
    // button
  }

  blockSetting(build: any) {
    if(build.style) {
        var obj = build.style;
        if(build.type == 'element') this.elementSetting(build.content);
        if(obj['background-image']) {
          var bgImg = obj['background-image'].trim().split('(');
          if(bgImg[0] == 'url') {
              this.background_image.name = bgImg[1].split(')')[0];
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
        this.background_color = obj['background-color'];

        this.width.value = obj.width ? obj.width : '100%';
        this.height.value = obj.height ? obj.height : '100%';

        var mg = obj.margin.split(' ');

        if(mg.length == 1) {
          this.margin.top = mg[0];
          this.margin.bottom = mg[0];
          this.margin.right = mg[0] != 'auto' ? mg[0] : '0px';
          this.margin.left = mg[0] != 'auto' ? mg[0] : '0px';
          this.m_link.a = true;
        }
      
        else if(mg.length == 2) {
          this.margin.top = mg[0];
          this.margin.bottom = mg[0];
          this.margin.right = mg[1] != 'auto' ? mg[1] : '0px';
          this.margin.left = mg[1] != 'auto' ? mg[1] : '0px';
          this.m_link.a = false;
        }
      
        else if(mg.length == 3) {
          this.margin.top = mg[0];
          this.margin.right = mg[1] != 'auto' ? mg[1] : '0px';
          this.margin.left = mg[1] != 'auto' ? mg[1] : '0px';
          this.margin.bottom = mg[2];
          this.m_link.a = false;
        }
      
        else {
          this.margin.top = mg[0];
          this.margin.right = mg[1] != 'auto' ? mg[1] : '0px';
          this.margin.bottom = mg[2];
          this.margin.left = mg[3] != 'auto' ? mg[3] : '0px';       
          this.m_link.a = false;
        }
        
        this.m_link.tb = this.margin.top == this.margin.bottom;
        this.m_link.lr = this.margin.right == this.margin.left;  

        this.blockAlign = this.margin.right == 'auto' ? 'left' : '';
        this.blockAlign = this.margin.left == 'auto' ? 'right' : '';
        this.blockAlign = this.margin.right == 'auto' && this.margin.left == 'auto' ? 'center' : '';

        var pd = obj.padding.split(' ');

        if(pd.length == 1) {
          this.padding.top = pd[0];
          this.padding.bottom = pd[0];
          this.padding.right = pd[0];
          this.padding.left = pd[0];
          this.p_link.a = true;
        }

        else if(pd.length == 2) {
          this.padding.top = pd[0];
          this.padding.bottom = pd[0];
          this.padding.right = pd[1];
          this.padding.left = pd[1];        
          this.p_link.a = false;
        }

        else if(pd.length == 3) {
          this.padding.top = pd[0];
          this.padding.right = pd[1];
          this.padding.left = pd[1];
          this.padding.bottom = pd[2]; 
          this.p_link.a = false;
        }

        else {
          this.padding.top = pd[0];
          this.padding.right = pd[1];
          this.padding.bottom = pd[2];
          this.padding.left = pd[3];           
          this.p_link.a = false;
        }

        this.p_link.tb = this.padding.top == this.padding.bottom;
        this.p_link.lr = this.padding.right == this.padding.left;  


        var brd = obj['border-width'].split(' ');

        if(brd.length == 1) {
          this.border.top = brd[0];
          this.border.bottom = brd[0];
          this.border.right = brd[0];
          this.border.left = brd[0];
          this.b_link.a = true;
        }

        else if(brd.length == 2) {
          this.border.top = brd[0];
          this.border.bottom = brd[0];
          this.border.right = brd[1];
          this.border.left = brd[1];      
          this.b_link.a = false;
        }

        else if(brd.length == 3) {
          this.border.top = brd[0];
          this.border.right = brd[1];
          this.border.left = brd[1];
          this.border.bottom = brd[2];
          this.b_link.a = false;
        }

        else {
          this.border.top = brd[0];
          this.border.right = brd[1];
          this.border.bottom = brd[2];
          this.border.left = brd[3];           
          this.b_link.a = false;
        }

        this.b_link.tb = this.border.top == this.border.bottom;
        this.b_link.lr = this.border.right == this.border.left;  

        var brdr = obj['border-radius'].split(' ');

        if(brdr.length == 1) {
          this.border_radius.top_left = brdr[0];
          this.border_radius.top_right = brdr[0];
          this.border_radius.bottom_right = brdr[0];
          this.border_radius.bottom_left = brdr[0];
          this.br_link = true;
        }
      
        else if(brdr.length == 2) {
          this.border_radius.top_left = brdr[0];
          this.border_radius.top_right = brdr[1];
          this.border_radius.bottom_right = brdr[0];
          this.border_radius.bottom_left = brdr[1];   
          this.br_link = false;
        }
      
        else if(brdr.length == 3) {
          this.border_radius.top_left = brdr[0];
          this.border_radius.top_right = brdr[1];
          this.border_radius.bottom_left = brdr[1];
          this.border_radius.bottom_right = brdr[2];
          this.br_link = false;
        }
      
        else {
          this.border_radius.top_left = brdr[0];
          this.border_radius.top_right = brdr[1];
          this.border_radius.bottom_right = brdr[2];
          this.border_radius.bottom_left = brdr[3];       
          this.br_link = false;
        }
        
        this.border_style = obj['border-style'];

        this.border_color = obj['border-color'];
    }
    else {
      this.resetStyling();
    }
  }

  elementSetting(element: any) {
    var obj = element.style;
    if(element.name == 'text' || element.name == 'button') {
      this.font_size.value = obj['font-size'];
      this.font_weight.value = obj['font-weight'];
      this.font_style = obj['font-style'];
      this.font_family = obj['font-family'];
      this.text_color = obj['color'];
      this.text_align = obj['text-align'];
      this.text_transform = obj['text-transform'];
      this.line_height.value = obj['line-height'];
      this.letter_spacing.value = obj['letter-spacing'];
    }
    else if(element.name == 'image') {
      this.image_objectfit = obj['object-fit'];
    }
    else if(element.name == 'button') {
      this.button_text=element.text;
      this.button_subtext=element.subtext;
      this.button_subfont_size.value=element.subfont_size;
      this.button_link=element.link;
    }
  }
  
  addImage(img:any) {
    if(this._general.selectedTab == 'Background') {
      this.background_image.name = !img.ext_link ? this._image.uploadImgPath+img.path : img.path;
    }
    else {
      this._general.selectedBlock.content.src = !img.ext_link ? this._image.uploadImgPath+img.path : img.path;
    }
  }

}

