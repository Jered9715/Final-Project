import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkResponse } from '../interfaces/park';

@Injectable({
  providedIn: 'root'
})
export class NationalParkService {
  getParkData(parkCode: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://developer.nps.gov/api/v1';
  private apiKey = 'r4OSxniaCtevFyb5dCkZc0z0D8bSQLsTRdfK7o9L';

  constructor(private http: HttpClient) { }

  getParks(): Observable<ParkResponse> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey
    });
    return this.http.get<ParkResponse>(`${this.apiUrl}/parks`, {headers: headers});
  }

  getParksBySearch(query: string, sort: string): Observable<ParkResponse> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey
    });
    let params = new HttpParams();
    params = params.set('q', query);
    if (sort) {
      params = params.set('sort', sort);
    }
    return this.http.get<ParkResponse>(`${this.apiUrl}/parks`, {headers: headers, params: params});
  }

  getParkByParkCode(parkCode: string): Observable<ParkResponse> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey
    });
    let params = new HttpParams();
    params = params.set('parkCode', parkCode);
    return this.http.get<ParkResponse>(`${this.apiUrl}/parks`, {headers: headers, params: params});
  }

}

