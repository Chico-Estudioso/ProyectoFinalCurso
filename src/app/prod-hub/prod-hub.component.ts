import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prod-hub',
  templateUrl: './prod-hub.component.html',
  styleUrls: ['./prod-hub.component.css'],
})
export class ProdHubComponent implements OnInit {
  productos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/productos.json').subscribe((data) => {
      this.productos = data;
    });
  }
}
