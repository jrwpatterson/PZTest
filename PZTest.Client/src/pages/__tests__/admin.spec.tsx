import { renderReduxConnectedComponent } from '../../utilites/test-wrappers'
import React from 'react'
import Admin from '../admin'

describe('admin screen', () => {
  it('should match its snapshot', () => {
    const { container } = renderReduxConnectedComponent(<Admin />)
    expect(container).toMatchSnapshot()
  })
})
