import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { ImageService } from '../image.service';

@Injectable({
  providedIn: 'root',
})

export class StyleService {
  // content/element styling
  item_alignment:any = {desktop:'', tablet_h:'', tablet_v:'', mobile:''};
  // text
  edit_html:any;
  font_size = { value: '16px' };
  font_sizeRange: any = { value: 16, max: 100, type: 'px' };
  font_weight = { name: 'normal', value: 400 };
  font_weight_types = [
    { name: 'thin', value: 100 },
    { name: 'extra light (ultra light)', value: 200 },
    { name: 'light', value: 300 },
    { name: 'normal', value: 400 },
    { name: 'medium', value: 500 },
    { name: 'semi bold (demi bold)', value: 600 },
    { name: 'bold', value: 700 },
    { name: 'extra bold (ultra bold)', value: 800 },
    { name: 'black (heavy)', value: 900 },];
  font_style = 'normal';
  font_style_types = ['normal', 'italic'];
  font_family = 'poppins';
  font_family_types = ['Arial', 'Arial Black', 'Courier New', 'cursive', 'fantasy', 'Georgia', 'Helvetica', 'Impact', 'Lucida Console', 'Lucida Sans Unicode', 'monospace', 'poppins', 'sans-serif', 'serif', 'Tahoma', 'Times New Roman', 'Verdana'];
  text_color = 'rgba(0,0,0,1)';
  text_align = 'left';
  text_transform = 'none';
  text_transform_types = ['capitalize', 'uppercase', 'lowercase', 'none'];
  line_height = { value: 'normal' };
  line_heightRange: any = { value: 0, max: 100, type: 'px' };
  letter_spacing = { value: 'normal' };
  letter_spacingRange: any = { value: 0, min: -50, max: 50, type: 'px' };
  text_decoration_line = 'none';
  text_decoration_line_types = ['none', 'overline', 'line-through', 'underline', 'overline line-through', 'overline underline', 'line-through underline', 'overline line-through underline'];
  text_decoration_style = 'solid';
  text_decoration_style_types = ['solid','double','dotted','dashed','wavy'];
  text_decoration_color = 'rgba(0,0,0,1)';
  text_shadow_hl = { value: '4px' };
  text_shadow_hlRange: any = { value: 4, min: -25, max: 25, type: 'px' };
  text_shadow_vl = { value: '4px' };
  text_shadow_vlRange: any = { value: 4, min: -25, max: 25, type: 'px' };
  text_shadow_bs = { value: '4px' };
  text_shadow_bsRange: any = { value: 4, min: 0, max: 25, type: 'px' };
  text_shadow_color = 'rgba(0,0,0,40%)';
  text_shadow:boolean = false;
  // text
  // image
  image_src = '';
  image_objectfit = 'fill';
  image_objectfit_types = ['fill', 'cover', 'contain', 'scale-down', 'none'];
  // image
  // button
  button_text = 'Read More';
  button_subtext = 'Sub Text';
  button_link = '#';
  button_target:any = { name: 'same tab', value: '_self' };
  button_target_types = [
    { name: 'same tab', value: '_self' },
    { name: 'new tab', value: '_blank' },
    { name: 'linked new tab', value: 'framename' },
  ]
  button_subfont_size = {value: '80'};
  button_subfont_sizeRange: any = { value: 80, max: 200, type: '%' };
  button_product = '';
  // button
  // general
  width = { value: '100%' };
  widthRange: any = { value: 100, max: 100, type: '%' };
  height = { value: 'auto' };
  heightRange: any = { value: 100, max: 100, type: '%' };
  blockAlign = '';
  m_link = { tb: false, lr: false, a: false };
  margin = { top: '0px', bottom: '0px', left: '0px', right: '0px' };
  p_link = { tb: false, lr: false, a: false };
  padding = { top: '0px', bottom: '0px', left: '0px', right: '0px' };
  columnGap = { desktop: 0, tablet_h: 0, tablet_v: 0, mobile: 0 };
  columnRev = { desktop: false, tablet_h: false, tablet_v: false, mobile: false };
  hide = { desktop: false, tablet_h: false, tablet_v: false, mobile: false };
  // general
  // border
  b_link = { tb: true, lr: true, a: true };
  border = { top: '0px', bottom: '0px', left: '0px', right: '0px' };
  br_link: boolean = true;
  border_radius = { top_left: '0px', top_right: '0px', bottom_left: '0px', bottom_right: '0px' };
  border_color: string = 'rgba(0,0,0,1)';
  border_style: string = 'solid';
  border_style_types = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none'];
  // border
  // background
  background_color: string = 'rgba(0,0,0,0)';
  background_gradient: any = { type: 'linear', radial_direction: 'center', start: '#1867c0', end: '#dea641', direction: 45, startPosition: 0, endPosition: 100 };
  background_gradient_types: any = ['linear', 'radial']
  background_gradient_radial_directions: any = ['center', 'top left', 'top', 'top right', 'right', 'bottom left', 'bottom', 'bottom right', 'left']
  background_image:any = { name: 'no-image.png', size: 'cover', position: 'center', repeat: { name: 'no repeat', value: 'no-repeat' }, attachment: 'scroll'};
  background_image_sizes = ['cover', 'contain', 'auto'];
  background_image_positions = ['top left', 'top center', 'top right', 'center', 'bottom left', 'bottom center', 'bottom right'];
  background_image_repeats = [{ name: 'no repeat', value: 'no-repeat' }, { name: 'repeat', value: 'repeat' }, { name: 'repeat x (horizontal)', value: 'repeat-x' }, { name: 'repeat y (vertical)', value: 'repeat-y' }, { name: 'space', value: 'sapce' }, { name: 'round', value: 'round' }];
  background_image_attachments = ['scroll','fixed','local'];
  background_type:string = 'color';
  // background
  // box shadow
  box_shadow_hp = { value: '0px' };
  box_shadow_hpRange: any = { value: 0, min: -100, max: 100, type: 'px' };
  box_shadow_vp = { value: '2px' };
  box_shadow_vpRange: any = { value: 2, min: -100, max: 100, type: 'px' };
  box_shadow_bs = { value: '18px' };
  box_shadow_bsRange: any = { value: 18, min: 0, max: 100, type: 'px' };
  box_shadow_ss = { value: '0px' };
  box_shadow_ssRange: any = { value: 0, min: 0, max: 100, type: 'px' };
  box_shadow_position = 'none';
  box_shadow_color = 'rgba(0,0,0,40%)';
  // box shadow
  // advance
  zindex: number = 0;
  // advance
  styleSession:any = {undo: 0, redo: 0}
  styleSessionArr:any = [];
  styleContentArr:any = [];
  styleColumnSArr:any = [];
  eleItemAlignArr:any = [];
  hideBlockSessionArr:any = [];
  resetSession:boolean = true;
  setItemStyle:boolean = false;

  constructor(private _general: GeneralService, private _image: ImageService) {
    _general.main.style.desktop = this.defaultStyling(_general.main);
  }

  resetStyleSession() {
    this.styleSession = {undo: 0, redo: 0};
    this.styleSessionArr = [];
    this.styleContentArr = [];
    this.styleColumnSArr = [];
    this.eleItemAlignArr = [];
    this.hideBlockSessionArr = [];
    this.saveStyleSession();
  }

