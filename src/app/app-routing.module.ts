import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdHubComponent } from './prod-hub/prod-hub.component';
import { ValoracionesCliComponent } from './valoraciones-cli/valoraciones-cli.component';

const routes: Routes = [
  { path: 'prodhub', component: ProdHubComponent },
  { path: 'valoracionescli', component: ValoracionesCliComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
