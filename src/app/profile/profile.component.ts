import { Component, OnInit } from '@angular/core';
import { ConnectableObservable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  checkuserState:any = false;
  bwname = '';
  bwemail = '';
  activem = 'profile';

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.bwname = this.currentUser.username;
    this.bwemail = this.currentUser.email;
  }
  
  activeme(value: any){
      this.activem = value;
      console.log(this.activem);
  }

}
