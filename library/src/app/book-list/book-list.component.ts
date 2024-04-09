import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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
    MatSortModule,
    BookFormDialogComponent,
    ToastrModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent implements OnInit {
  books: BookDTO[] = [];
  displayedColumns: string[] = ['id', 'author', 'title', 'acquisitionDate', 'serialNumber', 'status', 'actions'];
  dataSource: MatTableDataSource<BookDTO> = new MatTableDataSource<BookDTO>(this.books);
  event: any;
  book: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private bookService: BookService, 
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
   ) { }

  openDialog(book: BookDTO | null = null) {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '30%',
      data: book
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.spinner.show();
    this.bookService.getAll().subscribe({
      next: (books) => {
        this.books = books;
        this.dataSource = new MatTableDataSource<BookDTO>(this.books);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      }
    });
  }

  editBook(book: BookDTO) {
    this.openDialog(book);
  }

  deleteBook(id: number) {
    this.spinner.show();

    this.bookService.delete(id).subscribe({
        next: () => {
            this.toastrService.success('A könyv státusza sikeresen módosítva. Státusz: Szabad', 'Sikeres törlés');
            setTimeout(() => {
                this.spinner.hide(); 
                location.reload(); 
            }, 1000);
        },
        error: (err) => {
            console.error(err);
            this.toastrService.error('Hiba történt a törlés során.', 'Hiba törlésnél');
            setTimeout(() => {
                this.spinner.hide();
                location.reload(); 
            }, 1000);
        }
    });
  }

  filterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
