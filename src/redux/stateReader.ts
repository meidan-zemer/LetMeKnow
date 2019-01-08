import { stateType } from './definitions';
import { contactPoint } from '../../../let-me-know-ts-definitions';

export function getContactPoints(state: stateType): contactPoint[] {
  let contactPoints: contactPoint[] = [];
  state.contactPointsIds.forEach((cpId: string) => {
    const cp = state.contactPointsByIds[cpId];
    if (cp) {
      contactPoints.push(cp);
    }
  });
  return contactPoints;
}

export function getContactPoint(state: stateType, cpId: string): contactPoint {
  return state.contactPointsByIds[cpId];
}

export function isLoading(state:stateType): boolean {
  return state.loading;
}