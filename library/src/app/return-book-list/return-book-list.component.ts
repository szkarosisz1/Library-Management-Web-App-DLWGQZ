import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { BorrowDTO } from '../../../model/library.dto';
import { BorrowService } from '../service/borrow.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-return-book-list',
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
  templateUrl: './return-book-list.component.html',
  styleUrl: './return-book-list.component.css'
})
export class ReturnBookListComponent {
  borrows: BorrowDTO[] = [];
  displayedColumns: string[] = ['id', 'borrowDate', 'returnDate', 'member', 'book'];

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
