import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public login(body): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/login`, body);
  }

  public registerCustomer(body): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/customer-registration`, body);
  }

  public registerManager(body): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/manager-registration`, body);
  }

  public deleteUser(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}users/${id}`);
  }
}
