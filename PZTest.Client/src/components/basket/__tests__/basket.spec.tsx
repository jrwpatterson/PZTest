import React from 'react'
import { Basket } from '../basket'
import { renderReduxConnectedComponent } from '../../../utilites/test-wrappers'

describe('basket', () => {
  it('should match its snapshot', () => {
    const { container } = renderReduxConnectedComponent(<Basket />)
    expect(container).toMatchSnapshot()
  })

  it('should show the basket total', () => {
    const { container } = renderReduxConnectedComponent(<Basket />)
  })

  it('should show the lines', () => {
    throw new Error('not implemented')
  })

  it('should have a clear button that clears all', () => {
    throw new Error('not implemented')
  })

  it('it should have a remove line for each line', () => {
    throw new Error('not implemented')
  })
})
