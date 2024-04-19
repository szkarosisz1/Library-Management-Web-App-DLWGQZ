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
import { BorrowDTO, DVDDTO, MemberDTO } from '../../../models';
import { BorrowService } from '../services/borrow.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-borrowed-dvd-form-dialog',
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
  templateUrl: './borrowed-dvd-form-dialog.component.html',
  styleUrl: './borrowed-dvd-form-dialog.component.css'
})
export class BorrowedDvdFormDialogComponent {
  actionBtn: string;
  dialogTitle: string;
  members: MemberDTO | null = null; 
  dvds: DVDDTO | null = null;

  borrowForm = this.formBuilder.group({
    member: [this.members, Validators.required],
    borrowDate: [new Date(), Validators.required],
    dvd: [this.dvds, Validators.required]
  });

  errorMessage = {
    member: 'A tag azonosítója nem lehet üres.',
    borrowDate: 'Érvénytelen dátum. (Pl.: 2024-04-18 10:00:35)',
    dvd: 'A DVD azonosítója nem lehet üres.'
  }

  constructor(
    public dialogRef: MatDialogRef<BorrowedDvdFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BorrowDTO,
    private formBuilder: FormBuilder,
    private borrowService: BorrowService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.updateButtonTitle();
  }

  updateButtonTitle() {
    this.actionBtn = this.data ? "Módosítás" : "Mentés";
    this.dialogTitle = this.data ? 'Kölcsönzés módosítása' : 'Kölcsönzés hozzáadása';
    if (this.data) { 
      this.borrowForm.patchValue(this.data);
    }
  }

  save() {
    const borrow = this.borrowForm.value as BorrowDTO;
    this.spinner.show();
    this.dialogRef.close();

    if (this.borrowForm.valid) {
      if (!this.data) {
        this.borrowService.create(borrow).subscribe({
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
        this.borrowService.update(this.data.id, borrow).subscribe({
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
      this.toastrService.error('Érvénytelen adatokat adott meg.', 'Sikertelen kikölcsönzés');
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
