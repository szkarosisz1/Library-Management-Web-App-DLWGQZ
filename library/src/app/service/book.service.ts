import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BookDTO } from '../../../model/library.dto';
import { apiUrl } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<BookDTO[]>(apiUrl.ServiceApi + 'book');
  }

  getOne(id: number) {
    return this.http.get<BookDTO>(apiUrl.ServiceApi + 'book/' + id);
  }

  create(book: BookDTO){
    return this.http.post<BookDTO>(apiUrl.ServiceApi + 'book', book);
  }

  update(book: BookDTO){
    return this.http.post<BookDTO>(apiUrl.ServiceApi + 'book', book);
  }

  delete(id: number) {
    return this.http.delete<BookDTO>(apiUrl.ServiceApi + 'book/' + id);
  }
}
