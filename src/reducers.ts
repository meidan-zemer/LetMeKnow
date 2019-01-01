import { DeepReadonly } from 'utility-types';
import { AnyAction } from 'redux';
import { LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILED } from './actions';
type stateSkeleton = {
  products: any[];
  lastError: string | undefined;
};

export type stateType = DeepReadonly<stateSkeleton>;

const initialState: stateSkeleton = {
  products: [],
  lastError: undefined,
};

export function rootReducer(state: stateType | undefined, action: AnyAction): stateType {
  let newState: stateType = initialState;
  if (state !== undefined) {
    switch (action.type) {
      case LOAD_PRODUCTS_SUCCESS: {
        newState = { ...state, products: action.payload.data };
        break;
      }
      case LOAD_PRODUCTS_FAILED: {
        Object.assign(newState, state, { lastError: 'Error loading products' });
        break;
      }
    }
  }
  return Object.freeze(newState);
}
