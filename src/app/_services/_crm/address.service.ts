import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  uuid:any = '';
  country:any=[{ class:"item", value:"AF",name:"Afghanistan"},
{ class:"item", value:"AL",name:"Albania"},
{ class:"item", value:"DZ",name:"Algeria"},
{ class:"item", value:"AS",name:"American Samoa"},
{ class:"item", value:"AD",name:"Andorra"},
{ class:"item", value:"AO",name:"Angola"},
{ class:"item", value:"AI",name:"Anguilla"},
{ class:"item", value:"AQ",name:"Antarctica"},
{ class:"item", value:"AG",name:"Antigua and Barbuda"},
{ class:"item", value:"AR",name:"Argentina"},
{ class:"item", value:"AM",name:"Armenia"},
{ class:"item", value:"AW",name:"Aruba"},
{ class:"item", value:"AU",name:"Australia"},
{ class:"item", value:"AT",name:"Austria"},
{ class:"item", value:"AZ",name:"Azerbaijan"},
{ class:"item", value:"BS",name:"Bahamas"},
{ class:"item", value:"BH",name:"Bahrain"},
{ class:"item", value:"BD",name:"Bangladesh"},
{ class:"item", value:"BB",name:"Barbados"},
{ class:"item", value:"BY",name:"Belarus"},
{ class:"item", value:"BE",name:"Belgium"},
{ class:"item", value:"BZ",name:"Belize"},
{ class:"item", value:"BJ",name:"Benin"},
{ class:"item", value:"BM",name:"Bermuda"},
{ class:"item", value:"BT",name:"Bhutan"},
{ class:"item", value:"BO",name:"Bolivia, Plurinational State of"},
{ class:"item", value:"BQ",name:"Bonaire, Sint Eustatius and Saba"},
{ class:"item", value:"BA",name:"Bosnia and Herzegovina"},
{ class:"item", value:"BW",name:"Botswana"},
{ class:"item", value:"BV",name:"Bouvet Island"},
{ class:"item", value:"BR",name:"Brazil"},
{ class:"item", value:"IO",name:"British Indian Ocean Territory"},
{ class:"item", value:"BN",name:"Brunei Darussalam"},
{ class:"item", value:"BG",name:"Bulgaria"},
{ class:"item", value:"BF",name:"Burkina Faso"},
{ class:"item", value:"BI",name:"Burundi"},
{ class:"item", value:"KH",name:"Cambodia"},
{ class:"item", value:"CM",name:"Cameroon"},
{ class:"item", value:"CA",name:"Canada"},
{ class:"item", value:"CV",name:"Cape Verde"},
{ class:"item", value:"KY",name:"Cayman Islands"},
{ class:"item", value:"CF",name:"Central African Republic"},
{ class:"item", value:"TD",name:"Chad"},
{ class:"item", value:"CL",name:"Chile"},
{ class:"item", value:"CN",name:"China"},
{ class:"item", value:"CX",name:"Christmas Island"},
{ class:"item", value:"CC",name:"Cocos (Keeling) Islands"},
{ class:"item", value:"CO",name:"Colombia"},
{ class:"item", value:"KM",name:"Comoros"},
{ class:"item", value:"CG",name:"Congo"},
{ class:"item", value:"CD",name:"Congo, The Democratic Republic of the"},
{ class:"item", value:"CK",name:"Cook Islands"},
{ class:"item", value:"CR",name:"Costa Rica"},
{ class:"item", value:"HR",name:"Croatia"},
{ class:"item", value:"CU",name:"Cuba"},
{ class:"item", value:"CW",name:"Curaçao"},
{ class:"item", value:"CY",name:"Cyprus"},
{ class:"item", value:"CZ",name:"Czech Republic"},
{ class:"item", value:"CI",name:"Côte d'Ivoire"},
{ class:"item", value:"DK",name:"Denmark"},
{ class:"item", value:"DJ",name:"Djibouti"},
{ class:"item", value:"DM",name:"Dominica"},
{ class:"item", value:"DO",name:"Dominican Republic"},
{ class:"item", value:"EC",name:"Ecuador"},
{ class:"item", value:"EG",name:"Egypt"},
{ class:"item", value:"SV",name:"Salvador"},
{ class:"item", value:"GQ",name:"Equatorial Guinea"},
{ class:"item", value:"ER",name:"Eritrea"},
{ class:"item", value:"EE",name:"Estonia"},
{ class:"item", value:"ET",name:"Ethiopia"},
{ class:"item", value:"FK",name:"Falkland Islands (Malvinas)"},
{ class:"item", value:"FO",name:"Faroe Islands"},
{ class:"item", value:"FJ",name:"Fiji"},
{ class:"item", value:"FI",name:"Finland"},
{ class:"item", value:"FR",name:"France"},
{ class:"item", value:"GF",name:"French Guiana"},
{ class:"item", value:"PF",name:"French Polynesia"},
{ class:"item", value:"TF",name:"French Southern Territories"},
{ class:"item", value:"GA",name:"Gabon"},
{ class:"item", value:"GM",name:"Gambia"},
{ class:"item", value:"GE",name:"Georgia"},
{ class:"item", value:"DE",name:"Germany"},
{ class:"item", value:"GH",name:"Ghana"},
{ class:"item", value:"GI",name:"Gibraltar"},
{ class:"item", value:"GR",name:"Greece"},
{ class:"item", value:"GL",name:"Greenland"},
{ class:"item", value:"GD",name:"Grenada"},
{ class:"item", value:"GP",name:"Guadeloupe"},
{ class:"item", value:"GU",name:"Guam"},
{ class:"item", value:"GT",name:"Guatemala"},
{ class:"item", value:"GG",name:"Guernsey"},
{ class:"item", value:"GN",name:"Guinea"},
{ class:"item", value:"GW",name:"Guinea-Bissau"},
{ class:"item", value:"GY",name:"Guyana"},
{ class:"item", value:"HT",name:"Haiti"},
{ class:"item", value:"HM",name:"Heard Island and McDonald Islands"},
{ class:"item", value:"VA",name:"Holy See (Vatican City State)"},
{ class:"item", value:"HN",name:"Honduras"},
{ class:"item", value:"HK",name:"Hong Kong"},
{ class:"item", value:"HU",name:"Hungary"},
{ class:"item", value:"IS",name:"Iceland"},
{ class:"item", value:"IN",name:"India"},
{ class:"item", value:"ID",name:"Indonesia"},
{ class:"item", value:"IR",name:"Iran, Islamic Republic of"},
{ class:"item", value:"IQ",name:"Iraq"},
{ class:"item", value:"IE",name:"Ireland"},
{ class:"item", value:"IM",name:"Isle of Man"},
{ class:"item", value:"IL",name:"Israel"},
{ class:"item", value:"IT",name:"Italy"},
{ class:"item", value:"JM",name:"Jamaica"},
{ class:"item", value:"JP",name:"Japan"},
{ class:"item", value:"JE",name:"Jersey"},
{ class:"item", value:"JO",name:"Jordan"},
{ class:"item", value:"KZ",name:"Kazakhstan"},
{ class:"item", value:"KE",name:"Kenya"},
{ class:"item", value:"KI",name:"Kiribati"},
{ class:"item", value:"KP",name:"Korea, Democratic People's Republic of"},
{ class:"item", value:"KR",name:"Korea, Republic of"},
{ class:"item", value:"KW",name:"Kuwait"},
{ class:"item", value:"KG",name:"Kyrgyzstan"},
{ class:"item", value:"LA",name:"Lao People's Democratic Republic"},
{ class:"item", value:"LV",name:"Latvia"},
{ class:"item", value:"LB",name:"Lebanon"},
{ class:"item", value:"LS",name:"Lesotho"},
{ class:"item", value:"LR",name:"Liberia"},
{ class:"item", value:"LY",name:"Libya"},
{ class:"item", value:"LI",name:"Liechtenstein"},
{ class:"item", value:"LT",name:"Lithuania"},
{ class:"item", value:"LU",name:"Luxembourg"},
{ class:"item", value:"MO",name:"Macao"},
{ class:"item", value:"MK",name:"Macedonia, Republic of"},
{ class:"item", value:"MG",name:"Madagascar"},
{ class:"item", value:"MW",name:"Malawi"},
{ class:"item", value:"MY",name:"Malaysia"},
{ class:"item", value:"MV",name:"Malmat-optiones"},
{ class:"item", value:"ML",name:"Mali"},
{ class:"item", value:"MT",name:"Malta"},
{ class:"item", value:"MH",name:"Marshall Islands"},
{ class:"item", value:"MQ",name:"Martinique"},
{ class:"item", value:"MR",name:"Mauritania"},
{ class:"item", value:"MU",name:"Mauritius"},
{ class:"item", value:"YT",name:"Mayotte"},
{ class:"item", value:"MX",name:"Mexico"},
{ class:"item", value:"FM",name:"Micronesia, Federated States of"},
{ class:"item", value:"MD",name:"Moldova, Republic of"},
{ class:"item", value:"MC",name:"Monaco"},
{ class:"item", value:"MN",name:"Mongolia"},
{ class:"item", value:"ME",name:"Montenegro"},
{ class:"item", value:"MS",name:"Montserrat"},
{ class:"item", value:"MA",name:"Morocco"},
{ class:"item", value:"MZ",name:"Mozambique"},
{ class:"item", value:"MM",name:"Myanmar"},
{ class:"item", value:"NA",name:"Namibia"},
{ class:"item", value:"NR",name:"Nauru"},
{ class:"item", value:"NP",name:"Nepal"},
{ class:"item", value:"NL",name:"Netherlands"},
{ class:"item", value:"NC",name:"New Caledonia"},
{ class:"item", value:"NZ",name:"New Zealand"},
{ class:"item", value:"NI",name:"Nicaragua"},
{ class:"item", value:"NE",name:"Niger"},
{ class:"item", value:"NG",name:"Nigeria"},
{ class:"item", value:"NU",name:"Niue"},
{ class:"item", value:"NF",name:"Norfolk Island"},
{ class:"item", value:"MP",name:"Northern Mariana Islands"},
{ class:"item", value:"NO",name:"Norway"},
{ class:"item", value:"OM",name:"Oman"},
{ class:"item", value:"PK",name:"Pakistan"},
{ class:"item", value:"PW",name:"Palau"},
{ class:"item", value:"PS",name:"Palestine, State of"},
{ class:"item", value:"PA",name:"Panama"},
{ class:"item", value:"PG",name:"Papua New Guinea"},
{ class:"item", value:"PY",name:"Paraguay"},
{ class:"item", value:"PE",name:"Peru"},
{ class:"item", value:"PH",name:"Philippines"},
{ class:"item", value:"PN",name:"Pitcairn"},
{ class:"item", value:"PL",name:"Poland"},
{ class:"item", value:"PT",name:"Portugal"},
{ class:"item", value:"PR",name:"Puerto Rico"},
{ class:"item", value:"QA",name:"Qatar"},
{ class:"item", value:"RO",name:"Romania"},
{ class:"item", value:"RU",name:"Russian Federation"},
{ class:"item", value:"RW",name:"Rwanda"},
{ class:"item", value:"RE",name:"Réunion"},
{ class:"item", value:"BL",name:"Saint Barthélemy"},
{ class:"item", value:"SH",name:"Saint Helena, Ascension and Tristan da Cunha"},
{ class:"item", value:"KN",name:"Saint Kitts and Nevis"},
{ class:"item", value:"LC",name:"Saint Lucia"},
{ class:"item", value:"MF",name:"Saint Martin (French part)"},
{ class:"item", value:"PM",name:"Saint Pierre and Miquelon"},
{ class:"item", value:"VC",name:"Saint Vincent and the Grenadines"},
{ class:"item", value:"WS",name:"Samoa"},
{ class:"item", value:"SM",name:"San Marino"},
{ class:"item", value:"ST",name:"Sao Tome and Principe"},
{ class:"item", value:"SA",name:"Saudi Arabia"},
{ class:"item", value:"SN",name:"Senegal"},
{ class:"item", value:"RS",name:"Serbia"},
{ class:"item", value:"SC",name:"Seychelles"},
{ class:"item", value:"SL",name:"Sierra Leone"},
{ class:"item", value:"SG",name:"Singapore"},
{ class:"item", value:"SX",name:"Sint Maarten (Dutch part)"},
{ class:"item", value:"SK",name:"Slovakia"},
{ class:"item", value:"SI",name:"Slovenia"},
{ class:"item", value:"SB",name:"Solomon Islands"},
{ class:"item", value:"SO",name:"Somalia"},
{ class:"item", value:"ZA",name:"South Africa"},
{ class:"item", value:"GS",name:"South Georgia and the South Sandwich Islands"},
{ class:"item", value:"SS",name:"South Sudan"},
{ class:"item", value:"ES",name:"Spain"},
{ class:"item", value:"LK",name:"Sri Lanka"},
{ class:"item", value:"SD",name:"Sudan"},
{ class:"item", value:"SR",name:"Suriname"},
{ class:"item", value:"SJ",name:"Svalbard and Jan Mayen"},
{ class:"item", value:"SZ",name:"Swaziland"},
{ class:"item", value:"SE",name:"Sweden"},
{ class:"item", value:"CH",name:"Switzerland"},
{ class:"item", value:"SY",name:"Syrian Arab Republic"},
{ class:"item", value:"TW",name:"Taiwan"},
{ class:"item", value:"TJ",name:"Tajikistan"},
{ class:"item", value:"TZ",name:"Tanzania, United Republic of"},
{ class:"item", value:"TH",name:"Thailand"},
{ class:"item", value:"TL",name:"Timor-Leste"},
{ class:"item", value:"TG",name:"Togo"},
{ class:"item", value:"TK",name:"Tokelau"},
{ class:"item", value:"TO",name:"Tonga"},
{ class:"item", value:"TT",name:"Trinidad and Tobago"},
{ class:"item", value:"TN",name:"Tunisia"},
{ class:"item", value:"TR",name:"Turkey"},
{ class:"item", value:"TM",name:"Turkmenistan"},
{ class:"item", value:"TC",name:"Turks and Caicos Islands"},
{ class:"item", value:"TV",name:"Tuvalu"},
{ class:"item", value:"UG",name:"Uganda"},
{ class:"item", value:"UA",name:"Ukraine"},
{ class:"item", value:"AE",name:"United Arab Emirates"},
{ class:"item", value:"GB",name:"United Kingdom"},
{ class:"item", value:"US",name:"United States"},
{ class:"item", value:"UM",name:"United States Minor Outlying Islands"},
{ class:"item", value:"UY",name:"Uruguay"},
{ class:"item", value:"UZ",name:"Uzbekistan"},
{ class:"item", value:"VU",name:"Vanuatu"},
{ class:"item", value:"VE",name:"Venezuela, Bolivarian Republic of"},
{ class:"item", value:"VN",name:"Viet Nam"},
{ class:"item", value:"VG",name:"Virgin Islands, British"},
{ class:"item", value:"VI",name:"Virgin Islands, U.S."},
{ class:"item", value:"WF",name:"Wallis and Futuna"},
{ class:"item", value:"EH",name:"Western Sahara"},
{ class:"item", value:"YE",name:"Yemen"},
{ class:"item", value:"ZM",name:"Zambia"},
{ class:"item", value:"ZW",name:"Zimbabwe"},
{ class:"item", value:"AX",name:"Åland Islands"},
]
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }


  fetchaddress(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/Alladdress', obj).pipe(catchError(this.errorHandler));
  }
  singleaddress(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/singleaddress/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }
  addaddress(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/addaddress',obj).pipe(catchError(this.errorHandler));
  }
  updateaddress(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updateaddress',obj).pipe(catchError(this.errorHandler));
  }
  deleteaddress(id:any): Observable<any>{
    // var obj = {uuid: this.uuid};
    return this.http.delete('/api/deleteaddress/'+id+'/'+this.uuid).pipe(catchError(this.errorHandler));
    
  }
  searchaddress(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchaddress',obj).pipe(catchError(this.errorHandler));
  }


  fetchsmtp(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/Allsmtp', obj).pipe(catchError(this.errorHandler));
  }
  singlesmtp(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/singlesmtp/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }
  addsmtp(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/addsmtp',obj).pipe(catchError(this.errorHandler));
  }
  updatesmtp(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatesmtp',obj).pipe(catchError(this.errorHandler));
  }
  deletesmtp(id:any): Observable<any>{
    // var obj = {uuid: this.uuid};
    return this.http.delete('/api/deletesmtp/'+id+'/'+this.uuid).pipe(catchError(this.errorHandler));
    
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }



}

