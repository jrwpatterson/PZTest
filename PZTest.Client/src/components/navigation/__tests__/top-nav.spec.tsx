import { renderReduxConnectedComponent } from '../../../utilites/test-wrappers'
import React from 'react'
import { TopNav } from '../top-nav'

describe('top nav', () => {
  it('should match its snapshot', () => {
    const { container } = renderReduxConnectedComponent(<TopNav />)
    expect(container).toMatchSnapshot()
  })
})
