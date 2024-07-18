import { Component } from '@angular/core';
import { ParkVisitHistoryComponent } from '../park-visit-history/park-visit-history.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ParkVisitHistoryComponent, WishlistComponent, MatProgressBarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
