import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllProjectionsByMovie(id): Observable<any> {
    return this.http.get(`${this.baseUrl}projections/${id}/movie`);
  }

  public getAllProjectionsByCinema(id): Observable<any> {
    return this.http.get(`${this.baseUrl}projections/${id}/cinema`);
  }

  public getAllProjectionsByCustomer(id): Observable<any> {
    return this.http.get(`${this.baseUrl}projections/${id}/customer`);
  }

  public getProjection(id): Observable<any> {
    return this.http.get(`${this.baseUrl}projections/${id}`);
  }

  public createProjection(body): Observable<any> {
    return this.http.post(`${this.baseUrl}projections`, body);
  }

  public updateProjection(body): Observable<any> {
    return this.http.put(`${this.baseUrl}projections`, body);
  }

  public reserve(body): Observable<any> {
    return this.http.put(`${this.baseUrl}projections/reserve`, body);
  }

  public cancelReservation(body): Observable<any> {
    return this.http.put(`${this.baseUrl}projections/cancel-reservation`, body);
  }

  public deleteProjection(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}projections/${id}`);
  }

  public getAllPastProjectionsByCustomer(id): Observable<any> {
    return this.http.get(`${this.baseUrl}projections/${id}/customers-past-projections`);
  }
}
