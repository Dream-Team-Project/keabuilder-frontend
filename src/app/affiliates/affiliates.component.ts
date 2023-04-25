import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.css']
})
export class AffiliatesComponent implements OnInit {

  clicks = '81.7k';
  formsubmission = '3.83k';
  conversions = '1.56k';
  conversionrate = '2';

  constructor() { }

  ngOnInit(): void {
  }

  copytoclipboard(value:string){

    if(value=='signup'){
      var copyText = <HTMLInputElement>document.getElementById("affliatesignup");
    }else{
      var copyText = <HTMLInputElement>document.getElementById("affliatesignin");
    }

    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    navigator.clipboard.writeText(copyText.value);
  }

}
