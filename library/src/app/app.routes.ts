import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { CassetteListComponent } from './cassette-list/cassette-list.component';
import { DvdListComponent } from './dvd-list/dvd-list.component';
import { ReturnBookListComponent } from './return-book-list/return-book-list.component';
import { ReturnDvdListComponent } from './return-dvd-list/return-dvd-list.component';
import { ReturnCassetteListComponent } from './return-cassette-list/return-cassette-list.component';
import { MemberFormDialogComponent } from './member-form-dialog/member-form-dialog.component';
import { CassetteFormDialogComponent } from './cassette-form-dialog/cassette-form-dialog.component';
import { DvdFormDialogComponent } from './dvd-form-dialog/dvd-form-dialog.component';
import { BookFormDialogComponent } from './book-form-dialog/book-form-dialog.component';
import { BorrowedBookListComponent } from './borrowed-book-list/borrowed-book-list.component';
import { BorrowedBookFormDialogComponent } from './borrowed-book-form-dialog/borrowed-book-form-dialog.component';
import { BorrowedCassetteListComponent } from './borrowed-cassette-list/borrowed-cassette-list.component';
import { BorrowedCassetteFormDialogComponent } from './borrowed-cassette-form-dialog/borrowed-cassette-form-dialog.component';
import { BorrowedDvdListComponent } from './borrowed-dvd-list/borrowed-dvd-list.component';
import { BorrowedDvdFormDialogComponent } from './borrowed-dvd-form-dialog/borrowed-dvd-form-dialog.component';
import { DelayedBookListComponent } from './delayed-book-list/delayed-book-list.component';
import { ReturnBookFormDialogComponent } from './return-book-form-dialog/return-book-form-dialog.component';
import { ReturnCassetteFormDialogComponent } from './return-cassette-form-dialog/return-cassette-form-dialog.component';
import { ReturnDvdFormDialogComponent } from './return-dvd-form-dialog/return-dvd-form-dialog.component';
import { DelayedCassetteListComponent } from './delayed-cassette-list/delayed-cassette-list.component';
import { DelayedDvdListComponent } from './delayed-dvd-list/delayed-dvd-list.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'member-list', component: MemberListComponent },
    { path: 'member-form-dialog', component: MemberFormDialogComponent },
    { path: 'book-list', component: BookListComponent },
    { path: 'book-form-dialog', component: BookFormDialogComponent },
    { path: 'cassette-list', component: CassetteListComponent },
    { path: 'cassette-form-dialog', component: CassetteFormDialogComponent },
	{ path: 'dvd-list', component: DvdListComponent },
    { path: 'dvd-form-dialog', component: DvdFormDialogComponent },
    { path: 'return-book-list', component: ReturnBookListComponent },
    { path: 'return-book-form-dialog', component: ReturnBookFormDialogComponent },
    { path: 'return-cassette-form-dialog', component: ReturnCassetteFormDialogComponent },
    { path: 'return-dvd-form-dialog', component: ReturnDvdFormDialogComponent },
    { path: 'return-cassette-list', component: ReturnCassetteListComponent },
    { path: 'return-dvd-list', component: ReturnDvdListComponent },
    { path: 'borrowed-book-list', component: BorrowedBookListComponent },
    { path: 'borrowed-book-form-dialog', component: BorrowedBookFormDialogComponent},
    { path: 'borrowed-cassette-list', component: BorrowedCassetteListComponent },
    { path: 'borrowed-cassette-form-dialog', component: BorrowedCassetteFormDialogComponent },
    { path: 'borrowed-dvd-list', component: BorrowedDvdListComponent },
    { path: 'borrowed-dvd-form-dialog', component: BorrowedDvdFormDialogComponent },
    { path: 'delayed-book-list', component: DelayedBookListComponent },
    { path: 'delayed-cassette-list', component: DelayedCassetteListComponent },
    { path: 'delayed-dvd-list', component: DelayedDvdListComponent },
];

export default routes;
