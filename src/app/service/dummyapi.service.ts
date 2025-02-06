import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.post(`${this.API_URL}/create`, user, {headers: this.TOKEN});
  }

  getAllRegisteredUsers(page: number) {
    return this.http.get(`${this.API_URL}?created=1&page=${page}&limit=10`, {headers: this.TOKEN})
  }

  getRegisteredUser(id: string) {
    return this.http.get(`${this.API_URL}/${id}?created=1`, {headers: this.TOKEN})
  }

  updateRegisteredUser(id: string, user: any) {
    return this.http.put(`${this.API_URL}/${id}?created=1`, user, {headers: this.TOKEN})
  }

  deleteRegisteredUser(id: string) {
    return this.http.delete(`${this.API_URL}/${id}?created=1`, {headers: this.TOKEN})
  }

}
