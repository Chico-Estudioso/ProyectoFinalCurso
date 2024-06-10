import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { PaqueteEjemploComponent } from '../paquete-ejemplo/paquete-ejemplo.component';
import { AsistenciaComponent } from '../asistencia/asistencia.component';

@Component({
  selector: 'app-menu-base',
  templateUrl: './menu-base.component.html',
  styleUrls: ['./menu-base.component.css'],
})
export class MenuBaseComponent {
  selectedButton: string | null = null;

  constructor(public dialog: MatDialog) {}

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      maxWidth: '400px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Login dialog result: ${result}`);
    });
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '100%',
      maxWidth: '500px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Register dialog result: ${result}`);
    });
  }

  openPaqueteEjemplo() {
    const dialogRef = this.dialog.open(PaqueteEjemploComponent, {
      width: '90%',
      maxWidth: '1000px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`PaqueteEjemplo dialog result: ${result}`);
    });
  }

  openAsistenciaDialog() {
    const dialogRef = this.dialog.open(AsistenciaComponent, {
      width: '100%',
      maxWidth: '600px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Asistencia dialog result: ${result}`);
    });
  }

  selectButton(button: string) {
    this.selectedButton = button;
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
