import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { BorrowComponent } from './borrow/borrow.component';
import { CassetteListComponent } from './cassette-list/cassette-list.component';
import { DvdListComponent } from './dvd-list/dvd-list.component';
import { ReturnBookListComponent } from './return-book-list/return-book-list.component';
import { ReturnDvdListComponent } from './return-dvd-list/return-dvd-list.component';
import { ReturnCassetteListComponent } from './return-cassette-list/return-cassette-list.component';
import { MemberFormDialogComponent } from './member-form-dialog/member-form-dialog.component';
import { CassetteFormDialogComponent } from './cassette-form-dialog/cassette-form-dialog.component';
import { DvdFormDialogComponent } from './dvd-form-dialog/dvd-form-dialog.component';
import { BookFormDialogComponent } from './book-form-dialog/book-form-dialog.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'member-list', component: MemberListComponent },
    { path: 'book-list', component: BookListComponent },
    { path: 'cassette-list', component: CassetteListComponent },
	{ path: 'dvd-list', component: DvdListComponent },
    { path: 'borrow', component: BorrowComponent },
    { path: 'return-book-list', component: ReturnBookListComponent },
    { path: 'return-cassette-list', component: ReturnCassetteListComponent },
    { path: 'return-dvd-list', component: ReturnDvdListComponent },
    { path: 'member-form-dialog', component: MemberFormDialogComponent },
    { path: 'book-form-dialog', component: BookFormDialogComponent },
    { path: 'cassette-form-dialog', component: CassetteFormDialogComponent },
    { path: 'dvd-form-dialog', component: DvdFormDialogComponent }
];

export default routes;
