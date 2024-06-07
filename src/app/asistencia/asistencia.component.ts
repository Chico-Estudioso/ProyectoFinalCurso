// src/app/asistencia/asistencia.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css'],
})
export class AsistenciaComponent {
  constructor(private dialogRef: MatDialogRef<AsistenciaComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
