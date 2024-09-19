import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,    
    RouterLink,
    RouterLinkActive,    
    NgClass
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{

  constructor(public _authService:AuthService,private _router:Router, private _movieService:MoviesService){

  }

  search(){
    let element = document.getElementById('searchquery') as HTMLInputElement | null;
    let query = element?.value;
    this._movieService.search(query!);
    console.log(query);
  }

  ngOnInit(){
    if (typeof localStorage !== 'undefined') {
      this._authService.assignToken(localStorage.getItem('UserToken')?.toString()!);
      if(this._authService.token !== '')
        console.log("local storage works assigned token succefully");
    } else {
      console.error('localStorage is not available.');
    }
  }

  logOut(){
    this._authService.logOut();
    localStorage.removeItem('UserToken');
    window.alert("succefully logged out");
  }
}