// src/app/prod-hub/prod-hub.component.ts
import { Component, OnInit } from '@angular/core';
import { ServicioBasicoService } from '../servicio-basico.service';

@Component({
  selector: 'app-prod-hub',
  templateUrl: './prod-hub.component.html',
  styleUrls: ['./prod-hub.component.css'],
})
export class ProdHubComponent implements OnInit {
  productos: any[] = [];
  selectedProduct: any = null;

  constructor(private servicioBasico: ServicioBasicoService) {}

  ngOnInit(): void {
    this.servicioBasico.getProductos().subscribe((data) => {
      this.productos = data;
      console.log(this.productos);
    });
  }

  openModal(producto: any) {
    this.selectedProduct = { ...producto };
    (document.getElementById('editModal') as HTMLElement).style.display =
      'block';
  }

  closeModal() {
    (document.getElementById('editModal') as HTMLElement).style.display =
      'none';
    this.selectedProduct = null;
  }

  saveChanges() {
    const index = this.productos.findIndex(
      (p) => p.id === this.selectedProduct.id
    );
    if (index !== -1) {
      this.productos[index] = this.selectedProduct;
    }
    this.closeModal();
  }
}
