import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-paquete-ejemplo',
  templateUrl: './paquete-ejemplo.component.html',
  styleUrls: ['./paquete-ejemplo.component.css'],
})
export class PaqueteEjemploComponent {
  constructor(private dialogRef: MatDialogRef<PaqueteEjemploComponent>) {}

  closeModal() {
    this.dialogRef.close();
  }
}
