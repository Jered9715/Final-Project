import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkResponse } from '../interfaces/park';

@Injectable({
  providedIn: 'root'
})
export class NationalParkService {
  private apiUrl = 'developer.nps.gov/api/v1';
  private apiKey = 'r4OSxniaCtevFyb5dCkZc0z0D8bSQLsTRdfK7o9L';

  constructor(private http: HttpClient) { }

  getParks(): Observable<ParkResponse> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey
    });
    return this.http.get<ParkResponse>(`${this.apiUrl}/parks`, {headers: headers});
  }
}

