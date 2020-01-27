import { createAsyncAction, createAction } from 'typesafe-actions'
import { SendBasket, ReceivedBasket, AddBasketLine } from '../interfaces'

export const basketAsync = createAsyncAction(
  'BASKET:send',
  'BASKET:received',
  'BASKET:error',
)<SendBasket, ReceivedBasket, Error>()
export const basketAdd = createAction('BASKET:add')<AddBasketLine>()
export const basketRemove = createAction('BASKET:remove')<string>()
export const basketClear = createAction('BASKET:clear')()
