import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginDTO } from '../../../models';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);
  toastr = inject(ToastrService);

  loginForm = this.formBuilder.group({
    email: this.formBuilder.control(''),
    password: this.formBuilder.control('')
  });

  login() {
    const loginData = this.loginForm.value as LoginDTO;

    this.userService.login(loginData).subscribe({
      next: (response) => {
        this.authService.setToken(response.accessToken);
        this.router.navigateByUrl('/home');
        this.toastr.success('Most már végezhet módosítási műveletet is.', 'Sikeres bejelentkezés');
      },
      error: (err) => {
        this.toastr.error('Hibás e-mail cím vagy jelszó.', 'Sikertelen bejelentkezés');
        this.loginForm.reset();
      }
    });
  }
}
