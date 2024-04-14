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
import { BookService } from '../services/book.service';
import { BookDTO } from '../../../models';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-form-dialog',
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
  templateUrl: './book-form-dialog.component.html',
  styleUrl: './book-form-dialog.component.css'
})
export class BookFormDialogComponent {
  actionBtn: string;
  dialogTitle: string;
  status: string[] = [
    'Szabad',
    'Kikölcsönzött',
    'Selejtezett'
  ];

  bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    acquisitionDate: [new Date(), Validators.required],
    serialNumber: ['', Validators.required],
    status: ['', Validators.required]
  });
  
  constructor(
    public dialogRef: MatDialogRef<BookFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BookDTO,
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.updateButtonTitle();
  }

  updateButtonTitle() {
    this.actionBtn = this.data ? "Módosítás" : "Mentés";
    this.dialogTitle = this.data ? 'Könyv módosítása' : 'Könyv hozzáadása';
    if (this.data) {
      this.bookForm.patchValue(this.data);
    }
  }

  save() {
    const book = this.bookForm.value as BookDTO;
    this.spinner.show();
    this.dialogRef.close();
  
    if (!this.data) {
      this.bookService.create(book).subscribe({
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
      this.bookService.update(this.data.id, book).subscribe({
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
