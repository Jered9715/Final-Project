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
import { ParkNotesComponent } from '../park-notes/park-notes.component';
import { ParkCodeService } from '../../services/park-code.service';
import { MatDialog } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { WishListItem } from '../../interfaces/wishlist';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-park-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule, MapsComponent,
    MatListModule,MatExpansionModule,MatCardModule,MatIconModule,MatDividerModule,MatButtonModule,
    ],
  providers: [NationalParkService, WishlistService],
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
  wishlistSnackBarMessage: string ='Added to Wish-List!';
  snackBarAction: string='Dismiss';

  panelOpenState = false;



  constructor(private route: ActivatedRoute, private nationalParkService: NationalParkService, public dialog: MatDialog, private parkCodeService: ParkCodeService,private wishlistService: WishlistService,private _snackBar: MatSnackBar) { }


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

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action);}
}
