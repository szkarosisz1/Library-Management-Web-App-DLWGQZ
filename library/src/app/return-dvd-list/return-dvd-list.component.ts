import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BorrowDTO } from '../../../models';
import { BorrowService } from '../services/borrow.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { BookFormDialogComponent } from '../book-form-dialog/book-form-dialog.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ReturnDvdFormDialogComponent } from '../return-dvd-form-dialog/return-dvd-form-dialog.component';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-return-dvd-list',
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
    NgxSpinnerModule,
    MatInputModule,
    MatDialogModule,
    MatPaginator,
    MatPaginatorModule,
    MatSortModule,
    BookFormDialogComponent,
    ToastrModule
  ],
  templateUrl: './return-dvd-list.component.html',
  styleUrl: './return-dvd-list.component.css'
})
export class ReturnDvdListComponent {
  borrows: BorrowDTO[] = [];
  displayedColumns: string[] = ['id', 'borrowDate', 'returnDate', 'member', 'dvd', 'actions'];
  dataSource: MatTableDataSource<BorrowDTO> = new MatTableDataSource<BorrowDTO>(this.borrows);
  event: any;

  authService = inject(AuthService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private borrowService: BorrowService, 
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadBorrows();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refresh(): void {
    this.spinner.show();

    setTimeout(() => {
      this.loadBorrows();
      this.spinner.hide();
      location.reload();
    }, 1000);
  }

  editBorrow(borrow: BorrowDTO | null = null) {
    const dialogRef = this.dialog.open(ReturnDvdFormDialogComponent, {
      width: '30%',
      data: borrow
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBorrows();
      }
    });
  }
  
  deleteBorrow(id: number) {
    this.spinner.show();

    this.borrowService.delete(id).subscribe({
        next: () => {
            this.toastrService.success('Visszahozott kazetta sikeresen törölve.', 'Sikeres törlés');
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

  loadBorrows(): void {
    this.spinner.show();
    this.borrowService.getAll().subscribe({
      next: (borrows) => {
        this.borrows = borrows.filter(borrow => borrow.returnDate && borrow.dvd != null);
        this.dataSource = new MatTableDataSource<BorrowDTO>(this.borrows);
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
