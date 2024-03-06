import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  
  constructor(private http: HttpClient) { }

  setTheme(theme: string): void {
    document.body.className = theme; 
    localStorage.setItem('theme', theme); 
  }

  getTheme(): string {
    return localStorage.getItem('theme') || 'light'; 
  }

}
