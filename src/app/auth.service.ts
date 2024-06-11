import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: Cliente | null = null;
  private apiUrl = 'http://localhost:3000/api';

  constructor(private router: Router, private http: HttpClient) {}

  login(correo: string, contrasenia: string): Observable<Cliente | null> {
    return this.http
      .post<Cliente>(`${this.apiUrl}/login`, { correo, contrasenia })
      .pipe(
        map((user) => {
          this.currentUser = user;
          return user;
        }),
        catchError((err) => {
          console.error('Login error:', err);
          return of(null);
        })
      );
  }

  register(newUser: Cliente): Observable<Cliente | null> {
    return this.http.post<Cliente>(`${this.apiUrl}/register`, newUser).pipe(
      map((user) => {
        this.currentUser = user;
        return user;
      }),
      catchError((err) => {
        console.error('Registration error:', err);
        return of(null);
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): Cliente | null {
    return this.currentUser;
  }

  getUserInitials(): string {
    if (this.currentUser) {
      return (
        this.currentUser.nombre.charAt(0) + this.currentUser.correo.charAt(0)
      );
    }
    return '';
  }
}
