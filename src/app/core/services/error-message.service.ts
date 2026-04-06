import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

export interface ErrorDetail {
  message: string;
  status: number;
}

@Injectable({
  providedIn: "root",
})
export class ErrorMessageService {
  fromHttpError(error: HttpErrorResponse): ErrorDetail {
    return {
      status: error.status,
      message: this.resolveMessage(error),
    };
  }

  resolveMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return "Sem conexão com a internet ou servidor indisponível.";
    }
    if (error.status === 400) {
      return "Requisição inválida. Verifique os dados enviados.";
    }
    if (error.status === 404) {
      return "Recurso não encontrado.";
    }
    if (error.status === 408) {
      return "Tempo de resposta esgotado. Tente novamente.";
    }
    if (error.status >= 500) {
      return "Erro interno no servidor. Tente novamente mais tarde.";
    }
    return error.message || "Ocorreu um erro inesperado.";
  }
}
