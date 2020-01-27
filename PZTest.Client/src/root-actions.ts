import { ActionType } from 'typesafe-actions';

export type RootActions = ActionType<typeof import('./actions')>;