import { Component } from '@angular/core';
import { ParkVisitHistoryComponent } from '../park-visit-history/park-visit-history.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ParkVisitHistoryComponent, WishlistComponent,MatListModule,MatDividerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
