import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  fullsidebar = true;
  hoveropen = false;
  isOpen = false;
  isOpen2 = false;
  isOpen3 = false;


  ngOnInit(): void {
  }

}
