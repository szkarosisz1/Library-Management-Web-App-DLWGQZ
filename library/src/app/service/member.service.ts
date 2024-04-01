import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberDTO } from '../../../model/library.dto';
import { apiUrl } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<MemberDTO[]>(apiUrl.ServiceApi + 'member');
  }

  getOne(id: number) {
    return this.http.get<MemberDTO>(apiUrl.ServiceApi + 'member/' + id);
  }

  create(member: MemberDTO){
    return this.http.post<MemberDTO>(apiUrl.ServiceApi + 'member', member);
  }

  update(member: MemberDTO){
    return this.http.put<MemberDTO>(apiUrl.ServiceApi + 'member', member);
  }

  delete(id: number) {
    return this.http.delete<MemberDTO>(apiUrl.ServiceApi + 'member/' + id);
  }
}
