export const LOAD_CONTACT_POINT = 'LOAD_CONTACT_POINT';
export const LOAD_CONTACT_POINT_SUCCESS = 'LOAD_CONTACT_POINT_SUCCESS)';
export const LOAD_CONTACT_POINT_FAILED = 'LOAD_CONTACT_POINT_FAILED';
export const ADD_CONTACT_POINT = 'ADD_CONTACT_POINT';
export const ADD_CONTACT_POINT_SUCCESS = 'ADD_CONTACT_POINT_SUCCESS)';
export const ADD_CONTACT_POINT_FAILED = 'ADD_CONTACT_POINT_FAILED';

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
