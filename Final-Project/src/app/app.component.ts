import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParkListComponent } from './components/park-list/park-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ParkDetailComponent } from './components/park-detail/park-detail.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ParkListComponent,MatToolbarModule,MatIconModule, ParkDetailComponent,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Final-Project';
}
