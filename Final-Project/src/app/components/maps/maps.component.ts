import { Component, Input, OnInit } from '@angular/core';
import { NationalParkService } from '../../services/national-park.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent implements OnInit {
  @Input() mapImageUrl: string | undefined
  
  constructor(private nationalParkService: NationalParkService) { }

  ngOnInit(): void {
 
  }

  
}