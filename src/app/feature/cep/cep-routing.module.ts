import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BuscaCepComponent } from "./pages/busca-cep/busca-cep.component";
import { ListagemBuscasComponent } from "./pages/listagem-buscas/listagem-buscas.component";
import { CepPageComponent } from "./pages/cep/cep.component";

const routes: Routes = [
  {
    path: "",
    component: CepPageComponent,
    children: [
      {
        path: "",
        redirectTo: "busca",
        pathMatch: "full",
      },
      {
        path: "busca",
        component: BuscaCepComponent,
      },
      {
        path: "listagem",
        component: ListagemBuscasComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CepRoutingModule {}
