import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NationalParkService } from '../../services/national-park.service';
import { MapsComponent } from '../maps/maps.component';
import { ParkResponse, Park } from '../../interfaces/park';
import { ActivatedRoute } from '@angular/router';
import { switchMap} from 'rxjs';
import { map } from 'rxjs';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-park-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule, MapsComponent,MatListModule,MatExpansionModule],
  providers: [NationalParkService],
  templateUrl: './park-detail.component.html',
  styleUrl: './park-detail.component.scss'
})
export class ParkDetailComponent implements OnInit {
  parkResponse: ParkResponse | null = null;
  error: string = '';
  parkCode: string = '';
  park: Park | null = null;
  long= ''
  lat= ''
  mapUrl = ''
  panelOpenState = false;
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
        this.error = '';
        this.park = this.parkResponse.data[0];
        this.lat = this.park.latitude
        this.long = this.park.longitude
        this.mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${this.lat},${this.long}&zoom=8&size=900x400&key=AIzaSyB8AUBjZnPw4AHCAo0_QDGz_bdLapP7Gbg`
        console.log(this.park)
        console.log('coords',this.lat,this.long)
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.error = 'Failed to fetch data. Please try again later';
      }
    });
  }
}
