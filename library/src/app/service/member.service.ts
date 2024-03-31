import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberDTO } from '../../../model/library.dto';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<MemberDTO[]>('http://localhost:3000/api/member');
  }

  getOne(id: number) {
    return this.http.get<MemberDTO>('http://localhost:3000/api/member/' + id);
  }

  create(member: MemberDTO){
    return this.http.post<MemberDTO>('http://localhost:3000/api/member', member);
  }

  update(member: MemberDTO){
    return this.http.put<MemberDTO>('http://localhost:3000/api/member', member);
  }

  delete(id: number) {
    return this.http.delete<MemberDTO>('http://localhost:3000/api/member/' + id);
  }
}
