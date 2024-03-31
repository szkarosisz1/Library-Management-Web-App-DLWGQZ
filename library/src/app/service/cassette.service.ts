import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CassetteDTO } from '../../../model/library.dto';

@Injectable({
  providedIn: 'root'
})
export class CassetteService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<CassetteDTO[]>('http://localhost:3000/api/cassette');
  }

  getOne(id: number) {
    return this.http.get<CassetteDTO>('http://localhost:3000/api/cassette/' + id);
  }

  create(cassette: CassetteDTO){
    return this.http.post<CassetteDTO>('http://localhost:3000/api/cassette', cassette);
  }

  update(cassette: CassetteDTO){
    return this.http.put<CassetteDTO>('http://localhost:3000/api/cassette', cassette);
  }

  delete(id: number) {
    return this.http.delete<CassetteDTO>('http://localhost:3000/api/cassette/' + id);
  }
}
