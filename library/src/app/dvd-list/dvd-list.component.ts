import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild, inject} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DVDDTO } from '../../../models';
import { DvdService } from '../services/dvd.service';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DvdFormDialogComponent } from '../dvd-form-dialog/dvd-form-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dvd-list',
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
  templateUrl: './dvd-list.component.html',
  styleUrl: './dvd-list.component.css'
})
export class DvdListComponent {
  dvds: DVDDTO[] = [];
  displayedColumns: string[] = ['id', 'author', 'title', 'acquisitionDate', 'serialNumber', 'status', 'actions'];
  dataSource: MatTableDataSource<DVDDTO> = new MatTableDataSource<DVDDTO>(this.dvds);
  event: any;
  dvd: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  authService = inject(AuthService);

  constructor(
    private dvdService: DvdService, 
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
  ) { }

  openDialog(dvd: DVDDTO | null = null) {
    const dialogRef = this.dialog.open(DvdFormDialogComponent, {
      width: '30%',
      data: dvd
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDVDs();
      }
    });

  }

  ngOnInit(): void {
    this.loadDVDs();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refresh(): void {
    this.spinner.show();

    setTimeout(() => {
      this.loadDVDs();
      this.spinner.hide();
      location.reload();
    }, 1000);
  }

  loadDVDs(): void {
    this.spinner.show();
    this.dvdService.getAll().subscribe({
      next: (dvds) => {
        this.dvds = dvds;
        this.dataSource = new MatTableDataSource<DVDDTO>(this.dvds);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editDVD(dvd: DVDDTO) {
    this.openDialog(dvd);
  }

  deleteDVD(id: number) {
    this.spinner.show();

    this.dvdService.delete(id).subscribe({
        next: () => {
            this.toastrService.success('A kazetta státusza sikeresen módosítva. Státusz: Szabad', 'Sikeres törlés');
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
