import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { Endereco } from "../interfaces/endereco.interface";
import { environment } from "src/environments/environment";
import { BuscaRealizada } from "../interfaces/busca-realizada.interface";

@Injectable({
  providedIn: "root",
})
export class CepService {
  STORAGE_KEY = "cep_buscas";
  buscasSubject = new BehaviorSubject<BuscaRealizada[]>(
    this.carregarDoStorage(),
  );
  buscas$ = this.buscasSubject.asObservable();

  constructor(private http: HttpClient) {}

  buscarCep(cep: string): Observable<Endereco> {
    const cepLimpo = cep.replace(/\D/g, "");
    return this.http
      .get<Endereco>(`${environment.viaCepUrl}/${cepLimpo}/json/`)
      .pipe(
        map((endereco) => {
          if (endereco.erro) {
            throw new Error("CEP não encontrado na base do ViaCEP.");
          }
          return endereco;
        }),
        tap((endereco) => this.persistirBusca(cepLimpo, endereco)),
        catchError((error) => throwError(error)),
      );
  }

  deletarBusca(index: number): void {
    const buscasAtuais = this.buscasSubject.getValue();
    const buscasAtualizadas = buscasAtuais.filter((_, i) => i !== index);
    this.salvarNoStorage(buscasAtualizadas);
    this.buscasSubject.next(buscasAtualizadas);
  }

  private persistirBusca(cep: string, endereco: Endereco): void {
    const novaBusca: BuscaRealizada = {
      cep,
      endereco,
      dataHora: new Date().toISOString(),
    };
    const buscasAtualizadas = [...this.buscasSubject.getValue(), novaBusca];
    this.salvarNoStorage(buscasAtualizadas);
    this.buscasSubject.next(buscasAtualizadas);
  }

  private salvarNoStorage(buscas: BuscaRealizada[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(buscas));
    console.warn("[CepService] Falha ao salvar no localStorage.");
  }

  private carregarDoStorage(): BuscaRealizada[] {
    const dados = localStorage.getItem(this.STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
  }
}
