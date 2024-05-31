import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-menu-base',
  templateUrl: './menu-base.component.html',
  styleUrls: ['./menu-base.component.css'],
})
export class MenuBaseComponent {
  selectedButton: string | null = null;

  constructor(public dialog: MatDialog) {}

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Login dialog result: ${result}`);
    });
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Register dialog result: ${result}`);
    });
  }

  selectButton(button: string) {
    this.selectedButton = button;
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
