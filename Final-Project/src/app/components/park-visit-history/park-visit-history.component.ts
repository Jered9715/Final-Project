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
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-park-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule, RouterLinkActive, MatCardModule,MatButtonModule,MatGridListModule,MatToolbarModule,MatIconModule,MatFormFieldModule,MatInputModule,MatSidenavModule],
  providers: [NationalParkService, ParkVisitHistoryService],
  templateUrl: './park-visit-history.component.html',
  styleUrl: './park-visit-history.component.scss'
})
export class ParkVisitHistoryComponent implements OnInit{
  history: ParkVisitHistory[] = [];
  parks: { [key: string]: Park } = {};
  error: string = '';

  constructor(private parkVisitHistoryService: ParkVisitHistoryService, 
    private nationalParkService: NationalParkService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadVisitHistory();
  }

  loadVisitHistory(): void{
    this.parkVisitHistoryService.getParkVisitHistory().subscribe(
      (history: ParkVisitHistory[]) => {
        this.history = history;
        this.loadParks();
      },
      (error) => {
        this.error = 'Failed to get park visit history';
        console.error('Error loading park visit history');
      }
    );
  }

  loadParks(): void {
    this.history.forEach((historyItem: ParkVisitHistory) => {
      const parkCode = historyItem.parkCode;
      if (!this.parks[parkCode]) {
        this.nationalParkService.getParkByParkCode(parkCode).subscribe(
          (response: ParkResponse) => {
            if (response.total > 0) {
              this.parks[parkCode] = response.data[0];
            }
          },
          (error: any) => {
            console.error(`Failed to get park with code ${parkCode}:`, error);
          }
        );
      }
    });
  }

  removeHistoryItem(historyItem: ParkVisitHistory): void {
    this.parkVisitHistoryService.deleteParkVisitHistory(historyItem.parkVisitId).subscribe(
      () => {
        const itemToRemove = this.history.indexOf(historyItem);
        if (itemToRemove > -1) {
          this.history.splice(itemToRemove, 1);
        }
      },
      (error) => {
        console.error('Failed to remove history item', error);
      }
    );

  }
}
