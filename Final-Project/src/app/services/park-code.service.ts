import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParkCodeService {
  private parkCode: string = '';

  constructor() { }

  setParkCode(parkCode:string): void {
    this.parkCode = parkCode;
  }

  getParkCode(): string {
    return this.parkCode;
  }
}
