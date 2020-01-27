import { RootActions } from '../root-actions'
import { getType } from 'typesafe-actions'
import { basketAsync, basketAdd, basketRemove, basketClear } from '../actions'
import {
  ReceivedBasket,
  AddBasketLine,
  ReceivedBasketLine,
} from '../interfaces'
import _ from 'lodash'
import { Reducer } from 'redux'

interface BasketReducer {
  basket: ReceivedBasket
}

export const basketReducerInitState: BasketReducer = {
  basket: {
    lines: [],
  },
}

export const basketReducer: Reducer<BasketReducer, RootActions> = (
  state: BasketReducer = basketReducerInitState,
  action: RootActions,
) => {
  switch (action.type) {
    case getType(basketAsync.success): {
      const newState = { ...state, basket: action.payload }
      return newState
    }
    case getType(basketAdd): {
      const newBasket = addToBasket(action.payload, state.basket)
      return { ...state, basket: newBasket }
    }
    case getType(basketRemove): {
      const newBasket = removeFromBasket(action.payload, state.basket)
      return { ...state, basket: newBasket }
    }
    case getType(basketClear): {
      return { ...state, basket: { ...state.basket, total: 0, lines: [] } }
    }
    default: {
      return state
    }
  }
}

export const removeFromBasket = (
  removeID: string,
  basket?: ReceivedBasket,
): ReceivedBasket => {
  _.remove(basket?.lines ?? [], line => line.productID === removeID)

  return { ...basket!, lines: basket!.lines, total: undefined }
}

export const addToBasket = (
  newBasketLine: AddBasketLine,
  basket?: ReceivedBasket,
): ReceivedBasket => {
  const basketLine: ReceivedBasketLine = {
    rowNo: basket?.lines?.length ?? 0,
    grams: newBasketLine.grams,
    name: newBasketLine.name,
    productID: newBasketLine.id,
  }

  if (!basket) {
    return { lines: [basketLine], total: undefined }
  } else {
    return { ...basket, lines: [...basket.lines, basketLine], total: undefined }
  }
}
