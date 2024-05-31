import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from './cliente';
import clientesData from '../assets/clientes.json';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clientes: Cliente[] = clientesData;
  private currentUser: Cliente | null = null;

  constructor(private router: Router) {}

  login(correo: string, contrasenia: string): boolean {
    const user = this.clientes.find(
      (cliente) =>
        cliente.correo === correo && cliente.contrasenia === contrasenia
    );
    if (user) {
      this.currentUser = user;
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  register(newUser: Cliente): boolean {
    if (this.clientes.find((cliente) => cliente.correo === newUser.correo)) {
      return false; // Email already exists
    }
    newUser.id = Date.now(); // Generar un ID temporal
    this.clientes.push(newUser);
    this.currentUser = newUser;
    this.router.navigate(['/']);
    return true;
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): Cliente | null {
    return this.currentUser;
  }
}
