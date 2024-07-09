import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { WishListItem } from '../../interfaces/wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishListItem[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.getWishlistItems().subscribe((items) => {
      this.wishlistItems = items;
    });
  }
}
