import { RootActions } from '../root-actions'
import {  getType  } from 'typesafe-actions'
import {basketAsync, basketAdd, basketRemove, basketClear} from '../actions'
import { ReceivedBasket, AddBasketLine, ReceivedBasketLine } from '../interfaces'
import _ from 'lodash'

interface BasketReducer { 
    basket?: ReceivedBasket
}

const initState: BasketReducer = {

}

export const basketReducer = (state: BasketReducer = initState, action: RootActions) => {
    switch(action.type){
        case getType(basketAsync.success): {
            const newState = {...state, basket: action.payload}
            return newState
        }
        case getType(basketAdd): {
            const newBasket = addToBasket(action.payload, state.basket)
            return {...state, basket: newBasket}
        }
        case getType(basketRemove): {
            const newBasket = removeFromBasket(action.payload, state.basket)
            return {...state, basket: newBasket}
        }
        case getType(basketClear): {
            return {...state, basket: {...state.basket, Total: 0, Lines: []}}
        }
        default: {
            return state
        }
    }
}

export const removeFromBasket = (removeID: string, basket?: ReceivedBasket): ReceivedBasket => {
    _.remove((basket?.Lines ?? []), (line) => line.ProductID === removeID)

    return {...basket!, Lines: basket!.Lines, Total: undefined}
}

export const addToBasket = (newBasketLine: AddBasketLine, basket?: ReceivedBasket): ReceivedBasket => {
    const basketLine: ReceivedBasketLine = {
        RowNo: basket?.Lines?.length ?? 0,
        Grams: newBasketLine.Grams,
        Name: newBasketLine.Name,
        ProductID: newBasketLine.ID
    }

    if(!basket){
       return { Lines: [basketLine], Total: undefined}
    } else {
       return {...basket, Lines: [...basket.Lines, basketLine], Total: undefined}
    }
}