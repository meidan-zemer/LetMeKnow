import { AnyAction } from 'redux';
import { contactPoint } from '../../../let-me-know-ts-definitions';
import {
  LOAD_CONTACT_POINT_SUCCESS,
  LOAD_CONTACT_POINT_FAILED,
  ADD_CONTACT_POINT_SUCCESS,
  ADD_CONTACT_POINT_FAILED,
  UPDATE_CONTACT_POINT_FAILED,
  UPDATE_CONTACT_POINT_SUCCESS,
} from './actions';

import { stateType } from './definitions';

const initialState: stateType = {
  contactPointsIds: [],
  contactPointsByIds: {},
  lastError: undefined,
};

export function rootReducer(state: stateType | undefined, action: AnyAction): stateType {
  if (state === undefined) {
    return Object.freeze(initialState);
  } else {
    let newState: stateType = state;
    switch (action.type) {
      case LOAD_CONTACT_POINT_SUCCESS: {
        let ids: string[] = [];
        let byIds: { [s: string]: contactPoint } = {};
        action.payload.data.forEach((cp: contactPoint) => {
          if (cp.cpId) {
            ids.push(cp.cpId);
            byIds[cp.cpId] = cp;
          }
        });
        newState = { ...state, contactPointsByIds: byIds, contactPointsIds: ids };
        break;
      }
      case ADD_CONTACT_POINT_SUCCESS: {
        let newCP: contactPoint = action.payload.data;
        let newIds = [...state.contactPointsIds, newCP.cpId];
        let newByIds = { ...state.contactPointsByIds, [newCP.cpId]: newCP };
        newState = { ...state, contactPointsIds: newIds, contactPointsByIds: newByIds };
        break;
      }
      case UPDATE_CONTACT_POINT_SUCCESS: {
        let newCP: contactPoint = action.payload.data;
        let newByIds = { ...state.contactPointsByIds, [newCP.cpId]: newCP };
        newState = { ...state, contactPointsByIds: newByIds };
        break;
      }
      case ADD_CONTACT_POINT_FAILED:
      case UPDATE_CONTACT_POINT_FAILED:
      case LOAD_CONTACT_POINT_FAILED: {
        newState = { ...state, lastError: action.error };
        break;
      }
    }
    return Object.freeze(newState);
  }
}
