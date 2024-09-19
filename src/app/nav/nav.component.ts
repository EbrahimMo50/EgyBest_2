import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';

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

  constructor(public _authService:AuthService,private _router:Router){

  }

  ngOnInit(){
    if (typeof localStorage !== 'undefined') {
      this._authService.assignToken(localStorage.getItem('UserToken')?.toString()!);
      if(this._authService.token !== '')
        this._router.navigate(['/home']);
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