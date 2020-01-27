import { RootActions } from '../root-actions'
import { getType } from 'typesafe-actions'
import { basketAsync, basketClear } from '../actions'
import { ReceivedBasket } from '../interfaces'
import _ from 'lodash'
import { Reducer } from 'redux'

interface BasketReducer {
  basket: ReceivedBasket
  validBasket: boolean
}

export const basketReducerInitState: BasketReducer = {
  basket: {
    lines: [],
  },
  validBasket: false,
}

export const basketReducer: Reducer<BasketReducer, RootActions> = (
  state: BasketReducer = basketReducerInitState,
  action: RootActions,
) => {
  switch (action.type) {
    case getType(basketAsync): {
      const newState = {
        ...state,
        basket: action.payload.basket,
        validBasket: action.payload.valid,
      }
      return newState
    }
    case getType(basketClear): {
      return {
        ...state,
        basket: { ...state.basket, total: 0, lines: [] },
        validBasket: true,
      }
    }
    default: {
      return state
    }
  }
}
