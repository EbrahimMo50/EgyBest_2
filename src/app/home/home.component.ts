import { Component, inject } from '@angular/core';
import { MoviesService } from '../movies.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MyDatePipe } from '../my-date.pipe';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,    
    RouterLink,
    RouterLinkActive,   
    FormsModule,
    MyDatePipe
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
      this.movies = data;
      this.moviesview = data;
    });
    this.showMovies();
  }

  callDetails(item:any){
    alert(item.description)
  }

  showMovies(){
    this.moviesview = [];
    this.title = this.title.toLowerCase();
    this.movies.forEach((element:any) => {
      if(this.movies.title.match(this.title) || this.title == '')
      this.moviesview.push(element);
    });
  }
  
  searchByName(event: Event){
    let inputElement = event.target as HTMLInputElement;
    let query = inputElement.value;
    this.movies = this.moviesview.filter((book: { title: string; }) => book.title.toLowerCase().includes(query.toLowerCase()))
  }
}