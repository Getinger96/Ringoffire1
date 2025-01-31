import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-player-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss'
})
export class PlayerMobileComponent {
  constructor(){
    
  }

@Input() name: any;
@Input() playerActive:boolean=false
}
