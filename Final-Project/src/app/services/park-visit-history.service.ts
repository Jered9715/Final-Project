import { Injectable } from '@angular/core';
import { ParkVisitHistory } from '../interfaces/park-visit-history';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Park } from '../interfaces/park';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkVisitHistoryService {
  private apiUrl = 'https://localhost:7298/api/ParkVisitHistory';

  constructor(private http: HttpClient) { }

  getParkVisitHistory(): Observable<ParkVisitHistory[]> {
    return this.http.get<ParkVisitHistory[]>(this.apiUrl);
  }

  getParkVisitHistoryById(userId: number): Observable<ParkVisitHistory[]> {
    return this.http.get<ParkVisitHistory[]>(`${this.apiUrl}/${userId}`)
  }

  addParkVisitHistory (parkCode: string, parkNotes: string, dateVisited: string): Observable<ParkVisitHistory> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = {parkCode, parkNotes, dateVisited}
    return this.http.post<ParkVisitHistory>(this.apiUrl, body , httpOptions);
  }

  deleteParkVisitHistory(parkVisitId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${parkVisitId}`)
  }

}
