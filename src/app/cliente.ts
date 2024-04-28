import { Valoracion } from './valoracion';

export class Cliente {
  id!: number;
  nombre!: string;
  correo!: string;
  direccion!: string;
  contrasenia!: string;
  valoraciones: Valoracion[] = [];
}
