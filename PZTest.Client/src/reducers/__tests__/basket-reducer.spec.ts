import {
  basketReducer,
  addToBasket,
  basketReducerInitState,
} from '../basket-reducer'
import {
  basketAsync,
  basketAdd,
  basketClear,
  basketRemove,
} from '../../actions'
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
      basketAsync.success(basketReceived),
    )
    expect(reducer.basket).toBe(basketReceived)
  })

  it('should add to a the basket when adding', () => {
    const newLine = { grams: 500, name: 'Added Cheese', id: 'Test Product3' }
    const newBasket = basketReducer(basketReducerInitState, basketAdd(newLine))

    expect(newBasket.basket?.lines[0].grams).toBe(500)
    expect(newBasket.basket?.lines[0].name).toBe('Added Cheese')
    expect(newBasket.basket?.lines[0].productID).toBe('Test Product3')
    expect(newBasket.basket?.lines[0].rowNo).toBe(0)
    expect(newBasket.basket?.lines[0].price).toBe(undefined)
  })

  it('should remove from the a basket when removing', () => {
    let newBasket = basketReducer(
      { basket: basketReceived },
      basketRemove('Test Product'),
    )
    expect(newBasket.basket?.lines.length).toBe(1)
    expect(newBasket.basket?.lines[0]).toBe(basketLine2)
    expect(newBasket.basket?.total).toBe(undefined)

    newBasket = basketReducer(
      { basket: { ...basketReceived } },
      basketRemove('Test Product2'),
    )
    expect(newBasket.basket?.lines.length).toBe(0)
  })

  it('should remove from the a basket when removing - Test Product 2', () => {
    const newBasket2 = basketReducer(
      { basket: { ...basketReceived } },
      basketRemove('Test Product2'),
    )
    expect(newBasket2.basket?.lines.length).toBe(1)
    expect(newBasket2.basket?.lines[0]).toBe(basketLine1)
    expect(newBasket2.basket?.total).toBe(undefined)
  })

  it('should clear the basket when asked to clear', () => {
    const newBasket = basketReducer({ basket: basketReceived }, basketClear())
    expect(newBasket.basket?.lines).toEqual([])
    expect(newBasket.basket?.id).toBe('testId')
    expect(newBasket.basket?.total).toBe(0)
  })

  it('addToBasket should add the line if basket is not formed', () => {
    const newLine = { grams: 500, name: 'Added Cheese', id: 'Test Product3' }
    const newBasket = addToBasket(newLine)

    expect(newBasket.lines[0].grams).toBe(500)
    expect(newBasket.lines[0].name).toBe('Added Cheese')
    expect(newBasket.lines[0].productID).toBe('Test Product3')
    expect(newBasket.lines[0].rowNo).toBe(0)
    expect(newBasket.lines[0].price).toBe(undefined)
  })

  it('addToBasket should add the line if basket is formed', () => {
    const newLine = { grams: 500, name: 'Added Cheese', id: 'Test Product3' }
    const newBasket = addToBasket(newLine, basketReceived)

    expect(newBasket.lines[0]).toBe(basketLine1)
    expect(newBasket.lines[1]).toBe(basketLine2)

    expect(newBasket.lines[2].grams).toBe(500)
    expect(newBasket.lines[2].name).toBe('Added Cheese')
    expect(newBasket.lines[2].productID).toBe('Test Product3')
    expect(newBasket.lines[2].rowNo).toBe(2)
    expect(newBasket.lines[2].price).toBe(undefined)
  })
})
