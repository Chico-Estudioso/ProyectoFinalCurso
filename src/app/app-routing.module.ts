import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './buscador/buscador.component';
import { MenuBaseComponent } from './menu-base/menu-base.component';
import { ProdHubComponent } from './prod-hub/prod-hub.component';
import { ValoracionesCliComponent } from './valoraciones-cli/valoraciones-cli.component';

const routes: Routes = [
  { path: 'prodhub', component: ProdHubComponent },
  { path: 'valoracionescli', component: ValoracionesCliComponent },
  { path: 'menubase', component: MenuBaseComponent },
  { path: 'buscador', component: BuscadorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
