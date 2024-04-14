import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DVDDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class DvdService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<DVDDTO[]>('/api/dvd');
  }

  getOne(id: number) {
    return this.http.get<DVDDTO>('/api/dvd/' + id);
  }

  create(dvd: DVDDTO){
    return this.http.post<DVDDTO>('/api/dvd', dvd);
  }

  update(id: number, cassette: DVDDTO){
    return this.http.put<DVDDTO>('/api/dvd/' + id, cassette);
  }

  delete(id: number) {
    return this.http.put<DVDDTO>('/api/dvd/' + id + '/status', { status: 'Szabad' });
  }
}
