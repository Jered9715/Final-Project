import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { WishListItem } from '../../interfaces/wishlist';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
wishList: WishListItem[]=[];
userId:number = 0;


constructor(private wishListService: WishlistService){}

//ngOnInIt get wishlist - ngFor
ngOnInit(): void {
 this.wishListService.getAllWishLists();
}
//method to get park data it will feed the park ID to the park service to retrieve the data

}
