import { Component } from '@angular/core';
import { BorrowDTO } from '../../../model/library.dto';
import { BorrowService } from '../service/borrow.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

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
    NgxSpinnerModule
  ],
  templateUrl: './return-dvd-list.component.html',
  styleUrl: './return-dvd-list.component.css'
})
export class ReturnDvdListComponent {
  borrows: BorrowDTO[] = [];
  displayedColumns: string[] = ['id', 'borrowDate', 'returnDate', 'member', 'dvd'];

  constructor(private borrowService: BorrowService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadBorrows();
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
    this.borrowService.getAll().subscribe({
      next: (borrows) => {
        this.borrows = borrows.filter(borrow => borrow.returnDate != null);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
