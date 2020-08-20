import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CinemasComponent } from './pages/cinemas/cinemas.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { ProjectionsComponent } from './pages/projections/projections.component';
import { ManagersComponent } from './pages/managers/managers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CinemaComponent } from './pages/update/cinema/cinema.component';
import { HallComponent } from './pages/update/hall/hall.component';
import { ProjectionComponent } from './pages/update/projection/projection.component';
import { HallsComponent } from './pages/halls/halls.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { PastComponent } from './pages/past/past.component';
import { UserComponent } from './pages/update/user/user.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/layout/login' },
  {
    path: 'layout', component: LayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'cinemas', component: CinemasComponent },
      { path: 'halls/:id/cinema', component: HallsComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'projections/:id/movie', component: ProjectionsComponent },
      { path: 'projections', component: ProjectionsComponent },
      { path: 'cinema/:id', component: CinemaComponent },
      { path: 'cinema', component: CinemaComponent },
      { path: 'hall', component: HallComponent },
      { path: 'hall/:id', component: HallComponent },
      { path: 'managers', component: ManagersComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'managers/:id/cinema', component: ManagersComponent },
      { path: 'projection', component: ProjectionComponent },
      { path: 'projection/:id', component: ProjectionComponent },
      { path: 'user', component: UserComponent },
      { path: 'reservations/:id/customer', component: ReservationsComponent },
      { path: 'history/:id/customer', component: PastComponent }
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
