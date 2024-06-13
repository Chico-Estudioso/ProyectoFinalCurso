import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBaseComponent } from './menu-base/menu-base.component';
import { ProdHubComponent } from './prod-hub/prod-hub.component';
import { ValoracionesCliComponent } from './valoraciones-cli/valoraciones-cli.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServicioBasicoService } from './servicio-basico.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { PaqueteEjemploComponent } from './paquete-ejemplo/paquete-ejemplo.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { RateProductComponent } from './rate-product/rate-product.component';
import { AuthInterceptor } from './auth.interceptor'; // Asegúrate de que la ruta es correcta
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
@NgModule({
  declarations: [
    AppComponent,
    MenuBaseComponent,
    ProdHubComponent,
    ValoracionesCliComponent,
    LoginComponent,
    RegisterComponent,
    AsistenciaComponent,
    PaqueteEjemploComponent,
    BuscadorComponent,
    RateProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    // AngularFontAwesomeModule,
  ],
  providers: [
    ServicioBasicoService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
