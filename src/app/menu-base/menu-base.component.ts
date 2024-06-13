import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { PaqueteEjemploComponent } from '../paquete-ejemplo/paquete-ejemplo.component';
import { AsistenciaComponent } from '../asistencia/asistencia.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu-base',
  templateUrl: './menu-base.component.html',
  styleUrls: ['./menu-base.component.css'],
})
export class MenuBaseComponent implements OnInit {
  selectedButton: string | null = null;
  userInitials: string = '';

  constructor(public dialog: MatDialog, public authService: AuthService) {}
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.userInitials = this.authService.getUserInitials();
      }
    });
  }
  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '100%',
      maxWidth: '400px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Login dialog result: ${result}`);
      if (result) {
        this.authService.isLoggedIn().subscribe((loggedIn) => {
          this.isLoggedIn = loggedIn;
          if (loggedIn) {
            this.userInitials = this.authService.getUserInitials();
          }
        });
      }
    });
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userInitials = '';
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '100%',
      maxWidth: '500px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Register dialog result: ${result}`);
      if (result) {
        this.isLoggedIn = true;
      }
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
