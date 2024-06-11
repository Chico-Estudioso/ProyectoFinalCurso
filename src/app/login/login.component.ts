import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { correo, contrasenia } = this.loginForm.value;
      this.authService.login(correo, contrasenia).subscribe({
        next: (user) => {
          if (user) {
            this.dialogRef.close(true);
          }
        },
        error: (err) => {
          this.errorMessage = 'Correo o contraseña incorrectos.';
        },
      });
    }
  }

  openRegisterDialog(): void {
    this.dialogRef.close();
    this.dialog.open(RegisterComponent, {
      width: '400px',
    });
  }
}
