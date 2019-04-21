
/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ParcelActionTypes, ParcelActions } from './user-parcel.action';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State {
  products: ParcelState;
}

// State for this feature (Product)
export interface ParcelState {
  parcel: any[];
  error: string;
}

const initialState: ParcelState = {
  parcel: [],
  error: ''
};

// Selector functions
const getParcelFeatureState = createFeatureSelector<ParcelState>('products');

// export const getShowProductCode = createSelector(
//   getProductFeatureState,
//   state => state.showProductCode
// );

// export const getCurrentProduct = createSelector(
//   getProductFeatureState,
//   state => state.currentProduct
// );

// export const getProducts = createSelector(
//   getProductFeatureState,
//   state => state.products
// );

// export const getError = createSelector(
//   getProductFeatureState,
//   state => state.error
// );

export const getProducts = createSelector(
    getParcelFeatureState,
    state => state.parcel
  );

export function reducer(state = initialState, action: ParcelActions): ParcelState {

  switch (action.type) {
    case ParcelActionTypes.LoadSuccess:
      return {
        ...state,
        parcel: action.payload,
        error: ''
      };

    case ParcelActionTypes.LoadFail:
      return {
        ...state,
        parcel: [],
        error: action.payload
      };

    default:
      return state;
  }
}
