import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BorrowDTO } from '../../../model/library.dto';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<BorrowDTO[]>('api/borrrow');
  }

  getOne(id: number) {
    return this.http.get<BorrowDTO>('api/borrow/' + id);
  }

  create(borrow: BorrowDTO){
    return this.http.post<BorrowDTO>('api/borrow', borrow);
  }

  update(borrow: BorrowDTO){
    return this.http.put<BorrowDTO>('api/borrow', borrow);
  }

  delete(id: number) {
    return this.http.delete<BorrowDTO>('api/borrow/' + id);
  }
}
