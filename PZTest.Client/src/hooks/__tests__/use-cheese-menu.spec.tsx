import { renderReduxConnectedHook } from '../../utilites/test-wrappers'
import { useCheeseMenu } from '../use-cheese-menu'
import { act } from '@testing-library/react-hooks'
import 'jest-fetch-mock'
import { defaultMockStore } from '../../utilites/mock-store-data'
import { RootReducer } from '../../root-reducer'
import { Cheese } from '../../interfaces'
import { cheeseReadAll, cheeseClear } from '../../actions'

const mockCheese: Cheese = {
  cheeseColour: 'purple',
  id: 'testid',
  name: 'testCheese',
  pictureUrl: 'testUrl',
  pricePerKG: 10,
}

describe('useCheeseMenu hook', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })
  it("should call for a menu if a menu doesn't exist in a store", async () => {
    const newDefaultData: RootReducer = {
      ...defaultMockStore,
      cheeseReducer: {
        cheeses: undefined,
      },
    }
    const { result } = renderReduxConnectedHook(
      () => useCheeseMenu(),
      newDefaultData,
    )
    await act(async () => await result.current.getMenu())
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'http://localhost:5001/api/CheeseLoader',
    )
  })

  it('should not call if a menu is already in its data', async () => {
    const { result } = renderReduxConnectedHook(() => useCheeseMenu())

    await act(async () => await result.current.getMenu())
    expect(fetchMock.mock.calls.length).toEqual(0)
    expect(result.current.cheeses?.length).toEqual(2)
    expect(result.current.cheeses).toEqual(
      defaultMockStore.cheeseReducer.cheeses,
    )
  })

  it('should call if an empty menu is already in its data', async () => {
    const newDefaultData: RootReducer = {
      ...defaultMockStore,
      cheeseReducer: {
        cheeses: [],
      },
    }
    const { result } = renderReduxConnectedHook(
      () => useCheeseMenu(),
      newDefaultData,
    )
    await act(async () => await result.current.getMenu())
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'http://localhost:5001/api/CheeseLoader',
    )
  })

  it('should save the new menu to redux', async () => {
    const newDefaultData: RootReducer = {
      ...defaultMockStore,
      cheeseReducer: {
        cheeses: undefined,
      },
    }

    fetchMock.mockResponseOnce(JSON.stringify([mockCheese]))

    const { result, store } = renderReduxConnectedHook(
      () => useCheeseMenu(),
      newDefaultData,
    )

    await act(async () => await result.current.getMenu())
    expect(store.getActions()).toEqual([cheeseReadAll([mockCheese])])
  })

  it('should clear the cheese menu when asked to', () => {
    const { result, store } = renderReduxConnectedHook(() => useCheeseMenu())
    act(async () => result.current.clearMenu())
    expect(store.getActions()).toEqual([cheeseClear()])
  })

  it('should return a single item from get menu without upsetting the array', async () => {
    const { result } = renderReduxConnectedHook(() => useCheeseMenu())

    await act(async () => await result.current.getMenu())

    const item = result.current.getMenuItem('testid2')
    expect(item).toEqual(defaultMockStore.cheeseReducer.cheeses![1])
  })

  it('should return null if non existant', async () => {
    const { result } = renderReduxConnectedHook(() => useCheeseMenu())

    await act(async () => await result.current.getMenu())

    const item = result.current.getMenuItem('fake test id')
    expect(item).toBeNull()
  })
})
