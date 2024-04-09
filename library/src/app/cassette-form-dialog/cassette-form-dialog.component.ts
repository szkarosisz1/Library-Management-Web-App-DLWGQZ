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
import { CassetteDTO } from '../../../model/library.dto';
import { CassetteService } from '../service/cassette.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cassette-form-dialog',
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
  templateUrl: './cassette-form-dialog.component.html',
  styleUrl: './cassette-form-dialog.component.css'
})
export class CassetteFormDialogComponent {
  actionBtn: string;
  dialogTitle: string;
  status: string[] = [
    'Szabad',
    'Kikölcsönzött',
    'Selejtezett'
  ];

  cassetteForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    acquisitionDate: [new Date(), Validators.required],
    serialNumber: ['', Validators.required],
    status: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<CassetteFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CassetteDTO,
    private formBuilder: FormBuilder,
    private cassetteService: CassetteService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.updateButtonTitle();
  }

  updateButtonTitle() {
    this.actionBtn = this.data ? "Módosítás" : "Mentés";
    this.dialogTitle = this.data ? 'Kazetta módosítása' : 'Kazetta hozzáadása';
    if (this.data) {
      this.cassetteForm.patchValue(this.data);
    }
  }

  save() {
    const cassette = this.cassetteForm.value as CassetteDTO;
    this.spinner.show();
    this.dialogRef.close();
  
    if (!this.data) {
      this.cassetteService.create(cassette).subscribe({
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
      this.cassetteService.update(this.data.id, cassette).subscribe({
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
  }  

  cancel() {
    this.dialogRef.close();
  }
}
