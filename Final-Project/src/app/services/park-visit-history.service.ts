import { Injectable } from '@angular/core';
import { ParkVisitHistory } from '../interfaces/park-visit-history';
import { Park } from '../interfaces/park';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkVisitHistoryService {
  private history: ParkVisitHistory[] = [
    {
      parkVisitId: 1,
      parkCode: "abcd",
      userId: 2,
      parkNotes: "I loved it",
      dateVisited: "10/24/2023"
    },
    {
      parkVisitId: 2,
      parkCode: "cdef",
      userId: 2,
      parkNotes: "I loved it",
      dateVisited: "10/24/2023"
    },
    {
      parkVisitId: 3,
      parkCode: "huie",
      userId: 2,
      parkNotes: "I loved it",
      dateVisited: "10/24/2023"
    }
  ];

  constructor() { }

  getParkVisitHistory (): ParkVisitHistory[] {
    return this.history;
  }

  /*addParkVisitHistory (parkCode: string, parkNotes: string, dateVisited: string): Observable<ParkVisitHistory> {
    const newHistory: ParkVisitHistory = {
      parkVisitId: this.history.length +1,
      parkCode: parkCode,
      userId: 2,
      parkNotes: parkNotes,
      dateVisited: dateVisited
    }
    this.history.push(newHistory);
    return newHistory;
  }*/

  updateParkVisitHistory (updatedHistory: ParkVisitHistory): boolean {
    const index = this.history.findIndex(p => p.parkVisitId === updatedHistory.parkVisitId);
    if (index !== -1) {
      this.history[index] = updatedHistory;
      return true;
    }

    return false;
  }

  deleteParkVisitHistory(id: number): boolean {
    const index = this.history.findIndex(p => p.parkVisitId === id);
    if (index !== -1) {
      this.history.splice(index, 1);
      return true;
    }
    return false;
  }

}
