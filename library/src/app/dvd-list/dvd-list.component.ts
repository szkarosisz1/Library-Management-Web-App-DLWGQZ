import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DVDDTO } from '../../../model/library.dto';
import { DvdService } from '../service/dvd.service';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dvd-list',
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
  templateUrl: './dvd-list.component.html',
  styleUrl: './dvd-list.component.css'
})
export class DvdListComponent {
  dvds: DVDDTO[] = [];
  displayedColumns: string[] = ['title', 'author', 'acquisitionDate', 'serialNumber', 'status'];

  constructor(private dvdService: DvdService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadDVDs();
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
    this.dvdService.getAll().subscribe({
      next: (dvds) => {
        this.dvds = dvds;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
