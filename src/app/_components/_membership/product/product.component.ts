import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class MembershipProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  itemshow = false;

  kbitemshow(){
    this.itemshow = !this.itemshow;
  }

}
