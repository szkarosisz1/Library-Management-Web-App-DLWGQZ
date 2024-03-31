import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BookDTO } from '../../../model/library.dto';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<BookDTO[]>('http://localhost:3000/api/book');
  }

  getOne(id: number) {
    return this.http.get<BookDTO>('http://localhost:3000/api/book/' + id);
  }

  create(book: BookDTO){
    return this.http.post<BookDTO>('http://localhost:3000/api/book', book);
  }

  update(book: BookDTO){
    return this.http.put<BookDTO>('http://localhost:3000/api/book', book);
  }

  delete(id: number) {
    return this.http.delete<BookDTO>('http://localhost:3000/api/book/' + id);
  }
}
