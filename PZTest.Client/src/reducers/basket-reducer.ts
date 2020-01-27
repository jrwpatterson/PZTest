import { RootActions } from '../root-actions'
import {  getType  } from 'typesafe-actions'
import {basketAsync} from '../actions'
import { ReceivedBasket } from '../interfaces'

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
    }

    return state
}
