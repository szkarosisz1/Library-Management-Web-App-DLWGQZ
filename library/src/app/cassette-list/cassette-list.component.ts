import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CassetteDTO } from '../../../model/library.dto';
import { CassetteService } from '../service/cassette.service';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cassette-list',
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
  ],
  templateUrl: './cassette-list.component.html',
  styleUrl: './cassette-list.component.css'
})
export class CassetteListComponent {
  cassettes: CassetteDTO[] = [];
  displayedColumns: string[] = ['title', 'author', 'acquisitionDate', 'serialNumber', 'status'];

  constructor(private cassetteService: CassetteService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadCassettes();
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
      },
      error: (err) => {
        console.log(err);
      }
    });	
  }

}
