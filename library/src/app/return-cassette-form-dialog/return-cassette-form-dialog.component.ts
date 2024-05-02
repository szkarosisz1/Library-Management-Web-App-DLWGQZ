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
import { BorrowDTO, CassetteDTO, MemberDTO } from '../../../models';
import { BorrowService } from '../services/borrow.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-return-cassette-form-dialog',
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
  templateUrl: './return-cassette-form-dialog.component.html',
  styleUrl: './return-cassette-form-dialog.component.css'
})
export class ReturnCassetteFormDialogComponent {
  members: MemberDTO | null = null; 
  cassettes: CassetteDTO | null = null;

  memberId: number | null = null;
  cassetteId: number | null = null;

  borrowForm = this.formBuilder.group({
    returnDate: [new Date(), Validators.required],
    member: [this.memberId, Validators.required],
    cassette: [this.cassetteId, Validators.required]
  });

  errorMessage = {
    returnDate: 'Érvénytelen dátum. (Pl.: 2024-04-18 10:00:35)',
    member: 'A tag azonosítója nem lehet üres',
    cassette: 'A kazetta azonosítója nem lehet üres.'
  }

  constructor(
    public dialogRef: MatDialogRef<ReturnCassetteFormDialogComponent>,
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
      this.cassetteId = this.data.cassette.id;
      this.borrowForm.patchValue({
        returnDate: this.data.returnDate,
        member: this.memberId,
        cassette: this.cassetteId
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
        })
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
