import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  passwordPattern = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{7,}$/;

  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
  });

  errorMessage = {
    firstname: 'A vezetéknév mező kitöltése kötelező.',
    lastname: 'A keresztnév mező kitöltése kötelező.',
    email: 'Érvénytelen e-mail címet adott meg.',
    password: 'A jelszó legalább 7 karakter hosszú, kis-, nagybetűt és számot tartalmaz.',
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  saveUser(registerData: UserDTO) {
    this.userService.create(registerData).subscribe({
      next: () => {
        this.toastr.success('A regisztráció sikeresen megtörtént.', 'Sikeres regisztráció');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        if (err.status === 422) {
          this.toastr.error('Ez az e-mail cím már használatban van.', 'Sikertelen regisztráció');
        } else {
          this.toastr.error('Szerverhiba', 'Sikertelen regisztráció');
        }
      }
    });
  }
  
  register() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value as UserDTO;
      this.saveUser(registerData);
    } else {
      this.toastr.error('Érvénytelen adatokat adott meg.', 'Sikertelen regisztráció');
    }
  }
}