import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule, NZ_I18N, en_US, NzIconModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LayoutComponent } from './pages/layout/layout.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CinemasComponent } from './pages/cinemas/cinemas.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { ProjectionsComponent } from './pages/projections/projections.component';
import { HallsComponent } from './pages/halls/halls.component';
import { CinemaComponent } from './pages/update/cinema/cinema.component';
import { HallComponent } from './pages/update/hall/hall.component';
import { UserComponent } from './pages/update/user/user.component';
import { ProjectionComponent } from './pages/update/projection/projection.component';
import { ManagersComponent } from './pages/managers/managers.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { PastComponent } from './pages/past/past.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    CinemasComponent,
    MoviesComponent,
    ProjectionsComponent,
    HallsComponent,
    CinemaComponent,
    HallComponent,
    UserComponent,
    ProjectionComponent,
    ManagersComponent,
    ReservationsComponent,
    CustomersComponent,
    PastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NzIconModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
