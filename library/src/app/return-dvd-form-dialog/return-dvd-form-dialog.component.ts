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
  selector: 'app-return-dvd-form-dialog',
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
  templateUrl: './return-dvd-form-dialog.component.html',
  styleUrl: './return-dvd-form-dialog.component.css'
})
export class ReturnDvdFormDialogComponent {
  members: MemberDTO | null = null; 
  dvds: DVDDTO | null = null;

  memberId: number | null = null;
  dvdId: number | null = null;

  borrowForm = this.formBuilder.group({
    returnDate: [new Date(), Validators.required],
    member: [this.memberId, Validators.required],
    dvd: [this.dvdId, Validators.required]
  });

  errorMessage = {
    returnDate: 'Érvénytelen dátum. (Pl.: 2024-04-18 10:00:35)',
    member: 'A tag azonosítója nem lehet üres',
    dvd: 'A DVD azonosítója nem lehet üres.'
  }

  constructor(
    public dialogRef: MatDialogRef<ReturnDvdFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BorrowDTO,
    private formBuilder: FormBuilder,
    private borrowService: BorrowService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.updateForm();
  }

  updateForm() {
    if (this.data) { 
      // Idegen kulcsok inicializálása
      this.memberId = this.data.member.id;
      this.dvdId = this.data.dvd.id;
      this.borrowForm.patchValue({
        returnDate: this.data.returnDate,
        member: this.memberId,
        dvd: this.dvdId
      });
    }
  }

  save() {
    const borrow = this.borrowForm.value as unknown as BorrowDTO;
    this.spinner.show();
    this.dialogRef.close();
  
    if (this.borrowForm.valid) {
      if (this.data) {
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
        });
      }
    } else {
      this.toastrService.error('Érvénytelen adatokat adott meg.', 'Sikertelen módosíás');
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
