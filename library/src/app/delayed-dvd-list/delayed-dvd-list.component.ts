import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DelayConfig } from '../../delayed.config';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DvdFormDialogComponent } from '../dvd-form-dialog/dvd-form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-delayed-dvd-list',
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
    DvdFormDialogComponent,
    ToastrModule
  ],
  templateUrl: './delayed-dvd-list.component.html',
  styleUrl: './delayed-dvd-list.component.css'
})
export class DelayedDvdListComponent {
  borrows: BorrowDTO[] = [];
  displayedColumns: string[] = ['id', 'borrowDate', 'returnDate', 'member', 'dvd', 'delay'];
  dataSource: MatTableDataSource<BorrowDTO> = new MatTableDataSource<BorrowDTO>(this.borrows);

  event: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private borrowService: BorrowService, 
    private spinner: NgxSpinnerService,
    private _liveAnnouncer: LiveAnnouncer
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

  loadBorrows(): void {
    this.spinner.show();
    this.borrowService.getAll().subscribe({
        next: (borrows) => {
          this.borrows = borrows.filter(borrow => borrow.dvd != null);
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

  calculateDateDiff(dateFrom, dateTo){
    dateFrom = new Date(dateFrom);
    dateTo = new Date(dateTo);
    
    return Math.floor((Date.UTC(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate()) - Date.UTC(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  calculateDelay(borrow: BorrowDTO): number {
    const delayThresholdInDays = DelayConfig.delayThresholdInDays; // Konfigurálható időkorlát: 30 nap
    var returnDate = new Date();
    var borrowDate = new Date(borrow.borrowDate);

    if(borrow.returnDate != null)
      returnDate = new Date( borrow.returnDate );

    var delayPlusDelayDays = new Date(borrowDate.toLocaleString());
    delayPlusDelayDays.setDate( delayPlusDelayDays.getDate() + delayThresholdInDays );

    var delayDays = this.calculateDateDiff(returnDate, delayPlusDelayDays);

    if(delayDays > 0){
      return delayDays;     
    }
    else {
      return 0;
    }
  }
}
