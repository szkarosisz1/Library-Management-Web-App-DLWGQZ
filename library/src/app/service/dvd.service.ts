import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DVDDTO } from '../../../model/library.dto';
import { apiUrl } from '../api.url';

@Injectable({
  providedIn: 'root'
})
export class DvdService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<DVDDTO[]>(apiUrl.ServiceApi + 'dvd');
  }

  getOne(id: number) {
    return this.http.get<DVDDTO>(apiUrl.ServiceApi + 'dvd/' + id);
  }

  create(dvd: DVDDTO){
    return this.http.post<DVDDTO>(apiUrl.ServiceApi + 'dvd', dvd);
  }

  update(dvd: DVDDTO){
    return this.http.put<DVDDTO>(apiUrl.ServiceApi + 'dvd', dvd);
  }

  delete(id: number) {
    return this.http.delete<DVDDTO>(apiUrl.ServiceApi + 'dvd/' + id);
  }
}
