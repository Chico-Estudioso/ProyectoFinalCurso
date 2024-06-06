import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../producto';
import { ServicioBasicoService } from '../servicio-basico.service';

@Component({
  selector: 'app-prod-hub',
  templateUrl: './prod-hub.component.html',
  styleUrls: ['./prod-hub.component.css'],
})
export class ProdHubComponent implements OnInit {
  productos: Producto[] = [];
  modifyProductForm: FormGroup;

  @ViewChild('modifyProductModal') modifyProductModal: any;

  constructor(
    private servicioBasico: ServicioBasicoService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.modifyProductForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      valoracion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.servicioBasico.getProductos().subscribe((data) => {
      this.productos = data;
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

  getRatingStars(rating: number): string {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;
    return '★'.repeat(filledStars) + '☆'.repeat(emptyStars);
  }
}
