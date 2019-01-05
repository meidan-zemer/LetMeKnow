import { DeepReadonly } from 'utility-types';
import { AnyAction } from 'redux';
import { contactPoint } from '../../../let-me-know-ts-definitions';
import {
  LOAD_CONTACT_POINT_SUCCESS,
  LOAD_CONTACT_POINT_FAILED,
  ADD_CONTACT_POINT_SUCCESS,
  ADD_CONTACT_POINT_FAILED,
} from './actions';
type stateSkeleton = {
  contactPoints: contactPoint[];
  lastError: string | undefined;
};

export type stateType = DeepReadonly<stateSkeleton>;

const initialState: stateSkeleton = {
  contactPoints: [],
  lastError: undefined,
};
8;
export function rootReducer(state: stateType | undefined, action: AnyAction): stateType {
  if (state === undefined) {
    return Object.freeze(initialState);
  } else {
    let newState: stateType = state;
    switch (action.type) {
      case LOAD_CONTACT_POINT_SUCCESS: {
        newState = { ...state, contactPoints: action.payload.data };
        break;
      }
      case ADD_CONTACT_POINT_FAILED:
      case LOAD_CONTACT_POINT_FAILED: {
        newState = { ...state, lastError: action.error };
        break;
      }
      case ADD_CONTACT_POINT_SUCCESS: {
        let newCP: contactPoint = action.payload.data;
        let newContactPoints = [...state.contactPoints, newCP];
        newState = { ...state, contactPoints: newContactPoints };
        break;
      }
    }
    return Object.freeze(newState);
  }
}
