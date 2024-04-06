import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MemberDTO } from '../../../model/library.dto';
import { MemberService } from '../service/member.service';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MemberFormDialogComponent } from '../member-form-dialog/member-form-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDivider,
    MatButtonModule,
    MatToolbar,
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MemberFormDialogComponent,
    ToastrModule
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  members: MemberDTO[] = [];
  displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'identityNumber', 'address', 'status', 'actions'];
  dataSource: MatTableDataSource<MemberDTO> = new MatTableDataSource<MemberDTO>();
  event: any;
  member: any;

  constructor(
    private memberService: MemberService, 
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService, 
    private dialog: MatDialog
    ) { }

    openDialog(member: MemberDTO | null = null) {
      const dialogRef = this.dialog.open(MemberFormDialogComponent, {
        width: '30%',
        data: member
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadMembers();
        }
      });

    }

  target(event: KeyboardEvent): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }
  
  ngOnInit(): void {
    this.loadMembers();
  }

  refresh(): void {
    this.spinner.show();

    setTimeout(() => {
      this.loadMembers();
      this.spinner.hide();
      location.reload();
    }, 1000);
  }

  loadMembers(): void {
    this.memberService.getAll().subscribe({
      next: (members) => {
        this.members = members;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editMember(member: MemberDTO) {
    this.openDialog(member);
  }

  deleteMember(id: number) {
    this.spinner.show();

    this.memberService.delete(id).subscribe({
        next: () => {
            this.toastrService.success('A tag státusza sikeresen módosítva. Státusz: Passzív', 'Sikeres törlés');
            setTimeout(() => {
                this.spinner.hide(); 
                location.reload(); 
            }, 1000);
        },
        error: (err) => {
            console.error(err);
            this.toastrService.error('Hiba történt a törlés során.', 'Hiba törlésnél');
            setTimeout(() => {
                this.spinner.hide();
                location.reload(); 
            }, 1000);
        }
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
