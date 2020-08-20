import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public updateUser(body): Observable<any> {
    return this.http.put(`${this.baseUrl}users`, body);
  }

  public getUser(id): Observable<any> {
    return this.http.get(`${this.baseUrl}users/${id}`);
  }

  public getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}customers`);
  }
}
