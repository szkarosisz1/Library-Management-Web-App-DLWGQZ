import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BorrowDTO } from '../../../model/library.dto';
import { apiUrl } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<BorrowDTO[]>(apiUrl.ServiceApi + 'borrow');
  }

  getOne(id: number) {
    return this.http.get<BorrowDTO>(apiUrl.ServiceApi + 'borrow/' + id);
  }

  create(borrow: BorrowDTO){
    return this.http.post<BorrowDTO>(apiUrl.ServiceApi + 'borrow', borrow);
  }

  update(id: Number, borrow: BorrowDTO){
    return this.http.put<BorrowDTO>(apiUrl.ServiceApi + 'borrow/' + id, borrow);
  }

  delete(id: number) {
    return this.http.delete<BorrowDTO>(apiUrl.ServiceApi + 'borrow/' + id);
  }
}
