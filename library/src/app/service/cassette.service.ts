import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CassetteDTO } from '../../../model/library.dto';
import { apiUrl } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class CassetteService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<CassetteDTO[]>(apiUrl.ServiceApi + 'cassette');
  }

  getOne(id: number) {
    return this.http.get<CassetteDTO>(apiUrl.ServiceApi + 'cassette/' + id);
  }

  create(cassette: CassetteDTO){
    return this.http.post<CassetteDTO>(apiUrl.ServiceApi + 'cassette', cassette);
  }

  update(id: number, cassette: CassetteDTO){
    return this.http.put<CassetteDTO>(apiUrl.ServiceApi + 'cassette/' + id, cassette);
  }

  delete(id: number) {
    return this.http.put<CassetteDTO>(apiUrl.ServiceApi + 'cassette/' + id + '/status', { status: 'Szabad' });
  }
}
