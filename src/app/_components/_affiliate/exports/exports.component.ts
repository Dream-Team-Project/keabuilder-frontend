import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-affiliate-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css']
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
