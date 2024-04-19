import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DVDDTO } from '../../../models';
import { DvdService } from '../services/dvd.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dvd-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ],
  templateUrl: './dvd-form-dialog.component.html',
  styleUrl: './dvd-form-dialog.component.css'
})
export class DvdFormDialogComponent {
  actionBtn: string;
  dialogTitle: string;
  status: string[] = [
    'Szabad',
    'Kikölcsönzött',
    'Selejtezett'
  ];

  serialPattern = /^978\d{10}$/;

  dvdForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required]],
    acquisitionDate: [new Date(), [Validators.required]],
    serialNumber: ['', [Validators.required, Validators.pattern(this.serialPattern)]],
    status: ['', [Validators.required]]
  });

  errorMessage = {
    title: 'A cím nem lehet üres.',
    author: 'A szerző nem lehet üres.',
    acquisitionDate: 'Érvénytelen dátum. (Pl.: 2024-04-18 10:00:35)',
    serialNumber: 'Érvénytelen Szériaszám. Helyes formátum: 9789639858001'
  }

  constructor(
    public dialogRef: MatDialogRef<DvdFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DVDDTO,
    private formBuilder: FormBuilder,
    private dvdService: DvdService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.updateButtonTitle();
  }

  updateButtonTitle() {
    this.actionBtn = this.data ? "Módosítás" : "Mentés";
    this.dialogTitle = this.data ? 'DVD módosítása' : 'DVD hozzáadása';
    if (this.data) {
      this.dvdForm.patchValue(this.data);
    }
  }

  save() {
    const dvd = this.dvdForm.value as DVDDTO;
    this.spinner.show();
    this.dialogRef.close();

    if (this.dvdForm.valid) {
      if (!this.data) {
        this.dvdService.create(dvd).subscribe({
          next: () => {
            this.toastrService.success('Mentés sikeresen megtörtént.', 'Sikeres mentés');
            setTimeout(() => {
              this.spinner.hide();
              location.reload();
            }, 1000);
          },
          error: (err) => {
            console.error(err);
            this.toastrService.error('Hiba történt mentéskor.', 'Hiba mentésnél');
            setTimeout(() => {
              this.spinner.hide();
              location.reload();
            }, 1000);
          }
        });
      } else {
        this.dvdService.update(this.data.id, dvd).subscribe({
          next: () => {
            this.toastrService.success('Módosítás sikeresen megtörtént.', 'Sikeres módosítás');
            setTimeout(() => {
              this.spinner.hide();
              location.reload();
            }, 1000);
          },
          error: (err) => {
            console.error(err);
            this.toastrService.error('Hiba történt módosításkor.', 'Hiba módosításnál');
            setTimeout(() => {
              this.spinner.hide();
              location.reload();
            }, 1000);
          }
        })
      }
    } else {
      this.toastrService.error('Érvénytelen adatokat adott meg.', 'Sikertelen DVD hozzáadása');
      setTimeout(() => {
        this.spinner.hide();
        location.reload();
      }, 1000);
    }
  }  

  cancel() {
    this.dialogRef.close();
  }
}
