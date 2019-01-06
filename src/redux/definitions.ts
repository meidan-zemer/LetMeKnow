import { DeepReadonly } from 'utility-types';
import { contactPoint } from '../../../let-me-know-ts-definitions';

type stateSkeleton = {
  contactPointsIds: string[];
  contactPointsByIds: { [s: string]: contactPoint };
  lastError: string | undefined;
};

export type stateType = DeepReadonly<stateSkeleton>;
