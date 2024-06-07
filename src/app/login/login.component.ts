// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioBasicoService } from '../servicio-basico.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicioBasico: ServicioBasicoService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { correo, contrasenia } = this.loginForm.value;
      this.servicioBasico.login(correo, contrasenia).subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Correo o contraseña incorrectos.';
        }
      });
    }
  }
}
