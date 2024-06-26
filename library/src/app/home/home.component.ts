import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatDivider,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {
  selectedImage = 1;
  slideAnimation = false;

  nextImage() {
    this.selectedImage++; 
    if (this.selectedImage > 3) { 
      this.selectedImage = 1; 
    }
    this.slideAnimation = true;
    setTimeout(() => this.slideAnimation = false, 300); 
  }

  prevImage() {
    this.selectedImage--; 
    if (this.selectedImage < 1) { 
      this.selectedImage = 3;
    }
    this.slideAnimation = true;
    setTimeout(() => this.slideAnimation = false, 300); 
  }

}
