import type { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../../shared/services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let activeRequests = 0;
  let loadingService = inject(LoadingService);

  if(activeRequests == 0){
    loadingService.show();
  }

  activeRequests++;

  return next(req).pipe(
    finalize(() => {
      activeRequests --;

      if(activeRequests == 0){
        loadingService.hide();
      }
    })
  )
};
