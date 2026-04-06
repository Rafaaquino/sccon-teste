import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { CepService } from "../../services/cep.service";
import { BuscaRealizada } from "../../interfaces/busca-realizada.interface";

@Component({
  selector: "app-listagem-buscas",
  templateUrl: "./listagem-buscas.component.html",
  styleUrls: ["./listagem-buscas.component.scss"],
})
export class ListagemBuscasComponent {
  buscas$: Observable<BuscaRealizada[]> = this.cepService.buscas$;

  constructor(
    private cepService: CepService,
    private router: Router,
  ) {}

  deletarBusca(index: number): void {
    this.cepService.deletarBusca(index);
  }

  irParaBusca(): void {
    this.router.navigate(["/enderecos/busca"]);
  }

  formatarEndereco(busca: BuscaRealizada): string {
    const { logradouro, bairro, localidade, uf } = busca.endereco;
    const partes = [logradouro, bairro, localidade, uf].filter(Boolean);
    return partes.join(", ");
  }
}
