import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberDTO } from '../../../model/library.dto';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<MemberDTO[]>('api/member');
  }

  getOne(id: number) {
    return this.http.get<MemberDTO>('api/member/' + id);
  }

  create(member: MemberDTO){
    return this.http.post<MemberDTO>('api/member', member);
  }

  update(member: MemberDTO){
    return this.http.put<MemberDTO>('api/member', member);
  }

  delete(id: number) {
    return this.http.delete<MemberDTO>('api/member/' + id);
  }
}
