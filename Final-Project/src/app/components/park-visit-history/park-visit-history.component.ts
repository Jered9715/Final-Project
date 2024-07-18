import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { NationalParkService } from '../../services/national-park.service';
import { ParkVisitHistoryService } from '../../services/park-visit-history.service';
import { ParkVisitHistory } from '../../interfaces/park-visit-history';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ParkResponse, Park } from '../../interfaces/park';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EventServiceService } from '../../services/event-service.service';
import { Subscription } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-park-detail',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule, RouterLinkActive, MatCardModule, MatButtonModule, MatGridListModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatProgressBarModule],
  providers: [NationalParkService, ParkVisitHistoryService],
  templateUrl: './park-visit-history.component.html',
  styleUrl: './park-visit-history.component.scss'
})
export class ParkVisitHistoryComponent implements OnInit {
  history: ParkVisitHistory[] = [];
  parks: { [key: string]: Park } = {};
  error: string = '';
  badgeHistory: string[] = [];
  totalParks: number = 429;
  visitedParks: number = 0;
  percentageVisited: number = 0; 
  private subscription: Subscription = new Subscription;

  constructor(private parkVisitHistoryService: ParkVisitHistoryService,
    private nationalParkService: NationalParkService, private router: Router, private route: ActivatedRoute, private eventService: EventServiceService) { }

  ngOnInit(): void {
    this.loadVisitHistory();
    this.subscription = this.eventService.historyUpdated.subscribe(() => 
      {
        this.loadVisitHistory()
      });
  }

  loadVisitHistory(): void {
    this.parkVisitHistoryService.getParkVisitHistory().subscribe(
      (history: ParkVisitHistory[]) => {
        this.history = history;
        this.loadParks();
        this.badgeHistory = [...new Set(this.history.map(x => x.parkCode))];
        this.visitedParks = this.history.length;
        this.percentageVisited = (this.visitedParks / this.totalParks) * 100;
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
              this.parks[parkCode].localPhotoPath = `assets/park-badges/${parkCode}.jpg`;
              console.log("local photo:", this.parks[parkCode].localPhotoPath)
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
          this.visitedParks--;
          this.percentageVisited = (this.visitedParks / this.totalParks) * 100;
        }
      },
      (error) => {
        console.error('Failed to remove history item', error);
      }
    );

  }
}
