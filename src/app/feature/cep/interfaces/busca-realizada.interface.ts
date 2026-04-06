import { Endereco } from "./endereco.interface";

export interface BuscaRealizada {
  cep: string;
  endereco: Endereco;
  dataHora: string;
}
