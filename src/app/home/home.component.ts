import { Component, inject } from '@angular/core';
import { MoviesService } from '../movies.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,    
    RouterLink,
    RouterLinkActive,   
    FormsModule 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {  
  moviesobject:any;
  movies:any = [];
  moviesview:any = [];
  title:string = '';
  
  constructor(private _movieService:MoviesService){
    _movieService.getUpcomingTvShows().subscribe((data)=> {
      this.moviesobject = data.list    
      this.moviesobject.forEach((element: any) => {
        element.list.forEach((movie: any) => {
          this.movies.push(movie);
        });
      });
    });
    this.showMovies();
  }

  showMovies(){
    this.moviesview = [];
    this.title = this.title.toLowerCase();
    this.movies.forEach((element:any) => {
      if(this.movies.title.match(this.title) || this.title == '')
      this.moviesview.push(element);
    });
  }
}