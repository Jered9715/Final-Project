import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WishListItem } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = 'http://localhost:5065/api/WishList'; 

  constructor(private http: HttpClient) {}

  getWishlistItems(): Observable<WishListItem[]> {
    return this.http.get<WishListItem[]>(this.apiUrl);
  }

  addWishlistItem(parkCode: string): Observable<any> {
    const body = { parkCode: parkCode };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.apiUrl, body, httpOptions);
  }

  deleteWishlistItem(wishListId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${wishListId}`)
  }
}