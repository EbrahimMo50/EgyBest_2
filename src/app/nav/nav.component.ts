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

    const navLinks = document.querySelectorAll('nav > div > div > ul > li > a');
    const iconSearch = document.querySelectorAll('.fas');
    const header = document.getElementById('h1');
    const navbar = document.getElementById('nav-bar');

    if (scrollPosition > 1) {
      navbar?.classList.remove('transparent');
      header?.classList.remove('white-color');

      iconSearch.forEach(element => {
        element?.classList.remove('white-color');
      });
      
      navLinks.forEach(element => {
        element.classList.remove('white-color');
      });

    } 
    else if(scrollPosition < 1){
      header?.classList.add('white-color');
      navbar?.classList.add('transparent');
      iconSearch.forEach(element => {
        element?.classList.add('white-color');
      });
      navLinks.forEach(element => {
        element.classList.add('white-color');
      });
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