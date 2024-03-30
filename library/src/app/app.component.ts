import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { MemberListComponent } from "./member-list/member-list.component";
import { BookListComponent } from "./book-list/book-list.component";
import { MultimediaListComponent } from "./multimedia-list/multimedia-list.component";
import { BorrowComponent } from "./borrow/borrow.component";
import { ReturnComponent } from "./return/return.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent, MemberListComponent, BookListComponent, MultimediaListComponent, BorrowComponent, ReturnComponent]
})
export class AppComponent {
  title = 'library';
}
