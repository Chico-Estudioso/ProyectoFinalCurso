import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Cliente } from '../cliente';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.registerForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      contrasenia: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: Cliente = this.registerForm.value;
      this.authService.register(newUser).subscribe({
        next: (user) => {
          if (user) {
            this.dialogRef.close(true);
          }
        },
        error: (err) => {
          this.errorMessage = 'El correo ya está registrado.';
        },
      });
    }
  }
  openLoginDialog(): void {
    this.dialogRef.close();
    this.dialog.open(LoginComponent, {
      width: '400px',
    });
  }
}
