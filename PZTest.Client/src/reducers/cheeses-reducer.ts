import { RootActions } from '../root-actions'
import { getType } from 'typesafe-actions'
import { cheeseReadAllActions } from '../actions'
import { Cheese } from '../interfaces'

interface CheeseReducer {
  cheeses?: Cheese[]
}

const initState: CheeseReducer = {}

export const cheeseReducer = (
  state: CheeseReducer = initState,
  action: RootActions,
) => {
  switch (action.type) {
    case getType(cheeseReadAllActions.success): {
      return { ...state, cheeses: action.payload }
    }
    default: {
      return state
    }
  }
}
