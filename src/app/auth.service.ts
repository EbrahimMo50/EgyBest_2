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
    this._httpClient.post("https://localhost:7181/api/Auth/Login", {email, password} ,{ responseType: 'text' }).subscribe((data)=>{
      this.token = data;
      this._router.navigate(['home']);
    });
    
  }
  
  logOut() {
    this.token = '';
  }
}
