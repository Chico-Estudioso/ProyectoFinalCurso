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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicioBasico: ServicioBasicoService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      birthdate: ['', Validators.required],
      news: [false],
      terms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newCliente: Cliente = {
        id: Date.now(), // Esto es solo para la simulación. En un entorno real, el ID debería ser generado por el backend.
        nombre: this.registerForm.value.username,
        correo: this.registerForm.value.email,
        direccion: '',
        contrasenia: this.registerForm.value.password,
        valoraciones: [],
      };

      this.servicioBasico.register(newCliente).subscribe((success) => {
        if (success) {
          this.router.navigate(['/home']); // Redirige al usuario a la página principal
        } else {
          alert('Error en el registro');
        }
      });
    }
  }
}
