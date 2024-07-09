import { ChangeDetectionStrategy, Component, OnInit , EventEmitter, Output} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NationalParkService } from '../../services/national-park.service';
import { ParkResponse, Park } from '../../interfaces/park';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ParkVisitHistory } from '../../interfaces/park-visit-history';
import { ParkVisitHistoryService } from '../../services/park-visit-history.service';
import { MatDialog } from '@angular/material/dialog';
import { ParkNotesComponent } from '../park-notes/park-notes.component';
import { WishListItem } from '../../interfaces/wishlist';
import { WishlistService } from '../../services/wishlist.service';
import { ParkCodeService } from '../../services/park-code.service';

@Component({
  selector: 'app-park-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, MatCardModule, MatButtonModule,
    MatGridListModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSidenavModule, ParkNotesComponent],
  providers: [NationalParkService, ParkVisitHistoryService, WishlistService],
  templateUrl: './park-list.component.html',
  styleUrl: './park-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkListComponent implements OnInit {

  parkResponse: ParkResponse | null = null;
  filteredParks: Park[] = [];
  error: string = '';
  query: string = '';
  sort: string = 'relevanceScore';
  showFiller = false;
  parkCode: string = '';
  parkNotes: string = '';
  dateVisited: string = '';
  wishlist: WishListItem[] = [];

  constructor(private nationalParkService: NationalParkService, private parkVisitHistoryService: ParkVisitHistoryService, public dialog: MatDialog, private wishlistService: WishlistService, private parkCodeService: ParkCodeService) { }

  ngOnInit(): void {
  }

  getParks(): void {
    this.nationalParkService.getParks().subscribe({
      next: (data: ParkResponse) => {
        this.parkResponse = data;
        this.error = '';
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.error = 'Failed to fetch data. Please try again later';
      }
    });
  }

  searchParks(): void {
    if (this.query.trim() === '') {
      this.getParks();
      return;
    }
    this.nationalParkService.getParksBySearch(this.query, this.sort).subscribe(
      (data: ParkResponse) => {
        this.parkResponse = data;
        this.error = '';
        this.filterParks();
        if (this.filteredParks.length === 0) {
          this.error = `There are no National Parks that match your search of ${this.query}`
        }
        console.log("park data")
        console.log(this.filteredParks[0])
      },
      (error) => {
        console.error('Error fetching data by search', error);
        this.error = 'Failed to fetch data. Please try again later';
      }
    );
  }

  filterParks(): void {
    if (this.parkResponse) {
      this.filteredParks = this.parkResponse.data.filter(park => park.designation === 'National Park');
    }
  }

  openParkNotesDialog(parkCode: string): void {
    this.parkCodeService.setParkCode(parkCode);
    console.log("Park Code: ", parkCode)
    const dialogRef = this.dialog.open(ParkNotesComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addWishlistItem(parkCode: string): void {
    console.log('Park Code:', this.parkCode);

      this.wishlistService.addWishlistItem(parkCode).subscribe(
        (response: any) => {
          console.log('Wishlist Item Added: ', response);
        },
        (error) => {
          console.error('Failed to add to Wishlist: ', error);
        }
      );
    }
  }

