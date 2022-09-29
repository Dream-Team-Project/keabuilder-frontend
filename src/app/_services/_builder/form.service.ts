import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  form:any = {
    id: '',
    name: 'Form Name',
  }
  formEle:any = [
    {name:'heading', content: 'Heading', icls: 'fas fa-heading'},
    {name:'paragraph', content: 'Paragraph', icls: 'fas fa-paragraph'},
    {name:'divider', icls:'fas fa-grip-lines'}, 
    {name:'full-name', label: 'Full name', icls: 'far fa-user', required: true, split: [
      {name:'first-name', label:'First name', type:'text', placeholder: 'first name'},
      {name:'last-name', label:'Last name',  type:'text', placeholder: 'last name'},
    ]},
    {name:'email', label:'Email', type:'email', placeholder: 'email address', icls: 'fas fa-envelope-open-text', required: true},
    {name:'phone', label: 'Phone', type:'phone', placeholder: 'phone number', icls: 'fas fa-phone', required: false},
    {name:'address', label: 'Address', icls: 'fas fa-address-card', required: true, split: [
      {name:'street-address', label:'Street Address', type:'textarea', placeholder: 'Street Address'},
      {subsplit: [
        {name:'city', label:'City', type:'text', placeholder: 'City'},
        {name:'state', label:'State', type:'text', placeholder: 'State / Province'},
      ]},
      {subsplit: [
        {name:'postal-code', label:'Postal', type:'text', placeholder: 'Postal / Zip Code'},
        {name:'country', label:'Country', type:'text', placeholder: 'Country', options: [
          {name:'United States'},{name:'Canada'},{name:'United Kingdom'},{name:'Ireland'},{name:'Australia'},{name:'New Zealand'},{name:'Afghanistan'},{name:'Aland Islands'},{name:'Albania'},{name:'Algeria'},{name:'American Samoa'},{name:'Andorra'},{name:'Angola'},{name:'Anguilla'},{name:'Antarctica'},{name:'Antigua and Barbuda'},{name:'Argentina'},{name:'Armenia'},{name:'Aruba'},{name:'Australia'},{name:'Austria'},{name:'Azerbaijan'},{name:'Bahamas'},{name:'Bahrain'},{name:'Bangladesh'},{name:'Barbados'},{name:'Belarus'},{name:'Belgium'},{name:'Belize'},{name:'Benin'},{name:'Bermuda'},{name:'Bhutan'},{name:'Bolivia'},{name:'Bonaire, Saint Eustatius and Saba '},{name:'Bosnia and Herzegovina'},{name:'Botswana'},{name:'Bouvet Island'},{name:'Brazil'},{name:'British Indian Ocean Territory'},{name:'British Virgin Islands'},{name:'Brunei'},{name:'Bulgaria'},{name:'Burkina Faso'},{name:'Burundi'},{name:'Cambodia'},{name:'Cameroon'},{name:'Canada'},{name:'Cape Verde'},{name:'Cayman Islands'},{name:'Central African Republic'},{name:'Chad'},{name:'Chile'},{name:'China'},{name:'Christmas Island'},{name:'Cocos Islands'},{name:'Colombia'},{name:'Comoros'},{name:'Cook Islands'},{name:'Costa Rica'},{name:'Croatia'},{name:'Cuba'},{name:'Curacao'},{name:'Cyprus'},{name:'Czech Republic'},{name:'Democratic Republic of the Congo'},{name:'Denmark'},{name:'Djibouti'},{name:'Dominica'},{name:'Dominican Republic'},{name:'East Timor'},{name:'Ecuador'},{name:'Egypt'},{name:'El Salvador'},{name:'Equatorial Guinea'},{name:'Eritrea'},{name:'Estonia'},{name:'Ethiopia'},{name:'Falkland Islands'},{name:'Faroe Islands'},{name:'Fiji'},{name:'Finland'},{name:'France'},{name:'French Guiana'},{name:'French Polynesia'},{name:'French Southern Territories'},{name:'Gabon'},{name:'Gambia'},{name:'Georgia'},{name:'Germany'},{name:'Ghana'},{name:'Gibraltar'},{name:'Greece'},{name:'Greenland'},{name:'Grenada'},{name:'Guadeloupe'},{name:'Guam'},{name:'Guatemala'},{name:'Guernsey'},{name:'Guinea'},{name:'Guinea-Bissau'},{name:'Guyana'},{name:'Haiti'},{name:'Heard Island and McDonald Islands'},{name:'Honduras'},{name:'Hong Kong'},{name:'Hungary'},{name:'Iceland'},{name:'India'},{name:'Indonesia'},{name:'Iran'},{name:'Iraq'},{name:'Ireland'},{name:'Isle of Man'},{name:'Israel'},{name:'Italy'},{name:'Ivory Coast'},{name:'Jamaica'},{name:'Japan'},{name:'Jersey'},{name:'Jordan'},{name:'Kazakhstan'},{name:'Kenya'},{name:'Kiribati'},{name:'Kosovo'},{name:'Kuwait'},{name:'Kyrgyzstan'},{name:'Laos'},{name:'Latvia'},{name:'Lebanon'},{name:'Lesotho'},{name:'Liberia'},{name:'Libya'},{name:'Liechtenstein'},{name:'Lithuania'},{name:'Luxembourg'},{name:'Macao'},{name:'Macedonia'},{name:'Madagascar'},{name:'Malawi'},{name:'Malaysia'},{name:'Maldives'},{name:'Mali'},{name:'Malta'},{name:'Marshall Islands'},{name:'Martinique'},{name:'Mauritania'},{name:'Mauritius'},{name:'Mayotte'},{name:'Mexico'},{name:'Micronesia'},{name:'Moldova'},{name:'Monaco'},{name:'Mongolia'},{name:'Montenegro'},{name:'Montserrat'},{name:'Morocco'},{name:'Mozambique'},{name:'Myanmar'},{name:'Namibia'},{name:'Nauru'},{name:'Nepal'},{name:'Netherlands'},{name:'New Caledonia'},{name:'New Zealand'},{name:'Nicaragua'},{name:'Niger'},{name:'Nigeria'},{name:'Niue'},{name:'Norfolk Island'},{name:'North Korea'},{name:'Northern Mariana Islands'},{name:'Norway'},{name:'Oman'},{name:'Pakistan'},{name:'Palau'},{name:'Palestinian Territory'},{name:'Panama'},{name:'Papua New Guinea'},{name:'Paraguay'},{name:'Peru'},{name:'Philippines'},{name:'Pitcairn'},{name:'Poland'},{name:'Portugal'},{name:'Puerto Rico'},{name:'Qatar'},{name:'Republic of the Congo'},{name:'Reunion'},{name:'Romania'},{name:'Russia'},{name:'Rwanda'},{name:'Saint Barthelemy'},{name:'Saint Helena'},{name:'Saint Kitts and Nevis'},{name:'Saint Lucia'},{name:'Saint Martin'},{name:'Saint Pierre and Miquelon'},{name:'Saint Vincent and the Grenadines'},{name:'Samoa'},{name:'San Marino'},{name:'Sao Tome and Principe'},{name:'Saudi Arabia'},{name:'Senegal'},{name:'Serbia'},{name:'Seychelles'},{name:'Sierra Leone'},{name:'Singapore'},{name:'Sint Maarten'},{name:'Slovakia'},{name:'Slovenia'},{name:'Solomon Islands'},{name:'Somalia'},{name:'South Africa'},{name:'South Georgia and the South Sandwich Islands'},{name:'South Korea'},{name:'South Sudan'},{name:'Spain'},{name:'Sri Lanka'},{name:'Sudan'},{name:'Suriname'},{name:'Svalbard and Jan Mayen'},{name:'Swaziland'},{name:'Sweden'},{name:'Switzerland'},{name:'Syria'},{name:'Taiwan'},{name:'Tajikistan'},{name:'Tanzania'},{name:'Thailand'},{name:'Togo'},{name:'Tokelau'},{name:'Tonga'},{name:'Trinidad and Tobago'},{name:'Tunisia'},{name:'Turkey'},{name:'Turkmenistan'},{name:'Turks and Caicos Islands'},{name:'Tuvalu'},{name:'U.S. Virgin Islands'},{name:'Uganda'},{name:'Ukraine'},{name:'United Arab Emirates'},{name:'United Kingdom'},{name:'United States'},{name:'United States Minor Outlying Islands'},{name:'Uruguay'},{name:'Uzbekistan'},{name:'Vanuatu'},{name:'Vatican'},{name:'Venezuela'},{name:'Vietnam'},{name:'Wallis and Futuna'},{name:'Western Sahara'},{name:'Yemen'},{name:'Zambia'},{name:'Zimb'}
        ]},
      ]}
    ]},
    {name:'short-text', label: 'Short Text', type:'text', placeholder: 'short text', icls: 'fas fa-text-width', required: false},
    {name:'long-text', label:'Long Text', type:'textarea', placeholder: 'long text', icls: 'fas fa-text-height', required: false},
    {name:'number', label:'Number', type:'number', placeholder: 'number', icls: 'fas fa-hashtag', required: false},
    {name:'single-choice', label:'Single choice', icls: 'far fa-dot-circle', required: false, split: [
      {name:'option', label: 'first option', type:'radio'},
      {name:'option', label: 'second option', type:'radio'},
      {name:'option', label: 'third option', type:'radio'},
    ]},
    {name:'multiple-choice', label:'Multiple choice', icls: 'far fa-check-square', required: false, split: [
      {name:'option', label: 'first option', type:'checkbox'},
      {name:'option', label: 'second option', type:'checkbox'},
      {name:'option', label: 'third option', type:'checkbox'},
    ]},
    {name:'submit', label:'Submit', type:'submit', icls:'far fa-paper-plane'},
  ];
  formOpt:any = [];


  constructor(public _general: GeneralService) { }

  saveForm() {

  }

  createBlockId(temp: any):any {
    temp.id = Math.floor(Math.random() * 10000000000);
    if(this._general.allBlocksIds.includes(temp.id)) {
      return this.createBlockId(temp);
    }
    this._general.allBlocksIds.push(temp.id);
    return 'kb-'+temp.name+'-'+temp.id;
  }

  deleteField(index:any) {
    this.formOpt.splice(index, 1);
  }
}
