// src/app/producto.ts
import { Valoracion } from './valoracion';

export class Producto {
  id!: number;
  nombre!: string;
  descripcion!: string;
  precio!: number;
  categoria!: string;
  imagen!: string;
  valoraciones: Valoracion[] = []; // Añadimos un array de valoraciones

  get valoracionMedia(): number {
    if (this.valoraciones.length === 0) {
      return 0;
    }
    const sumaPuntuaciones = this.valoraciones.reduce(
      (sum, val) => sum + val.puntuacion,
      0
    );
    return parseFloat((sumaPuntuaciones / this.valoraciones.length).toFixed(1));
  }
}
