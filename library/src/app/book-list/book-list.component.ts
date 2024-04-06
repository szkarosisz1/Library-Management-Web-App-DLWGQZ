import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookDTO } from '../../../model/library.dto';
import { MatTableModule } from "@angular/material/table";
import { BookService } from '../service/book.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDivider,
    MatButtonModule,
    MatToolbar,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent implements OnInit {
  books: BookDTO[] = [];
  displayedColumns: string[] = ['title', 'author', 'acquisitionDate', 'serialNumber', 'status'];

  constructor(private bookService: BookService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  refresh(): void {
    this.spinner.show();

    setTimeout(() => {
      this.loadBooks();
      this.spinner.hide();
      location.reload();
    }, 1000);
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
