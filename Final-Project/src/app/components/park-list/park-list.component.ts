import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NationalParkService } from '../../services/national-park.service';
import { ParkResponse, Park } from '../../interfaces/park';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-park-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule,MatCardModule,MatButtonModule,
    MatGridListModule,MatToolbarModule,MatIconModule,MatFormFieldModule,MatInputModule,MatSidenavModule],
  providers: [NationalParkService],
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
  constructor(private nationalParkService: NationalParkService) {}

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

}
