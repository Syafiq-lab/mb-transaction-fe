// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('jwtToken', token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('jwtToken');
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  }
}
