import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WishListItem } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = 'https://localhost:7298/api/wishlist'; 

  constructor(private http: HttpClient) {}

  getWishlistItems(): Observable<WishListItem[]> {
    return this.http.get<WishListItem[]>(this.apiUrl);
  }

  addWishlistItem(parkCode: string): Observable<any> {
    return this.http.post(this.apiUrl, parkCode);
  }
}