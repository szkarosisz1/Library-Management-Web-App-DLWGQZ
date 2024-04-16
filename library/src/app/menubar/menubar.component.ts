import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule, 
    MatAutocompleteModule, 
    MatToolbarModule, 
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {

  authService = inject(AuthService);
  toastr = inject(ToastrService);
  router = inject(Router);

  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
    this.toastr.success('Kijelentkezés sikeresen megtörtént.', 'Kilépés');
  }
}
