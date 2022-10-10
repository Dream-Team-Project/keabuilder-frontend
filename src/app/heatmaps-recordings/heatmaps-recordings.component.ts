import { Component, OnInit } from '@angular/core';
import { HeatmapsService } from '../_services/heatmaps.service';

@Component({
  selector: 'app-heatmaps-recordings',
  templateUrl: './heatmaps-recordings.component.html',
  styleUrls: ['./heatmaps-recordings.component.css']
})
export class HeatmapsRecordingsComponent implements OnInit {

  constructor( private heatmapsService:HeatmapsService) {}

  video_index = 0;
  video_player:any = null;
  video_list:any[] = [];
  toggleplkvalue = 0;
  isOpen = false;

  ngOnInit(): void {

    var hshvl = window.location.hash;
    hshvl = hshvl.replace('#','');

    this.heatmapsService.getheatdir(hshvl).subscribe({
      next: data => {
        console.log(data);

        data.data.forEach((element:any) => {
          this.video_list.push(element);
        });

        this.video_player = document.getElementById("kb-heatmapvideo");
        this.video_player.setAttribute("src", '/assets/uploads/videos_heatmaps/'+this.video_list[this.video_index]);
        this.video_player.play();
        (<HTMLElement>document.getElementById('playback_activity')).innerText = 'Viewing...';
        (<HTMLElement>document.getElementById('kb-progressbar')).classList.add('active');

      },
      error: err => {
        console.log(err);
      }
    });

    this.heatmapsService.visitorinfo(hshvl).subscribe({
      next: data => {
        console.log(data);
        (<HTMLElement>document.getElementById("kb_visitorinfo1")).innerText = data.data[0].created_at;
        (<HTMLElement>document.getElementById("kb_visitorinfo2")).innerText = data.data[0].os;
        (<HTMLElement>document.getElementById("kb_visitorinfo3")).innerText = data.data[0].location;
        (<HTMLElement>document.getElementById("kb_visitorinfo4")).innerText = data.data[0].ipaddress;
        (<HTMLElement>document.getElementById("kb_visitorinfo5")).innerText = data.data[0].landing_page;
        (<HTMLBaseElement>document.getElementById("kb_visitorinfo5")).href = data.data[0].landing_page;
        (<HTMLElement> document.getElementById("kb_visitorinfo6")).innerText = data.data[0].device;
        (<HTMLBaseElement>document.getElementById("kb_loadheatmap")).href = data.data[0].landing_page+"#kb-heatmaps";
      },
      error: err => {
        console.log(err);
      }
    });


  }

  toggle_playback(){
    if(this.toggleplkvalue==1){
        this.video_player.play();
        (<HTMLElement>document.getElementById('kb_pauseme')).style.display = "none";
        (<HTMLElement>document.getElementById('kb_playme')).style.display = "block";
        (<HTMLElement>document.getElementById('playback_activity')).innerText = 'Viewing...';
        (<HTMLElement>document.getElementById('kb-progressbar')).classList.add('active');
    }else{
        this.video_player.pause();
        (<HTMLElement>document.getElementById('kb_playme')).style.display = "none";
        (<HTMLElement>document.getElementById('kb_pauseme')).style.display = "block";
        (<HTMLElement>document.getElementById('playback_activity')).innerText = 'Pause';
        (<HTMLElement>document.getElementById('kb-progressbar')).classList.remove('active');
    }
    this.toggleplkvalue++;
    if(this.toggleplkvalue==2){
        this.toggleplkvalue=0;
    }

}
onVideoEnded(){
    if(this.video_index < this.video_list.length - 1){
        this.video_index++;
    }
    else{
        this.video_index = 0;
    }
    this.video_player.setAttribute("src", '/assets/uploads/videos_heatmaps/'+this.video_list[this.video_index]);
    this.video_player.play();
}
repeat_record(){
     this.video_player.pause();
     this.video_player.setAttribute("src", '/assets/uploads/videos_heatmaps/'+this.video_list[0]);
     this.video_index = 0;
     this.video_player.defaultPlaybackRate = 1;
     (<HTMLInputElement>document.getElementById('play_speed_selector')).value = '2';
     this.video_player.play();
}
kb_speedcontrol(event:any){
    switch (event.target.value) {
            case '1':
        this.video_player.defaultPlaybackRate = 0.5;
        break;
            case '2':
        this.video_player.defaultPlaybackRate = 1;
        break;
            case '3':
        this.video_player.defaultPlaybackRate = 2;
        break;
            case '4':
        this.video_player.defaultPlaybackRate = 3;
        break;
            case '5':
        this.video_player.defaultPlaybackRate = 4;
        break;
            case '6':
        this.video_player.defaultPlaybackRate = 5;
        break;
            case '7':
        this.video_player.defaultPlaybackRate = 10;
        break;        
        default:
        break;
    }
}
openClose() { 
  this.isOpen = !this.isOpen;
}

}
