import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NationalParkService } from '../../services/national-park.service';
import { ParkResponse, Park } from '../../interfaces/park';

@Component({
  selector: 'app-park-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [NationalParkService],
  templateUrl: './park-list.component.html',
  styleUrl: './park-list.component.css'
})
export class ParkListComponent implements OnInit {
  parkResponse: ParkResponse | null = null;
  error: string = '';
  query: string = '';

  constructor(private nationalParkService: NationalParkService) {}

  ngOnInit(): void {
    this.getParks();
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

    this.nationalParkService.getParksBySearch(this.query).subscribe(
      (data: ParkResponse) => {
        this.parkResponse = data;
        this.error = '';
      },
      (error) => {
        console.error('Error fetching data by search', error);
        this.error = 'Failed to fetch data. Please try again later';
      }
    );
  }

}
