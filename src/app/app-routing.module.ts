import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdHubComponent } from './prod-hub/prod-hub.component';
import { ValoracionesCliComponent } from './valoraciones-cli/valoraciones-cli.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'prodhub', component: ProdHubComponent },
  { path: 'valoracionescli', component: ValoracionesCliComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
