import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-affiliate-exports',
  templateUrl: './affiliate-exports.component.html',
  styleUrls: ['./affiliate-exports.component.css']
})
export class AffiliateExportsComponent implements OnInit {

  sharelinks = [
   {name:'January 2022'},
   {name:'December 2021'},
   {name:'November 2021'},
   {name:'October 2021'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
