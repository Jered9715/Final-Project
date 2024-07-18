import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'
})
export class SnackBarComponent {

    constructor(private _snackBar: MatSnackBar) {}
  
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action);
    }
}
