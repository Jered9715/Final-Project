import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NationalParkService } from '../../services/national-park.service';
import { MapsComponent } from '../maps/maps.component';
import { ParkResponse, Park } from '../../interfaces/park';

@Component({
  selector: 'app-park-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule, MapsComponent],
  providers: [NationalParkService],
  templateUrl: './park-detail.component.html',
  styleUrl: './park-detail.component.scss'
})
export class ParkDetailComponent {

}
