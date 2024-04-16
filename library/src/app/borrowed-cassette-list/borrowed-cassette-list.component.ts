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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { BorrowedCassetteFormDialogComponent } from '../borrowed-cassette-form-dialog/borrowed-cassette-form-dialog.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-borrowed-cassette-list',
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
    BorrowedCassetteFormDialogComponent,
    ToastrModule
  ],
  templateUrl: './borrowed-cassette-list.component.html',
  styleUrl: './borrowed-cassette-list.component.css'
})
export class BorrowedCassetteListComponent {
  borrowedCassettes: BorrowDTO[] = [];
  displayedColumns: string[] = ['id', 'borrowDate', 'member', 'cassette', 'actions'];
  dataSource: MatTableDataSource<BorrowDTO> = new MatTableDataSource<BorrowDTO>(this.borrowedCassettes);
  event: any;
  borrow: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  authService = inject(AuthService);

  constructor(
    private borrowService: BorrowService, 
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    ) { }

    openDialog(borrow: BorrowDTO | null = null) {
      const dialogRef = this.dialog.open(BorrowedCassetteFormDialogComponent, {
        width: '30%',
        data: borrow
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadBorrowedCassettes();
        }
      });
    }
    
    ngOnInit(): void {
      this.loadBorrowedCassettes();
    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    refresh(): void {
      this.spinner.show();
  
      setTimeout(() => {
        this.loadBorrowedCassettes();
        this.spinner.hide();
        location.reload();
      }, 1000);
    }

    loadBorrowedCassettes(): void {
      this.spinner.show();
  
      this.borrowService.getAll().subscribe({
        next: (borrowedCassettes) => {
          this.borrowedCassettes = borrowedCassettes.filter(borrow => borrow.cassette != null);
          this.dataSource = new MatTableDataSource<BorrowDTO>(this.borrowedCassettes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.spinner.hide();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    editBorrowedCassette(borrow: BorrowDTO) {
      this.openDialog(borrow);
    }
  
    deleteBorrowedCassette(id: number) {
      this.spinner.show();
  
      this.borrowService.delete(id).subscribe({
          next: () => {
              this.toastrService.success('Kikölcsönzött kazetta törölve', 'Sikeres törlés');
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
