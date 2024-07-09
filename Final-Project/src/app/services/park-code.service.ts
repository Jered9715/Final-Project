import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParkCodeService {
  private parkCode: string = '';

  constructor() { }

  setParkCode(parkCode:string): void {
    this.parkCode = parkCode;
    console.log("park code in service", this.parkCode)
  }

  getParkCode(): string {
    console.log("get parkCode", this.parkCode)
    return this.parkCode;
  }
}
