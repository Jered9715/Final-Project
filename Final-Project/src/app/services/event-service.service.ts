import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  historyUpdated: EventEmitter<any> = new EventEmitter<any>();
  
  emitChangeEvent(data: any) {
    this.historyUpdated.emit(data);
  }

  getHistoryEmitter(){
    this.historyUpdated;
  }

  constructor() { }
}
