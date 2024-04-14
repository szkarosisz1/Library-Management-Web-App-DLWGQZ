import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CassetteDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class CassetteService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<CassetteDTO[]>('/api/cassette');
  }

  getOne(id: number) {
    return this.http.get<CassetteDTO>('/api/cassette/' + id);
  }

  create(cassette: CassetteDTO){
    return this.http.post<CassetteDTO>('/api/cassette', cassette);
  }

  update(id: number, cassette: CassetteDTO){
    return this.http.put<CassetteDTO>('/api/cassette/' + id, cassette);
  }

  delete(id: number) {
    return this.http.put<CassetteDTO>('/api/cassette/' + id + '/status', { status: 'Szabad' });
  }
}
