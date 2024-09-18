import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup,  NgModel,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private _authService:AuthService){}
  
  FormGroup:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    age:new FormControl(null,[Validators.min(18),Validators.max(99),Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(20)])

  });

  SubmitForm(FormGroup:any){
    //console.log(FormGroup.value);
    this._authService.Register(FormGroup).subscribe((data)=>console.log(data));
  }
}