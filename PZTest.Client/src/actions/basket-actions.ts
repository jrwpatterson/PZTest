import {createAsyncAction} from 'typesafe-actions'
import { SendBasket, ReceivedBasket, Cheese } from '../interfaces'
import { createStandardAction } from 'typesafe-actions/dist/deprecated/create-standard-action'

export const basketAsync = createAsyncAction('BASKET:send', 'BASKET:received', 'BASKET:error')<SendBasket, ReceivedBasket, Error>()
export const basketAdd = createStandardAction('BASKET:add')<Cheese>()
export const basketRemove = createStandardAction('BASKET:remove')<Cheese>()
export const basketClear = createStandardAction('BASKET:clear')()