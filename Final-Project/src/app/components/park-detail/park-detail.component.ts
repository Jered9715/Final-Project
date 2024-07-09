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
import { ParkNotesComponent } from '../park-notes/park-notes.component';
import { ParkCodeService } from '../../services/park-code.service';
import { MatDialog } from '@angular/material/dialog';


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
  long= ''
  lat= ''
  mapUrl = ''

  constructor(private route: ActivatedRoute, private nationalParkService: NationalParkService, public dialog: MatDialog, private parkCodeService: ParkCodeService) { }

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
}
