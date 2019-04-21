import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { AdminDeliveryService } from '../admin-delivery.service';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as adminActions from './admin-delivery.action';

@Injectable()
export class ProductEffects {

  constructor(private productService: AdminDeliveryService,
              private actions$: Actions) { }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(adminActions.ParcelActionTypes.Load),
    mergeMap(action =>
      this.productService.getDeliveryDetailsAdmin().pipe(
        map(products => (new adminActions.LoadSuccess(products))),
        catchError(err => of(new adminActions.LoadFail(err)))
      )
    )
  );

}
