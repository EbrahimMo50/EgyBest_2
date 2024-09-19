import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string = '';

  constructor(private _httpClient:HttpClient,private _router:Router) { 
      
  }

  //note to self the email is not validated to be unqiue from the backend :):)
  Register(FormObject:any) : Observable<any>{
    return this._httpClient.post("https://localhost:7181/api/Auth/Register",FormObject.value);
  }

  Login(FormObject:any){
    let email = FormObject.get('email').value;
    let password = FormObject.get('password').value;
    
    this._httpClient.post("https://localhost:7181/api/Auth/Login", { email, password }, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.token = data;
          localStorage.setItem('UserToken',this.token);
          this._router.navigate(['home']);
        },
        error: (error) => {
          window.alert('Login failed: ' + error.message || 'Please try again.');
        }
      });
  }

  assignToken(token:string){
    this.token = token;
  }
  
  logOut() {
    this.token = '';
  }
}
