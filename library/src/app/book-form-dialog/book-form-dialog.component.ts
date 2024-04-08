import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-book-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './book-form-dialog.component.html',
  styleUrl: './book-form-dialog.component.css'
})
export class BookFormDialogComponent {
}
