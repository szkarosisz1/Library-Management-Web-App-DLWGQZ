import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDTO } from '../../../model/library.dto';
import { apiUrl } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<BookDTO[]>(apiUrl.ServiceApi + 'book');
  }

  getOne(id: number) {
    return this.http.get<BookDTO>(apiUrl.ServiceApi + 'book/' + id);
  }

  create(book: BookDTO){
    return this.http.post<BookDTO>(apiUrl.ServiceApi + 'book', book);
  }

  update(id: number, book: BookDTO){
    return this.http.put<BookDTO>(apiUrl.ServiceApi + 'book/' + id, book);
  }

  delete(id: number) {
    return this.http.put<BookDTO>(apiUrl.ServiceApi + 'book/' + id + '/status', { status: 'Szabad' });
  }
}
