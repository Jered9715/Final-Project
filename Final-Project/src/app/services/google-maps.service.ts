import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Map } from '../interfaces/map';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private apiUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB8AUBjZnPw4AHCAo0_QDGz_bdLapP7Gbg&libraries=places';
  private apiKey = 'AIzaSyB8AUBjZnPw4AHCAo0_QDGz_bdLapP7Gbg';
  constructor(private http: HttpClient) { }
}


