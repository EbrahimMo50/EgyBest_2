import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,    
    RouterLink,
    RouterLinkActive,   
    FormsModule 
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent{

  constructor(public _movieService:MoviesService){
    
   }

}