  getContentStyling(content:any) {
    if(content == 'button') {
      return this.buttonStyling();
    }
    else if(content == 'image') {
      return this.imageStyling();
    }
    else {
      return this.textStyling();
    }
  }

  getColumnStructureStyling() {
    return {
      columnGap: this.columnGap,
      columnRev: this.columnRev
    }
  }

  setRespStyle(block:any, rObj:object) {
    if (this._general.respToggleDevice.name == 'tablet-h') {
      block.style.tablet_h = rObj;
    }
    else if (this._general.respToggleDevice.name == 'tablet-v') {
      block.style.tablet_v = rObj;
    }
    else if (this._general.respToggleDevice.name == 'mobile') {
      block.style.mobile = rObj;
    }
    else {
      block.style.desktop = rObj;
    }
    return block;
  }

  // session storage

  applySession(sStr:any, cStr:any, csStr:any, eitmaStr:any, hideStr:any) {
    var sObj = JSON.parse(sStr);
    var selB = JSON.parse(JSON.stringify(this._general.selectedBlock));
    if(this.setItemStyle) selB.content.item = this.setRespStyle(selB.content.item, sObj); 
    else selB = this.setRespStyle(selB, sObj);
    selB.hide = JSON.parse(hideStr);
    if(!this.setItemStyle && selB.type == 'element' && cStr != undefined) {
      var eiaObj = JSON.parse(eitmaStr);
      selB.item_alignment = eiaObj;
      var cObj = JSON.parse(cStr);
      selB.content = this.setRespStyle(selB.content, cObj);
    }
    else if(selB.type == 'row' && csStr != undefined) {
      var csObj = JSON.parse(csStr);
      selB.columnGap = csObj.columnGap;
      selB.columnRev = csObj.columnRev;
    }
    this.resetSession = false;
    this.blockSetting(selB);
    this.resetSession = true;
  }

  saveStyleSession() {
    var selB = this._general.selectedBlock;
    if((this.styleSessionArr[this.styleSessionArr.length-1] != JSON.stringify(this.currentStyling()) && this.styleSessionArr[this.styleSession.undo] != JSON.stringify(this.currentStyling()))
    || (this.hideBlockSessionArr[this.hideBlockSessionArr.length-1] != JSON.stringify(this.hide) && this.hideBlockSessionArr[this.styleSession.undo] != JSON.stringify(this.hide))
    || (this.setItemStyle && (this.styleSessionArr[this.styleSessionArr.length-1] != JSON.stringify(this.currentStyling()) && this.styleSessionArr[this.styleSession.undo] != JSON.stringify(this.currentStyling())))
    || (!this.setItemStyle && selB.type == 'element' && this.styleContentArr[this.styleContentArr.length-1] != JSON.stringify(this.getContentStyling(selB.content)) && this.styleContentArr[this.styleSession.undo] != JSON.stringify(this.getContentStyling(selB.content)))
    || (!this.setItemStyle && selB.type == 'element' && this.eleItemAlignArr[this.eleItemAlignArr.length-1] != JSON.stringify(this.item_alignment) && this.styleContentArr[this.styleSession.undo] != JSON.stringify(this.item_alignment))
    || (selB.type == 'row' && this.styleColumnSArr[this.styleColumnSArr.length-1] != JSON.stringify(this.getColumnStructureStyling()) && this.styleColumnSArr[this.styleSession.undo] != JSON.stringify(this.getColumnStructureStyling()))) {
      this.styleSessionArr.push(JSON.stringify(this.currentStyling()));
      this.hideBlockSessionArr.push(JSON.stringify(this.hide));
      if(selB.type == 'element' && !this.setItemStyle) {
        this.styleContentArr.push(JSON.stringify(this.getContentStyling(selB.content)));
        this.eleItemAlignArr.push(JSON.stringify(this.item_alignment));
      }
      else if(selB.type == 'row') {
        this.styleColumnSArr.push(JSON.stringify(this.getColumnStructureStyling()));
      }
      this.styleSession.undo = this.styleSessionArr.length-1; 
      this.styleSession.redo = this.styleSessionArr.length; 
    }
  }

  undo() {
    var sStr = this.styleSessionArr[this.styleSession.undo-1];
    var cStr = this.styleContentArr[this.styleSession.undo-1];
    var csStr = this.styleColumnSArr[this.styleSession.undo-1];
    var eitmaStr = this.eleItemAlignArr[this.styleSession.undo-1];
    var hideStr = this.hideBlockSessionArr[this.styleSession.undo-1];
    if(sStr != undefined) {
      this.applySession(sStr, cStr, csStr, eitmaStr, hideStr);
      this.styleSession.undo--;
      this.styleSession.redo--;
    }
  }

  redo() {
    var sStr = this.styleSessionArr[this.styleSession.redo];
    var cStr = this.styleContentArr[this.styleSession.redo];
    var csStr = this.styleColumnSArr[this.styleSession.redo];
    var eitmaStr = this.eleItemAlignArr[this.styleSession.redo];
    var hideStr = this.hideBlockSessionArr[this.styleSession.redo];
    if(sStr != undefined) {
      this.applySession(sStr, cStr, csStr, eitmaStr, hideStr);
      this.styleSession.undo++;
      this.styleSession.redo++;
    }
  }

  // session storage

  getHideCls(hide:any) {
    return {
      'kb-d-desk-none': hide.desktop,
      'kb-d-tab-h-none': hide.tablet_h,
      'kb-d-tab-v-none': hide.tablet_v,
      'kb-d-mob-none': hide.mobile
    }
  }

  getDisplay(hide:any) {
    if (this._general.respToggleDevice.name == 'tablet-h') {
      return hide.tablet_h;
    }
    else if (this._general.respToggleDevice.name == 'tablet-v') {
      return hide.tablet_v;
    }
    else if(this._general.respToggleDevice.name == 'mobile') {
      return hide.mobile;
    }
    else {
      return hide.desktop;
    }
  }

  getColumnReverse(rowColumnRev: any) {
    if (this._general.respToggleDevice.name == 'tablet-h') {
      return rowColumnRev.tablet_h ? 'row-reverse' : '';
    }
    else if (this._general.respToggleDevice.name == 'tablet-v') {
      return rowColumnRev.tablet_v ? 'column-reverse' : '';
    }
    else if(this._general.respToggleDevice.name == 'mobile') {
      return rowColumnRev.mobile ? 'column-reverse' : '';
    }
    else {
      return rowColumnRev.desktop ? 'row-reverse' : '';
    }
  }

  getBlockParamValue(blockparam: any) {
    if (this._general.respToggleDevice.name == 'tablet-h' && blockparam.tablet_h != 'auto') {
      return blockparam.tablet_h;
    }
    else if (this._general.respToggleDevice.name == 'tablet-v' && blockparam.tablet_v != 'auto') {
      return blockparam.tablet_v;
    }
    else if (this._general.respToggleDevice.name == 'mobile' && blockparam.mobile != 'auto') {
      return blockparam.mobile;
    }
    else {
      return blockparam.desktop;
    }
  }

