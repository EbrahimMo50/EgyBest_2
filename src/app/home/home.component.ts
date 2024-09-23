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
    MyDatePipe,
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {  
  movies:any = [];
  displayedImageURL:string = '';
  topMoviesImages:string[] = [];
  indexDisplayedImage:number = 0;
  
  constructor(private _movieService:MoviesService){
    _movieService.getUpcomingTvShows().subscribe((data)=> {
      this.movies = data;
      for(let i = 0; 5 > i && this.movies.length > i; ++i)
        this.topMoviesImages.push(this.movies[i].image)
      this.displayedImageURL = this.topMoviesImages[0];
    });
    this.autoSwap();
  }

  async autoSwap(){
    this.swapRight();
    await this.sleep(5000);
    this.autoSwap();
  }

  async sleep(msec:number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

  async swapRight(){
    const image = document.getElementById('img');
    let timerOpacity = 100;
    
    while(timerOpacity>25){
      let opacityPercent = 1 * (timerOpacity / 100);
      console.log(opacityPercent.toString());
      image!.style.opacity = opacityPercent.toString();
      await this.sleep(1);
      timerOpacity--;
    }

    if(this.indexDisplayedImage == 4)
      this.indexDisplayedImage = 0;
    else
      this.indexDisplayedImage++;
    this.displayedImageURL = this.topMoviesImages[this.indexDisplayedImage];

    while(timerOpacity<100){
      let opacityPercent = 1 * (timerOpacity / 100);
      console.log(opacityPercent.toString());
      image!.style.opacity = opacityPercent.toString();
      await this.sleep(1);
      timerOpacity++;
    }
    
  }

  async swapLeft(){

    const image = document.getElementById('img');
    let timerOpacity = 100;
    
    while(timerOpacity>25){
      let opacityPercent = 1 * (timerOpacity / 100);
      console.log(opacityPercent.toString());
      image!.style.opacity = opacityPercent.toString();
      await this.sleep(1);
      timerOpacity--;
    }

    if(this.indexDisplayedImage == 0)
      this.indexDisplayedImage = 4;
    else
      this.indexDisplayedImage--;
    this.displayedImageURL = this.topMoviesImages[this.indexDisplayedImage];      
    
    while(timerOpacity<100){
      let opacityPercent = 1 * (timerOpacity / 100);
      console.log(opacityPercent.toString());
      image!.style.opacity = opacityPercent.toString();
      await this.sleep(1);
      timerOpacity++;
    }
  }



}