import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './tokens';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);
  readonly loggedIn = signal<boolean>(false);

  constructor() {
    this.http.get<{ loggedIn: boolean }>(`${this.apiUrl}/auth`).subscribe((auth) => {
      this.loggedIn.set(auth.loggedIn);
    });
  }

  login(): void {
    this.http.patch<{ loggedIn: boolean }>(`${this.apiUrl}/auth`, { loggedIn: true }).subscribe((auth) => {
      this.loggedIn.set(auth.loggedIn);
    });
  }

  logout(): void {
    this.http.patch<{ loggedIn: boolean }>(`${this.apiUrl}/auth`, { loggedIn: false }).subscribe((auth) => {
      this.loggedIn.set(auth.loggedIn);
    });
  }
}
