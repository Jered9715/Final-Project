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
import { ParkCodeService } from '../../services/park-code.service';

@Component({
  selector: 'app-park-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, MatCardModule, MatButtonModule,
    MatGridListModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSidenavModule, ParkNotesComponent],
  providers: [NationalParkService, ParkVisitHistoryService, ParkCodeService],
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

  constructor(private nationalParkService: NationalParkService, private parkVisitHistoryService: ParkVisitHistoryService, public dialog: MatDialog, private parkCodeService: ParkCodeService) { }
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
  /* this could be used if we wanted a auto fill feature - if determined not wanted we can delete,
  to do this we would need to create a localy stored array in the angular file that would hold all the names of the national parks
  then you could set the filtered cards to the array of national park names and it would autofill
  see note from cass for the html if wanted
  filterCards(event: Event) {
     const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
     this.filteredCards = this.cards.filter(card => card.content.toLowerCase().includes(searchTerm) ); }
  */
  
}
