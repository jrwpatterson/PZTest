import { createAction } from 'typesafe-actions'
import { ReceivedBasket } from '../interfaces'

export interface BasketSend {
  basket: ReceivedBasket
  valid: boolean
}

export const basketAsync = createAction('BASKET:received')<BasketSend>()
export const basketClear = createAction('BASKET:clear')()
