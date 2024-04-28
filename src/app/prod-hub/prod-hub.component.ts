import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prod-hub',
  templateUrl: './prod-hub.component.html',
  styleUrls: ['./prod-hub.component.css'],
})
export class ProdHubComponent {
  @ViewChild('editModal')
  editModal!: ElementRef;

  productos: any[] = [];
  productosJsonPath = '/assets/productos.json';

  selectedProduct: any = {};

  constructor(private http: HttpClient) {
    this.loadProductos();
  }

  loadProductos() {
    this.http.get<any[]>(this.productosJsonPath).subscribe((data) => {
      this.productos = data;
    });
  }

  openModal(product: any) {
    this.selectedProduct = { ...product };
    this.editModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.editModal.nativeElement.style.display = 'none';
  }

  saveChanges() {
    this.updateProductInJson(this.selectedProduct);
    this.closeModal();
  }

  updateProductInJson(product: any) {
    const index = this.productos.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.productos[index] = product;
      this.http.put(this.productosJsonPath, this.productos).subscribe();
    }
  }
}
