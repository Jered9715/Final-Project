import { Component, OnInit } from '@angular/core';
import { RouterModule , ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import { NationalParkService } from '../../services/national-park.service';
import { ParkVisitHistoryService } from '../../services/park-visit-history.service';
import { ParkVisitHistory } from '../../interfaces/park-visit-history';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ParkResponse, Park } from '../../interfaces/park';
import { switchMap } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-park-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule, RouterLinkActive],
  providers: [NationalParkService, ParkVisitHistoryService],
  templateUrl: './park-visit-history.component.html',
  styleUrl: './park-visit-history.component.scss'
})
export class ParkVisitHistoryComponent implements OnInit{
  history: ParkVisitHistory[] = [];
  newHistory: ParkVisitHistory = {
    parkVisitId: 0,
    parkCode: '',
    parkNotes: '',
    dateVisited: '',
    userId: 0
  };
  parks: { [key: string]: Park } = {};
  parkResponse: ParkResponse | null = null;
  error: string = '';
  parkCode: string = '';
  park: Park | null = null;

  constructor(private parkVisitHistoryService: ParkVisitHistoryService, 
    private nationalParkService: NationalParkService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.parkVisitHistoryService.getParkVisitHistory().subscribe(history => this.history = history);

    this.history.forEach(history => {
      const parkCode = history.parkCode;
      if (!this.parks[parkCode]) {
        this.nationalParkService.getParkByParkCode(parkCode).subscribe(
          (data: ParkResponse) => {
            this.parkResponse = data;
            this.error = '';
            this.park = this.parkResponse.data[0];
          },
          (error) => {
            console.error('failed to fetch park by id', error);
          }
        )
      }
    });
  }
}
