import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  correo: string = '';
  contrasenia: string = '';
  errorMessage: string = '';

  constructor(public dialogRef: MatDialogRef<LoginComponent>) {}

  login() {
    // Aquí puedes añadir la lógica de autenticación
    if (this.correo === 'test@test.com' && this.contrasenia === 'password') {
      this.dialogRef.close(true);
    } else {
      this.errorMessage = 'Correo o contraseña incorrectos';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
