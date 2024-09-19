import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movies:any[] = [];
  movieobject:any;
  movieObserver:Observable<any> = new Observable;
  searchedMovies:any;                            //i am sorry for such abomination i am about to make :')

  private apiUrl = 'https://Movies-Verse.proxy-production.allthingsdev.co/api/movies/upcoming-tv-shows';
  
  constructor(private _httpClient:HttpClient) { }

  private headers = new HttpHeaders({
    'x-apihub-key': 'wYLp6AjF3oFNGoQGQB6Z7FCC-K4Oj0bxKdtTyu3uEBYCbeF6KG',
    'x-apihub-host': 'Movies-Verse.allthingsdev.co',
    'x-apihub-endpoint': 'ee6324b5-b074-419b-ac03-9b818d30321f'
  });
  

  getUpcomingTvShows(): Observable<any> {
    this.movieObserver =  this._httpClient.get(this.apiUrl, { headers: this.headers });

    this.movieObserver.subscribe((data)=> {
      this.movieobject = data.list    
      this.movieobject.forEach((element: any) => {
        element.list.forEach((movie: any) => {
          this.movies.push(movie);
        });
      });
    });;
    console.log(this.movies);
    return this.movieObserver;
  }

  search(query:string){
    this.searchedMovies = this.movies.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
    console.log(this.searchedMovies);
  }
}
