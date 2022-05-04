import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users:any = [];
  error?: string;
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: data => {
        this.users = data.data;
      },
      error: err => {
        this.error = JSON.parse(err.error).message;
      }
    });
  }
}
