import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  nombre: string = '';
  correo: string = '';
  contrasenia: string = '';
  direccion: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const newUser: Cliente = {
      id: 0,
      nombre: this.nombre,
      correo: this.correo,
      contrasenia: this.contrasenia,
      direccion: this.direccion,
      valoraciones: [],
    };
    if (!this.authService.register(newUser)) {
      this.errorMessage = 'El correo ya existe';
    }
  }
}
