export const LOAD_CONTACT_POINT = 'LOAD_CONTACT_POINT';
export const LOAD_CONTACT_POINT_SUCCESS = 'LOAD_CONTACT_POINT_SUCCESS)';
export const LOAD_CONTACT_POINT_FAILED = 'LOAD_CONTACT_POINT_FAILED';

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
