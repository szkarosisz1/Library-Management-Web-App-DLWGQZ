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

  getAllFilteredBy(json: any){
    return this.http.get<MemberDTO[]>(apiUrl.ServiceApi + 'member/filteredBy', { params: json });
  }

  getOne(id: number) {
    return this.http.get<MemberDTO>(apiUrl.ServiceApi + 'member/' + id);
  }

  create(member: MemberDTO){
    return this.http.post<MemberDTO>(apiUrl.ServiceApi + 'member', member);
  }

  update(id: number, member: MemberDTO) {
    return this.http.put<MemberDTO>(apiUrl.ServiceApi + 'member/' + id, member);
  }

  delete(id: number) {
    return this.http.put<MemberDTO>(apiUrl.ServiceApi + 'member/' + id + '/status', { status: 'Passzív' });
  }
}
