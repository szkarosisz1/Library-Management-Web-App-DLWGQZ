import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild, inject} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CassetteDTO } from '../../../models';
import { CassetteService } from '../services/cassette.service';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CassetteFormDialogComponent } from '../cassette-form-dialog/cassette-form-dialog.component';
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
  selector: 'app-cassette-list',
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
    CassetteFormDialogComponent,
    ToastrModule,
  ],
  templateUrl: './cassette-list.component.html',
  styleUrl: './cassette-list.component.css'
})
export class CassetteListComponent {
  cassettes: CassetteDTO[] = [];
  displayedColumns: string[] = ['id', 'author', 'title', 'acquisitionDate', 'serialNumber', 'status', 'actions'];
  dataSource: MatTableDataSource<CassetteDTO> = new MatTableDataSource<CassetteDTO>(this.cassettes);
  event: any;
  book: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  authService = inject(AuthService);

  constructor(
    private cassetteService: CassetteService, 
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,) { }

    openDialog(cassette: CassetteDTO | null = null) {
      const dialogRef = this.dialog.open(CassetteFormDialogComponent, {
        width: '30%',
        data: cassette
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadCassettes();
        }
      });
  
    }

  ngOnInit(): void {
    this.loadCassettes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refresh(): void {
    this.spinner.show();
    setTimeout(() => {
      this.loadCassettes();
      this.spinner.hide();
      location.reload();
    }, 1000);
  }

  loadCassettes(): void {
    this.cassetteService.getAll().subscribe({
      next: (cassettes) => {
        this.cassettes = cassettes;
        this.dataSource = new MatTableDataSource<CassetteDTO>(this.cassettes);
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

  editCassette(cassette: CassetteDTO) {
    this.openDialog(cassette);
  }

  deleteCassette(id: number) {
    this.spinner.show();

    this.cassetteService.delete(id).subscribe({
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
