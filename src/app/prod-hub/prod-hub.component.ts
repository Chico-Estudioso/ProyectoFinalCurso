import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../producto';
import { ServicioBasicoService } from '../servicio-basico.service';
import { AuthService } from '../auth.service'; // <-- Importa el servicio de autenticación
import { RateProductComponent } from '../rate-product/rate-product.component';

@Component({
  selector: 'app-prod-hub',
  templateUrl: './prod-hub.component.html',
  styleUrls: ['./prod-hub.component.css'],
})
export class ProdHubComponent implements OnInit {
  productos: Producto[] = [];
  modifyProductForm: FormGroup;
  rateProductForm: FormGroup;
  isAdmin: boolean = false;
  isLoggedIn: boolean = false; // <-- Define las variables correctamente

  @ViewChild('modifyProductModal') modifyProductModal: any;

  constructor(
    private servicioBasico: ServicioBasicoService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService // <-- Inyecta el servicio de autenticación
  ) {
    this.modifyProductForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      valoracion: ['', Validators.required],
    });

    // Formulario para valorar productos
    this.rateProductForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      review: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.servicioBasico.getProductos().subscribe((data) => {
      this.productos = data;
    });

    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  openModifyModal(producto: Producto) {
    this.modifyProductForm.patchValue(producto);
    const dialogRef = this.dialog.open(this.modifyProductModal, {
      width: '400px',
      data: { producto },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateProduct(result);
      }
    });
  }

  onSubmit(modal: any): void {
    if (this.modifyProductForm.valid) {
      const updatedProduct = this.modifyProductForm.getRawValue();
      this.updateProduct(updatedProduct);
      modal.close(updatedProduct);
    }
  }

  updateProduct(updatedProduct: Producto): void {
    const index = this.productos.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.productos[index] = updatedProduct;
    }
  }

  addToCart(producto: Producto): void {
    console.log(`Producto añadido al carrito: ${producto.nombre}`);
  }

  // Método para abrir el modal de valoración
  openRateModal(producto: Producto) {
    const dialogRef = this.dialog.open(RateProductComponent, {
      width: '400px',
      data: { productId: producto.id, productName: producto.nombre },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Producto valorado con éxito');
      }
    });
  }

  // Método para obtener las estrellas de valoración
  getRatingStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }
}
