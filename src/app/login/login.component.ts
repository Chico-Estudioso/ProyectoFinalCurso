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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicioBasico: ServicioBasicoService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.servicioBasico.login(username, password).subscribe((success) => {
        if (success) {
          this.router.navigate(['/home']); // Redirige al usuario a la página principal
        } else {
          alert('Nombre de usuario o contraseña incorrectos');
        }
      });
    }
  }
}
