import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HallService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public createHall(body): Observable<any> {
    return this.http.post(`${this.baseUrl}halls`, body);
  }

  public getAllHalls(): Observable<any> {
    return this.http.get(`${this.baseUrl}halls`);
  }

  public getHall(id): Observable<any> {
    return this.http.get(`${this.baseUrl}halls/${id}`);
  }

  public getAllHallsByCinema(id): Observable<any> {
    return this.http.get(`${this.baseUrl}halls/${id}/cinema`);
  }

  public getAllHallsByManager(id): Observable<any> {
    return this.http.get(`${this.baseUrl}halls/${id}/manager`);
  }

  public deleteHall(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}halls/${id}`);
  }

  public updateHall(body): Observable<any> {
    return this.http.put(`${this.baseUrl}halls`, body);
  }
}
