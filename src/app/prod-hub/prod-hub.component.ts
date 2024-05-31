import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServicioBasicoService } from '../servicio-basico.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-prod-hub',
  templateUrl: './prod-hub.component.html',
  styleUrls: ['./prod-hub.component.css'],
})
export class ProdHubComponent implements OnInit {
  productos: Producto[] = [];
  @ViewChild('modifyProductModal') modifyProductModal!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private servicioBasico: ServicioBasicoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.servicioBasico.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  openModifyModal(producto: Producto): void {
    this.dialogRef = this.dialog.open(this.modifyProductModal, {
      width: '400px',
      data: { producto },
    });
  }

  saveChanges(producto: Producto): void {
    // Lógica para guardar los cambios en el producto
    console.log('Producto modificado:', producto);
    this.dialogRef.close();
  }
}
