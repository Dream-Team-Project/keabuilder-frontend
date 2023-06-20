import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';
import { GeneralService } from '../_builder/general.service';
import { ElementService } from '../_builder/element.service';
import { FormFieldsService } from '../_crm/field.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

   // apis
  searchformqueryApi = './api/searchformquery';
  getformApi = "./api/getform";
  allformsApi = "./api/allforms";
  saveformApi = "./api/saveform";
  updateformApi = "./api/updateform";
  duplicateformApi = './api/duplicateform';
  deleteformApi = "./api/deleteform";
  uuid:any = '';
   // apis

  countries:any = [{ name: 'United States' }, { name: 'Canada' }, { name: 'United Kingdom' }, { name: 'Ireland' }, { name: 'Australia' }, { name: 'New Zealand' }, { name: 'Afghanistan' }, { name: 'Aland Islands' }, { name: 'Albania' }, { name: 'Algeria' }, { name: 'American Samoa' }, { name: 'Andorra' }, { name: 'Angola' }, { name: 'Anguilla' }, { name: 'Antarctica' }, { name: 'Antigua and Barbuda' }, { name: 'Argentina' }, { name: 'Armenia' }, { name: 'Aruba' }, { name: 'Australia' }, { name: 'Austria' }, { name: 'Azerbaijan' }, { name: 'Bahamas' }, { name: 'Bahrain' }, { name: 'Bangladesh' }, { name: 'Barbados' }, { name: 'Belarus' }, { name: 'Belgium' }, { name: 'Belize' }, { name: 'Benin' }, { name: 'Bermuda' }, { name: 'Bhutan' }, { name: 'Bolivia' }, { name: 'Bonaire, Saint Eustatius and Saba ' }, { name: 'Bosnia and Herzegovina' }, { name: 'Botswana' }, { name: 'Bouvet Island' }, { name: 'Brazil' }, { name: 'British Indian Ocean Territory' }, { name: 'British Virgin Islands' }, { name: 'Brunei' }, { name: 'Bulgaria' }, { name: 'Burkina Faso' }, { name: 'Burundi' }, { name: 'Cambodia' }, { name: 'Cameroon' }, { name: 'Canada' }, { name: 'Cape Verde' }, { name: 'Cayman Islands' }, { name: 'Central African Republic' }, { name: 'Chad' }, { name: 'Chile' }, { name: 'China' }, { name: 'Christmas Island' }, { name: 'Cocos Islands' }, { name: 'Colombia' }, { name: 'Comoros' }, { name: 'Cook Islands' }, { name: 'Costa Rica' }, { name: 'Croatia' }, { name: 'Cuba' }, { name: 'Curacao' }, { name: 'Cyprus' }, { name: 'Czech Republic' }, { name: 'Democratic Republic of the Congo' }, { name: 'Denmark' }, { name: 'Djibouti' }, { name: 'Dominica' }, { name: 'Dominican Republic' }, { name: 'East Timor' }, { name: 'Ecuador' }, { name: 'Egypt' }, { name: 'El Salvador' }, { name: 'Equatorial Guinea' }, { name: 'Eritrea' }, { name: 'Estonia' }, { name: 'Ethiopia' }, { name: 'Falkland Islands' }, { name: 'Faroe Islands' }, { name: 'Fiji' }, { name: 'Finland' }, { name: 'France' }, { name: 'French Guiana' }, { name: 'French Polynesia' }, { name: 'French Southern Territories' }, { name: 'Gabon' }, { name: 'Gambia' }, { name: 'Georgia' }, { name: 'Germany' }, { name: 'Ghana' }, { name: 'Gibraltar' }, { name: 'Greece' }, { name: 'Greenland' }, { name: 'Grenada' }, { name: 'Guadeloupe' }, { name: 'Guam' }, { name: 'Guatemala' }, { name: 'Guernsey' }, { name: 'Guinea' }, { name: 'Guinea-Bissau' }, { name: 'Guyana' }, { name: 'Haiti' }, { name: 'Heard Island and McDonald Islands' }, { name: 'Honduras' }, { name: 'Hong Kong' }, { name: 'Hungary' }, { name: 'Iceland' }, { name: 'India' }, { name: 'Indonesia' }, { name: 'Iran' }, { name: 'Iraq' }, { name: 'Ireland' }, { name: 'Isle of Man' }, { name: 'Israel' }, { name: 'Italy' }, { name: 'Ivory Coast' }, { name: 'Jamaica' }, { name: 'Japan' }, { name: 'Jersey' }, { name: 'Jordan' }, { name: 'Kazakhstan' }, { name: 'Kenya' }, { name: 'Kiribati' }, { name: 'Kosovo' }, { name: 'Kuwait' }, { name: 'Kyrgyzstan' }, { name: 'Laos' }, { name: 'Latvia' }, { name: 'Lebanon' }, { name: 'Lesotho' }, { name: 'Liberia' }, { name: 'Libya' }, { name: 'Liechtenstein' }, { name: 'Lithuania' }, { name: 'Luxembourg' }, { name: 'Macao' }, { name: 'Macedonia' }, { name: 'Madagascar' }, { name: 'Malawi' }, { name: 'Malaysia' }, { name: 'Maldives' }, { name: 'Mali' }, { name: 'Malta' }, { name: 'Marshall Islands' }, { name: 'Martinique' }, { name: 'Mauritania' }, { name: 'Mauritius' }, { name: 'Mayotte' }, { name: 'Mexico' }, { name: 'Micronesia' }, { name: 'Moldova' }, { name: 'Monaco' }, { name: 'Mongolia' }, { name: 'Montenegro' }, { name: 'Montserrat' }, { name: 'Morocco' }, { name: 'Mozambique' }, { name: 'Myanmar' }, { name: 'Namibia' }, { name: 'Nauru' }, { name: 'Nepal' }, { name: 'Netherlands' }, { name: 'New Caledonia' }, { name: 'New Zealand' }, { name: 'Nicaragua' }, { name: 'Niger' }, { name: 'Nigeria' }, { name: 'Niue' }, { name: 'Norfolk Island' }, { name: 'North Korea' }, { name: 'Northern Mariana Islands' }, { name: 'Norway' }, { name: 'Oman' }, { name: 'Pakistan' }, { name: 'Palau' }, { name: 'Palestinian Territory' }, { name: 'Panama' }, { name: 'Papua New Guinea' }, { name: 'Paraguay' }, { name: 'Peru' }, { name: 'Philippines' }, { name: 'Pitcairn' }, { name: 'Poland' }, { name: 'Portugal' }, { name: 'Puerto Rico' }, { name: 'Qatar' }, { name: 'Republic of the Congo' }, { name: 'Reunion' }, { name: 'Romania' }, { name: 'Russia' }, { name: 'Rwanda' }, { name: 'Saint Barthelemy' }, { name: 'Saint Helena' }, { name: 'Saint Kitts and Nevis' }, { name: 'Saint Lucia' }, { name: 'Saint Martin' }, { name: 'Saint Pierre and Miquelon' }, { name: 'Saint Vincent and the Grenadines' }, { name: 'Samoa' }, { name: 'San Marino' }, { name: 'Sao Tome and Principe' }, { name: 'Saudi Arabia' }, { name: 'Senegal' }, { name: 'Serbia' }, { name: 'Seychelles' }, { name: 'Sierra Leone' }, { name: 'Singapore' }, { name: 'Sint Maarten' }, { name: 'Slovakia' }, { name: 'Slovenia' }, { name: 'Solomon Islands' }, { name: 'Somalia' }, { name: 'South Africa' }, { name: 'South Georgia and the South Sandwich Islands' }, { name: 'South Korea' }, { name: 'South Sudan' }, { name: 'Spain' }, { name: 'Sri Lanka' }, { name: 'Sudan' }, { name: 'Suriname' }, { name: 'Svalbard and Jan Mayen' }, { name: 'Swaziland' }, { name: 'Sweden' }, { name: 'Switzerland' }, { name: 'Syria' }, { name: 'Taiwan' }, { name: 'Tajikistan' }, { name: 'Tanzania' }, { name: 'Thailand' }, { name: 'Togo' }, { name: 'Tokelau' }, { name: 'Tonga' }, { name: 'Trinidad and Tobago' }, { name: 'Tunisia' }, { name: 'Turkey' }, { name: 'Turkmenistan' }, { name: 'Turks and Caicos Islands' }, { name: 'Tuvalu' }, { name: 'U.S. Virgin Islands' }, { name: 'Uganda' }, { name: 'Ukraine' }, { name: 'United Arab Emirates' }, { name: 'United Kingdom' }, { name: 'United States' }, { name: 'United States Minor Outlying Islands' }, { name: 'Uruguay' }, { name: 'Uzbekistan' }, { name: 'Vanuatu' }, { name: 'Vatican' }, { name: 'Venezuela' }, { name: 'Vietnam' }, { name: 'Wallis and Futuna' }, { name: 'Western Sahara' }, { name: 'Yemen' }, { name: 'Zambia' }, { name: 'Zimb' }];
  form = {
    id: '',
    uniqueid: '',
    form_id: '',
    name: 'Form Name',
    btntxt: 'Submit',
    fields: '',
    redirection: '',
    redirenbled: false,
    emailfrom: 'info',
    emailto: '',
    emailname: '',
    emailsubject: '',
    emailmessage: '',
    emailenabled: false,
    thankyoumessage: '',
    lists:'',
    tags:'',
    style: '', 
    appendstyle: '',
  };
  thankyoumessage:string = `<h1 style="text-align: center;"><span style="font-size: 36pt;">Thank you</span></h1>
                            <p style="text-align: center;"><span style="font-size: 18pt;">The form has been submitted successfully!</span></p>`;
  formEle: any = [
    { name: 'heading', html: '<h2>Heading goes here</h2>', iconCls: 'fas fa-heading' },
    { name: 'text', html: '<p>Paragraph goes here</p>', iconCls: 'fas fa-paragraph' },
    { name: 'image', src: '', iconCls: 'far fa-image' },
    { name: 'divider', iconCls: 'fas fa-grip-lines' },
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
      size: 26,
      iconCls: 'fas fa-heading'
    },
    // heading
    // text
    {
      name: 'text',
      size: 14,
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
  formField: Array<any> = [];
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
  fields:Array<any> = [];
  fieldTypes:Array<any> = this._formfieldService.fieldTypes;

  constructor(
    private http: HttpClient, 
    private tokenStorage: TokenStorageService,
    private _general: GeneralService,
    public _element: ElementService,
    private _formfieldService: FormFieldsService) { 
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  searchFields(search: any, sort: any, filter: any) {
    var obj = {
      search: search.value,
      sort: sort.value,
      filter: filter.value
    }
    this._formfieldService.searchFieldsquery(obj).subscribe((resp:any)=>{
      console.log(resp);
      this.fields = resp.data;
    });
  }  

  fetchFields() {
    return new Promise((resolve, reject)=>{
      this._formfieldService.fetchformfields().subscribe((resp:any)=>{
        if(resp?.data) this.fields = resp.data;
        resolve(resp);
      })
    })
  }

  createFields() {
    this.formEleTypesObj.forEach(e=>{
      if(!this.formEleTypes[e.name]) {
        e.form = true;
        this.formEleTypes[e.name] = this._element.addElement(e);
      }
    })
  }

  getForm(uniqueid:any) {
    return new Promise((resolve, reject)=>{
      this.getform(uniqueid).subscribe((resp:any)=>{
        this.fetchFields().then(()=>{
          this.setForm(resp).then(data=>{
            this.createFields();
            resolve(data);
          });
        });
      })
    })
  }

  setForm(resp:any) {
    return new Promise((resolve, reject)=>{
      if(resp.data[0]) {
        this.form = resp.data[0];
        this.formField = [];
        var index = 0;
        this.form.fields.split(',').forEach((fval:any)=>{
          var tempfield:any;
          if(isNaN(fval)) tempfield = [this._general.decodeJSON(fval)];
          else tempfield = this.fields.filter((val:any)=> val.id == fval);
          if(tempfield.length != 0) this.addField(tempfield[0], index);
          index++;
        })
        if(this.form.style) this.formEleTypes = this._general.decodeJSON(this.form.style);
        if(this.form.appendstyle) this.form.appendstyle = this._general.decodeJSON(this.form.appendstyle);
        if(!this.form.emailsubject) this.form.emailsubject = 'Thankyou';
        if(!this.form.emailmessage) this.form.emailmessage = '<p>Your form has been submitted successfully</p>';
      } 
      // if(!this.form.emailfrom) this.form.emailfrom = 'info';
      resolve(this.form);
    })
  }

  updateForm() {
    return new Promise((resolve, reject)=>{
      this.form.lists.toString();
      this.form.tags.toString();
      var ffArr:Array<any> = [];
      this.formField.forEach((ff:any)=>{
        if(ff.field_tag) ffArr.push(ff.id);
        else ffArr.push(this._general.encodeJSON(ff));
      })
      this.form.fields = ffArr?.join(',');
      this.setFormStyle(this.formEleTypes).then(style=>{
        this.form.style = this._general.encodeJSON(this.formEleTypes);
        this.form.appendstyle = this._general.encodeJSON(style);
        this.form.thankyoumessage = this.getThankyouMsg();
        this.updateform(this.form).subscribe((resp:any)=>{
          resolve(resp);
          this.getForm(this.form.uniqueid);
        })
      });
    })
  }

  getThankyouMsg() {
    return this.form.thankyoumessage ? this.form.thankyoumessage : this.thankyoumessage;
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

  removeField(arr: any, i: number) {
    arr.splice(i, 1);
    this.saveFormSession();
  }

  addField(field: any, index: number) {
    var tempObj = JSON.parse(JSON.stringify(field));
    if(field.field_tag) {
      tempObj.options = JSON.parse(tempObj.options);
    }
    else {
      tempObj.type = tempObj.name;
      tempObj.id = this._general.makeid(20);
      delete tempObj.iconCls;
    }
    this.formField.splice(index, 0, tempObj);
    this.saveFormSession();
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

  // ṣession

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

  // apis

  fetchforms():Observable<any> {
    return this.http.get(this.allformsApi+'/'+this.uuid);
  }

  getform(uniqueid:any):Observable<any> {
    return this.http.get(this.getformApi+'/'+this.uuid+'/'+uniqueid);
  }

  saveform(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.saveformApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  searchformquery(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.searchformqueryApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  duplicateform(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.duplicateformApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  updateform(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.updateformApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  deleteform(id:any):Observable<any> {
    return this.http.delete(this.deleteformApi+'/'+id)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

   // apis

}
