import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from './producto';
import { Cliente } from './cliente';
import { Valoracion } from './valoracion';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
AuthService;

@Injectable({
  providedIn: 'root',
})
export class ServicioBasicoService {
  private clientesUrl = 'assets/clientes.json';
  private productosUrl = 'assets/productos.json';
  private clientes: Cliente[] = [];
  private currentUser: Cliente | null = null;
  private loggedInUser: Cliente | null = null;
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loadClientes();
  }

  private loadClientes() {
    this.http.get<Cliente[]>(this.clientesUrl).subscribe((data) => {
      this.clientes = data;
    });
  }

  getClientes(): Observable<Cliente[]> {
    return of(this.clientes);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl).pipe(
      map((productos) => {
        this.getClientes().subscribe((clientes) => {
          productos.forEach((producto) => {
            producto.valoraciones = this.getValoracionesByProducto(
              producto.nombre,
              clientes
            );
          });
        });
        return productos;
      })
    );
  }

  private getValoracionesByProducto(
    productoNombre: string,
    clientes: Cliente[]
  ): Valoracion[] {
    const valoraciones: Valoracion[] = [];
    clientes.forEach((cliente) => {
      cliente.valoraciones.forEach((valoracion) => {
        if (valoracion.prod === productoNombre) {
          valoraciones.push(valoracion);
        }
      });
    });
    return valoraciones;
  }

  login(correo: string, contrasenia: string): Observable<boolean> {
    const cliente = this.clientes.find(
      (c) => c.correo === correo && c.contrasenia === contrasenia
    );
    this.loggedInUser = cliente || null;
    return of(!!cliente);
  }

  register(newCliente: Cliente): Observable<boolean> {
    const clienteExists = this.clientes.some(
      (c) => c.correo === newCliente.correo
    );
    if (!clienteExists) {
      this.clientes.push(newCliente);
      return of(true);
    } else {
      return of(false);
    }
  }

  addRating(productId: number, review: any): Observable<any> {
    const currentUser = this.authService.getCurrentUser(); // Obtener el usuario actual
    if (!currentUser) {
      return new Observable((observer) => {
        observer.error('User not logged in');
        observer.complete();
      });
    }
    const url = `${this.apiUrl}/clientes/${currentUser.id}/valoraciones`;
    return this.http.post(url, review);
  }
}
