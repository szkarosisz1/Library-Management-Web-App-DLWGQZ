import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookDTO } from '../../../model/library.dto';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule  
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  books : BookDTO[] = [];
}
