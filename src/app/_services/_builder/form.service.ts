import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { ElementService } from './element.service';
import { FileUploadService } from '../file-upload.service';
import { EmailService } from '../mailer.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  countries:any = [{ name: 'United States' }, { name: 'Canada' }, { name: 'United Kingdom' }, { name: 'Ireland' }, { name: 'Australia' }, { name: 'New Zealand' }, { name: 'Afghanistan' }, { name: 'Aland Islands' }, { name: 'Albania' }, { name: 'Algeria' }, { name: 'American Samoa' }, { name: 'Andorra' }, { name: 'Angola' }, { name: 'Anguilla' }, { name: 'Antarctica' }, { name: 'Antigua and Barbuda' }, { name: 'Argentina' }, { name: 'Armenia' }, { name: 'Aruba' }, { name: 'Australia' }, { name: 'Austria' }, { name: 'Azerbaijan' }, { name: 'Bahamas' }, { name: 'Bahrain' }, { name: 'Bangladesh' }, { name: 'Barbados' }, { name: 'Belarus' }, { name: 'Belgium' }, { name: 'Belize' }, { name: 'Benin' }, { name: 'Bermuda' }, { name: 'Bhutan' }, { name: 'Bolivia' }, { name: 'Bonaire, Saint Eustatius and Saba ' }, { name: 'Bosnia and Herzegovina' }, { name: 'Botswana' }, { name: 'Bouvet Island' }, { name: 'Brazil' }, { name: 'British Indian Ocean Territory' }, { name: 'British Virgin Islands' }, { name: 'Brunei' }, { name: 'Bulgaria' }, { name: 'Burkina Faso' }, { name: 'Burundi' }, { name: 'Cambodia' }, { name: 'Cameroon' }, { name: 'Canada' }, { name: 'Cape Verde' }, { name: 'Cayman Islands' }, { name: 'Central African Republic' }, { name: 'Chad' }, { name: 'Chile' }, { name: 'China' }, { name: 'Christmas Island' }, { name: 'Cocos Islands' }, { name: 'Colombia' }, { name: 'Comoros' }, { name: 'Cook Islands' }, { name: 'Costa Rica' }, { name: 'Croatia' }, { name: 'Cuba' }, { name: 'Curacao' }, { name: 'Cyprus' }, { name: 'Czech Republic' }, { name: 'Democratic Republic of the Congo' }, { name: 'Denmark' }, { name: 'Djibouti' }, { name: 'Dominica' }, { name: 'Dominican Republic' }, { name: 'East Timor' }, { name: 'Ecuador' }, { name: 'Egypt' }, { name: 'El Salvador' }, { name: 'Equatorial Guinea' }, { name: 'Eritrea' }, { name: 'Estonia' }, { name: 'Ethiopia' }, { name: 'Falkland Islands' }, { name: 'Faroe Islands' }, { name: 'Fiji' }, { name: 'Finland' }, { name: 'France' }, { name: 'French Guiana' }, { name: 'French Polynesia' }, { name: 'French Southern Territories' }, { name: 'Gabon' }, { name: 'Gambia' }, { name: 'Georgia' }, { name: 'Germany' }, { name: 'Ghana' }, { name: 'Gibraltar' }, { name: 'Greece' }, { name: 'Greenland' }, { name: 'Grenada' }, { name: 'Guadeloupe' }, { name: 'Guam' }, { name: 'Guatemala' }, { name: 'Guernsey' }, { name: 'Guinea' }, { name: 'Guinea-Bissau' }, { name: 'Guyana' }, { name: 'Haiti' }, { name: 'Heard Island and McDonald Islands' }, { name: 'Honduras' }, { name: 'Hong Kong' }, { name: 'Hungary' }, { name: 'Iceland' }, { name: 'India' }, { name: 'Indonesia' }, { name: 'Iran' }, { name: 'Iraq' }, { name: 'Ireland' }, { name: 'Isle of Man' }, { name: 'Israel' }, { name: 'Italy' }, { name: 'Ivory Coast' }, { name: 'Jamaica' }, { name: 'Japan' }, { name: 'Jersey' }, { name: 'Jordan' }, { name: 'Kazakhstan' }, { name: 'Kenya' }, { name: 'Kiribati' }, { name: 'Kosovo' }, { name: 'Kuwait' }, { name: 'Kyrgyzstan' }, { name: 'Laos' }, { name: 'Latvia' }, { name: 'Lebanon' }, { name: 'Lesotho' }, { name: 'Liberia' }, { name: 'Libya' }, { name: 'Liechtenstein' }, { name: 'Lithuania' }, { name: 'Luxembourg' }, { name: 'Macao' }, { name: 'Macedonia' }, { name: 'Madagascar' }, { name: 'Malawi' }, { name: 'Malaysia' }, { name: 'Maldives' }, { name: 'Mali' }, { name: 'Malta' }, { name: 'Marshall Islands' }, { name: 'Martinique' }, { name: 'Mauritania' }, { name: 'Mauritius' }, { name: 'Mayotte' }, { name: 'Mexico' }, { name: 'Micronesia' }, { name: 'Moldova' }, { name: 'Monaco' }, { name: 'Mongolia' }, { name: 'Montenegro' }, { name: 'Montserrat' }, { name: 'Morocco' }, { name: 'Mozambique' }, { name: 'Myanmar' }, { name: 'Namibia' }, { name: 'Nauru' }, { name: 'Nepal' }, { name: 'Netherlands' }, { name: 'New Caledonia' }, { name: 'New Zealand' }, { name: 'Nicaragua' }, { name: 'Niger' }, { name: 'Nigeria' }, { name: 'Niue' }, { name: 'Norfolk Island' }, { name: 'North Korea' }, { name: 'Northern Mariana Islands' }, { name: 'Norway' }, { name: 'Oman' }, { name: 'Pakistan' }, { name: 'Palau' }, { name: 'Palestinian Territory' }, { name: 'Panama' }, { name: 'Papua New Guinea' }, { name: 'Paraguay' }, { name: 'Peru' }, { name: 'Philippines' }, { name: 'Pitcairn' }, { name: 'Poland' }, { name: 'Portugal' }, { name: 'Puerto Rico' }, { name: 'Qatar' }, { name: 'Republic of the Congo' }, { name: 'Reunion' }, { name: 'Romania' }, { name: 'Russia' }, { name: 'Rwanda' }, { name: 'Saint Barthelemy' }, { name: 'Saint Helena' }, { name: 'Saint Kitts and Nevis' }, { name: 'Saint Lucia' }, { name: 'Saint Martin' }, { name: 'Saint Pierre and Miquelon' }, { name: 'Saint Vincent and the Grenadines' }, { name: 'Samoa' }, { name: 'San Marino' }, { name: 'Sao Tome and Principe' }, { name: 'Saudi Arabia' }, { name: 'Senegal' }, { name: 'Serbia' }, { name: 'Seychelles' }, { name: 'Sierra Leone' }, { name: 'Singapore' }, { name: 'Sint Maarten' }, { name: 'Slovakia' }, { name: 'Slovenia' }, { name: 'Solomon Islands' }, { name: 'Somalia' }, { name: 'South Africa' }, { name: 'South Georgia and the South Sandwich Islands' }, { name: 'South Korea' }, { name: 'South Sudan' }, { name: 'Spain' }, { name: 'Sri Lanka' }, { name: 'Sudan' }, { name: 'Suriname' }, { name: 'Svalbard and Jan Mayen' }, { name: 'Swaziland' }, { name: 'Sweden' }, { name: 'Switzerland' }, { name: 'Syria' }, { name: 'Taiwan' }, { name: 'Tajikistan' }, { name: 'Tanzania' }, { name: 'Thailand' }, { name: 'Togo' }, { name: 'Tokelau' }, { name: 'Tonga' }, { name: 'Trinidad and Tobago' }, { name: 'Tunisia' }, { name: 'Turkey' }, { name: 'Turkmenistan' }, { name: 'Turks and Caicos Islands' }, { name: 'Tuvalu' }, { name: 'U.S. Virgin Islands' }, { name: 'Uganda' }, { name: 'Ukraine' }, { name: 'United Arab Emirates' }, { name: 'United Kingdom' }, { name: 'United States' }, { name: 'United States Minor Outlying Islands' }, { name: 'Uruguay' }, { name: 'Uzbekistan' }, { name: 'Vanuatu' }, { name: 'Vatican' }, { name: 'Venezuela' }, { name: 'Vietnam' }, { name: 'Wallis and Futuna' }, { name: 'Western Sahara' }, { name: 'Yemen' }, { name: 'Zambia' }, { name: 'Zimb' }];
  form = {
    id: '',
    uniqueid: '',
    form_id: '',
    name: 'Form Name',
    redirection: '',
    redirenbled: false,
    emailfrom: 'info',
    emailto: '',
    emailname: '',
    emailsubject: '',
    emailmessage: '',
    emailenabled: false,
    html: '',
    style: '', 
    appendstyle: '',
  }
  formEle: any = [
    { name: 'heading', html: '<h2>Heading goes here</h2>', iconCls: 'fas fa-heading' },
    { name: 'text', html: '<p>Paragraph goes here</p>', iconCls: 'fas fa-paragraph' },
    { name: 'image', src: '', iconCls: 'far fa-image' },
    { name: 'divider', iconCls: 'fas fa-grip-lines' },
    { name: 'full-name', label: 'Full Name', type: 'text', placeholder: 'Full Name', iconCls: 'fas fa-user', value: '', required: true, input: true },
    {
      name: 'name', label: 'Name', iconCls: 'far fa-user', required: true, input: true, split: [
        { name: 'first-name', type: 'text', placeholder: 'First Name', value: '' },
        { name: 'last-name', type: 'text', placeholder: 'Last Name', value: '' },
      ]
    },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Email Address', iconCls: 'fas fa-envelope-open-text', value: '', required: true, input: true },
    { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'Phone Number', iconCls: 'fas fa-phone', value: '', required: false, input: true },
    {
      name: 'address', label: 'Address', iconCls: 'fas fa-address-card', required: true, input: true, split: [
        { 
          subsplit: [
            { name: 'street-address', type: 'textarea', placeholder: 'Street Address', value: '' }
          ]
        },
        {
          subsplit: [
            { name: 'city', type: 'text', placeholder: 'City', value: '', hide: false },
            { name: 'state', type: 'text', placeholder: 'State / Province', value: '', hide: false },
          ]
        },
        {
          subsplit: [
            { name: 'postal-code', type: 'text', placeholder: 'Postal / Zip Code', value: '', hide: false },
            { name: 'country', type: 'select', placeholder: 'Select Country', value: 'none', hide: false },
          ]
        }
      ]
    },
    { name: 'short-text', label: 'Short Text', type: 'text', placeholder: 'Short Text', iconCls: 'fas fa-text-width', value: '', required: false, input: true },
    { name: 'long-text', label: 'Long Text', type: 'textarea', placeholder: 'Long Text', iconCls: 'fas fa-text-height', value: '', required: false, input: true },
    {
      name: 'checkbox', label: 'Multiple Choice', iconCls: 'far fa-check-square', value: '', required: false, input: true, split: [
        { value: 'First option', type: 'checkbox', selected: false},
        { value: 'Second option', type: 'checkbox', selected: false },
        { value: 'Third option', type: 'checkbox', selected: false },
      ]
    },
    {
      name: 'radio', label: 'Single Choice', iconCls: 'far fa-dot-circle', value: '', required: false, input: true, split: [
        { value: 'First option', type: 'radio', selected: false },
        { value: 'Second option', type: 'radio', selected: false },
        { value: 'Third option', type: 'radio', selected: false },
      ]
    },
    { name: 'select', label: 'Select Option', type: 'select', placeholder: 'Choose Option', iconCls: 'far fa-list-alt', value: 'none', required: false, input: true, split: [
      { value: 'First option', type: 'option', selected: false },
      { value: 'Second option', type: 'option', selected: false },
      { value: 'Third option', type: 'option', selected: false },
    ] },
    {
      name: 'split-text', label: 'Split Text', iconCls: 'far fa-hand-scissors', required: false, input: true, split: [
        { name: 'split-text-1', label: 'First Text', type: 'text', placeholder: 'First Text', value: '' },
        { name: 'split-text-2', label: 'Last Text', type: 'text', placeholder: 'Last Text', value: '' },
      ]
    },
    { name: 'number', label: 'Number', type: 'number', placeholder: 'Number', iconCls: 'fas fa-hashtag', value: '', required: false, input: true },
    { name: 'button', text: 'Submit', type: 'submit', iconCls: 'far fa-paper-plane' },
  ];
  formEleTypes: any = {};
  formEleTypesObj: Array<any> = [
    // form
    {
      name: 'form',
      iconCls: 'fab fa-wpforms'
    },
    // form
    // heading
    {
      name: 'heading',
      size: 28,
      iconCls: 'fas fa-heading'
    },
    // heading
    // text
    {
      name: 'text',
      size: 16,
      iconCls: 'fas fa-paragraph'
    },
    // text
    // image
    { name: 'image', src: '', iconCls: 'far fa-image' },
    // image
    // divider
    { name: 'divider', iconCls: 'fas fa-grip-lines' },
    // divider
    // label
    {
      name: 'label',
      size: 15,
      iconCls: 'fas fa-font'
    },
    // label
    // option
    {
      name: 'option',
      size: 14,
      iconCls: 'far fa-dot-circle'
    },
    // option
    // input
    {
      name: 'input',
      size: 14,
      iconCls: 'fas fa-font'
    },
    // input
    // button
    { name: 'button', size: 14, btntype: 'regular', text: 'Read More', subtext: '', subfont_size: '80%', link: '#no-link', target: '_self', iconCls: 'fas fa-toggle-off' },
    // button
  ];
  selEle: any = {};
  formField: any = [];
  formSession:any = {undo: 0, redo: 0}
  formSessionArr:any = [];
  formStyleSessionArr:any = [];
  initial:boolean = true;
  formSaved:boolean = true;
  formStyle = {desktop:'', tablet_h:'', tablet_v:'', mobile:'', hover: ''};
  currentScrWdth:any;
  submission = {
    user_id: '',
    form_id: '',
    email: '',
    json: '',
  };
  ansjson:any = {};
  preview:boolean = false;

  constructor(
    private _email: EmailService,
    private _file: FileUploadService,
    private _general: GeneralService,
    public _element: ElementService) { 
  }

  formSubmit() {
    return new Promise((resolve, reject)=>{
      var json = this.formField.filter((ff:any)=>{if(ff.input) return ff;});
      this.submission.json = this._general.encodeJSON(json);
      this._file.saveform_subm(this.submission).subscribe((resp:any)=>{
        if(this.form.emailenabled) {
          var maildata = {
            tomailid: this.submission.email, 
            frommailid: this.form.emailfrom+'@keasolution.com', 
            subject: this.form.emailsubject, 
            html: this.form.emailmessage};
          this._email.sendmail(maildata).subscribe((mailresp:any)=>{
            resolve(resp);
          })
        }
        else resolve(resp);
      })
    })
  }

  valchng(fe:any, i:number) {
    var value:boolean = !fe.split[i].selected;
    if(fe.name == 'radio') {
      var temp = JSON.stringify(fe.split);
      temp = temp.replace(/"selected":true/g, '"selected":false');
      fe.split = JSON.parse(temp);
      value = true;
    }
    fe.split[i].selected = value;
    if(fe.name == 'checkbox') {
        var tempVal = fe.split.filter((v:any)=>{
          if(v.selected) return v.value;
        });
        fe.value = tempVal.map((v:any)=> v.value).join(', ');
    }
    else fe.value = fe.split[i].value;
    this.inpAns(fe);
  }

  inpAns(data:any) {
    this.ansjson[data.id] = data;
    if(data.primary) this.submission.email = data.value?.toLowerCase();
  }

  checkFields() {
    return new Promise((resolve, reject)=>{
      var anslen = 0;
      var ansVal = Object.values(this.ansjson);
      if(ansVal.length == 0) resolve(false);
      for(var i = 0; i < ansVal.length; i++) {
        var ans:any = ansVal[i];
        if(ans.required) {
          if(ans.name == 'select') ans.error = (ans.value === 'none');
          else {
            var temp = JSON.stringify(ans);
            if(temp.search(/"type":"select"/g) != -1) ans.error = (temp.search(/"value":"none"/g) != -1);
            else ans.error = (temp.search(/"value":""/g) != -1);
          }
        }
        if(ans.name == 'email') ans.invalid = ans.value ? !this.validateEmail(ans.value) : false;
        if(ans.error == true || ans.invalid) resolve(false);
        if(ansVal.length-1 == anslen) resolve(true);
        anslen++;
      }
    })
  }

  validateEmail(value:any) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
  }

  createFields() {
    this.formEleTypesObj.forEach(e=>{
      if(!this.formEleTypes[e.name]) {
        e.form = true;
        this.formEleTypes[e.name] = this._element.addElement(e);
      }
    })
  }

  formbypath(obj:any) {
    return new Promise((resolve, reject)=>{
      if(!this.preview)
      this._file.formbypath(obj).subscribe((resp:any)=>{
        this.setForm(resp).then((data:any)=>{
          resolve(data);
        });
      })
      else resolve(this.form);
    })
  }

  getForm(uniqueid:string) {
    return new Promise((resolve, reject)=>{
      this._file.getform(uniqueid).subscribe((resp:any)=>{
        this.setForm(resp).then(data=>{
          this.createFields();
          resolve(data);
        });
      })
    })
  }

  setForm(resp:any) {
    return new Promise((resolve, reject)=>{
      if(resp.data[0]) {
        this.form = resp.data[0];
        if(this.form.html) this.formField = this._general.decodeJSON(this.form.html);
        else {
          var email = JSON.parse(JSON.stringify(this.formEle[6]));
          email.primary = true;
          this.addField(email, 0);
          var button = JSON.parse(JSON.stringify(this.formEle[this.formEle.length-1]));
          this.addField(button, 1);
        }
        if(this.form.style) this.formEleTypes = this._general.decodeJSON(this.form.style);
        if(this.form.appendstyle) this.form.appendstyle = this._general.decodeJSON(this.form.appendstyle);
        if(!this.form.emailsubject) this.form.emailsubject = 'Thankyou';
        if(!this.form.emailmessage) this.form.emailmessage = '<p>Your form has been submitted successfully</p>';
      }
      this.setEmailFrom();
      resolve(this.form);
    })
  }

  setEmailFrom() {
    if(!this.form.emailfrom) this.form.emailfrom = 'info';
  }

  updateForm() {
    return new Promise((resolve, reject)=>{
      this.setFormStyle(this.formEleTypes).then(style=>{
        this.form.html = this._general.encodeJSON(this.formField);
        this.form.style = this._general.encodeJSON(this.formEleTypes);
        this.form.appendstyle = this._general.encodeJSON(style);
        this._file.updateform(this.form).subscribe((resp:any)=>{
          resolve(resp);
          this.getForm(this.form.uniqueid);
        })
      });
    })
  }

  setFormStyle(ele:any) {
    return new Promise((resolve, reject)=>{
      var loop = 0;
      Object.values(ele).forEach((e:any)=>{
        var style = JSON.parse(JSON.stringify(e.content.style));
        var selector = e.content.name == 'form' ? '#kb-form-'+this.form.uniqueid : '#kb-form-'+this.form.uniqueid+' .kb-form-'+e.content.name;
        this.formStyle.desktop += selector +'{'+Object.entries(style.desktop).map(([a, b]) => `${a}:${b}`).join(';')+';}';
        if(!this._general.isObjEmpty(e.content.style.tablet_h)) this.formStyle.tablet_h += selector +'{'+Object.entries(style.tablet_h).map(([a, b]) => `${a}:${b}`).join(';')+';}';
        if(!this._general.isObjEmpty(e.content.style.tablet_v)) this.formStyle.tablet_v += selector +'{'+Object.entries(style.tablet_v).map(([a, b]) => `${a}:${b}`).join(';')+';}';
        if(!this._general.isObjEmpty(e.content.style.mobile)) this.formStyle.mobile += selector +'{'+Object.entries(style.mobile).map(([a, b]) => `${a}:${b}`).join(';')+';}';
        if(!this._general.isObjEmpty(e.content.style.hover)) this.formStyle.hover += selector +':hover{'+Object.entries(style.hover).map(([a, b]) => `${a}:${b}`).join(';')+';}';
        if(Object.values(ele).length-1 == loop) {
          var querry = '@media only screen and (max-width:';
          var data = this.formStyle.desktop + this.formStyle.hover +
          querry + '1024px) and (min-width:769px){'+this.formStyle.tablet_h+'}' +
          querry + '768px) and (min-width:426px){'+this.formStyle.tablet_v+'}' +
          querry + '426px){'+this.formStyle.mobile+'}';
          resolve(data);
        }
        loop++;
      })
    })
  }

  addInput(split:any, i:number) {
    var obj:any = new Object();
    var len =  split.length;
    if(split[0].type == 'text') obj = { name: 'new-field-'+len, label: 'New field '+len, type: 'text', placeholder: 'New Field '+len };
    else obj = { value: 'New option '+len, type: split[0].type};
    obj.id = this._general.createBlockId(obj);
    split.splice(i+1, 0, obj);
    this.saveFormSession();
  }

  removeField(arr: any, i: number) {
    arr.splice(i, 1);
    this.saveFormSession();
  }

  addField(field: any, index: number) {
    var tempObj = JSON.parse(JSON.stringify(field));
    if(!tempObj.type) tempObj.type = tempObj.name;
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj?.split?.forEach((split: any) => {
      if(!split?.subsplit) split.id = this._general.createBlockId(split);
      split?.subsplit?.forEach((subsplit: any) => {
        subsplit.id = this._general.createBlockId(subsplit);
      })
    })
    delete tempObj.iconCls;
    this.formField.splice(index, 0, tempObj);
    this.saveFormSession();
  }

  onSelChng(i:any, val:boolean) {
    if(this.selEle.name != 'checkbox') {
      var temp = JSON.stringify(this.selEle.split);
      temp = temp.replace(/"selected":true/g, '"selected":false');
      this.selEle.split = JSON.parse(temp);
      this.selEle.split[i].selected = val;
    }
  }

  justifyContent(en:any) {
    if(this.formEleTypes[en]) {
      var blockparam = this.formEleTypes[en]?.item_alignment;
      if (parseInt(this._general.respDevices['mobile'].width.split('px')[0]) >= this.currentScrWdth && blockparam.mobile != 'auto') {
        return blockparam.mobile;
      }
      else if (parseInt(this._general.respDevices['tablet-v'].width.split('px')[0]) >= this.currentScrWdth && blockparam.tablet_v != 'auto') {
        return blockparam.tablet_v;
      }
      else if (parseInt(this._general.respDevices['tablet-h'].width.split('px')[0]) >= this.currentScrWdth && blockparam.tablet_h != 'auto') {
        return blockparam.tablet_h;
      }
      else {
        return blockparam.desktop;
      }
    }
    else return {}
  }

  saveFormSession() {
    var sessionStr = JSON.stringify(this.formField).replace(/"setting":true/g, '"setting":false');
    if(this.formSessionArr[this.formSessionArr.length-1] != sessionStr && this.formSessionArr[this.formSession.undo] != sessionStr) {
      this.formSessionArr.push(sessionStr);
      this.formSession.undo = this.formSessionArr.length-1; 
      this.formSession.redo = this.formSessionArr.length; 
      if(!this.initial) this.formSaved = false;
      else this.initial = false;
    }
  }

  undo() {
    var sObj = this.formSessionArr[this.formSession.undo-1];
    if(sObj) {
      this.formField = JSON.parse(sObj);
      this.formSession.undo--;
      this.formSession.redo--;
    }
  }

  redo() {
    var sObj = this.formSessionArr[this.formSession.redo];
    if(sObj) {
      this.formField = JSON.parse(sObj);
      this.formSession.undo++;
      this.formSession.redo++;
    }
  }
}
