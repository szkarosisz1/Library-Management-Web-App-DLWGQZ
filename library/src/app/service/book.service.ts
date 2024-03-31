import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDTO } from '../../../model/library.dto';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<BookDTO[]>('api/book');
  }

  getOne(id: number) {
    return this.http.get<BookDTO>('api/book/' + id);
  }

  create(book: BookDTO){
    return this.http.post<BookDTO>('api/book', book);
  }

  update(book: BookDTO){
    return this.http.put<BookDTO>('api/book', book);
  }

  delete(id: number) {
    return this.http.delete<BookDTO>('api/book/' + id);
  }
}
