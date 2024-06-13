import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ServicioBasicoService } from '../servicio-basico.service';

@Component({
  selector: 'app-rate-product',
  templateUrl: './rate-product.component.html',
  styleUrls: ['./rate-product.component.css'],
})
export class RateProductComponent {
  productImage: string;
  productDescription: string;
  reviewDescription: string = '';
  currentUser: any;

  ratings: { [key: string]: number } = {
    // Definición explícita del tipo
    general: 0,
    promised: 0,
    recommend: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<RateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicioBasico: ServicioBasicoService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
    this.productImage = data.productImage;
    this.productDescription = data.productDescription;
  }

  rate(value: number, aspect: string) {
    this.ratings[aspect] = value; // Uso de índice con notación de tipo correcto
  }

  submitReview(): void {
    const overallRating = this.ratings['general'];
    const review = {
      rating: overallRating,
      review: this.reviewDescription,
      aspects: {
        promised: this.ratings['promised'],
        recommend: this.ratings['recommend'],
      },
    };

    if (this.currentUser) {
      this.servicioBasico.addRating(this.data.productId, review).subscribe(
        (response) => {
          console.log('Valoración añadida:', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error al añadir valoración:', error);
        }
      );
    } else {
      console.error('Usuario no está logueado');
    }
  }
  updateStarColors(aspect: string): void {
    const stars = document.querySelectorAll(
      `.stars[data-aspect="${aspect}"] .star`
    );
    stars.forEach((star: Element, index: number) => {
      if (index < this.ratings[aspect]) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }
}
