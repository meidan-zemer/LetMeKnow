import { DeepReadonly } from 'utility-types';
import { AnyAction } from 'redux';
type stateSkeleton = {
  user: {
    userName: string;
  };
};

export type stateType = DeepReadonly<stateSkeleton>;

const initialState: stateSkeleton = {
  user: {
    userName: '',
  },
};

export function rootReducer(state: stateType | undefined, action: AnyAction): stateType {
  let newState = Object.freeze(initialState);
  if (state !== undefined) {
    newState = { ...(state as Object), user: { userName: '' } };
  }
  return newState;
}
