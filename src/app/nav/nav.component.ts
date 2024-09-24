import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { MoviesService } from '../movies.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,    
    RouterLink,
    RouterLinkActive,    
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent{
  isMouseOnLink1:boolean = false;
  isMouseOnLink2:boolean = false;
  group:any;
  constructor(public _authService:AuthService,private _router:Router, private _movieService:MoviesService){ }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        this.search();
    }
}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.scrollY;

    let navbar = document.getElementById('nav-bar');
    let collapsed = document.getElementById('collapsed-nav');
    if (scrollPosition > 1) {
      navbar?.classList.remove('transparent');
      collapsed?.classList.remove('transparent');
    } 
    else if(scrollPosition < 1){
      navbar?.classList.add('transparent');
      collapsed?.classList.add('transparent');
    }
  }

  openSearch(){
    let searchComponent = document.getElementById("SearchContainer");
    let searchIcon =  document.getElementById("searchIcon");

    if(searchIcon?.classList.contains("fa-search")){
      if(searchComponent)
        searchComponent.style.width = "100%";

      searchIcon.classList.add("fa-window-close");
      searchIcon.classList.remove("fa-search");
    }
    else{
      if(searchComponent)
        searchComponent.style.width = "8%";
      
      searchIcon?.classList.add("fa-search");
      searchIcon?.classList.remove("fa-window-close");
    }

  }

  search(){
    let element = document.getElementById('searchquery') as HTMLInputElement | null;
    let query = element?.value;
    this._movieService.search(query!);
  }

  logOut(){
    this._authService.logOut();
    localStorage.removeItem('UserToken');
    window.alert("succefully logged out");
  }
}