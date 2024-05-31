// src/app/valoraciones-cli/valoraciones-cli.component.ts
import { Component, OnInit } from '@angular/core';
import { ServicioBasicoService } from '../servicio-basico.service';

@Component({
  selector: 'app-valoraciones-cli',
  templateUrl: './valoraciones-cli.component.html',
  styleUrls: ['./valoraciones-cli.component.css'],
})
export class ValoracionesCliComponent implements OnInit {
  clientes: any[] = [];

  constructor(private servicioBasico: ServicioBasicoService) {}

  ngOnInit(): void {
    this.servicioBasico.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }
}
