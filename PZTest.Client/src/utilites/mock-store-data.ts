import { RootReducer } from '../root-reducer'

export const defaultMockStore: RootReducer = {
  basketReducer: {
    basket: {
      id: 'testID',
      lines: [
        {
          grams: 200,
          name: 'test product',
          productID: 'testProdID',
          rowNo: 0,
          price: 5,
        },
        {
          grams: 400,
          name: 'test product 2',
          productID: 'testProdID2',
          rowNo: 1,
          price: 20,
        },
      ],
      total: 25,
    },
    validBasket: true,
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
