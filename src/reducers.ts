import { DeepReadonly } from 'utility-types';
import { AnyAction } from 'redux';
import { contactPoint } from './definitions';
import { LOAD_CONTACT_POINT_SUCCESS, LOAD_CONTACT_POINT_FAILED } from './actions';
type stateSkeleton = {
  contactPoint: contactPoint[];
  lastError: string | undefined;
};

export type stateType = DeepReadonly<stateSkeleton>;

const initialState: stateSkeleton = {
  contactPoint: [],
  lastError: undefined,
};

export function rootReducer(state: stateType | undefined, action: AnyAction): stateType {
  let newState: stateType = initialState;
  if (state !== undefined) {
    switch (action.type) {
      case LOAD_CONTACT_POINT_SUCCESS: {
        newState = { ...state, contactPoint: action.payload.data };
        break;
      }
      case LOAD_CONTACT_POINT_FAILED: {
        Object.assign(newState, state, { lastError: 'Error loading contactPoint' });
        break;
      }
    }
  }
  return Object.freeze(newState);
}
