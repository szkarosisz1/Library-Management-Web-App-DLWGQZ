import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookDTO } from '../../../model/library.dto';
import { MatTableModule } from "@angular/material/table";
import { BookService } from '../service/book.service';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent implements OnInit {
  books: BookDTO[] = [];
  displayedColumns: string[] = ['title', 'author', 'acquisitionDate', 'serialNumber', 'status'];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
}
