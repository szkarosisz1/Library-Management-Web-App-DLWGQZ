import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BorrowDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<BorrowDTO[]>('/api/borrow');
  }

  getOne(id: number) {
    return this.http.get<BorrowDTO>('/api/borrow/' + id);
  }

  create(borrow: BorrowDTO){
    return this.http.post<BorrowDTO>('/api/borrow', borrow);
  }

  update(id: Number, borrow: BorrowDTO){
    return this.http.put<BorrowDTO>('/api/borrow/' + id, borrow);
  }

  delete(id: number) {
    return this.http.delete<BorrowDTO>('/api/borrow/' + id);
  }
}
