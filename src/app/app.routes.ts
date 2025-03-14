import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component:HomeComponent , canActivate: [authGuard]},
    { path: 'search', component:SearchComponent,  canActivate: [authGuard]},
    { path: 'about', component:AboutComponent, canActivate: [authGuard]},
    { path: 'login', component:LoginComponent},
    { path: 'register', component:RegisterComponent},
    { path:'**', component:NotfoundComponent},
];
