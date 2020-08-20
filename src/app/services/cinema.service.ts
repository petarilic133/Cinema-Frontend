import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public createCinema(body): Observable<any> {
    return this.http.post(`${this.baseUrl}cinemas`, body);
  }

  public getAllCinemas(): Observable<any> {
    return this.http.get(`${this.baseUrl}cinemas`);
  }

  public getCinema(id): Observable<any> {
    return this.http.get(`${this.baseUrl}cinemas/${id}`);
  }

  public getAllCinemasByManager(id): Observable<any> {
    return this.http.get(`${this.baseUrl}cinemas/${id}/manager`);
  }

  public deleteCinema(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}cinemas/${id}`);
  }

  public updateCinema(body): Observable<any> {
    return this.http.put(`${this.baseUrl}cinemas`, body);
  }

  public setNewManager(body): Observable<any> {
    return this.http.put(`${this.baseUrl}cinemas/set-new-manager`, body);
  }
}
