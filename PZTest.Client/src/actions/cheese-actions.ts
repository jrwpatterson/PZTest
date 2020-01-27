import { createAsyncAction, createAction } from 'typesafe-actions'
import { Cheese } from '../interfaces'

export const cheeseReadAll = createAction('CHEESE:MULTI:receive')<Cheese[]>()
export const cheeseClear = createAction('CHEESE:read')()
