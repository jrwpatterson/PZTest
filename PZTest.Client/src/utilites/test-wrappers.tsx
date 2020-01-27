import React, { ReactType, ReactNode } from 'react'
import { Provider } from 'react-redux'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import { defaultMockStore } from './mock-store-data'
import { render } from '@testing-library/react'
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks'
import { RootReducer } from '../root-reducer'
// import { createMount } from '@material-ui/core/test-utils'
import { Provider as FetchProvider } from 'use-http'
import { MemoryRouter } from 'react-router-dom'

const mockStore = configureStore([])

const createStore = (storeData: RootReducer) => {
  return mockStore(storeData)
}

export const createMockProvider = (
  storeData: RootReducer = defaultMockStore,
) => {
  return ({ children }: { children?: ReactNode }) => (
    <FetchProvider url='http://localhost:5001/'>
      <Provider store={createStore(storeData)}>{children}</Provider>
    </FetchProvider>
  )
}

export const createMockProviderWithStore = (
  fakeStore: MockStoreEnhanced<unknown, {}>,
) => {
  return ({ children }: { children?: ReactNode }) => (
    <FetchProvider url='http://localhost:5001/'>
      <Provider store={fakeStore}>{children}</Provider>
    </FetchProvider>
  )
}

export const renderReduxConnectedComponent = (
  children: ReactType | JSX.Element,
  storeOverride: RootReducer = defaultMockStore,
  initialEntries?: string[],
) => {
  const storeData = storeOverride || defaultMockStore
  // const mount = createMount()
  const store = createStore(storeData)
  const Wrapper = createMockProviderWithStore(store)
  const element = (
    <MemoryRouter initialEntries={initialEntries}>
      <Wrapper>{children}</Wrapper>
    </MemoryRouter>
  )
  const component = render(element)

  return {
    store,
    ...component,
  }
}

export const renderReduxConnectedHook = <T extends {}>(
  callback: (props: unknown) => T,
  storeData: RootReducer = defaultMockStore,
  options: RenderHookOptions<unknown> = {},
) => {
  const store = createStore(storeData)
  const wrapper = createMockProviderWithStore(store)
  const renderedHook = renderHook(callback, { ...options, wrapper })

  return {
    store,
    ...renderedHook,
  }
}
