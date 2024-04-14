import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<MemberDTO[]>('/api/member');
  }

  getOne(id: number) {
    return this.http.get<MemberDTO>('/api/member/' + id);
  }

  create(member: MemberDTO){
    return this.http.post<MemberDTO>('/api/member', member);
  }

  update(id: number, member: MemberDTO) {
    return this.http.put<MemberDTO>('/api/member/' + id, member);
  }

  delete(id: number) {
    return this.http.put<MemberDTO>('/api/member/' + id + '/status', { status: 'Passzív' });
  }
}
