import { Injectable } from '@angular/core';

import { WishListItem } from '../interfaces/wishlist';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishListItems: WishListItem[]=[
    {
      userId:1 ,
      wishListId:1 ,
      parkId: 'Yellow Stone',
    },
    {
      userId:1 ,
      wishListId:2 ,
      parkId: 'Grand Canyon',
    },
    {
      userId:2 ,
      wishListId:3 ,
      parkId: 'Yosemite',
    },
    {
      userId:3 ,
      wishListId:5 ,
      parkId: 'Glacier',
    },
    {
      userId:1 ,
      wishListId:6 ,
      parkId: 'Everglades',
    }
  ];
  


  constructor(private usersService: UsersService) { }

  getAllWishLists():WishListItem[]{
    return this.wishListItems;
  }
  
  getUserWishlist(userId: number): WishListItem[]{
    return this.wishListItems.filter(wishlist => this.wishListItems.some(wish => wish.userId === userId))
  }


}
