// src/app/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioBasicoService } from '../servicio-basico.service';
import { Cliente } from '../cliente';

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
    private router: Router,
    private servicioBasico: ServicioBasicoService
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
      this.servicioBasico.register(newUser).subscribe((isRegistered) => {
        if (isRegistered) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'El correo ya está registrado.';
        }
      });
    }
  }
}
