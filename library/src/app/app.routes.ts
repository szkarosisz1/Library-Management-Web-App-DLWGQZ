import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { MultimediaListComponent } from './multimedia-list/multimedia-list.component';
import { BorrowComponent } from './borrow/borrow.component';
import { ReturnComponent } from './return/return.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'member-list', component: MemberListComponent },
    { path: 'book-list', component: BookListComponent },
    { path: 'multimedia-list', component: MultimediaListComponent },
    { path: 'borrow', component: BorrowComponent },
    { path: 'return', component: ReturnComponent }
];

export default routes;
