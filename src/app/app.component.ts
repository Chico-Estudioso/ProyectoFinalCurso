// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.authService.isLoggedIn()) {
        this.openLoginDialog();
      }
    }, 2000);
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the dialog result if needed
    });
  }
}
