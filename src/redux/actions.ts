import { AnyAction } from 'redux';

export const LOAD_CONTACT_POINT = 'LOAD_CONTACT_POINT';
export const LOAD_CONTACT_POINT_SUCCESS = 'LOAD_CONTACT_POINT_SUCCESS)';
export const LOAD_CONTACT_POINT_FAILED = 'LOAD_CONTACT_POINT_FAILED';
export const ADD_CONTACT_POINT = 'ADD_CONTACT_POINT';
export const ADD_CONTACT_POINT_SUCCESS = 'ADD_CONTACT_POINT_SUCCESS)';
export const ADD_CONTACT_POINT_FAILED = 'ADD_CONTACT_POINT_FAILED';
export const UPDATE_CONTACT_POINT = 'UPDATE_CONTACT_POINT';
export const UPDATE_CONTACT_POINT_SUCCESS = 'UPDATE_CONTACT_POINT_SUCCESS';
export const UPDATE_CONTACT_POINT_FAILED = 'UPDATE_CONTACT_POINT_FAILED';
export const SET_LOADING = 'SET_LOADING';

export function loadContactPoints() {
  return {
    types: [LOAD_CONTACT_POINT, LOAD_CONTACT_POINT_SUCCESS, LOAD_CONTACT_POINT_FAILED],
    payload: {
      request: {
        url: '/contactPoints',
      },
    },
  };
}
export function addContactPoint(name: string, description: string) {
  return {
    types: [ADD_CONTACT_POINT, ADD_CONTACT_POINT_SUCCESS, ADD_CONTACT_POINT_FAILED],
    payload: {
      request: {
        url: '/contactPoint',
        method: 'put',
        data: {
          name: name,
          description: description,
        },
      },
    },
  };
}
export function updateContactPoint(cpId: string, cp: any) {
  return {
    types: [UPDATE_CONTACT_POINT, UPDATE_CONTACT_POINT_SUCCESS, UPDATE_CONTACT_POINT_FAILED],
    payload: {
      request: {
        url: '/contactPoint/' + cpId,
        method: 'post',
        data: cp,
      },
    },
  };
}
export function setLoading(isLoading: boolean): AnyAction {
  return {
    type: SET_LOADING,
    payload: { isLoading },
  };
}
