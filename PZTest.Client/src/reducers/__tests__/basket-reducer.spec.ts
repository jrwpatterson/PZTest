import { basketReducer, basketReducerInitState } from '../basket-reducer'
import { basketAsync, basketClear } from '../../actions'
import { ReceivedBasket } from '../../interfaces'

const basketLine1 = {
  grams: 100,
  name: 'Gorgonzola',
  price: 10.15,
  productID: 'Test Product',
  rowNo: 0,
}
const basketLine2 = {
  grams: 250,
  name: 'Different Cheese',
  price: 20.15,
  productID: 'Test Product2',
  rowNo: 1,
}

let basketReceived: ReceivedBasket

describe('Basket Reducer', () => {
  beforeEach(() => {
    basketReceived = {
      id: 'testId',
      lines: [basketLine1, basketLine2],
      total: 30.3,
    }
  })
  it('should add a basket when receiving', () => {
    const reducer = basketReducer(
      basketReducerInitState,
      basketAsync({ basket: basketReceived, valid: true }),
    )
    expect(reducer.basket).toBe(basketReceived)
    expect(reducer.validBasket).toBe(true)
  })

  it('should clear the basket when asked to clear', () => {
    const newBasket = basketReducer(
      { basket: basketReceived, validBasket: false },
      basketClear(),
    )
    expect(newBasket.basket?.lines).toEqual([])
    expect(newBasket.basket?.id).toBe('testId')
    expect(newBasket.basket?.total).toBe(0)
    expect(newBasket.validBasket).toBe(true)
  })
})
