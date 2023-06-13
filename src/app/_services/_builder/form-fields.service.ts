import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { TokenStorageService } from '../token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormFieldsService {
  user_id:any = '';
countries:any = [{name: 'none'}, { name: 'United States' }, { name: 'Canada' }, { name: 'United Kingdom' }, { name: 'Ireland' }, { name: 'Australia' }, { name: 'New Zealand' }, { name: 'Afghanistan' }, { name: 'Aland Islands' }, { name: 'Albania' }, { name: 'Algeria' }, { name: 'American Samoa' }, { name: 'Andorra' }, { name: 'Angola' }, { name: 'Anguilla' }, { name: 'Antarctica' }, { name: 'Antigua and Barbuda' }, { name: 'Argentina' }, { name: 'Armenia' }, { name: 'Aruba' }, { name: 'Australia' }, { name: 'Austria' }, { name: 'Azerbaijan' }, { name: 'Bahamas' }, { name: 'Bahrain' }, { name: 'Bangladesh' }, { name: 'Barbados' }, { name: 'Belarus' }, { name: 'Belgium' }, { name: 'Belize' }, { name: 'Benin' }, { name: 'Bermuda' }, { name: 'Bhutan' }, { name: 'Bolivia' }, { name: 'Bonaire, Saint Eustatius and Saba ' }, { name: 'Bosnia and Herzegovina' }, { name: 'Botswana' }, { name: 'Bouvet Island' }, { name: 'Brazil' }, { name: 'British Indian Ocean Territory' }, { name: 'British Virgin Islands' }, { name: 'Brunei' }, { name: 'Bulgaria' }, { name: 'Burkina Faso' }, { name: 'Burundi' }, { name: 'Cambodia' }, { name: 'Cameroon' }, { name: 'Canada' }, { name: 'Cape Verde' }, { name: 'Cayman Islands' }, { name: 'Central African Republic' }, { name: 'Chad' }, { name: 'Chile' }, { name: 'China' }, { name: 'Christmas Island' }, { name: 'Cocos Islands' }, { name: 'Colombia' }, { name: 'Comoros' }, { name: 'Cook Islands' }, { name: 'Costa Rica' }, { name: 'Croatia' }, { name: 'Cuba' }, { name: 'Curacao' }, { name: 'Cyprus' }, { name: 'Czech Republic' }, { name: 'Democratic Republic of the Congo' }, { name: 'Denmark' }, { name: 'Djibouti' }, { name: 'Dominica' }, { name: 'Dominican Republic' }, { name: 'East Timor' }, { name: 'Ecuador' }, { name: 'Egypt' }, { name: 'El Salvador' }, { name: 'Equatorial Guinea' }, { name: 'Eritrea' }, { name: 'Estonia' }, { name: 'Ethiopia' }, { name: 'Falkland Islands' }, { name: 'Faroe Islands' }, { name: 'Fiji' }, { name: 'Finland' }, { name: 'France' }, { name: 'French Guiana' }, { name: 'French Polynesia' }, { name: 'French Southern Territories' }, { name: 'Gabon' }, { name: 'Gambia' }, { name: 'Georgia' }, { name: 'Germany' }, { name: 'Ghana' }, { name: 'Gibraltar' }, { name: 'Greece' }, { name: 'Greenland' }, { name: 'Grenada' }, { name: 'Guadeloupe' }, { name: 'Guam' }, { name: 'Guatemala' }, { name: 'Guernsey' }, { name: 'Guinea' }, { name: 'Guinea-Bissau' }, { name: 'Guyana' }, { name: 'Haiti' }, { name: 'Heard Island and McDonald Islands' }, { name: 'Honduras' }, { name: 'Hong Kong' }, { name: 'Hungary' }, { name: 'Iceland' }, { name: 'India' }, { name: 'Indonesia' }, { name: 'Iran' }, { name: 'Iraq' }, { name: 'Ireland' }, { name: 'Isle of Man' }, { name: 'Israel' }, { name: 'Italy' }, { name: 'Ivory Coast' }, { name: 'Jamaica' }, { name: 'Japan' }, { name: 'Jersey' }, { name: 'Jordan' }, { name: 'Kazakhstan' }, { name: 'Kenya' }, { name: 'Kiribati' }, { name: 'Kosovo' }, { name: 'Kuwait' }, { name: 'Kyrgyzstan' }, { name: 'Laos' }, { name: 'Latvia' }, { name: 'Lebanon' }, { name: 'Lesotho' }, { name: 'Liberia' }, { name: 'Libya' }, { name: 'Liechtenstein' }, { name: 'Lithuania' }, { name: 'Luxembourg' }, { name: 'Macao' }, { name: 'Macedonia' }, { name: 'Madagascar' }, { name: 'Malawi' }, { name: 'Malaysia' }, { name: 'Maldives' }, { name: 'Mali' }, { name: 'Malta' }, { name: 'Marshall Islands' }, { name: 'Martinique' }, { name: 'Mauritania' }, { name: 'Mauritius' }, { name: 'Mayotte' }, { name: 'Mexico' }, { name: 'Micronesia' }, { name: 'Moldova' }, { name: 'Monaco' }, { name: 'Mongolia' }, { name: 'Montenegro' }, { name: 'Montserrat' }, { name: 'Morocco' }, { name: 'Mozambique' }, { name: 'Myanmar' }, { name: 'Namibia' }, { name: 'Nauru' }, { name: 'Nepal' }, { name: 'Netherlands' }, { name: 'New Caledonia' }, { name: 'New Zealand' }, { name: 'Nicaragua' }, { name: 'Niger' }, { name: 'Nigeria' }, { name: 'Niue' }, { name: 'Norfolk Island' }, { name: 'North Korea' }, { name: 'Northern Mariana Islands' }, { name: 'Norway' }, { name: 'Oman' }, { name: 'Pakistan' }, { name: 'Palau' }, { name: 'Palestinian Territory' }, { name: 'Panama' }, { name: 'Papua New Guinea' }, { name: 'Paraguay' }, { name: 'Peru' }, { name: 'Philippines' }, { name: 'Pitcairn' }, { name: 'Poland' }, { name: 'Portugal' }, { name: 'Puerto Rico' }, { name: 'Qatar' }, { name: 'Republic of the Congo' }, { name: 'Reunion' }, { name: 'Romania' }, { name: 'Russia' }, { name: 'Rwanda' }, { name: 'Saint Barthelemy' }, { name: 'Saint Helena' }, { name: 'Saint Kitts and Nevis' }, { name: 'Saint Lucia' }, { name: 'Saint Martin' }, { name: 'Saint Pierre and Miquelon' }, { name: 'Saint Vincent and the Grenadines' }, { name: 'Samoa' }, { name: 'San Marino' }, { name: 'Sao Tome and Principe' }, { name: 'Saudi Arabia' }, { name: 'Senegal' }, { name: 'Serbia' }, { name: 'Seychelles' }, { name: 'Sierra Leone' }, { name: 'Singapore' }, { name: 'Sint Maarten' }, { name: 'Slovakia' }, { name: 'Slovenia' }, { name: 'Solomon Islands' }, { name: 'Somalia' }, { name: 'South Africa' }, { name: 'South Georgia and the South Sandwich Islands' }, { name: 'South Korea' }, { name: 'South Sudan' }, { name: 'Spain' }, { name: 'Sri Lanka' }, { name: 'Sudan' }, { name: 'Suriname' }, { name: 'Svalbard and Jan Mayen' }, { name: 'Swaziland' }, { name: 'Sweden' }, { name: 'Switzerland' }, { name: 'Syria' }, { name: 'Taiwan' }, { name: 'Tajikistan' }, { name: 'Tanzania' }, { name: 'Thailand' }, { name: 'Togo' }, { name: 'Tokelau' }, { name: 'Tonga' }, { name: 'Trinidad and Tobago' }, { name: 'Tunisia' }, { name: 'Turkey' }, { name: 'Turkmenistan' }, { name: 'Turks and Caicos Islands' }, { name: 'Tuvalu' }, { name: 'U.S. Virgin Islands' }, { name: 'Uganda' }, { name: 'Ukraine' }, { name: 'United Arab Emirates' }, { name: 'United Kingdom' }, { name: 'United States' }, { name: 'United States Minor Outlying Islands' }, { name: 'Uruguay' }, { name: 'Uzbekistan' }, { name: 'Vanuatu' }, { name: 'Vatican' }, { name: 'Venezuela' }, { name: 'Vietnam' }, { name: 'Wallis and Futuna' }, { name: 'Western Sahara' }, { name: 'Yemen' }, { name: 'Zambia' }, { name: 'Zimb' }];
  fieldTypes:Array<any> = [
    {
      name: 'name', label: 'Name', icon: '<i class="far fa-user"></i>', required: true, split: [
        { name: 'first-name', type: 'text', placeholder: 'First Name', value: '' },
        { name: 'last-name', type: 'text', placeholder: 'Last Name', value: '' },
      ]
    },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Email Address', icon: '<i class="fas fa-envelope"></i>', value: '', required: true},
    { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'Phone Number', icon: '<i class="fas fa-phone"></i>', value: '', required: false},
    {
      name: 'address', label: 'Address', icon: '<i class="fas fa-address-card"></i>', required: true, split: [
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
    { name: 'short-text', label: 'Short Text', type: 'text', placeholder: 'Short Text', icon: '<i class="fas fa-text-width"></i>', value: '', required: false},
    { name: 'long-text', label: 'Long Text', type: 'textarea', placeholder: 'Long Text', icon: '<i class="fas fa-text-height"></i>', value: '', required: false},
    {
      name: 'checkbox', label: 'Multiple Choice', icon: '<i class="far fa-check-square"></i>', value: '', required: false, split: [
        { value: 'First option', type: 'checkbox', selected: false},
        { value: 'Second option', type: 'checkbox', selected: false },
        { value: 'Third option', type: 'checkbox', selected: false },
      ]
    },
    {
      name: 'radio', label: 'Single Choice', icon: '<i class="far fa-dot-circle"></i>', value: '', required: false, split: [
        { value: 'First option', type: 'radio', selected: false },
        { value: 'Second option', type: 'radio', selected: false },
        { value: 'Third option', type: 'radio', selected: false },
      ]
    },
    { name: 'select', label: 'Select Option', type: 'select', placeholder: 'Choose Option', icon: '<i class="far fa-list-alt"></i>', value: 'none', required: false, split: [
      { value: 'First option', type: 'option', selected: false },
      { value: 'Second option', type: 'option', selected: false },
      { value: 'Third option', type: 'option', selected: false },
    ] },
    {
      name: 'split-text', label: 'Split Text', icon: '<i class="far fa-hand-scissors"></i>', required: false, split: [
        { name: 'split-text-1', label: 'First Text', type: 'text', placeholder: 'First Text', value: '' },
        { name: 'split-text-2', label: 'Last Text', type: 'text', placeholder: 'Last Text', value: '' },
      ]
    },
    { name: 'number', label: 'Number', type: 'number', placeholder: 'Number', icon: '<i class="fas fa-hashtag"></i>', value: '', required: false},
    { name: 'date', label: 'Date', type: 'date', icon: '<i class="far fa-calendar-alt"></i>', value: '', required: false},
    { name: 'time', label: 'Time', type: 'time', icon: '<i class="far fa-clock"></i>', value: '', required: false},
  ];
  selField:any = '';
  fields:Array<any> = []

  constructor(private _general: GeneralService,private tokenStorage: TokenStorageService,private http: HttpClient,) {
    this.user_id = this.tokenStorage.getUser().uniqueid;
   }

  onSelChng(i:any, val:boolean) {
    if(this.selField.name != 'checkbox') {
      var temp = JSON.stringify(this.selField.split);
      temp = temp.replace(/"selected":true/g, '"selected":false');
      this.selField.split = JSON.parse(temp);
      this.selField.split[i].selected = val;
    }
  }

  addInput(split:any, i:number) {
    var obj:any = new Object();
    var len =  split.length;
    if(split[0].type == 'text') obj = { name: 'new-field-'+len, label: 'New field '+len, type: 'text', placeholder: 'New Field '+len };
    else obj = { value: 'New option '+len, type: split[0].type};
    obj.id = this._general.createBlockId(obj);
    split.splice(i+1, 0, obj);
  }

  removeInput(arr: any, i: number) {
    arr.splice(i, 1);
  }

  addField(obj:any) {
    obj.user_id=this.user_id;
    return this.http.post('/api/addfield',obj)
    .pipe(catchError(this.errorHandler));
  }
allformfields(){
  return this.http.get('/api/allformfields/'+this.user_id)
  .pipe(catchError(this.errorHandler));
}
deleteformfield(obj:any){
  obj.user_id=this.user_id;
  return this.http.delete('/api/deleteformfield',obj)
  .pipe(catchError(this.errorHandler));
}

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}

