import { Component, Input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ParkListComponent } from '../park-list/park-list.component';
import { ParkVisitHistoryService } from '../../services/park-visit-history.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-park-notes',
  standalone: true,
  providers: [provideNativeDateAdapter(), MatDialog, ParkVisitHistoryService],
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, FormsModule,
    MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule, ParkListComponent, HttpClientModule],
  templateUrl: './park-notes.component.html',
  styleUrl: './park-notes.component.scss',

})
export class ParkNotesComponent {
  @Input() parkCode: string = '';
  parkNotes: string = '';
  dateVisited: Date | null = null;
  parkListComponent: any;


  constructor(
    private parkVisitHistoryService: ParkVisitHistoryService,
    private dialogRef: MatDialogRef<ParkNotesComponent>){ }

  addParkVisitHistory(): void {
    console.log('Park Code:', this.parkCode);
    console.log('Park Notes:', this.parkNotes);
    console.log('Date Visited:', this.dateVisited);
    if (this.parkCode && this.parkNotes && this.dateVisited) {
      const newParkVisitHistory = {
        parkCode: this.parkCode,
        parkNotes: this.parkNotes,
        dateVisited: this.dateVisited.toDateString(),
      };

      console.log('New park visit history:', newParkVisitHistory);

      this.parkVisitHistoryService.addParkVisitHistory(newParkVisitHistory.parkCode, newParkVisitHistory.parkNotes, newParkVisitHistory.dateVisited).subscribe(
        (response: any) => {
          console.log('Park visit history added: ', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Failed to add park history: ', error);
          this.dialogRef.close();
        }
      );

    } else {
      console.error('All Required fields needed.');
    }

  }

}