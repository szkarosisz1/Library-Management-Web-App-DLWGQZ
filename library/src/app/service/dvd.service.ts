import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DVDDTO } from '../../../model/library.dto';

@Injectable({
  providedIn: 'root'
})
export class DvdService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<DVDDTO[]>('api/dvd');
  }

  getOne(id: number) {
    return this.http.get<DVDDTO>('api/dvd/' + id);
  }

  create(dvd: DVDDTO){
    return this.http.post<DVDDTO>('api/dvd', dvd);
  }

  update(dvd: DVDDTO){
    return this.http.put<DVDDTO>('api/dvd', dvd);
  }

  delete(id: number) {
    return this.http.delete<DVDDTO>('api/dvd/' + id);
  }
}
