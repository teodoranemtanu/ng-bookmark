
import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

const selectRouterState = createFeatureSelector<RouterReducerState>('router');
export const { selectRouteParams } = getRouterSelectors(selectRouterState);