import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookDTO } from '../../../model/library.dto';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { BookService } from '../service/book.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BookFormDialogComponent } from '../book-form-dialog/book-form-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDivider,
    MatButtonModule,
    MatToolbar,
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatInputModule,
    MatDialogModule,
    MatPaginator,
    MatPaginatorModule,
    BookFormDialogComponent,
    ToastrModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent implements OnInit {
  books: BookDTO[] = [];
  displayedColumns: string[] = ['id','title', 'author', 'acquisitionDate', 'serialNumber', 'status', 'actions'];
  dataSource: MatTableDataSource<BookDTO> = new MatTableDataSource<BookDTO>();
  event: any;
  book: any;

  constructor(
    private bookService: BookService, 
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef) 
    { }

  openDialog(member: BookDTO | null = null) {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '30%',
      data: member
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBooks();
      }
    });

  }

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

  editBook(book: BookDTO) {
    this.openDialog(book);
  }

  filterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.cdr.detectChanges();
  }

}