  // set

  setElementAlignment(val:string) {
    if (this._general.respToggleDevice.name == 'tablet-h') {
      this.item_alignment.tablet_h = (val == '') ? 'flex-start' : val;
    }
    else if (this._general.respToggleDevice.name == 'tablet-v') {
      this.item_alignment.tablet_v = (val == '') ? 'flex-start' : val;
    }
    else if (this._general.respToggleDevice.name == 'mobile') {
      this.item_alignment.mobile = (val == '') ? 'flex-start' : val;
    }
    else {
      this.item_alignment.desktop = val;
    }   
  }

  getElementBlockStyle(block:any) {
    return {...this.getBlockStyle(block.content.style), ...this.getBlockStyle(block.style)}
  }

  getBlockStyle(blockS: any) {
    var objS = {};
    if (this._general.respToggleDevice.name == 'tablet-h') {
      objS = blockS.tablet_h;
    }
    else if (this._general.respToggleDevice.name == 'tablet-v') {
      objS = blockS.tablet_v;
    }
    else if(this._general.respToggleDevice.name == 'mobile') {
      objS = blockS.mobile;
    }
    return {...blockS.desktop, ...objS};
  }

  currentStyling() {
    var objAllS = {
      'margin': this.getMargin(),
      'padding': this.getPadding(),
      'border-width': this.getBorder(),
      'border-radius': this.getBorderRadius(),
      'border-color': this.border_color,
      'border-style': this.border_style,
      'background-color': this.background_color,
      'width': this.width.value,
      'height': this.height.value,
      'z-index': this.zindex == 0 ? 'auto' : this.zindex,
    }
    var objBgImg = {
      'background-image': 'url(' + this.background_image.name + ')',
      'background-size': this.background_image.size,
      'background-position': this.background_image.position,
      'background-repeat': this.background_image.repeat.value,
      'background-attachment': this.background_image.attachment,    
    }
    var objBgGrad = {
      'background-image': this.getBackgroundGradient()
    }
    var objBgNone = {
      'background-image': 'none',
    }
    var objBoxS = {
      'box-shadow': this.getBoxShadow(),
    }
    if(objBoxS['box-shadow']) {
      objAllS = {...objAllS, ...objBoxS}
    }
    if(this.background_type == 'color' && this._general.respToggleDevice.name != 'desktop') {
      return {...objAllS, ...objBgNone};
    }
    else if(this.background_type == 'image') {
      return {...objAllS, ...objBgImg};
    }
    else if(this.background_type == 'gradient') {
      return {...objAllS, ...objBgGrad};
    }
    else {
      return objAllS;
    }
  }

  textStyling() {
    var textS = {
      'font-size': this.font_size.value,
      'font-weight': this.font_weight.value,
      'font-style': this.font_style,
      'font-family': this.font_family,
      'color': this.text_color,
      'text-align': this.text_align,
      'text-transform': this.text_transform,
      'text-decoration-line': this.text_decoration_line,
      'text-decoration-style': this.text_decoration_style,
      'text-decoration-color': this.text_decoration_color,
      'line-height': this.line_height.value,
      'letter-spacing': this.letter_spacing.value,
    }
    var objTextShadow = {
      'text-shadow': this.getTextShadow(),
    }
    if(objTextShadow['text-shadow']) {
      textS = {...textS, ...objTextShadow}
    }
    return { ...textS, ...this.currentStyling() }
  }

  imageStyling() {
    var imgS = {
      'object-fit': this.image_objectfit
    }
    return { ...imgS, ...this.currentStyling() }
  }

  buttonStyling() {
    return this.textStyling();
  }

