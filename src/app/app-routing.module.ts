import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CinemasComponent } from './pages/cinemas/cinemas.component';
import { MoviesComponent } from './pages/movies/movies.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/layout/login' },
  {
    path: 'layout', component: LayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'cinemas', component: CinemasComponent },
      { path: 'movies', component: MoviesComponent },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
