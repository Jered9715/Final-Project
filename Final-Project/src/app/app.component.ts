import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParkListComponent } from './components/park-list/park-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ParkListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Final-Project';
}