  getMargin() {
    var tempMar: any = {};
    if (this.m_link.a) {
      tempMar.top = this.margin.top;
      tempMar.bottom = this.margin.top;
      tempMar.left = this.margin.top;
      tempMar.right = this.margin.top;
    }
    else if (this.m_link.tb && this.m_link.lr) {
      tempMar.top = this.margin.top;
      tempMar.bottom = this.margin.top;
      tempMar.left = this.margin.left;
      tempMar.right = this.margin.left;
    }
    else if (this.m_link.tb) {
      tempMar.top = this.margin.top;
      tempMar.bottom = this.margin.top;
      tempMar.left = this.margin.left;
      tempMar.right = this.margin.right;
    }
    else if (this.m_link.lr) {
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
    if(this.setItemStyle) {
      var mar = tempMar.top + ' ' + tempMar.right + ' ' + tempMar.bottom + ' ' + tempMar.left;
    }
    else {
      var mar = tempMar.top + ' ' + ((this.blockAlign == 'left' || this.blockAlign == 'center'
      || (this.blockAlign == '' && tempMar.right == '0px' && tempMar.left != 'auto')
      && this._general.selectedBlock.type != 'element')
      ? 'auto' : tempMar.right) + ' ' + tempMar.bottom + ' '
      + ((this.blockAlign == 'right' || this.blockAlign == 'center'
        || (this.blockAlign == '' && tempMar.left == '0px' && tempMar.right != 'auto')
        && this._general.selectedBlock.type != 'element') ? 'auto' : tempMar.left);
    }
    return mar;
  }

  getPadding() {
    if (this.p_link.a) return this.padding.top;
    else if (this.p_link.tb && this.p_link.lr) return this.padding.top + ' ' + this.padding.left;
    else if (this.p_link.tb) return this.padding.top + ' ' + this.padding.right + ' ' + this.padding.top + ' ' + this.padding.left;
    else if (this.p_link.lr) return this.padding.top + ' ' + this.padding.left + ' ' + this.padding.bottom;
    else return this.padding.top + ' ' + this.padding.right + ' ' + this.padding.bottom + ' ' + this.padding.left;
  }

  getBorder() {
    if (this.b_link.a) return this.border.top;
    else if (this.b_link.tb && this.b_link.lr) return this.border.top + ' ' + this.border.left;
    else if (this.b_link.tb) return this.border.top + ' ' + this.border.right + ' ' + this.border.top + ' ' + this.border.left;
    else if (this.b_link.lr) return this.border.top + ' ' + this.border.left + ' ' + this.border.bottom;
    else return this.border.top + ' ' + this.border.right + ' ' + this.border.bottom + ' ' + this.border.left;
  }

  getBorderRadius() {
    if (this.br_link) return this.border_radius.top_left;
    else return this.border_radius.top_left + ' ' + this.border_radius.top_right + ' ' + this.border_radius.bottom_right + ' ' + this.border_radius.bottom_left;
  }

  getBackgroundGradient() {
    return this.background_gradient.type + '-gradient(' + (this.background_gradient.type == 'radial' ? 'circle at ' + this.background_gradient.radial_direction : this.background_gradient.direction + 'deg') + ', ' + this.background_gradient.start + ' ' + this.background_gradient.startPosition + '%, ' + this.background_gradient.end + ' ' + this.background_gradient.endPosition + '%)';
  }

  getBoxShadow() {
    if(this.box_shadow_position == 'none') return '';
    return (this.box_shadow_position == 'inset' ? 'inset ' : '') + this.box_shadow_hp.value + ' ' + this.box_shadow_vp.value + ' ' + this.box_shadow_bs.value + ' ' + this.box_shadow_ss.value + ' ' + this.box_shadow_color;
  }

  getTextShadow() {
    return this.text_shadow ? (this.text_shadow_hl.value + ' ' + this.text_shadow_vl.value + ' ' + this.text_shadow_bs.value + ' ' + this.text_shadow_color) : '';
  }

  demoBorder() {
    return {
      'border-radius': this.getBorderRadius(),
      'border-color': this.border_color,
      'border-style': this.border_style
    }
  }

  iconMotion(e: any) {
    e.classList.add('fa-spin');
    setTimeout(() => {
      e.classList.remove('fa-spin');
    }, 150)
  }

  bgGradColorSwitch($event: { target: any; }) {
    this.iconMotion($event.target);
    var start = this.background_gradient.start;
    var end = this.background_gradient.end;
    this.background_gradient.start = end;
    this.background_gradient.end = start;
  }

  setBlockAlign(pos: string) {
    if (this.blockAlign == pos) this.blockAlign = '';
    else this.blockAlign = pos;
  }

  reverseValue(val: any, $event: { target: any; }) {
    this.iconMotion($event.target);
    var num = parseInt(val) * -1;
    return num;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  fontSizeChange(val: any) {
    var vm = this;
    if (val) {
      vm.font_size.value = vm.updateRexVal(val, 'fs');
      vm.font_sizeRange.value = vm.font_size.value != 'auto' ? vm.font_size.value.replace(/[^0-9]/g, '') : 100;
      if (vm.font_size.value[vm.font_size.value.length - 1] != '%' && vm.font_size.value != 'auto') {
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

  lineHeightChange(val: any) {
    var vm = this;
    if (val) {
      if (isNaN(val)) {
        vm.line_height.value = vm.updateRexVal(val, 'lh');
        vm.line_heightRange.value = vm.line_height.value != 'auto' ? vm.line_height.value.replace(/[^0-9]/g, '') : 0;
        if (vm.line_height.value[vm.line_height.value.length - 1] != '%' && vm.line_height.value != 'auto') {
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

  letterSpacingChange(val: any) {
    var vm = this;
    vm.letter_spacing.value = vm.updateRexVal(val, 'ls');
    vm.letter_spacingRange.value = vm.letter_spacing.value != 'auto' ? vm.letter_spacing.value.replace(/[^0-9]/g, '') : 0;
    if (vm.letter_spacing.value[vm.letter_spacing.value.length - 1] == '%' || vm.letter_spacingRange.value == 0) {
      vm.letter_spacing.value = 'normal';
      vm.letter_spacingRange.type = 'px';
    }
  }

  widthChange(val: any) {
    var vm = this;
    vm.width.value = vm.updateRexVal(val, 'wh');
    vm.widthRange.value = vm.width.value != 'auto' ? vm.width.value.replace(/[^0-9]/g, '') : 100;
    if (vm.width.value[vm.width.value.length - 1] != '%' && vm.width.value != 'auto') {
      vm.widthRange.max = screen.width;
      vm.widthRange.type = 'px';
    }
    else {
      vm.widthRange.max = '100';
      vm.widthRange.type = '%';
    }
  }

  heightChange(val: any) {
    var vm = this;
    vm.height.value = vm.updateRexVal(val, 'wh');
    vm.heightRange.value = vm.height.value != 'auto' ? vm.height.value.replace(/[^0-9]/g, '') : 100;
    if (vm.height.value[vm.height.value.length - 1] != '%' && vm.height.value != 'auto') {
      vm.heightRange.max = screen.height;
      vm.heightRange.type = 'px';
    }
    else {
      vm.heightRange.max = '100';
      vm.heightRange.type = '%';
    }
  }

  box_shadow_hpChange(val: any) {
    var vm = this;
    vm.box_shadow_hp.value = vm.updateRexVal(val, true);
    vm.box_shadow_hpRange.value =  (vm.box_shadow_hp.value[0] == '-' ? '-':'')+vm.box_shadow_hp.value.replace(/[^0-9]/g, '');
    if (vm.box_shadow_hp.value[vm.box_shadow_hp.value.length - 1] == '%') {
      vm.box_shadow_hp.value = vm.box_shadow_hpRange.value + 'px';
      vm.box_shadow_hpRange.type = 'px';
    }
    else if (vm.box_shadow_hp.value == 'auto') {
      vm.box_shadow_hp.value = '0px';
      vm.box_shadow_hpRange.value = 0;
      vm.box_shadow_hpRange.type = 'px';
    }
  }

  box_shadow_vpChange(val: any) {
    var vm = this;
    vm.box_shadow_vp.value = vm.updateRexVal(val, true);
    vm.box_shadow_vpRange.value =  (vm.box_shadow_vp.value[0] == '-' ? '-':'')+vm.box_shadow_vp.value.replace(/[^0-9]/g, '');
    if (vm.box_shadow_vp.value[vm.box_shadow_vp.value.length - 1] == '%') {
      vm.box_shadow_vp.value = vm.box_shadow_vpRange.value + 'px';
      vm.box_shadow_vpRange.type = 'px';
    }
    else if (vm.box_shadow_vp.value == 'auto') {
      vm.box_shadow_vp.value = '0px';
      vm.box_shadow_vpRange.value = 0;
      vm.box_shadow_vpRange.type = 'px';
    }
  }

  box_shadow_bsChange(val: any) {
    var vm = this;
    vm.box_shadow_bs.value = vm.updateRexVal(val, false);
    vm.box_shadow_bsRange.value =  vm.box_shadow_bs.value.replace(/[^0-9]/g, '');
    if (vm.box_shadow_bs.value[vm.box_shadow_bs.value.length - 1] == '%') {
      vm.box_shadow_bs.value = vm.box_shadow_bsRange.value + 'px';
      vm.box_shadow_bsRange.type = 'px';
    }
    else if (vm.box_shadow_bs.value == 'auto') {
      vm.box_shadow_bs.value = '0px';
      vm.box_shadow_bsRange.value = 0;
      vm.box_shadow_bsRange.type = 'px';
    }
  }

  box_shadow_ssChange(val: any) {
    var vm = this;
    vm.box_shadow_ss.value = vm.updateRexVal(val, false);
    vm.box_shadow_ssRange.value =  vm.box_shadow_ss.value.replace(/[^0-9]/g, '');
    if (vm.box_shadow_ss.value[vm.box_shadow_ss.value.length - 1] == '%') {
      vm.box_shadow_ss.value = vm.box_shadow_ssRange.value + 'px';
      vm.box_shadow_ssRange.type = 'px';
    }
    else if (vm.box_shadow_ss.value == 'auto') {
      vm.box_shadow_ss.value = '0px';
      vm.box_shadow_ssRange.value = 0;
      vm.box_shadow_ssRange.type = 'px';
    }
  }

  text_shadow_hlChange(val: any) {
    var vm = this;
    vm.text_shadow_hl.value = vm.updateRexVal(val, true);
    vm.text_shadow_hlRange.value =  (vm.text_shadow_hl.value[0] == '-' ? '-':'')+vm.text_shadow_hl.value.replace(/[^0-9]/g, '');
    if (vm.text_shadow_hl.value[vm.text_shadow_hl.value.length - 1] == '%') {
      vm.text_shadow_hl.value = vm.text_shadow_hlRange.value + 'px';
      vm.text_shadow_hlRange.type = 'px';
    }
    else if (vm.text_shadow_hl.value == 'auto') {
      vm.text_shadow_hl.value = '0px';
      vm.text_shadow_hlRange.value = 0;
      vm.text_shadow_hlRange.type = 'px';
    }
  }

  text_shadow_vlChange(val: any) {
    var vm = this;
    vm.text_shadow_vl.value = vm.updateRexVal(val, true);
    vm.text_shadow_vlRange.value =  (vm.text_shadow_vl.value[0] == '-' ? '-':'')+vm.text_shadow_vl.value.replace(/[^0-9]/g, '');
    if (vm.text_shadow_vl.value[vm.text_shadow_vl.value.length - 1] == '%') {
      vm.text_shadow_vl.value = vm.text_shadow_vlRange.value + 'px';
      vm.text_shadow_vlRange.type = 'px';
    }
    else if (vm.text_shadow_vl.value == 'auto') {
      vm.text_shadow_vl.value = '0px';
      vm.text_shadow_vlRange.value = 0;
      vm.text_shadow_vlRange.type = 'px';
    }
  }

  text_shadow_bsChange(val: any) {
    var vm = this;
    vm.text_shadow_bs.value = vm.updateRexVal(val, false);
    vm.text_shadow_bsRange.value =  vm.text_shadow_bs.value.replace(/[^0-9]/g, '');
    if (vm.text_shadow_bs.value[vm.text_shadow_bs.value.length - 1] == '%') {
      vm.text_shadow_bs.value = vm.text_shadow_bsRange.value + 'px';
      vm.text_shadow_bsRange.type = 'px';
    }
    else if (vm.text_shadow_bs.value == 'auto') {
      vm.text_shadow_bs.value = '0px';
      vm.text_shadow_bsRange.value = 0;
      vm.text_shadow_bsRange.type = 'px';
    }
  }

  operateNumVal(eKey: string, val: string) {
    val == 'auto' ? val = '0' : '';
    return eKey == 'ArrowUp' ? this.updateRexVal(val, 'inc') : eKey == 'ArrowDown' ? this.updateRexVal(val, 'dec') : val;
  }

  getNumVal(val: any | string[]) {
    var i = 0;
    return val.replace(/[^0-9]/g, (m: string) => !i++ ? (m == '-' ? (val[0] != '-' ? '' : m) : '') : '');
  }

  // general values

  updateRexVal(val: any | string[], op: string | boolean | undefined | void) {
    if (val[0].toLowerCase() != 'a') {
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
      if(!op) result = result.replace(/-/g, '');
      if (op == 'inc') {
        return (parseInt(result) + 1).toString() + unit;
      }
      else if (op == 'dec') {
        return (parseInt(result) - 1).toString() + unit;
      }
      else if (op == 'wh') {
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

  updateSideUnits(val: { top: string; bottom: string; left: string; right: string; }, negative: any) {
    val.top = this.updateRexVal(val.top, negative);
    val.bottom = this.updateRexVal(val.bottom, negative);
    val.left = this.updateRexVal(val.left, negative);
    val.right = this.updateRexVal(val.right, negative);
  }

  marginUpdate(val: { right: any; left: any; bottom: any; top: any; }) {
    if (this.m_link.a) {
      val.right = val.left = val.bottom = val.top;
    }
    else {
      if (this.m_link.tb) {
        val.bottom = val.top = val.top;
      }
      if (this.m_link.lr) {
        val.right = val.left = val.left;
      }
    }
    this.updateSideUnits(val, true);
  }

  paddingUpdate(val: { right: any; left: any; bottom: any; top: any; }) {
    if (this.p_link.a) {
      val.right = val.left = val.bottom = val.top;
    }
    else {
      if (this.p_link.tb) {
        val.bottom = val.top;
      }
      if (this.p_link.lr) {
        val.right = val.left;
      }
    }
    this.updateSideUnits(val, false);
  }

  borderUpdate(val: { right: any; left: any; bottom: any; top: any; }) {
    if (this.b_link.a) {
      val.right = val.left = val.bottom = val.top;
    }
    else {
      if (this.b_link.tb) {
        val.bottom = val.top;
      }
      if (this.b_link.lr) {
        val.right = val.left;
      }
    }
    this.updateSideUnits(val, false);
  }

  borderRadiusUpdate(val: { bottom_left: string; bottom_right: string; top_right: string; top_left: string; }) {
    this.br_link ? val.bottom_left = val.bottom_right = val.top_right = val.top_left : '';
    val.top_left = this.updateRexVal(val.top_left);
    val.top_right = this.updateRexVal(val.top_right);
    val.bottom_left = this.updateRexVal(val.bottom_left);
    val.bottom_right = this.updateRexVal(val.bottom_right);
  }

  filterStyle(cs:any, ds:any) {
    var ns:any = new Object();
    if(cs['margin'] != ds['margin']) ns['margin'] = cs['margin'];
    if(cs['padding'] != ds['padding']) ns['padding'] = cs['padding'];
    if(cs['border-width'] != ds['border-width']) ns['border-width'] = cs['border-width'];
    if(cs['border-radius'] != ds['border-radius']) ns['border-radius'] = cs['border-radius'];
    if(cs['border-color'] != ds['border-color']) ns['border-color'] = cs['border-color'];
    if(cs['border-style'] != ds['border-style']) ns['border-style'] = cs['border-style'];
    if(cs['width'] != ds['width']) ns['width'] = cs['width'];
    if(cs['height'] != ds['height']) ns['height'] = cs['height'];
    if(cs['z-index'] != ds['z-index']) ns['z-index'] = cs['z-index'];
    if(cs['box-shadow'] != ds['box-shadow']) ns['box-shadow'] = cs['box-shadow'];
    if(cs['background-color'] != ds['background-color']) ns['background-color'] = cs['background-color'];
    if(cs['background-image'] != ds['background-image'] && cs['background-image'] != undefined) ns['background-image'] = cs['background-image'];
    if(cs['background-size'] != ds['background-size'] && cs['background-size'] != undefined) ns['background-size'] = cs['background-size']
    if(cs['background-position'] != ds['background-position'] && cs['background-position'] != undefined) ns['background-position'] = cs['background-position']
    if(cs['background-repeat'] != ds['background-repeat'] && cs['background-repeat'] != undefined) ns['background-repeat'] = cs['background-repeat']
    if(cs['background-attachment'] != ds['background-attachment'] && cs['background-attachment'] != undefined) ns['background-attachment'] = cs['background-attachment']
    return ns;
  }

  updateStyle() {
    var device = this._general.respToggleDevice.name;
    if(this._general.selectedBlock.type == 'main') {
      var pageN = this._general.page_name ? this._general.page_name : 'Page Name';
      var pageT = this._general.page_title ? this._general.page_title : 'Page Title';
      this._general.main.name = pageN;
      this._general.main.title = pageT;
      this._general.main.path = this._general.page_path;
      this._general.main.description = this._general.description;
      this._general.main.keywords = JSON.parse(JSON.stringify(this._general.keywords));
      this._general.main.author = this._general.author;
      this._general.main.meta_img = this._general.meta_img;
    }
    else this._general.selectedBlock.hide = JSON.parse(JSON.stringify(this.hide));
    if (this._general.selectedBlock.type == 'row') {
      this._general.selectedBlock.columnGap = JSON.parse(JSON.stringify(this.columnGap));
      this._general.selectedBlock.columnRev =  JSON.parse(JSON.stringify(this.columnRev));
    }
    if (device != 'desktop') {
      var newS = this.filterStyle(this.currentStyling(), this._general.selectedBlock.style.desktop);
      if (device == 'tablet-h') {
        this._general.selectedBlock.style.tablet_h = newS;
      }
      else if (device == 'tablet-v') {
        this._general.selectedBlock.style.tablet_v = newS;
      }
      else if (device == 'mobile') {
        this._general.selectedBlock.style.mobile = newS;
      }
    }
    else {
      if(this.setItemStyle) this._general.selectedBlock.content.item.style.desktop = this.currentStyling();
      else this._general.selectedBlock.style.desktop = this.currentStyling();
    }
    if (this._general.selectedBlock.type == 'element' && !this.setItemStyle) {
      this._general.selectedBlock.item_alignment = JSON.parse(JSON.stringify(this.item_alignment));
      if (this._general.selectedBlock.content.name == 'button') {
        this.setElementStyle(this.buttonStyling());
        this._general.selectedBlock.content.text = this.button_text;
        this._general.selectedBlock.content.subtext = this.button_subtext;
        this._general.selectedBlock.content.subfont_size = this.button_subfont_size.value;
        this._general.selectedBlock.content.link = this.button_link;
        this._general.selectedBlock.content.target = this.button_target.value;
        if(this._general.selectedBlock.content.btntype != 'regular') this._general.selectedBlock.content.productid = this.button_product;
      }
      else if (this._general.selectedBlock.content.name == 'image') {
        this._general.selectedBlock.content.src = this.image_src;
        this.setElementStyle(this.imageStyling());
      }
      else if (this._general.selectedBlock.content.name == 'heading' || this._general.selectedBlock.content.name == 'text'){
        this._general.selectedBlock.content.html = this.edit_html;
        this.setElementStyle(this.textStyling());
      }
      else if (this._general.selectedBlock.content.name == 'menu'){
        this.setElementStyle(this.textStyling());
      }
    }
    if (this._general.selectedBlock.type != "column") {
      this._general.selectedBlock = '';
    }
    // this._general.openSnackBar('Changes has been done', 'OK', 'center', 'top');
  }

  filterElementStyle(cs:any, ds:any) {
    var ns:any = new Object();
    if(cs['font-size'] != ds['font-size']) ns['font-size'] = cs['font-size'];
    if(cs['font-weight'] != ds['font-weight']) ns['font-weight'] = cs['font-weight'];
    if(cs['font-style'] != ds['font-style']) ns['font-style'] = cs['font-style'];
    if(cs['font-family'] != ds['font-family']) ns['font-family'] = cs['font-family'];
    if(cs['color'] != ds['color']) ns['color'] = cs['color'];
    if(cs['text-align'] != ds['text-align']) ns['text-align'] = cs['text-align'];
    if(cs['text-transform'] != ds['text-transform']) ns['text-transform'] = cs['text-transform'];
    if(cs['line-height'] != ds['line-height']) ns['line-height'] = cs['line-height'];
    if(cs['letter-spacing'] != ds['letter-spacing']) ns['letter-spacing'] = cs['letter-spacing'];
    return ns;
  }

  setElementStyle(contentStyle: any) {
    var device = this._general.respToggleDevice.name;
    if (device != 'desktop') {
      var newS = this.filterElementStyle(contentStyle, this._general.selectedBlock.content.style.desktop);
      if (this._general.respToggleDevice.name == 'tablet-h') {
        this._general.selectedBlock.content.style.tablet_h = newS;
      }
      else if (this._general.respToggleDevice.name == 'tablet-v') {
        this._general.selectedBlock.content.style.tablet_v = newS;
      }
      else if (this._general.respToggleDevice.name == 'mobile') {
        this._general.selectedBlock.content.style.mobile = newS;
      }
    }
    else {
      this._general.selectedBlock.content.style.desktop = contentStyle;
    }
  }

  defaultStyling(block:any) {
    this.margin.top = '0px';
    if(block.type == 'element' && !block.itemstyle && block.content?.name != 'code') {
      this.margin.right = 'auto';
      this.margin.bottom = '10px';
    }
    else {
      this.margin.right = '0px';
      this.margin.bottom = '0px';
    }
    this.margin.left = '0px';
    var ptb, plr, brw, br, bclr, bgclr;
    if (block.content?.name == 'button') {
      ptb = '8px';
      plr = '16px';
      brw = '2px';
      br = '5px';
      bclr = '#dea641';
      bgclr = '#dea641';
    }
    else if (block.itemstyle) {
      ptb = '6px';
      plr = '12px';
      brw = '0px';
      br = '0px';
      bclr = 'rgba(0,0,0,1)';
      bgclr = 'rgba(0,0,0,0)';
    }
    else {
      ptb = block.type == 'element' || block.type == 'column' || block.type == 'main' ? 
      '0px' : block.type == 'row' ?  '30px' : '60px';
      plr = block.type == 'column' ? '20px' : '0px';
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

    if (block.type == 'row') {
        this.width.value = '90%';
        this.widthRange.value = 90;        
    }
    else if (block.type == 'element') {
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

    this.columnGap = { desktop: 0, tablet_h: 0, tablet_v: 0, mobile: 0 };
    this.columnRev = { desktop: false, tablet_h: false, tablet_v: false, mobile: false };
    this.hide = { desktop: false, tablet_h: false, tablet_v: false, mobile: false };

    this.resetBackgroundImage();
    this.resetBackgroundGradient();
    this.resetBoxShadow();

    return this.currentStyling();
  }

  defaultElementStyling(block:any) {
    this.defaultStyling(block);
    // text
    var fsv, fsr, fwn, fwv, tc, ta;
    fsv = block.content.size+'px';
    fsr = block.content.size;
    if (block.content.name == 'button') {
      fwn = 'semi bold (demi bold)';
      fwv = 600;
      tc = 'rgba(255, 255, 255, 1)';
      ta = 'center';
    }
    else {
      if (block.content.name == 'heading') {
        fwn = 'bold';
        fwv = 700;
      }
      else {
        fwn = 'normal';
        fwv = 400;
      }
      tc = 'rgba(0,0,0,1)';
      ta = 'left';
    }
    this.font_size.value = fsv;
    this.font_sizeRange.value = fsr;
    this.font_weight = {name: fwn, value: fwv};
    this.text_color = tc;
    this.text_align = ta;
    this.font_style = 'normal';
    this.font_family = 'poppins';
    this.text_transform = 'none';
    this.text_decoration_line = 'none';
    this.text_decoration_style = 'solid';
    this.text_decoration_color = tc;
    this.resetTextShadow();
    this.line_height.value = 'normal'
    this.line_heightRange.value = 0;
    this.letter_spacing.value = 'normal';
    this.letter_spacingRange.value = 0;
    // text
    // image
    this.image_src = '';
    this.image_objectfit = 'fill';
    // image
    // button
    this.button_text = 'Read More';
    this.button_subtext = 'Extra Text';
    this.button_subfont_size.value = '80%';
    this.button_subfont_sizeRange.value = '80';
    this.button_link = '#';
    this.button_target = { name: 'same tab', value: '_self' };
    ;
    // button
    // menu
    this.item_alignment = {desktop:'', tablet_h:'', tablet_v:'', mobile:''};
    // menu
    if(block.content.name == 'button') {
      return this.buttonStyling();
    }
    else if(block.content.name == 'image') {
      return this.imageStyling();
    }
    else {
      return this.textStyling();
    }
  }

  resetTextShadow() {
    this.text_shadow_hl.value = '4px';
    this.text_shadow_hlRange.value = 4;
    this.text_shadow_hlRange.type = 'px';
    this.text_shadow_vl.value = '4px';
    this.text_shadow_vlRange.value = 4;
    this.text_shadow_vlRange.type = 'px';
    this.text_shadow_bs.value = '4px' ;
    this.text_shadow_bsRange.value = 4;
    this.text_shadow_bsRange.type = 'px';
    this.text_shadow_color = 'rgba(0,0,0,40%)';
    this.text_shadow = false;
  }

  resetBackgroundImage() {
    this.background_type = 'color';
    this.background_image.name = 'no-image.png';
    this.background_image.size = 'cover';
    this.background_image.position = 'center';
    this.background_image.repeat = { name: 'no repeat', value: 'no-repeat' };
    this.background_image.attachment = 'scroll';
  }

  resetBackgroundGradient() {
    this.background_type = 'color';
    this.background_gradient.type = 'linear';
    this.background_gradient.radial_direction = 'center';
    this.background_gradient.start = '#1867c0';
    this.background_gradient.end = '#dea641';
    this.background_gradient.direction = 45;
    this.background_gradient.startPosition = 0;
    this.background_gradient.endPosition = 100;
  }

  resetBoxShadow() {
    this.box_shadow_hp.value = '0px';
    this.box_shadow_hpRange.value = 0;
    this.box_shadow_hpRange.type = 'px';
    this.box_shadow_vp.value = '2px';
    this.box_shadow_vpRange.value = 2;
    this.box_shadow_vpRange.type = 'px';
    this.box_shadow_bs.value = '18px' ;
    this.box_shadow_bsRange.value = 18;
    this.box_shadow_bsRange.type = 'px';
    this.box_shadow_ss.value = '0px';
    this.box_shadow_ssRange.value = 0;
    this.box_shadow_ssRange.type = 'px';
    this.box_shadow_position = 'none';
    this.box_shadow_color = 'rgba(0,0,0,40%)';
  }

  blockSetting(block: any) {
      var obj = this.setItemStyle ? this.getBlockStyle(block.content.item.style) : this.getBlockStyle(block.style);
      if (block.type == 'element' && !this.setItemStyle) {
        this.item_alignment = JSON.parse(JSON.stringify(block.item_alignment));
        this.elementSetting(block.content);
      }
      if(obj['box-shadow'] && obj['box-shadow'] != 'none') {
        var boxS = obj['box-shadow'].split(' ');
        var bsp = 'none';
        if(boxS[0] == 'inset') {
          bsp = 'inset';
          boxS.shift();
        }
        else bsp = 'outset';

        this.box_shadow_position = bsp;

        this.box_shadow_hp.value = boxS[0];
        this.box_shadow_hpRange.value = boxS[0].replace(/[^0-9]/g, '');
        this.box_shadow_hpRange.type = boxS[0].replace(/[^a-z]/g, '');

        this.box_shadow_vp.value = boxS[1];
        this.box_shadow_vpRange.value = boxS[1].replace(/[^0-9]/g, '');
        this.box_shadow_vpRange.type = boxS[1].replace(/[^a-z]/g, '');

        this.box_shadow_bs.value = boxS[2];
        this.box_shadow_bsRange.value = boxS[2].replace(/[^0-9]/g, '');
        this.box_shadow_bsRange.type = boxS[2].replace(/[^a-z]/g, '');

        this.box_shadow_ss.value = boxS[3];
        this.box_shadow_ssRange.value = boxS[3].replace(/[^0-9]/g, '');
        this.box_shadow_ssRange.type = boxS[3].replace(/[^a-z]/g, '');
        
        this.box_shadow_color = boxS[4];
      }
      else {
        this.resetBoxShadow();
      }
      if (obj['background-image'] && obj['background-image'] != 'none') {
        var bgImg = obj['background-image'].trim().split('(');
        if (bgImg[0] == 'url') {
          this.background_image.name = bgImg[1].split(')')[0];
          this.background_image.size = obj['background-size'];
          this.background_image.position = obj['background-position'];
          this.background_image.repeat = this.background_image_repeats.filter((item:any)=>{ if(obj['background-repeat'] == item.value) return item; })[0];
          this.background_image.attachment = obj['background-attachment'];
          this.resetBackgroundGradient();
          this.background_type = 'image';
        }
        else {
          var bgGrad = bgImg[1].split(')')[0].split(',');
          if (bgImg[0] == 'linear-gradient') {
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
      var value = obj.width.match(/(\d+)/);
      this.widthRange.value = value ? value[0] : '100';
      var unit = obj.width.replace(/[^A-Za-z]/g, '');
      this.widthRange.type = unit && unit != 'auto' ? unit : '%';
      
      this.height.value = obj.height ? obj.height : '100%';
      var value = obj.height.match(/(\d+)/);
      this.heightRange.value = value ? value[0] : '100';
      var unit = obj.height.replace(/[^A-Za-z]/g, '');
      this.heightRange.type = unit && unit != 'auto' ? unit : '%';

      if(obj.margin) {
        var mg = obj.margin.split(' ');
        if (mg.length == 1) {
          var value:any;
          if(mg[0] == 'auto') {
            value = '0px';
            this.blockAlign = 'center';
          }
          else value = mg[0];
          this.margin.top = value;
          this.margin.bottom = value;
          this.margin.right = value;
          this.margin.left = value;
          this.m_link.a = true;
        }
  
        else if (mg.length == 2) {
          var my:any;
          var mx:any;
          if(mg[0] == 'auto') my = '0px';
          else my = mg[0];
          if(mg[1] == 'auto') {
            mx = '0px';
            this.blockAlign = 'center';
          }
          else mx = mg[1];
          this.margin.top = my;
          this.margin.bottom = my;
          this.margin.right = mx;
          this.margin.left = mx;
          this.m_link.a = false;
        }
  
        else if (mg.length == 3) {
          var mt:any;
          var mx:any;
          var mb:any;
          if(mg[0] == 'auto') mt = '0px';
          else mt = mg[0];
          if(mg[1] == 'auto') {
            mx = '0px';
            this.blockAlign = 'center';
          }
          else mx = mg[1];
          if(mg[2] == 'auto') mb = '0px';
          else mb = mg[2];
          this.margin.top = mt;
          this.margin.right = mx;
          this.margin.left = mx;
          this.margin.bottom = mb;
          this.m_link.a = false;
        }
  
        else {
          var mt:any;
          var mr:any;
          var mb:any;
          var ml:any;
          if(mg[0] == 'auto') mt = '0px';
          else mt = mg[0];
          if(mg[1] == 'auto') {
            mr = '0px';
            this.blockAlign = 'left';
          }
          else mr = mg[1];
          if(mg[2] == 'auto') mb = '0px';
          else mb = mg[2];
          if(mg[3] == 'auto') {
            ml = '0px';
            this.blockAlign = 'right';
          }
          else ml = mg[3];
          if(mg[1] == 'auto' && mg[3] == 'auto') this.blockAlign = 'center';
          this.margin.top = mt;
          this.margin.right = mr;
          this.margin.bottom = mb;
          this.margin.left = ml;
          this.m_link.a = false;
        }
  
        this.m_link.tb = this.margin.top == this.margin.bottom;
        this.m_link.lr = this.margin.right == this.margin.left;
      }

      if(obj.padding) {
        var pd = obj.padding.split(' ');

        if (pd.length == 1) {
          this.padding.top = pd[0];
          this.padding.bottom = pd[0];
          this.padding.right = pd[0];
          this.padding.left = pd[0];
          this.p_link.a = true;
        }
  
        else if (pd.length == 2) {
          this.padding.top = pd[0];
          this.padding.bottom = pd[0];
          this.padding.right = pd[1];
          this.padding.left = pd[1];
          this.p_link.a = false;
        }
  
        else if (pd.length == 3) {
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
      }

      if(obj['border-width']) {
        var brd = obj['border-width'].split(' ');

        if (brd.length == 1) {
          this.border.top = brd[0];
          this.border.bottom = brd[0];
          this.border.right = brd[0];
          this.border.left = brd[0];
          this.b_link.a = true;
        }

        else if (brd.length == 2) {
          this.border.top = brd[0];
          this.border.bottom = brd[0];
          this.border.right = brd[1];
          this.border.left = brd[1];
          this.b_link.a = false;
        }

        else if (brd.length == 3) {
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
      }

      if(obj['border-radius']) {
        var brdr = obj['border-radius'].split(' ');

        if (brdr.length == 1) {
          this.border_radius.top_left = brdr[0];
          this.border_radius.top_right = brdr[0];
          this.border_radius.bottom_right = brdr[0];
          this.border_radius.bottom_left = brdr[0];
          this.br_link = true;
        }

        else if (brdr.length == 2) {
          this.border_radius.top_left = brdr[0];
          this.border_radius.top_right = brdr[1];
          this.border_radius.bottom_right = brdr[0];
          this.border_radius.bottom_left = brdr[1];
          this.br_link = false;
        }

        else if (brdr.length == 3) {
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
      }

      this.border_style = obj['border-style'];

      this.border_color = obj['border-color'];

      if (block.type == 'row') {
        this.columnGap = JSON.parse(JSON.stringify(block.columnGap));
        this.columnRev =  JSON.parse(JSON.stringify(block.columnRev));
      }

      else if (block.type == 'main') {
        this._general.page_name = block.name;
        this._general.page_title = block.title;
        this._general.page_path = block.path;
        this._general.description = block.description;
        this._general.keywords = JSON.parse(JSON.stringify(block.keywords));
        this._general.author = block.author;
        this._general.meta_img = block.meta_img;
      }

      this.hide = block.hide;

      if(this.resetSession) this.resetStyleSession();
  }

  elementSetting(element: any) {
    var obj = this.getBlockStyle(element.style);
    if(element.name == 'menu') {
      this._general.menus.forEach((menu:any)=>{
        if(menu.id == element.data_id) {
          this._general.selectedMenu = menu;
        }
      })
    }
    if (element.name == 'text' || element.name == 'heading' || element.name == 'button' || element.name == 'menu') {
      this.font_size.value = obj['font-size'];
      this.font_weight = this.font_weight_types.filter((item:any)=>{ if(obj['font-weight'] == item.value) return item; })[0];
      this.font_style = obj['font-style'];
      this.font_family = obj['font-family'];
      this.text_color = obj['color'];
      this.text_align = obj['text-align'];
      this.text_transform = obj['text-transform'];
      this.text_decoration_line = obj['text-decoration-line'];
      this.text_decoration_style = obj['text-decoration-style'];
      this.text_decoration_color = obj['text-decoration-color'];
      if(obj['text-shadow']) {
        var textS = obj['text-shadow'].split(' ');
        this.text_shadow = true;
        this.text_shadow_hl.value = textS[0];
        this.text_shadow_hlRange.value = textS[0].replace(/[^0-9]/g, '');
        this.text_shadow_hlRange.type = textS[0].replace(/[^a-z]/g, '');
        this.text_shadow_vl.value = textS[1];
        this.text_shadow_vlRange.value = textS[1].replace(/[^0-9]/g, '');
        this.text_shadow_vlRange.type = textS[1].replace(/[^a-z]/g, '');
        this.text_shadow_bs.value = textS[2];
        this.text_shadow_bsRange.value = textS[2].replace(/[^0-9]/g, '');
        this.text_shadow_bsRange.type = textS[2].replace(/[^a-z]/g, '');
        this.text_shadow_color = textS[3];
      }
      else {
        this.resetTextShadow();
      }
      this.line_height.value = obj['line-height'];
      var value = obj['line-height'].match(/(\d+)/);
      this.line_heightRange.value = value ? value[0] : '100';
      var unit = obj['line-height'].replace(/[^A-Za-z]/g, '');
      this.line_heightRange.type = unit ? unit : '%';
      this.letter_spacing.value = obj['letter-spacing'];
      var value = obj['letter-spacing'].match(/(\d+)/);
      this.letter_spacingRange.value = value ? value[0] : '100';
      var unit = obj['letter-spacing'].replace(/[^A-Za-z]/g, '');
      this.letter_spacingRange.type = unit ? unit : '%';
      if(element.name == 'text' || element.name == 'heading') {
        this.edit_html = element.html;
      }
    }
    if (element.name == 'image') {
      this.image_src = element.src;
      this.image_objectfit = obj['object-fit'];
    }
    else if (element.name == 'button') {
      this._general.getAllWebPages();
      this._general.getAllFunnels();
      if(element.btntype != 'regular') {
        this.button_product = element.productid;
        this._general.getAllProducts();
      }
      this.button_text = element.text;
      this.button_subtext = element.subtext;
      this.button_subfont_size.value = element.subfont_size;
      this.button_link = element.link;
      this.button_target = this.button_target_types.filter((item:any)=>{ if(element.target == item.value) return item; })[0];
    }
  }

  addImage(img: any) {
    var src = !img.ext_link ? this._image.uploadImgPath + img.path : img.path;
    if (this._general.selectedTab == 'Background') this.background_image.name = src;
    else this._general.selectedBlock.type == 'main' ? this._general.meta_img = src : this.image_src = src;
  }
}

