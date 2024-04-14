import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MemberDTO } from '../../../models';
import { CommonModule } from '@angular/common';
import { MemberService } from '../services/member.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-member-form-dialog',
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
  templateUrl: './member-form-dialog.component.html',
  styleUrl: './member-form-dialog.component.css'
})
export class MemberFormDialogComponent {
  actionBtn: string;
  dialogTitle: string;
  status: string[] = [
    'Aktív',
    'Passzív'
  ];

  memberForm = this.formBuilder.group({
    name: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    idCardNumber: ['', Validators.required],
    address: ['', Validators.required],
    status: ['', Validators.required]
  });
  
  constructor(
    public dialogRef: MatDialogRef<MemberFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MemberDTO,
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.updateButtonTitle();
  }

  updateButtonTitle() {
    this.actionBtn = this.data ? "Módosítás" : "Mentés";
    this.dialogTitle = this.data ? 'Tag módosítása' : 'Tag hozzáadása';
    if (this.data) {
      this.memberForm.patchValue(this.data);
    }
  }

  save() {
    const member = this.memberForm.value as MemberDTO;
    this.dialogRef.close();
    this.spinner.show();

    if (!this.data) {
      this.memberService.create(member).subscribe({
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
      this.memberService.update(this.data.id, member).subscribe({
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