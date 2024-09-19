import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movies:any[] = [];
  movieobject:any;
  movieObserver:Observable<any> = new Observable;
  searchedMovies:any;                            //i am sorry for such abomination i am about to make :')

  private apiUrl = 'https://localhost:7181/api/Movies/GetMovies';
  
  constructor(private _httpClient:HttpClient, private _route:Router) { }
  

  getUpcomingTvShows(): Observable<any> {
    this.movieObserver =  this._httpClient.get(this.apiUrl);

    this.movieObserver.subscribe((data)=> {
          this.movies = data;
        });
    return this.movieObserver;
  }

  search(query:string){
    this.searchedMovies = this.movies.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
    this._route.navigate(['/search']);
  }
}
