import { ReceivedBasket } from '../../interfaces'
import 'jest-fetch-mock'
import { addToBasket, useBasketHook } from '../use-basket-hook'
import { renderReduxConnectedHook } from '../../utilites/test-wrappers'
import { defaultMockStore } from '../../utilites/mock-store-data'
import { act } from '@testing-library/react-hooks'
import { basketAsync } from '../../actions'

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

describe('use basket hook', () => {
  beforeEach(() => {
    basketReceived = {
      id: 'testId',
      lines: [basketLine1, basketLine2],
      total: 30.3,
    }
  })

  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('should return a basket if there is one in memory', () => {
    const { result } = renderReduxConnectedHook(() => useBasketHook())
    expect(result.current.basket).toEqual(defaultMockStore.basketReducer.basket)
  })

  it('should remove lines from the basket', () => {
    const { result, store } = renderReduxConnectedHook(() => useBasketHook())
    act(() => result.current.removeProductFromBasket('testProdID'))

    expect(store.getActions()).toEqual([
      basketAsync({
        basket: {
          ...defaultMockStore.basketReducer.basket,
          lines: [...defaultMockStore.basketReducer.basket.lines],
          total: undefined,
        },
        valid: false,
      }),
    ])
  })

  it('should block if 0 grams', () => {
    const { result } = renderReduxConnectedHook(() => useBasketHook())
    act(() =>
      result.current.addProductToBasket({
        grams: 0,
        id: 'testProdID',
        name: 'test',
      }),
    )
    expect(result.current.basket.total).toEqual(25)
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
