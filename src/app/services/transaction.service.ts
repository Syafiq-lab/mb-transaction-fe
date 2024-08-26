import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient, private authService: AuthService) {}

  searchTransactions(customerId: string, accountNumber: string, description: string, page: number, size: number): Observable<any> {
    const headers = this.getHeaders();
    let params = `page=${page}&size=${size}`;
    if (customerId) params += `&customerId=${customerId}`;
    if (accountNumber) params += `&accountNumber=${accountNumber}`;
    if (description) params += `&description=${description}`;

    return this.http.get(`${this.apiUrl}?${params}`, { headers });
  }

  searchTransactionsAnyField(searchTerm: string, page: number, size: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/search?searchTerm=${searchTerm}&page=${page}&size=${size}`, { headers });
  }

  updateTransaction(transaction: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/${transaction.id}`, transaction, { headers });
  }

  private getHeaders(): HttpHeaders {
    const headersConfig: { [name: string]: string | string[] } = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    const token = this.authService.getToken();
    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    return new HttpHeaders(headersConfig);
  }
}
