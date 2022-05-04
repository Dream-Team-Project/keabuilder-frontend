import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PageNotFoundComponent implements OnInit {
  mouseY=0;
  mouseX=0;
  constructor(private _cdr: ChangeDetectorRef) {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    document.addEventListener('mousemove',this.goofyEyes.bind(this,));
  }

  goofyEyes(event: { clientX: number; clientY: number; }) {
    
    var width = window.innerWidth;
    var height = window.innerHeight;

    //verticalAxis
    var y = event.clientY;
    this.mouseY = (height/2-y)/height*300; 

    //horizontalAxis
    var x = event.clientX / -width;
    this.mouseX = -x * 100 - 100;

    this._cdr.detectChanges();
  }

}
