import { RootActions } from '../root-actions'
import { getType } from 'typesafe-actions'
import { cheeseReadAll, cheeseClear } from '../actions'
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
    case getType(cheeseReadAll): {
      return { ...state, cheeses: action.payload }
    }
    case getType(cheeseClear): {
      return { ...state, cheeses: undefined }
    }
    default: {
      return state
    }
  }
}
