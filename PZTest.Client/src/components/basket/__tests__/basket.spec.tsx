import React from 'react'
import { Basket } from '../basket'
import { renderReduxConnectedComponent } from '../../../utilites/test-wrappers'
import userEvent from '@testing-library/user-event'
import { basketClear } from '../../../actions'

describe('basket', () => {
  it('should match its snapshot', () => {
    const { container } = renderReduxConnectedComponent(<Basket />)
    expect(container).toMatchSnapshot()
  })

  it('should show the basket total', () => {
    const { getByText } = renderReduxConnectedComponent(<Basket />)
    expect(getByText('$25')).toBeDefined()
  })

  it('should show the lines', () => {
    const { getAllByText } = renderReduxConnectedComponent(<Basket />)
    expect(getAllByText('-').length).toBe(3)
  })

  it('should have a clear button that clears all', () => {
    const { getByText, store } = renderReduxConnectedComponent(<Basket />)
    userEvent.click(getByText('Clear Basket'))
    expect(store.getActions()).toEqual([basketClear()])
  })
})
