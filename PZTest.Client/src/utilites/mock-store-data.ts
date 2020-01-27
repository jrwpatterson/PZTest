import { RootReducer } from '../root-reducer'

export const defaultMockStore: RootReducer = {
  basketReducer: {
    basket: {
      lines: [],
    },
  },
  cheeseReducer: {
    cheeses: [
      {
        cheeseColour: 'purple',
        id: 'testid',
        name: 'testCheese',
        pictureUrl: 'testUrl',
        pricePerKG: 10,
      },
      {
        cheeseColour: 'pink',
        id: 'testid2',
        name: 'testPinkCheese',
        pictureUrl: 'testPinkUrl',
        pricePerKG: 15,
      },
    ],
  },
}
