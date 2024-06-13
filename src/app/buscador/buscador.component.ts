import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ServicioBasicoService } from '../servicio-basico.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  userName: string = '';
  price: number = 0;
  searchTerm: string = '';
  productos: Producto[] = [];
  filteredProducts: Producto[] = [];
  selectedCategories: Set<string> = new Set();
  filterByRating: boolean = false;

  constructor(
    private authService: AuthService,
    private servicioBasico: ServicioBasicoService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.userName = user ? user.nombre : 'Invitado';
    this.servicioBasico.getProductos().subscribe((productos) => {
      this.productos = productos;
      this.filteredProducts = productos;
    });
  }

  updatePriceBadge(): void {
    // Actualiza la etiqueta de precio
    this.price = Math.ceil(this.price / 5) * 5;
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  onCategoryFilterChange(event: any): void {
    const category = event.target.value;
    if (event.target.checked) {
      this.selectedCategories.add(category);
    } else {
      this.selectedCategories.delete(category);
    }
    this.applyFilters();
  }

  onRatingFilterChange(): void {
    this.filterByRating = !this.filterByRating;
    this.applyFilters();
  }

  onPriceFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredProducts = this.productos.filter((producto) => {
      const matchesSearchTerm = producto.nombre
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        this.selectedCategories.size === 0 ||
        this.selectedCategories.has(producto.categoria);
      const matchesRating =
        !this.filterByRating || producto.valoracionMedia >= 4;
      const matchesPrice = producto.precio <= this.price;

      return (
        matchesSearchTerm && matchesCategory && matchesRating && matchesPrice
      );
    });
  }

  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? '★' : '☆';
    return '★'.repeat(fullStars) + halfStar + '☆'.repeat(4 - fullStars);
  }
}
