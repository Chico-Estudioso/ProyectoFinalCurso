// src/app/valoraciones-cli/valoraciones-cli.component.ts
import { Component, OnInit } from '@angular/core';
import { ServicioBasicoService } from '../servicio-basico.service';
import { Valoracion } from '../valoracion';

@Component({
  selector: 'app-valoraciones-cli',
  templateUrl: './valoraciones-cli.component.html',
  styleUrls: ['./valoraciones-cli.component.css'],
})
export class ValoracionesCliComponent implements OnInit {
  valoraciones: Valoracion[] = [];

  constructor(private servicioBasico: ServicioBasicoService) {}

  ngOnInit(): void {
    this.servicioBasico.getClientes().subscribe((clientes) => {
      clientes.forEach((cliente) => {
        this.valoraciones.push(...cliente.valoraciones);
      });
    });
  }
}
