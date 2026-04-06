import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorMessageService } from "../services/error-message.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly errorMessageService: ErrorMessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const { status, message } =
          this.errorMessageService.fromHttpError(error);
        console.error(`[ErrorInterceptor] HTTP ${status}: ${message}`);
        return throwError(error);
      }),
    );
  }
}
