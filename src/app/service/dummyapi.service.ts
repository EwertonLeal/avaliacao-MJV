import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListResponse } from '../models/list-response.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DummyapiService {

  private readonly TOKEN = new HttpHeaders({ 'app-id': '6452a8978edea06fac91805b' });
  private readonly API_URL = 'https://dummyapi.io/data/v1/user';

  constructor(
    private http: HttpClient
  ) { }

  createRegisteredUser(user: any) {
    return this.http.post(`${this.API_URL}/create?created=1`, user, {headers: this.TOKEN});
  }

  getAllRegisteredUsers(page: number): Observable<IListResponse> {
    return this.http.get<IListResponse>(`${this.API_URL}?page=${page}&limit=10`, {headers: this.TOKEN})
  }

  getRegisteredUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.API_URL}/${id}`, {headers: this.TOKEN})
  }

  updateRegisteredUser(id: string, user: any) {
    return this.http.put(`${this.API_URL}/${id}`, user, {headers: this.TOKEN})
  }

  deleteRegisteredUser(id?: string) {
    return this.http.delete(`${this.API_URL}/${id}`, {headers: this.TOKEN})
  }

}
