import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token:string = '';

  constructor(private _httpClient:HttpClient) { 

  }

  //note to self the email is not validated to be unqiue from the backend :):)
  Register(FormObject:any) : Observable<any>{
    return this._httpClient.post("https://localhost:7181/api/Auth/Register",FormObject.value);
  }

  Login(FormObject:any) : Observable<any>{
    let email = FormObject.get('email').value;
    let password = FormObject.get('password').value;
    console.log({email,password})
    return this._httpClient.post("https://localhost:7181/api/Auth/Login", {email, password} ,{ responseType: 'text' });
  }
}
