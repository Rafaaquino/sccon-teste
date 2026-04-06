import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { NgxMaskModule } from "ngx-mask";
import { ListagemBuscasComponent } from "./pages/listagem-buscas/listagem-buscas.component";
import { BuscaCepComponent } from "./pages/busca-cep/busca-cep.component";
import { CepPageComponent } from "./pages/cep/cep.component";
import { CepRoutingModule } from "./cep-routing.module";

@NgModule({
  declarations: [CepPageComponent, BuscaCepComponent, ListagemBuscasComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CepRoutingModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
  ],
})
export class CepModule {}
