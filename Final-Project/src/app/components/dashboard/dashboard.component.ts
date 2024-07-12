import { Component } from '@angular/core';
import { ParkVisitHistoryComponent } from '../park-visit-history/park-visit-history.component';
import { WishlistComponent } from '../wishlist/wishlist.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ParkVisitHistoryComponent, WishlistComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
