import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private authService: AuthService
  ) {}

  register() {
    const newUser: Cliente = {
      id: Date.now(), // Generar un ID temporal
      nombre: this.nombre,
      correo: this.correo,
      contrasenia: this.contrasenia,
      direccion: this.direccion,
      valoraciones: [],
    };
    if (!this.authService.register(newUser)) {
      this.errorMessage = 'El correo ya existe';
    } else {
      this.dialogRef.close(true);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
