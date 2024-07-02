import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent {
  @Input() item:latLong | undefined; // decorate the property with @Input()
  ngOnInit(): void {
    console.log(this.item)
  }
}
class latLong {
  lat: number | undefined;
  long: number | undefined;
}