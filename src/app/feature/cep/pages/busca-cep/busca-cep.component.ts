import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CepService } from "../../services/cep.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorMessageService } from "src/app/core/services/error-message.service";

@Component({
  selector: "app-busca-cep",
  templateUrl: "./busca-cep.component.html",
  styleUrls: ["./busca-cep.component.scss"],
})
export class BuscaCepComponent implements OnInit {
  form: FormGroup;
  carregando = false;
  erroApi = false;
  mensagemErro = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cepService: CepService,
    private errorMessageService: ErrorMessageService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cep: ["", [Validators.required]],
    });
  }

  get cepControl() {
    return this.form.get("cep");
  }

  get cepInvalido(): boolean {
    return this.cepControl.invalid && this.cepControl.touched;
  }

  onSubmit(): void {
    const cep = this.form.get("cep");
    if (cep) {
      cep.markAsTouched();
    }

    if (this.form.invalid) {
      return;
    }

    this.carregando = true;
    this.erroApi = false;

    this.cepService.buscarCep(this.cepControl.value).subscribe({
      next: () => {
        this.carregando = false;
        this.router.navigate(["/enderecos/listagem"]);
      },
      error: (err: HttpErrorResponse) => {
        this.carregando = false;
        this.erroApi = true;
        this.mensagemErro = this.errorMessageService.resolveMessage(err);
      },
    });
  }

  limparErro(): void {
    this.erroApi = false;
    this.mensagemErro = "";
  }
}
