import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MemberDTO } from '../../../model/library.dto';
import { MemberService } from '../service/member.service';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  members: MemberDTO[] = [];
  displayedColumns: string[] = ['name', 'phoneNumber', 'identityNumber', 'address', 'status'];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadMembers();
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

}
