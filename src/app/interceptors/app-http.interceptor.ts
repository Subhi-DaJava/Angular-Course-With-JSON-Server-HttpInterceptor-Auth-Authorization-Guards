import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoadingService} from "../services/loading.service";
import {AppStateService} from "../services/app-state.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(
      private loadingService: LoadingService,
      private appState: AppStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // this.appState.setProductState({
    //   status: Status.LOADING
    // });

    this.loadingService.showLoadingSpinner();

    const requestClone = request.clone({
      headers: request.headers.set('Authorization', 'Bearer JWT')
    });

    return next.handle(requestClone).pipe(
      finalize(() => {

        // this.appState.setProductState({
        //   status: Status.DEFAULT
        // })

        this.loadingService.hideLoadingSpinner();
      })
    );
  }
}
