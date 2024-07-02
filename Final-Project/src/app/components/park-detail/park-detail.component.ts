import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NationalParkService } from '../../services/national-park.service';
import { MapsComponent } from '../maps/maps.component';
import { ParkResponse, Park } from '../../interfaces/park';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-park-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule, MapsComponent],
  providers: [NationalParkService],
  templateUrl: './park-detail.component.html',
  styleUrl: './park-detail.component.scss'
})
export class ParkDetailComponent implements OnInit {
  parkResponse: ParkResponse | null = null;
  error: string = '';
  parkCode: string = '';
  park: Park | null = null;
  //this.parkCode == route paramater check notes

  constructor(private route: ActivatedRoute, private nationalParkService: NationalParkService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.parkCode = params['parkCode'];
        return this.nationalParkService.getParkByParkCode(this.parkCode);
      })
    ).subscribe({
      next: (data: ParkResponse) => {
        this.parkResponse = data;
        //console.log(this.parkResponse.data[0].latLong)
        this.error = '';
        this.park = this.parkResponse.data[0];
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.error = 'Failed to fetch data. Please try again later';
      }
    });
  }
}
