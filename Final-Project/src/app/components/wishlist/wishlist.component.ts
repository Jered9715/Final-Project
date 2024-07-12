import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { WishListItem } from '../../interfaces/wishlist';
import { RouterModule , ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import { NationalParkService } from '../../services/national-park.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ParkResponse, Park } from '../../interfaces/park';
import { switchMap } from 'rxjs';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule, RouterLinkActive, MatCardModule,MatButtonModule,MatGridListModule,MatToolbarModule,MatIconModule,MatFormFieldModule,MatInputModule,MatSidenavModule],
  providers: [WishlistService, NationalParkService],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishListItem[] = [];
  parks: { [key: string]: Park } = {};
  error: string = '';

  constructor(private wishlistService: WishlistService, private nationalParkService: NationalParkService) {}
  

  ngOnInit(): void {
    this.loadWishlistItem()
  }

  loadWishlistItem(): void{
    this.wishlistService.getWishlistItems().subscribe(
      (wishlist: WishListItem[]) => {
        this.wishlistItems = wishlist;
        console.log('wishlist', wishlist)
        this.loadParks();
      },
      (error) => {
        this.error = 'Failed to get wishlist';
        console.error('Error loading wishlist');
      }
    );
  }

  loadParks(): void {
    this.wishlistItems.forEach((wishlistItems: WishListItem) => {
      const parkCode = wishlistItems.parkCode;
      if (!this.parks[parkCode]) {
        this.nationalParkService.getParkByParkCode(parkCode).subscribe(
          (response: ParkResponse) => {
            if (response.total > 0) {
              this.parks[parkCode] = response.data[0];
            }
          },
          (error: any) => {
            console.error(`Failed to get park with code ${parkCode}:`, error);
          }
        );
      }
    });
  }

  loadWishlist(): void{
    this.wishlistService.getWishlistItems().subscribe(
      (wishlist: WishListItem[]) => {
        this.wishlistItems = this.wishlistItems;
        this.loadWishlist();
      },
      (error) => {
        this.error = 'Failed to get park visit history';
        console.error('Error loading park visit history');
      }
    );
  }

}

