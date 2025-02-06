import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/via-cep-address.model';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private baseUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  consultarCEP(cep: string): Observable<Address> {
    const url = `${this.baseUrl}/${cep}/json/`;
    return this.http.get<Address>(url);
  }
}
