import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {A, B, COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { FileUploadService } from '../file-upload.service';
import { WebpagesService } from '../webpages.service';
import { WebsiteService } from '../website.service';
import { FunnelService } from '../funnels.service';
import { OfferService } from '../_sales/offer.service';
import { OrderformService } from '../_sales/orderform.service';
import { UserService } from '../user.service';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { NavigationService } from '../navigation.service';
import { CourseService } from '../_membership/course.service';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {
  active_domain:string = '';
  includeLayout:any = {header:true, footer:true};
  user:any;
  autosave:any = '';
  autosaveopt:any = [{value:10, unit:'sec'}, {value:30, unit:'sec'}, {value:1, unit:'min'}, {value:2, unit:'min'}, {value:5, unit:'min'}];
  timezone:any=[{ value:"Default",name:"Default"},
    { value:"Africa/Abidjan",name:"Africa/Abidjan"},
    { value:"Africa/Accra",name:"Africa/Accra"},
    { value:"Africa/Bamako",name:"Africa/Bamako"},
    { value:"Africa/Banjul",name:"Africa/Banjul"},
    { value:"Africa/Bissau",name:"Africa/Bissau"},
    { value:"Africa/Casablanca",name:"Africa/Casablanca"},
    { value:"Africa/Conakry",name:"Africa/Conakry"},
    { value:"Africa/Dakar",name:"Africa/Dakar"},
    { value:"Africa/El_Aaiun",name:"Africa/El_Aaiun"},
    { value:"Africa/Freetown",name:"Africa/Freetown"},
    { value:"Africa/Lome",name:"Africa/Lome"},
    { value:"Africa/Monrovia",name:"Africa/Monrovia"},
    { value:"Africa/Nouakchott",name:"Africa/Nouakchott"},
    { value:"Africa/Ouagadougou",name:"Africa/Ouagadougou"},
    { value:"Africa/Sao_Tome",name:"Africa/Sao_Tome"},
    { value:"Africa/Timbuktu",name:"Africa/Timbuktu"},
    { value:"America/Danmarkshavn",name:"America/Danmarkshavn"},
    { value:"America/Scoresbysund",name:"America/Scoresbysund"},
    { value:"Atlantic/Azores",name:"Atlantic/Azores"},
    { value:"Atlantic/Reykjavik",name:"Atlantic/Reykjavik"},
    { value:"Atlantic/St_Helena",name:"Atlantic/St_Helena"},
    { value:"Etc/GMT",name:"Etc/GMT"},
    { value:"Etc/GMT+0",name:"Etc/GMT+0"},
    { value:"Etc/GMT-0",name:"Etc/GMT-0"},
    { value:"Etc/GMT0",name:"Etc/GMT0"},
    { value:"Etc/Greenwich",name:"Etc/Greenwich"},
    { value:"Etc/UCT",name:"Etc/UCT"},
    { value:"Etc/UTC",name:"Etc/UTC"},
    { value:"Etc/Universal",name:"Etc/Universal"},
    { value:"Etc/Zulu",name:"Etc/Zulu"},
    { value:"GMT",name:"GMT"},
    { value:"GMT+0",name:"GMT+0"},
    { value:"GMT-0",name:"GMT-0"},
    { value:"GMT0",name:"GMT0"},
    { value:"Greenwich",name:"Greenwich"},
    { value:"Iceland",name:"Iceland"},
    { value:"UCT",name:"UCT"},
    { value:"UTC",name:"UTC"},
    { value:"Universal",name:"Universal"},
    { value:"Zulu",name:"Zulu"},
    { value:"Africa/Algiers",name:"Africa/Algiers"},
    { value:"Africa/Bangui",name:"Africa/Bangui"},
    { value:"Africa/Brazzaville",name:"Africa/Brazzaville"},
    { value:"Africa/Douala",name:"Africa/Douala"},
    { value:"Africa/Kinshasa",name:"Africa/Kinshasa"},
    { value:"Africa/Lagos",name:"Africa/Lagos"},
    { value:"Africa/Libreville",name:"Africa/Libreville"},
    { value:"Africa/Luanda",name:"Africa/Luanda"},
    { value:"Africa/Malabo",name:"Africa/Malabo"},
    { value:"Africa/Ndjamena",name:"Africa/Ndjamena"},
    { value:"Africa/Niamey",name:"Africa/Niamey"},
    { value:"Africa/Porto-Novo",name:"Africa/Porto-Novo"},
    { value:"Africa/Tunis",name:"Africa/Tunis"},
    { value:"Atlantic/Canary",name:"Atlantic/Canary"},
    { value:"Atlantic/Faeroe",name:"Atlantic/Faeroe"},
    { value:"Atlantic/Faroe",name:"Atlantic/Faroe"},
    { value:"Atlantic/Madeira",name:"Atlantic/Madeira"},
    { value:"Eire",name:"Eire"},
    { value:"Etc/GMT-1",name:"Etc/GMT-1"},
    { value:"Europe/Belfast",name:"Europe/Belfast"},
    { value:"Europe/Dublin",name:"Europe/Dublin"},
    { value:"Europe/Guernsey",name:"Europe/Guernsey"},
    { value:"Europe/Isle_of_Man",name:"Europe/Isle_of_Man"},
    { value:"Europe/Jersey",name:"Europe/Jersey"},
    { value:"Europe/Lisbon",name:"Europe/Lisbon"},
    { value:"Europe/London",name:"Europe/London"},
    { value:"GB",name:"GB"},
    { value:"GB-Eire",name:"GB-Eire"},
    { value:"Portugal",name:"Portugal"},
    { value:"WET",name:"WET"},
    { value:"Africa/Blantyre",name:"Africa/Blantyre"},
    { value:"Africa/Bujumbura",name:"Africa/Bujumbura"},
    { value:"Africa/Cairo",name:"Africa/Cairo"},
    { value:"Africa/Ceuta",name:"Africa/Ceuta"},
    { value:"Africa/Gaborone",name:"Africa/Gaborone"},
    { value:"Africa/Harare",name:"Africa/Harare"},
    { value:"Africa/Johannesburg",name:"Africa/Johannesburg"},
    { value:"Africa/Kigali",name:"Africa/Kigali"},
    { value:"Africa/Lubumbashi",name:"Africa/Lubumbashi"},
    { value:"Africa/Lusaka",name:"Africa/Lusaka"},
    { value:"Africa/Maputo",name:"Africa/Maputo"},
    { value:"Africa/Maseru",name:"Africa/Maseru"},
    { value:"Africa/Mbabane",name:"Africa/Mbabane"},
    { value:"Africa/Tripoli",name:"Africa/Tripoli"},
    { value:"Africa/Windhoek",name:"Africa/Windhoek"},
    { value:"Antarctica/Troll",name:"Antarctica/Troll"},
    { value:"Arctic/Longyearbyen",name:"Arctic/Longyearbyen"},
    { value:"Asia/Amman",name:"Asia/Amman"},
    { value:"Asia/Damascus",name:"Asia/Damascus"},
    { value:"Atlantic/Jan_Mayen",name:"Atlantic/Jan_Mayen"},
    { value:"CET",name:"CET"},
    { value:"Egypt",name:"Egypt"},
    { value:"Etc/GMT-2",name:"Etc/GMT-2"},
    { value:"Europe/Amsterdam",name:"Europe/Amsterdam"},
    { value:"Europe/Andorra",name:"Europe/Andorra"},
    { value:"Europe/Belgrade",name:"Europe/Belgrade"},
    { value:"Europe/Berlin",name:"Europe/Berlin"},
    { value:"Europe/Bratislava",name:"Europe/Bratislava"},
    { value:"Europe/Brussels",name:"Europe/Brussels"},
    { value:"Europe/Budapest",name:"Europe/Budapest"},
    { value:"Europe/Busingen",name:"Europe/Busingen"},
    { value:"Europe/Copenhagen",name:"Europe/Copenhagen"},
    { value:"Europe/Gibraltar",name:"Europe/Gibraltar"},
    { value:"Europe/Kaliningrad",name:"Europe/Kaliningrad"},
    { value:"Europe/Ljubljana",name:"Europe/Ljubljana"},
    { value:"Europe/Luxembourg",name:"Europe/Luxembourg"},
    { value:"Europe/Madrid",name:"Europe/Madrid"},
    { value:"Europe/Malta",name:"Europe/Malta"},
    { value:"Europe/Monaco",name:"Europe/Monaco"},
    { value:"Europe/Oslo",name:"Europe/Oslo"},
    { value:"Europe/Paris",name:"Europe/Paris"},
    { value:"Europe/Podgorica",name:"Europe/Podgorica"},
    { value:"Europe/Prague",name:"Europe/Prague"},
    { value:"Europe/Rome",name:"Europe/Rome"},
    { value:"Europe/San_Marino",name:"Europe/San_Marino"},
    { value:"Europe/Sarajevo",name:"Europe/Sarajevo"},
    { value:"Europe/Skopje",name:"Europe/Skopje"},
    { value:"Europe/Stockholm",name:"Europe/Stockholm"},
    { value:"Europe/Tirane",name:"Europe/Tirane"},
    { value:"Europe/Vaduz",name:"Europe/Vaduz"},
    { value:"Europe/Vatican",name:"Europe/Vatican"},
    { value:"Europe/Vienna",name:"Europe/Vienna"},
    { value:"Europe/Warsaw",name:"Europe/Warsaw"},
    { value:"Europe/Zagreb",name:"Europe/Zagreb"},
    { value:"Europe/Zurich",name:"Europe/Zurich"},
    { value:"Libya",name:"Libya"},
    { value:"MET",name:"MET"},
    { value:"Poland",name:"Poland"},
    { value:"Africa/Addis_Ababa",name:"Africa/Addis_Ababa"},
    { value:"Africa/Asmara",name:"Africa/Asmara"},
    { value:"Africa/Asmera",name:"Africa/Asmera"},
    { value:"Africa/Dar_es_Salaam",name:"Africa/Dar_es_Salaam"},
    { value:"Africa/Djibouti",name:"Africa/Djibouti"},
    { value:"Africa/Juba",name:"Africa/Juba"},
    { value:"Africa/Kampala",name:"Africa/Kampala"},
    { value:"Africa/Khartoum",name:"Africa/Khartoum"},
    { value:"Africa/Mogadishu",name:"Africa/Mogadishu"},
    { value:"Africa/Nairobi",name:"Africa/Nairobi"},
    { value:"Antarctica/Syowa",name:"Antarctica/Syowa"},
    { value:"Asia/Aden",name:"Asia/Aden"},
    { value:"Asia/Baghdad",name:"Asia/Baghdad"},
    { value:"Asia/Bahrain",name:"Asia/Bahrain"},
    { value:"Asia/Beirut",name:"Asia/Beirut"},
    { value:"Asia/Gaza",name:"Asia/Gaza"},
    { value:"Asia/Hebron",name:"Asia/Hebron"},
    { value:"Asia/Istanbul",name:"Asia/Istanbul"},
    { value:"Asia/Jerusalem",name:"Asia/Jerusalem"},
    { value:"Asia/Kuwait",name:"Asia/Kuwait"},
    { value:"Asia/Nicosia",name:"Asia/Nicosia"},
    { value:"Asia/Qatar",name:"Asia/Qatar"},
    { value:"Asia/Riyadh",name:"Asia/Riyadh"},
    { value:"Asia/Tel_Aviv",name:"Asia/Tel_Aviv"},
    { value:"EET",name:"EET"},
    { value:"Etc/GMT-3",name:"Etc/GMT-3"},
    { value:"Europe/Athens",name:"Europe/Athens"},
    { value:"Europe/Bucharest",name:"Europe/Bucharest"},
    { value:"Europe/Chisinau",name:"Europe/Chisinau"},
    { value:"Europe/Helsinki",name:"Europe/Helsinki"},
    { value:"Europe/Istanbul",name:"Europe/Istanbul"},
    { value:"Europe/Kiev",name:"Europe/Kiev"},
    { value:"Europe/Kirov",name:"Europe/Kirov"},
    { value:"Europe/Mariehamn",name:"Europe/Mariehamn"},
    { value:"Europe/Minsk",name:"Europe/Minsk"},
    { value:"Europe/Moscow",name:"Europe/Moscow"},
    { value:"Europe/Nicosia",name:"Europe/Nicosia"},
    { value:"Europe/Riga",name:"Europe/Riga"},
    { value:"Europe/Simferopol",name:"Europe/Simferopol"},
    { value:"Europe/Sofia",name:"Europe/Sofia"},
    { value:"Europe/Tallinn",name:"Europe/Tallinn"},
    { value:"Europe/Tiraspol",name:"Europe/Tiraspol"},
    { value:"Europe/Uzhgorod",name:"Europe/Uzhgorod"},
    { value:"Europe/Vilnius",name:"Europe/Vilnius"},
    { value:"Europe/Volgograd",name:"Europe/Volgograd"},
    { value:"Europe/Zaporozhye",name:"Europe/Zaporozhye"},
    { value:"Indian/Antananarivo",name:"Indian/Antananarivo"},
    { value:"Indian/Comoro",name:"Indian/Comoro"},
    { value:"Indian/Mayotte",name:"Indian/Mayotte"},
    { value:"Israel",name:"Israel"},
    { value:"Turkey",name:"Turkey"},
    { value:"W-SU",name:"W-SU"},
    { value:"Asia/Baku",name:"Asia/Baku"},
    { value:"Asia/Dubai",name:"Asia/Dubai"},
    { value:"Asia/Muscat",name:"Asia/Muscat"},
    { value:"Asia/Tbilisi",name:"Asia/Tbilisi"},
    { value:"Asia/Yerevan",name:"Asia/Yerevan"},
    { value:"Etc/GMT-4",name:"Etc/GMT-4"},
    { value:"Europe/Astrakhan",name:"Europe/Astrakhan"},
    { value:"Europe/Samara",name:"Europe/Samara"},
    { value:"Europe/Ulyanovsk",name:"Europe/Ulyanovsk"},
    { value:"Indian/Mahe",name:"Indian/Mahe"},
    { value:"Indian/Mauritius",name:"Indian/Mauritius"},
    { value:"Indian/Reunion",name:"Indian/Reunion"},
    { value:"Asia/Kabul",name:"Asia/Kabul"},
    { value:"Asia/Tehran",name:"Asia/Tehran"},
    { value:"Iran",name:"Iran"},
    { value:"Antarctica/Mawson",name:"Antarctica/Mawson"},
    { value:"Asia/Aqtau",name:"Asia/Aqtau"},
    { value:"Asia/Aqtobe",name:"Asia/Aqtobe"},
    { value:"Asia/Ashgabat",name:"Asia/Ashgabat"},
    { value:"Asia/Ashkhabad",name:"Asia/Ashkhabad"},
    { value:"Asia/Dushanbe",name:"Asia/Dushanbe"},
    { value:"Asia/Karachi",name:"Asia/Karachi"},
    { value:"Asia/Oral",name:"Asia/Oral"},
    { value:"Asia/Samarkand",name:"Asia/Samarkand"},
    { value:"Asia/Tashkent",name:"Asia/Tashkent"},
    { value:"Asia/Yekaterinburg",name:"Asia/Yekaterinburg"},
    { value:"Etc/GMT-5",name:"Etc/GMT-5"},
    { value:"Indian/Kerguelen",name:"Indian/Kerguelen"},
    { value:"Indian/Maldives",name:"Indian/Maldives"},
    { value:"Asia/Calcutta",name:"Asia/Calcutta"},
    { value:"Asia/Colombo",name:"Asia/Colombo"},
    { value:"Asia/Kolkata",name:"Asia/India/Kolkata"},
    { value:"Asia/Kathmandu",name:"Asia/Kathmandu"},
    { value:"Asia/Katmandu",name:"Asia/Katmandu"},
    { value:"Antarctica/Vostok",name:"Antarctica/Vostok"},
    { value:"Asia/Almaty",name:"Asia/Almaty"},
    { value:"Asia/Bishkek",name:"Asia/Bishkek"},
    { value:"Asia/Dacca",name:"Asia/Dacca"},
    { value:"Asia/Dhaka",name:"Asia/Dhaka"},
    { value:"Asia/Novosibirsk",name:"Asia/Novosibirsk"},
    { value:"Asia/Omsk",name:"Asia/Omsk"},
    { value:"Asia/Qyzylorda",name:"Asia/Qyzylorda"},
    { value:"Asia/Thimbu",name:"Asia/Thimbu"},
    { value:"Asia/Thimphu",name:"Asia/Thimphu"},
    { value:"Etc/GMT-6",name:"Etc/GMT-6"},
    { value:"Indian/Chagos",name:"Indian/Chagos"},
    { value:"Asia/Rangoon",name:"Asia/Rangoon"},
    { value:"Indian/Cocos",name:"Indian/Cocos"},
    { value:"Antarctica/Davis",name:"Antarctica/Davis"},
    { value:"Asia/Bangkok",name:"Asia/Bangkok"},
    { value:"Asia/Barnaul",name:"Asia/Barnaul"},
    { value:"Asia/Ho_Chi_Minh",name:"Asia/Ho_Chi_Minh"},
    { value:"Asia/Jakarta",name:"Asia/Jakarta"},
    { value:"Asia/Krasnoyarsk",name:"Asia/Krasnoyarsk"},
    { value:"Asia/Novokuznetsk",name:"Asia/Novokuznetsk"},
    { value:"Asia/Phnom_Penh",name:"Asia/Phnom_Penh"},
    { value:"Asia/Pontianak",name:"Asia/Pontianak"},
    { value:"Asia/Saigon",name:"Asia/Saigon"},
    { value:"Asia/Tomsk",name:"Asia/Tomsk"},
    { value:"Asia/Vientiane",name:"Asia/Vientiane"},
    { value:"Etc/GMT-7",name:"Etc/GMT-7"},
    { value:"Indian/Christmas",name:"Indian/Christmas"},
    { value:"Antarctica/Casey",name:"Antarctica/Casey"},
    { value:"Asia/Brunei",name:"Asia/Brunei"},
    { value:"Asia/Chungking",name:"Asia/Chungking"},
    { value:"Asia/Hong_Kong",name:"Asia/Hong_Kong"},
    { value:"Asia/Hovd",name:"Asia/Hovd"},
    { value:"Asia/Irkutsk",name:"Asia/Irkutsk"},
    { value:"Asia/Kuala_Lumpur",name:"Asia/Kuala_Lumpur"},
    { value:"Asia/Kuching",name:"Asia/Kuching"},
    { value:"Asia/Macao",name:"Asia/Macao"},
    { value:"Asia/Macau",name:"Asia/Macau"},
    { value:"Asia/Makassar",name:"Asia/Makassar"},
    { value:"Asia/Manila",name:"Asia/Manila"},
    { value:"Asia/Singapore",name:"Asia/Singapore"},
    { value:"Asia/Taipei",name:"Asia/Taipei"},
    { value:"Asia/Ujung_Pandang",name:"Asia/Ujung_Pandang"},
    { value:"Australia/Perth",name:"Australia/Perth"},
    { value:"Australia/West",name:"Australia/West"},
    { value:"Etc/GMT-8",name:"Etc/GMT-8"},
    { value:"Hongkong",name:"Hongkong"},
    { value:"PRC",name:"PRC"},
    { value:"ROC",name:"ROC"},
    { value:"Singapore",name:"Singapore"},
    { value:"Asia/Pyongyang",name:"Asia/Pyongyang"},
    { value:"Australia/Eucla",name:"Australia/Eucla"},
    { value:"Asia/Chita",name:"Asia/Chita"},
    { value:"Asia/Choibalsan",name:"Asia/Choibalsan"},
    { value:"Asia/Dili",name:"Asia/Dili"},
    { value:"Asia/Jayapura",name:"Asia/Jayapura"},
    { value:"Asia/Khandyga",name:"Asia/Khandyga"},
    { value:"Asia/Seoul",name:"Asia/Seoul"},
    { value:"Asia/Tokyo",name:"Asia/Tokyo"},
    { value:"Asia/Ulaanbaatar",name:"Asia/Ulaanbaatar"},
    { value:"Asia/Ulan_Bator",name:"Asia/Ulan_Bator"},
    { value:"Asia/Yakutsk",name:"Asia/Yakutsk"},
    { value:"Etc/GMT-9",name:"Etc/GMT-9"},
    { value:"Japan",name:"Japan"},
    { value:"Pacific/Palau",name:"Pacific/Palau"},
    { value:"ROK",name:"ROK"},
    { value:"Australia/Darwin",name:"Australia/Darwin"},
    { value:"Australia/North",name:"Australia/North"},
    { value:"Antarctica/DumontDUrville",name:"Antarctica/DumontDUrville"},
    { value:"Asia/Ust-Nera",name:"Asia/Ust-Nera"},
    { value:"Asia/Vladivostok",name:"Asia/Vladivostok"},
    { value:"Australia/Brisbane",name:"Australia/Brisbane"},
    { value:"Australia/Lindeman",name:"Australia/Lindeman"},
    { value:"Australia/Queensland",name:"Australia/Queensland"},
    { value:"Etc/GMT-10",name:"Etc/GMT-10"},
    { value:"Pacific/Chuuk",name:"Pacific/Chuuk"},
    { value:"Pacific/Guam",name:"Pacific/Guam"},
    { value:"Pacific/Port_Moresby",name:"Pacific/Port_Moresby"},
    { value:"Pacific/Saipan",name:"Pacific/Saipan"},
    { value:"Pacific/Truk",name:"Pacific/Truk"},
    { value:"Pacific/Yap",name:"Pacific/Yap"},
    { value:"Australia/Adelaide",name:"Australia/Adelaide"},
    { value:"Australia/Broken_Hill",name:"Australia/Broken_Hill"},
    { value:"Australia/South",name:"Australia/South"},
    { value:"Australia/Yancowinna",name:"Australia/Yancowinna"},
    { value:"Antarctica/Macquarie",name:"Antarctica/Macquarie"},
    { value:"Asia/Magadan",name:"Asia/Magadan"},
    { value:"Asia/Sakhalin",name:"Asia/Sakhalin"},
    { value:"Asia/Srednekolymsk",name:"Asia/Srednekolymsk"},
    { value:"Australia/ACT",name:"Australia/ACT"},
    { value:"Australia/Canberra",name:"Australia/Canberra"},
    { value:"Australia/Currie",name:"Australia/Currie"},
    { value:"Australia/Hobart",name:"Australia/Hobart"},
    { value:"Australia/LHI",name:"Australia/LHI"},
    { value:"Australia/Lord_Howe",name:"Australia/Lord_Howe"},
    { value:"Australia/Melbourne",name:"Australia/Melbourne"},
    { value:"Australia/NSW",name:"Australia/NSW"},
    { value:"Australia/Sydney",name:"Australia/Sydney"},
    { value:"Australia/Tasmania",name:"Australia/Tasmania"},
    { value:"Australia/Victoria",name:"Australia/Victoria"},
    { value:"Etc/GMT-11",name:"Etc/GMT-11"},
    { value:"Pacific/Bougainville",name:"Pacific/Bougainville"},
    { value:"Pacific/Efate",name:"Pacific/Efate"},
    { value:"Pacific/Guadalcanal",name:"Pacific/Guadalcanal"},
    { value:"Pacific/Kosrae",name:"Pacific/Kosrae"},
    { value:"Pacific/Norfolk",name:"Pacific/Norfolk"},
    { value:"Pacific/Noumea",name:"Pacific/Noumea"},
    { value:"Pacific/Pohnpei",name:"Pacific/Pohnpei"},
    { value:"Pacific/Ponape",name:"Pacific/Ponape"},
    { value:"Asia/Anadyr",name:"Asia/Anadyr"},
    { value:"Asia/Kamchatka",name:"Asia/Kamchatka"},
    { value:"Etc/GMT-12",name:"Etc/GMT-12"},
    { value:"Kwajalein",name:"Kwajalein"},
    { value:"Pacific/Fiji",name:"Pacific/Fiji"},
    { value:"Pacific/Funafuti",name:"Pacific/Funafuti"},
    { value:"Pacific/Kwajalein",name:"Pacific/Kwajalein"},
    { value:"Pacific/Majuro",name:"Pacific/Majuro"},
    { value:"Pacific/Nauru",name:"Pacific/Nauru"},
    { value:"Pacific/Tarawa",name:"Pacific/Tarawa"},
    { value:"Pacific/Wake",name:"Pacific/Wake"},
    { value:"Pacific/Wallis",name:"Pacific/Wallis"},
    { value:"Antarctica/McMurdo",name:"Antarctica/McMurdo"},
    { value:"Antarctica/South_Pole",name:"Antarctica/South_Pole"},
    { value:"Etc/GMT-13",name:"Etc/GMT-13"},
    { value:"NZ",name:"NZ"},
    { value:"Pacific/Auckland",name:"Pacific/Auckland"},
    { value:"Pacific/Enderbury",name:"Pacific/Enderbury"},
    { value:"Pacific/Fakaofo",name:"Pacific/Fakaofo"},
    { value:"Pacific/Tongatapu",name:"Pacific/Tongatapu"},
    { value:"NZ-CHAT",name:"NZ-CHAT"},
    { value:"Pacific/Chatham",name:"Pacific/Chatham"},
    { value:"Etc/GMT-14",name:"Etc/GMT-14"},
    { value:"Pacific/Apia",name:"Pacific/Apia"},
    { value:"Pacific/Kiritimati",name:"Pacific/Kiritimati"},
    { value:"Atlantic/Cape_Verde",name:"Atlantic/Cape_Verde"},
    { value:"Etc/GMT+1",name:"Etc/GMT+1"},
    { value:"America/Godthab",name:"America/Godthab"},
    { value:"America/Miquelon",name:"America/Miquelon"},
    { value:"America/Noronha",name:"America/Noronha"},
    { value:"Atlantic/South_Georgia",name:"Atlantic/South_Georgia"},
    { value:"Brazil/DeNoronha",name:"Brazil/DeNoronha"},
    { value:"Etc/GMT+2",name:"Etc/GMT+2"},
    { value:"America/St_Johns",name:"America/St_Johns"},
    { value:"Canada/Newfoundland",name:"Canada/Newfoundland"},
    { value:"America/Araguaina",name:"America/Araguaina"},
    { value:"America/Argentina/Buenos_Aires",name:"America/Argentina/Buenos_Aires"},
    { value:"America/Argentina/Catamarca",name:"America/Argentina/Catamarca"},
    { value:"America/Argentina/ComodRivadavia",name:"America/Argentina/ComodRivadavia"},
    { value:"America/Argentina/Cordoba",name:"America/Argentina/Cordoba"},
    { value:"America/Argentina/Jujuy",name:"America/Argentina/Jujuy"},
    { value:"America/Argentina/La_Rioja",name:"America/Argentina/La_Rioja"},
    { value:"America/Argentina/Mendoza",name:"America/Argentina/Mendoza"},
    { value:"America/Argentina/Rio_Gallegos",name:"America/Argentina/Rio_Gallegos"},
    { value:"America/Argentina/Salta",name:"America/Argentina/Salta"},
    { value:"America/Argentina/San_Juan",name:"America/Argentina/San_Juan"},
    { value:"America/Argentina/San_Luis",name:"America/Argentina/San_Luis"},
    { value:"America/Argentina/Tucuman",name:"America/Argentina/Tucuman"},
    { value:"America/Argentina/Ushuaia",name:"America/Argentina/Ushuaia"},
    { value:"America/Bahia",name:"America/Bahia"},
    { value:"America/Belem",name:"America/Belem"},
    { value:"America/Buenos_Aires",name:"America/Buenos_Aires"},
    { value:"America/Catamarca",name:"America/Catamarca"},
    { value:"America/Cayenne",name:"America/Cayenne"},
    { value:"America/Cordoba",name:"America/Cordoba"},
    { value:"America/Fortaleza",name:"America/Fortaleza"},
    { value:"America/Glace_Bay",name:"America/Glace_Bay"},
    { value:"America/Goose_Bay",name:"America/Goose_Bay"},
    { value:"America/Halifax",name:"America/Halifax"},
    { value:"America/Jujuy",name:"America/Jujuy"},
    { value:"America/Maceio",name:"America/Maceio"},
    { value:"America/Mendoza",name:"America/Mendoza"},
    { value:"America/Moncton",name:"America/Moncton"},
    { value:"America/Montevideo",name:"America/Montevideo"},
    { value:"America/Paramaribo",name:"America/Paramaribo"},
    { value:"America/Recife",name:"America/Recife"},
    { value:"America/Rosario",name:"America/Rosario"},
    { value:"America/Santarem",name:"America/Santarem"},
    { value:"America/Santiago",name:"America/Santiago"},
    { value:"America/Sao_Paulo",name:"America/Sao_Paulo"},
    { value:"America/Thule",name:"America/Thule"},
    { value:"Antarctica/Palmer",name:"Antarctica/Palmer"},
    { value:"Antarctica/Rothera",name:"Antarctica/Rothera"},
    { value:"Atlantic/Bermuda",name:"Atlantic/Bermuda"},
    { value:"Atlantic/Stanley",name:"Atlantic/Stanley"},
    { value:"Brazil/East",name:"Brazil/East"},
    { value:"Canada/Atlantic",name:"Canada/Atlantic"},
    { value:"Chile/Continental",name:"Chile/Continental"},
    { value:"Etc/GMT+3",name:"Etc/GMT+3"},
    { value:"America/Anguilla",name:"America/Anguilla"},
    { value:"America/Antigua",name:"America/Antigua"},
    { value:"America/Aruba",name:"America/Aruba"},
    { value:"America/Asuncion",name:"America/Asuncion"},
    { value:"America/Barbados",name:"America/Barbados"},
    { value:"America/Blanc-Sablon",name:"America/Blanc-Sablon"},
    { value:"America/Boa_Vista",name:"America/Boa_Vista"},
    { value:"America/Campo_Grande",name:"America/Campo_Grande"},
    { value:"America/Caracas",name:"America/Caracas"},
    { value:"America/Cuiaba",name:"America/Cuiaba"},
    { value:"America/Curacao",name:"America/Curacao"},
    { value:"America/Detroit",name:"America/Detroit"},
    { value:"America/Dominica",name:"America/Dominica"},
    { value:"America/Fort_Wayne",name:"America/Fort_Wayne"},
    { value:"America/Grand_Turk",name:"America/Grand_Turk"},
    { value:"America/Grenada",name:"America/Grenada"},
    { value:"America/Guadeloupe",name:"America/Guadeloupe"},
    { value:"America/Guyana",name:"America/Guyana"},
    { value:"America/Havana",name:"America/Havana"},
    { value:"America/Indiana/Indianapolis",name:"America/Indiana/Indianapolis"},
    { value:"America/Indiana/Marengo",name:"America/Indiana/Marengo"},
    { value:"America/Indiana/Petersburg",name:"America/Indiana/Petersburg"},
    { value:"America/Indiana/Vevay",name:"America/Indiana/Vevay"},
    { value:"America/Indiana/Vincennes",name:"America/Indiana/Vincennes"},
    { value:"America/Indiana/Winamac",name:"America/Indiana/Winamac"},
    { value:"America/Indianapolis",name:"America/Indianapolis"},
    { value:"America/Iqaluit",name:"America/Iqaluit"},
    { value:"America/Kentucky/Louisville",name:"America/Kentucky/Louisville"},
    { value:"America/Kentucky/Monticello",name:"America/Kentucky/Monticello"},
    { value:"America/Kralendijk",name:"America/Kralendijk"},
    { value:"America/La_Paz",name:"America/La_Paz"},
    { value:"America/Louisville",name:"America/Louisville"},
    { value:"America/Lower_Princes",name:"America/Lower_Princes"},
    { value:"America/Manaus",name:"America/Manaus"},
    { value:"America/Marigot",name:"America/Marigot"},
    { value:"America/Martinique",name:"America/Martinique"},
    { value:"America/Montreal",name:"America/Montreal"},
    { value:"America/Montserrat",name:"America/Montserrat"},
    { value:"America/Nassau",name:"America/Nassau"},
    { value:"America/New_York",name:"America/New_York"},
    { value:"America/Nipigon",name:"America/Nipigon"},
    { value:"America/Pangnirtung",name:"America/Pangnirtung"},
    { value:"America/Port_of_Spain",name:"America/Port_of_Spain"},
    { value:"America/Porto_Velho",name:"America/Porto_Velho"},
    { value:"America/Puerto_Rico",name:"America/Puerto_Rico"},
    { value:"America/Santo_Domingo",name:"America/Santo_Domingo"},
    { value:"America/St_Barthelemy",name:"America/St_Barthelemy"},
    { value:"America/St_Kitts",name:"America/St_Kitts"},
    { value:"America/St_Lucia",name:"America/St_Lucia"},
    { value:"America/St_Thomas",name:"America/St_Thomas"},
    { value:"America/St_Vincent",name:"America/St_Vincent"},
    { value:"America/Thunder_Bay",name:"America/Thunder_Bay"},
    { value:"America/Toronto",name:"America/Toronto"},
    { value:"America/Tortola",name:"America/Tortola"},
    { value:"America/Virgin",name:"America/Virgin"},
    { value:"Brazil/West",name:"Brazil/West"},
    { value:"Canada/Eastern",name:"Canada/Eastern"},
    { value:"Cuba",name:"Cuba"},
    { value:"EST5EDT",name:"EST5EDT"},
    { value:"Etc/GMT+4",name:"Etc/GMT+4"},
    { value:"US/East-Indiana",name:"US/East-Indiana"},
    { value:"US/Eastern",name:"US/Eastern"},
    { value:"US/Michigan",name:"US/Michigan"},
    { value:"America/Atikokan",name:"America/Atikokan"},
    { value:"America/Bogota",name:"America/Bogota"},
    { value:"America/Cancun",name:"America/Cancun"},
    { value:"America/Cayman",name:"America/Cayman"},
    { value:"America/Chicago",name:"America/Chicago"},
    { value:"America/Coral_Harbour",name:"America/Coral_Harbour"},
    { value:"America/Eirunepe",name:"America/Eirunepe"},
    { value:"America/Guayaquil",name:"America/Guayaquil"},
    { value:"America/Indiana/Knox",name:"America/Indiana/Knox"},
    { value:"America/Indiana/Tell_City",name:"America/Indiana/Tell_City"},
    { value:"America/Jamaica",name:"America/Jamaica"},
    { value:"America/Knox_IN",name:"America/Knox_IN"},
    { value:"America/Lima",name:"America/Lima"},
    { value:"America/Matamoros",name:"America/Matamoros"},
    { value:"America/Menominee",name:"America/Menominee"},
    { value:"America/North_Dakota/Beulah",name:"America/North_Dakota/Beulah"},
    { value:"America/North_Dakota/Center",name:"America/North_Dakota/Center"},
    { value:"America/North_Dakota/New_Salem",name:"America/North_Dakota/New_Salem"},
    { value:"America/Panama",name:"America/Panama"},
    { value:"America/Port-au-Prince",name:"America/Port-au-Prince"},
    { value:"America/Porto_Acre",name:"America/Porto_Acre"},
    { value:"America/Rainy_River",name:"America/Rainy_River"},
    { value:"America/Rankin_Inlet",name:"America/Rankin_Inlet"},
    { value:"America/Resolute",name:"America/Resolute"},
    { value:"America/Rio_Branco",name:"America/Rio_Branco"},
    { value:"America/Winnipeg",name:"America/Winnipeg"},
    { value:"Brazil/Acre",name:"Brazil/Acre"},
    { value:"CST6CDT",name:"CST6CDT"},
    { value:"Canada/Central",name:"Canada/Central"},
    { value:"Chile/EasterIsland",name:"Chile/EasterIsland"},
    { value:"EST",name:"EST"},
    { value:"Etc/GMT+5",name:"Etc/GMT+5"},
    { value:"Jamaica",name:"Jamaica"},
    { value:"Pacific/Easter",name:"Pacific/Easter"},
    { value:"US/Central",name:"US/Central"},
    { value:"US/Indiana-Starke",name:"US/Indiana-Starke"},
    { value:"America/Bahia_Banderas",name:"America/Bahia_Banderas"},
    { value:"America/Belize",name:"America/Belize"},
    { value:"America/Boise",name:"America/Boise"},
    { value:"America/Cambridge_Bay",name:"America/Cambridge_Bay"},
    { value:"America/Costa_Rica",name:"America/Costa_Rica"},
    { value:"America/Denver",name:"America/Denver"},
    { value:"America/Edmonton",name:"America/Edmonton"},
    { value:"America/El_Salvador",name:"America/El_Salvador"},
    { value:"America/Guatemala",name:"America/Guatemala"},
    { value:"America/Inuvik",name:"America/Inuvik"},
    { value:"America/Managua",name:"America/Managua"},
    { value:"America/Merida",name:"America/Merida"},
    { value:"America/Mexico_City",name:"America/Mexico_City"},
    { value:"America/Monterrey",name:"America/Monterrey"},
    { value:"America/Ojinaga",name:"America/Ojinaga"},
    { value:"America/Regina",name:"America/Regina"},
    { value:"America/Shiprock",name:"America/Shiprock"},
    { value:"America/Swift_Current",name:"America/Swift_Current"},
    { value:"America/Tegucigalpa",name:"America/Tegucigalpa"},
    { value:"America/Yellowknife",name:"America/Yellowknife"},
    { value:"Canada/East-Saskatchewan",name:"Canada/East-Saskatchewan"},
    { value:"Canada/Mountain",name:"Canada/Mountain"},
    { value:"Canada/Saskatchewan",name:"Canada/Saskatchewan"},
    { value:"Etc/GMT+6",name:"Etc/GMT+6"},
    { value:"MST7MDT",name:"MST7MDT"},
    { value:"Mexico/General",name:"Mexico/General"},
    { value:"Navajo",name:"Navajo"},
    { value:"Pacific/Galapagos",name:"Pacific/Galapagos"},
    { value:"US/Mountain",name:"US/Mountain"},
    { value:"America/Chihuahua",name:"America/Chihuahua"},
    { value:"America/Creston",name:"America/Creston"},
    { value:"America/Dawson",name:"America/Dawson"},
    { value:"America/Dawson_Creek",name:"America/Dawson_Creek"},
    { value:"America/Ensenada",name:"America/Ensenada"},
    { value:"America/Fort_Nelson",name:"America/Fort_Nelson"},
    { value:"America/Hermosillo",name:"America/Hermosillo"},
    { value:"America/Los_Angeles",name:"America/Los_Angeles"},
    { value:"America/Mazatlan",name:"America/Mazatlan"},
    { value:"America/Phoenix",name:"America/Phoenix"},
    { value:"America/Santa_Isabel",name:"America/Santa_Isabel"},
    { value:"America/Tijuana",name:"America/Tijuana"},
    { value:"America/Vancouver",name:"America/Vancouver"},
    { value:"America/Whitehorse",name:"America/Whitehorse"},
    { value:"Canada/Pacific",name:"Canada/Pacific"},
    { value:"Canada/Yukon",name:"Canada/Yukon"},
    { value:"Etc/GMT+7",name:"Etc/GMT+7"},
    { value:"MST",name:"MST"},
    { value:"Mexico/BajaNorte",name:"Mexico/BajaNorte"},
    { value:"Mexico/BajaSur",name:"Mexico/BajaSur"},
    { value:"PST8PDT",name:"PST8PDT"},
    { value:"US/Arizona",name:"US/Arizona"},
    { value:"US/Pacific",name:"US/Pacific"},
    { value:"US/Pacific-New",name:"US/Pacific-New"},
    { value:"America/Anchorage",name:"America/Anchorage"},
    { value:"America/Juneau",name:"America/Juneau"},
    { value:"America/Metlakatla",name:"America/Metlakatla"},
    { value:"America/Nome",name:"America/Nome"},
    { value:"America/Sitka",name:"America/Sitka"},
    { value:"America/Yakutat",name:"America/Yakutat"},
    { value:"Etc/GMT+8",name:"Etc/GMT+8"},
    { value:"Pacific/Pitcairn",name:"Pacific/Pitcairn"},
    { value:"US/Alaska",name:"US/Alaska"},
    { value:"America/Adak",name:"America/Adak"},
    { value:"America/Atka",name:"America/Atka"},
    { value:"Etc/GMT+9",name:"Etc/GMT+9"},
    { value:"Pacific/Gambier",name:"Pacific/Gambier"},
    { value:"US/Aleutian",name:"US/Aleutian"},
    { value:"Pacific/Marquesas",name:"Pacific/Marquesas"},
    { value:"Etc/GMT+10",name:"Etc/GMT+10"},
    { value:"HST",name:"HST"},
    { value:"Pacific/Honolulu",name:"Pacific/Honolulu"},
    { value:"Pacific/Johnston",name:"Pacific/Johnston"},
    { value:"Pacific/Rarotonga",name:"Pacific/Rarotonga"},
    { value:"Pacific/Tahiti",name:"Pacific/Tahiti"},
    { value:"US/Hawaii",name:"US/Hawaii"},
    { value:"Etc/GMT+11",name:"Etc/GMT+11"},
    { value:"Pacific/Midway",name:"Pacific/Midway"},
    { value:"Pacific/Niue",name:"Pacific/Niue"},
    { value:"Pacific/Pago_Pago",name:"Pacific/Pago_Pago"},
    { value:"Pacific/Samoa",name:"Pacific/Samoa"},
    { value:"US/Samoa",name:"US/Samoa"},
    { value:"Etc/GMT+12",name:"Etc/GMT+12"},                        
                           

  ]
  target:any = {
    id: '',
    name: '',
    type: ''
  };
  webpage:any = {uniqueid: ''};
  templateobj:any = {uniqueid: ''};
  page_general_tab:any = 'info';
  main:any = {id: 'kb-main', name: 'New Page', title: 'New Page', path: 'new-page', description: 'This page is built using Keabuilder.', keywords: [], page_code: '', author: '', meta_img: '', type: 'main', publish_status: true, style: {desktop:'', tablet_h:'', tablet_v:'', mobile:'', hover: ''}};
  page_name = '';
  page_title = '';
  page_path = '';
  page_code = '';
  description = '';
  keywords:any = [];
  author = '';
  meta_img = '';
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  lastDevList:any;
  respDevices:any = {
    'desktop': {name:'desktop', width:''},
    'tablet-h':{name:'tablet-h', width:'1024px'},
    'tablet-v':{name:'tablet-v', width:'768px'},
    'mobile':{name:'mobile', width:'425px'},
    'hover': {name:'hover', width:''},
  };
  respToggleDevice:any = this.respDevices['desktop'];
  undoRedo:any = {toggle: false, open: false, close: false};
  allBlocksIds:Array<number> = [];
  selectedBlock:any = {};
  showBackToRowOption:boolean = false;
  sideFloatBtnAnim = {open: false, close: false};
  blockSelection:string = '';
  imgSelection:boolean = false;
  minimize:boolean=false;
  expand:boolean= false;
  screenWidth:any;
  screenHeight:any;
  showEditor:boolean = false;
  selectedTab:any;
  expPanelStep = 0;
  config: any = {
    height: 250,
    placeholder: 'Enter your text here...',
    plugins:
      'autoresize image print preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen link template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars',
    toolbar:
      'undo redo | bold italic underline strikethrough link blockquote | formatselect fontselect fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist table outdent indent charmap | code',
    content_css: [
      // '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      // '//www.tinymce.com/css/codepen.min.css',
    ],
    // images_upload_base_path: '/some/basepath',
    // images_upload_credentials: true,
    // images_upload_url: '/api/uploadfile',
    // images_upload_handler: function (blobInfo:any, success:any, failure:any) {
    //   setTimeout(function () {
    //     success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
    //   }, 2000);
    // },
    importcss_append: true,
    menubar: false,
    statusbar: false,
    branding: false,
    setup: (editor: { ui: any; }) => {
      // console.log(editor.ui);
    },
    diskCache: true,
  };
  pagestyling = {desktop: '', tablet_h: '', tablet_v: '', mobile: '', hover: ''};
  parser = new DOMParser();
  loading = {
    success: false,
    error: false
  };
  savingPage:boolean = false;
  saveDisabled:boolean = false;
  pathError:boolean = false;
  sectionTemplates:any = [];
  order_forms:any = [];
  offers:any = [];
  courses:any =[];
  login:any=[];
  forms:any = [];
  menus:any = [];
  headers:any = [];
  footers:any = [];
  deletedMenuIds:any = [];
  selectedMenu:any = {};
  selectedHeader:any = {};
  selectedFooter:any = {};
  existwebpages:any = [];
  funnels:any = [];
  step_products:any = [];
  menu_target_types = [
    { name: 'same tab', value: '_self' },
    { name: 'new tab', value: '_blank' },
    // { name: 'linked new tab', value: 'framename' },
  ];
  templatesUpdated = new BehaviorSubject(false);
  filterOrder:any = [{icon: 'ascending', name:'Ascending By Name', value: 'asc', type: 'name'}, {icon: 'ascending', name:'Ascending By Date', value: 'asc', type: 'id'}, {icon: 'descending', name:'Descending By Name', value: 'desc', type: 'name'}, {icon: 'descending', name:'Descending By Date', value: 'desc', type: 'id'}];
  searchFilter:any = this.filterOrder[3];
  pageSaved:boolean = true;

  constructor(private _location: Location, public userService: UserService, private _snackBar: MatSnackBar, 
    public _file: FileUploadService, public tokenStorageService: TokenStorageService, public authService: AuthService, 
    public webPageService: WebpagesService, public websiteService: WebsiteService, public funnelService: FunnelService, 
    private _offer: OfferService, private _orderForm: OrderformService,private _navigationService : NavigationService,
    private _course: CourseService,) {
    if(this.tokenStorageService.getToken()) {
        this.user = this.tokenStorageService.getUser();
        this.userService.getUsersDetails().subscribe(data=>{
        this.user = {...this.user, ...data.data[0]};
        this.user.name = this.user.username;
        this.main.author = this.user.name;
        this.screenWidth = window.innerWidth;  
        this.screenHeight = window.innerHeight; 
      })
    }
  }

  fetchSectionTemplates() {
    return new Promise<any>((resolve, reject) => {
      this._file.fetchsectiontemplates().subscribe((data:any)=>{
        this.sectionTemplates = data.data;
        this.templatesUpdated.next(!this.templatesUpdated.value);
        resolve(true);
      })
    });
  }

  fetchMenus() {
    return new Promise<any>((resolve, reject) => {
      this._navigationService.fetchNavigations().subscribe((resp:any)=>{
        if(resp.success) {
          this.menus = resp.data;
          resolve(this.menus);
        }
        else resolve(this.menus);
       })
    })
  }

  fetchHeaders() {
    return new Promise<any>((resolve, reject) => {
      this._file.fetchheaders().subscribe((resp:any)=>{
        resolve(resp.data);
      })
    })
  }

  fetchFooters() {
    return new Promise<any>((resolve, reject) => {
      this._file.fetchfooters().subscribe((resp:any)=>{
        resolve(resp.data);
      })
    })
  }

  fetchForms() {
    return new Promise<any>((resolve, reject) => {
      this._file.fetchforms().subscribe((resp:any)=>{
        resolve(resp.data);
      })
    })
  }

  fetchOffers() {
    return new Promise<any>((resolve, reject) => {
      this._offer.fetchoffers().subscribe((resp:any)=>{
        resolve(resp.data);
      })
    })
  }
  fetchCourses() {
    return new Promise<any>((resolve, reject) => {
      this._course.allcourses().subscribe((resp:any)=>{
        resolve(resp.data);
      })
    })
  }

  fetchOrderForms() {
    return new Promise<any>((resolve, reject) => {
      this._orderForm.fetchorderforms().subscribe((resp:any)=>{
        resolve(resp.data);
      })
    })
  }

  getBuilderData(id:any) {
    return new Promise<any>((resolve, reject) => {
      this.fetchForms().then(data=>{
        this.forms = data;
      });
      this.fetchMenus().then(data=>{
        this.menus = data;
        if(this.target.type != 'header' && this.target.type != 'footer') {
          this.fetchHeaders().then(data=>{
            this.headers = data;
          })
          this.fetchFooters().then(data=>{
            this.footers = data;
          })
        }
        if(this.target.type == 'website') {
          this.webPageService.getSingleWebpage(id).subscribe(
            (e:any)=>{
              this.setBuilder(e).then(resp=>{
                resolve(resp);
              })
            },
            (err:any) => {
              this.loading.error = true;
              resolve(false);
            }
          )
        }
        else if(this.target.type == 'funnel') {
          this.funnelService.getSingleFunnelpage(id).subscribe(
            (e:any)=>{
              this.setBuilder(e).then(resp=>{
                resolve(resp);
              })
            },
            (err:any) => {
              this.loading.error = true;
              resolve(false);
            }
          )
        }
        // membeship
        else if(this.target.type == 'header') {
          this._file.getheader(id).subscribe((resp:any)=>{
            resolve(resp.data[0]);
          })
        }
        else if(this.target.type == 'footer') {
          this._file.getfooter(id).subscribe((resp:any)=>{
            resolve(resp.data[0]);
          })
        }
        else if(this.target.type == 'membership') {
          this._course.getSingleMembershippage(id).subscribe(
            (e:any)=>{
              this.setBuilder(e).then(resp=>{
                resolve(resp);
              })
            },
            (err:any) => {
              this.loading.error = true;
              resolve(false);
            }
          )
        }
        else resolve(false);
      });
    })
  }

  setHeader(headid:any) {
    return new Promise<any>((resolve, reject) => {
      this.selectedHeader = {id: headid};
      this.includeLayout.header = true;
      resolve(true);
    })
  }

  setFooter(footid:any) {
    return new Promise<any>((resolve, reject) => {
      this.selectedFooter = {id: footid};
      this.includeLayout.footer = true;
      resolve(true);
    })
  }
  
  setBuilder(e:any) {
    return new Promise<any>((resolve, reject) => {
      if(e.data.length == 0) {
        this.redirectToPageNotFound();
        reject(e);
      }
      else {
        this.webpage = e.data[0];
        this.main.name = this.webpage.page_name;
        this.main.title = this.webpage.page_title;
        this.main.path = this.webpage.page_path;
        this.main.website_id = this.webpage.funnelid ? this.webpage.funnelid : this.webpage.website_id;
        if(this.webpage.page_description) this.main.description = this.webpage.page_description;
        if(this.webpage.page_keywords) this.main.keywords = this.webpage.page_keywords.split(',');
        this.main.author = this.webpage.page_author;
        var status = this.webpage.publish_status == 1;
        this.main.publish_status = status;
        this.main.dir = status ? 'pages' : 'drafts';
        this.active_domain = 'https://'+e.domain+'/';
        resolve(e);
      }
    })
  }

  preview() {
    var uniqueid = this.target.type == 'funnel' ? this.webpage.funnelid : this.webpage.website_id;
    if(this.target.type == 'membership') uniqueid = 'login_view';
    window.open(window.location.protocol+'//'+window.location.host+'/preview/'+this.target.type+'/'+this.user.uniqueid+'/'+uniqueid+'/'+this.webpage.uniqueid, 'framename');
  }

  saveHeaderFooter(sections:any) {
    this.pagestyling = {desktop: '', tablet_h: '', tablet_v: '', mobile: '', hover: ''};
    return new Promise<any>((resolve, reject) => {
      this.setPageStyle(sections);
      var dbobj:any = new Object();
      dbobj.name = this.target.name;
      dbobj.uniqueid = this.target.id;
      var jsonObj = {sections: sections, style: this.getAllStyle()};
      dbobj.json = this.encodeJSON(jsonObj);
      if(this.target.type == 'header') {
        this._file.updateheader(dbobj).subscribe((resp:any)=>{
          this.pageSaved = true;
          resolve(resp.success);
        })
      }
      else if(this.target.type == 'footer') {
        this._file.updatefooter(dbobj).subscribe((resp:any)=>{
          this.pageSaved = true;
          resolve(resp.success);
        })
      }
    });
  }

  saveHTML(sections:any, preview:boolean, template:boolean) {
    return new Promise<any>((resolve, reject) => {
      this.pagestyling = {desktop: '', tablet_h: '', tablet_v: '', mobile: '', hover: ''};
      this.setPageStyle(sections);
      var jsonObj = {head: {}, header: false, footer: false, mainstyle: this.main.style, sections: sections};
      if(this.includeLayout.header && this.selectedHeader.id) jsonObj.header = this.selectedHeader;
      if(this.includeLayout.footer && this.selectedFooter.id) jsonObj.footer = this.selectedFooter;
      jsonObj.head = {
        title: this.main.title,
        author: this.main.author,
        keywords: this.main.keywords,
        description: this.main.description,
        page_code: this.main.page_code,
        style: this.getAllStyle(),
      }
      this.webpage.page_json = this.encodeJSON(jsonObj);
      if(template) {
        this.templateobj.template=this.encodeJSON(jsonObj);
        this._file.savepagetemplate(this.templateobj).subscribe((res1:any)=>{
          if(res1.success) resolve(true);
          else {
            this.openSnackBar(true, 'Server Error!', 'OK', 'center', 'top');
            resolve(false);
          }
        })
      }
      else if(preview) {
        this.savePreview();
      }
      else {
        this.savePage().then(resp=>resolve(resp));
      }
    });
  }

  savePreview() {
    return new Promise<any>((resolve, reject) => {
      let prevObj = {
        id: this.webpage.id,
        preview_json: this.webpage.page_json,
      }
      if(this.target.type == 'website'){
        this.webPageService.savePreview(prevObj).subscribe((resp:any)=>{
          if(resp.success) resolve(true);
          else resolve(false);
        }); 
      }
      else if(this.target.type == 'funnel'){
        this.funnelService.saveFunnelPreview(prevObj).subscribe((resp:any)=>{
          if(resp.success) resolve(true);
          else resolve(false);
        }); 
      }
      else if(this.target.type == 'membership'){
        this._course.savememberPreview(prevObj).subscribe((resp:any)=>{
          if(resp.success) resolve(true);
          else resolve(false);
        }); 
      }
      else resolve(false);
    })
  }

  savePage() {
    return new Promise<any>((resolve, reject) => {
      this.updatePageDB().then(e=>{
        if(e.found == 1) {
          this.pathError = true;
          resolve(false);
        }
        else {
          if(e.success == 1) {
            this.pageSaved = true;
            resolve(true);
          }
          else {
            this.openSnackBar(true, 'Server Error!', 'OK', 'center', 'top');
            resolve(false);
          }
        }
      })
    })
  }

  updatePageDB() {
    return new Promise<any>((resolve, reject) => {
      var status = this.main.publish_status;
      var dbobj:any = {
        id: this.webpage.id,
        uniqueid: this.webpage.uniqueid,
        page_name: this.main.name,
        page_title: this.main.title,
        page_path: this.main.path,
        page_description: this.main.description,
        page_keywords: this.main.keywords ? this.main.keywords.join(',') : '',
        page_author: this.main.author,
        page_json: this.webpage.page_json,
        publish_status: status ? 1 : 0,
      }
      if(this.target.type == 'website'){
        this.webPageService.updateWebpage(dbobj).subscribe(
          (e:any)=>{
            resolve(e);
        })
      }
      else if(this.target.type == 'funnel'){
        dbobj.funneltype = this.webpage.funneltype;
        this.funnelService.updatefunnelpage(dbobj).subscribe(
          (e:any)=>{
            resolve(e);
          })
      }
      if(this.target.type == 'membership'){
        this._course.updatemembershiploginpage(dbobj).subscribe(
          (e:any)=>{
            console.log(e)
            resolve(e);
        })
      }
      else resolve(false);
    })
  }

  getAllStyle() {
    var querry = '@media only screen and (max-width:';
    return this.pagestyling.desktop + this.pagestyling.hover +
    querry + '1024px) and (min-width:769px){'+this.pagestyling.tablet_h+'}' +
    querry + '768px) and (min-width:426px){'+this.pagestyling.tablet_v+'}' +
    querry + '426px){'+this.pagestyling.mobile+'}';
  }

  setPageStyle(sections:any) {
    if(this.target.type == 'website' || this.target.type == 'funnel') this.blockStyling(this.main);
    sections.forEach((sec:any)=>{
      this.blockStyling(sec);
      sec.rowArr.forEach((row:any)=>{
        this.blockStyling(row);
        row.columnArr.forEach((col:any)=>{
          this.blockStyling(col);
          col.elementArr.forEach((ele:any)=>{
            if(ele.content.name != 'form-component' && ele.content.name != 'order-form-component' && ele.content.name != 'code') this.elementStyling(ele);
            if(ele.content?.item) {
              var tempObj = JSON.parse(JSON.stringify(ele.content.item))
              var pseudoEle:string = '';
              if(ele.content.name == 'menu') {
                pseudoEle = '>ul.kb-menu a';
                tempObj.dropdownid = ele.id + ' .kb-element-content .kb-menu-resp .kb-menu-content>ul.kb-menu a';
              }
              tempObj.id = ele.id + ' .kb-element-content ' + pseudoEle;
              this.blockStyling(tempObj);
            }
          })
        })
      })
    })
  }

  blockStyling(block:any) {
    this.pagestyling.desktop += '#' + block.id + '{' + Object.entries(block.style.desktop).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(!this.isObjEmpty(block.style.tablet_h)) this.pagestyling.tablet_h += '#' + block.id + '{' + Object.entries(block.style.tablet_h).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(!this.isObjEmpty(block.style.tablet_v)) this.pagestyling.tablet_v += '#' + block.id + '{' + Object.entries(block.style.tablet_v).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(!this.isObjEmpty(block.style.mobile)) this.pagestyling.mobile += '#' + block.id + '{' + Object.entries(block.style.mobile).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(!this.isObjEmpty(block.style.hover)) this.pagestyling.hover += '#' + block.id + ':hover{' + Object.entries(block.style.hover).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(!this.isObjEmpty(block.style.dropdown)) this.pagestyling.desktop += '#' + block.dropdownid + '{' + Object.entries(block.style.dropdown).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(block.type == 'row') {
      var clmwrp = ['#' + block.id + ' .kb-column-wrap{gap:', 'rem;}'];
      if(block.columnGap.desktop) this.pagestyling.desktop += clmwrp.join(block.columnGap.desktop);
      if(block.columnGap.tablet_h != 'auto') this.pagestyling.tablet_h += clmwrp.join(block.columnGap.tablet_h);
      if(block.columnGap.tablet_v != 'auto') this.pagestyling.tablet_v += clmwrp.join(block.columnGap.tablet_v);
      if(block.columnGap.mobile != 'auto') this.pagestyling.mobile += clmwrp.join(block.columnGap.mobile);
    }
  }

  getSelector(ele:any) {
    if(ele.content.name == 'text' || ele.content.name == 'heading') return '> div';
    else if(ele.content.name == 'divider') return '> hr';
    else if(ele.content.name == 'image') return 'img';
    else if(ele.content.name == 'button') return 'a';
    else if(ele.content.name == 'menu') return '>ul.kb-menu';
    else if(ele.content.name == 'video') return ele.type == 'video' ? 'video' : '> div';
    else return '';
  }

  elementStyling(ele:any) {
    var pseudoEle:string = this.getSelector(ele);
    var selector = '#' + ele.id + ' .kb-element-content ' + pseudoEle;
    var style = JSON.parse(JSON.stringify(ele.content.style));

    var elestl = {
      selector: '#'+ele.id+'{',
      jc: 'justify-content:',
      mar: 'margin:'
    }

    var itemAlign = {
      desk: ele.item_alignment.desktop,
      tabh: ele.item_alignment.tablet_h,
      tabv: ele.item_alignment.tablet_v,
      mob: ele.item_alignment.mobile
    }

    var margin = {
      desk: style.desktop.margin,
      tabh: style.tablet_h.margin,
      tabv: style.tablet_v.margin,
      mob: style.mobile.margin,
      hov: style.hover?.margin,
      drop: style.hover?.margin,
    }

    margin.desk = margin.desk?.replace(/auto/g,'0px');
    if(margin.tabh) margin.tabh = margin.tabh?.replace(/auto/g,'0px');
    if(margin.tabv) margin.tabv = margin.tabv?.replace(/auto/g,'0px');
    if(margin.mob) style.mobile.margin = style.mobile.margin?.replace(/auto/g,'0px');
    if(margin.hov) style.hover.margin = style.hover.margin?.replace(/auto/g,'0px');
    if(margin.drop) style.dropdown.margin = style.dropdown.margin?.replace(/auto/g,'0px');

    var deskmar = margin.desk ? elestl.mar + margin.desk : '';
    var deskjc = itemAlign.desk ? elestl.jc + itemAlign.desk : '';
    this.pagestyling.desktop += elestl.selector + deskmar + ((deskmar && deskjc) ? ';' : '') + deskjc +';}';

    var tabhmar = margin.tabh ? elestl.mar + margin.tabh : '';
    var tabhjc = itemAlign.tabh ? elestl.jc + itemAlign.tabh : '';
    this.pagestyling.tablet_h += elestl.selector + tabhmar + ((tabhmar && tabhjc) ? ';' : '') + tabhjc + ';}';

    var tabvmar = margin.tabv ? elestl.mar + margin.tabv : '';
    var tabvjc = itemAlign.tabv ? elestl.jc + itemAlign.tabv : '';
    this.pagestyling.tablet_v += elestl.selector + tabvmar + ((tabvmar && tabvjc) ? ';' : '') + tabvjc + ';}';

    var mobmar = margin.mob ? elestl.mar + margin.mob : '';
    var mobjc = itemAlign.mob ? elestl.jc + itemAlign.mob : '';
    this.pagestyling.mobile += elestl.selector + mobmar + ((mobmar && mobjc) ? ';' : '') + mobjc + ';}';
    
    var hovmar = margin.hov ? elestl.mar + margin.hov : '';
    this.pagestyling.hover += elestl.selector + hovmar + ';}';

    delete style.desktop.margin;
    delete style.tablet_h.margin;
    delete style.tablet_v.margin;
    delete style.mobile.margin;
    delete style.hover?.margin;
    delete style.hover?.margin;

    this.pagestyling.desktop += selector + '{' + Object.entries({...style.desktop}).map(([a, b]) => `${a}:${b}`).join(';')+';}';

    if(!this.isObjEmpty(style.tablet_h)) {
      this.pagestyling.tablet_h += selector + '{' + Object.entries({...style.tablet_h}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
      if(ele.content.name == 'menu') {
        var hamsel = '#' + ele.id + ' .kb-element-content .kb-menu-resp .kb-menu-bar';
        this.pagestyling.tablet_h += hamsel + '{' + Object.entries({...style.tablet_h}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
      }
    }
    if(!this.isObjEmpty(style.tablet_v)) {
      this.pagestyling.tablet_v += selector + '{' + Object.entries({...style.tablet_v}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
      if(ele.content.name == 'menu') {
        var hamsel = '#' + ele.id + ' .kb-element-content .kb-menu-resp .kb-menu-bar';
        this.pagestyling.tablet_v += hamsel + '{' + Object.entries({...style.tablet_v}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
      }
    }
    if(!this.isObjEmpty(style.mobile)) {
      this.pagestyling.mobile += selector + '{' + Object.entries({...style.mobile}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
      if(ele.content.name == 'menu') {
        var hamsel = '#' + ele.id + ' .kb-element-content .kb-menu-resp .kb-menu-bar';
        this.pagestyling.mobile += hamsel + '{' + Object.entries({...style.mobile}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
      }
    }
    if(!this.isObjEmpty(style.hover)) {
      this.pagestyling.hover += selector + ':hover{' + Object.entries({...style.hover}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    }
    if(!this.isObjEmpty(style.dropdown)) {
        var tempsel = '#' + ele.id + ' .kb-element-content .kb-menu-resp .kb-menu-content>ul.kb-menu';
        this.pagestyling.desktop += tempsel + '{' + Object.entries({...style.dropdown}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    }

    if(ele.content.name == 'menu') {
      var hamsel = '#' + ele.id + ' .kb-element-content .kb-menu-resp .kb-menu-bar';
      this.pagestyling.desktop += hamsel + '{' + Object.entries({...style.desktop}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
      var ddSel = '#' + ele.id + ' .kb-element-content .kb-menu-resp {';
      this.pagestyling.tablet_v += ddSel + tabvjc + ';}';
      this.pagestyling.mobile += ddSel + mobjc + ';}';
    }
  }

  isObjEmpty(obj:any){
    return JSON.stringify(obj) === '{}' || obj === '' || !obj;
  }

  getAllWebPages() {
    this.webPageService.getWebpages().subscribe(resp=>{
      this.existwebpages = resp.data;
      //  console.log(resp.data);
    });
  }

  getAllFunnels() {
    this.funnelService.getallfunnelandstep().subscribe(data=>{
      var steps = data.data;
      this.funnels = data.data2;
      this.funnels.forEach((f:any)=>{
        f.steps = [];
        steps.forEach((s:any)=>{
          if(f.uniqueid == s.funnelid) f.steps.push(s);
        })
      })
    })
  }

  joinWthDash(item:string) {
    if(item) return item.toLowerCase().replace(/ /g, '-');
    return '';
  }

  addKeyword(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.push(value);
    }
    event.chipInput!.clear();
  }

  removeKeyword(keyword:any): void {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  isAllHide(hide:any): boolean {
    return hide.desktop && hide.tablet_h && hide.tablet_v && hide.mobile && hide.hover;
  }

  someComplete(hide:any): boolean {
    return (hide.desktop || hide.tablet_h || hide.tablet_v || hide.mobile || hide.hover) && !this.isAllHide(hide);
  }

  setAll( hide: any, completed: boolean) {
    hide.desktop = completed;
    hide.tablet_h = completed;
    hide.tablet_v = completed;
    hide.mobile = completed;
    hide.hover = completed;
  }

  expandDevList(id:string) {
    var devList:any = document.getElementById(id);
    if(devList.hasAttribute('style')) devList.removeAttribute('style'); 
    else devList.style.maxHeight = devList.scrollHeight+'px';
    this.lastDevList = devList;
  }

  expandAll(ele:any, action:boolean) {
    ele.querySelectorAll('UL').forEach((temp: any)=>{
      !action ? temp.classList.add('kb-d-none') : temp.classList.remove('kb-d-none');
    })
  }

  expandToggle(ele:any) {
    ele.classList.toggle('kb-d-none');
  }

  respToggle(device:any) {
    if(device == this.respToggleDevice.name) device = 'desktop';
    this.respToggleDevice = this.respDevices[device];
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
    },300);
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

  openSnackBar(alert: boolean, message: string, action: string, hpos: any, vpos: any) {
    if(alert) this._snackBar.open(message, action, {
      horizontalPosition: hpos,
      verticalPosition: vpos,
      panelClass: ['bg-danger']
    });
    else this._snackBar.open(message, action, {
      horizontalPosition: hpos,
      verticalPosition: vpos
    });
  }

  encodeJSON(data:any) {
    return this.encodeData(JSON.stringify(data));
  }

  decodeJSON(data:string) {
    return JSON.parse(this.decodeData(data));
  }

  encodeData(data:any) {
    return btoa(encodeURIComponent(data));
  }

  decodeData(data:any) {
    return decodeURIComponent(atob(data));
  }

  makeid(length:number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  createBlockId(temp: any):any {
    temp.id = this.makeid(20);
    if(this.allBlocksIds.includes(temp.id)) {
      return this.createBlockId(temp);
    }
    this.allBlocksIds.push(temp.id);
    return 'kb-'+temp.type+'-'+temp.id;
  }

  compareOptValue(item1: any, item2: any) {
    return item1.name === item2.name && item1.value === item2.value;
  }

  getSSPath(path:string) {
    return 'keaimage-'+path+ '-screenshot.png'
  }

  prevRoute() {
    this._location.back();
  }

  redirectLink(link:string) {
    window.open(window.origin+link, '_blank');
  }

  redirectToWebsite() {
    return window.location.replace('https:/keabuilder.com');
  }

  redirectToBuilder(id:any, type:string) {
    return window.location.replace('/builder/'+type+'/'+id);
  }

  redirectToPageNotFound() {
    // console.log('redirect');
    window.location.href = './page-not-found';
  }

  setStorage(key:string, value:any) {
    return window.localStorage.setItem(key, value);
  } 

  getStorage(key:string) {
    return window.localStorage.getItem(key) === 'true';
  }

  dateformat(value:any){
    var dt = new Date(value);
    var text1 = dt.toDateString();    
    var text2 = dt.toLocaleTimeString();
    return text1+' '+text2;
  }
 
}
