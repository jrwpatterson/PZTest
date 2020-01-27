import React from 'react'
import { renderReduxConnectedComponent } from '../../../utilites/test-wrappers'
import { CheeseMenu } from '../cheese-menu'

describe('cheese-menu', () => {
  it('should match its snapshot', () => {
    const { container } = renderReduxConnectedComponent(<CheeseMenu />)
    expect(container).toMatchSnapshot()
  })

  it('should load a menu if a menu exists', () => {
    const { getByTestId } = renderReduxConnectedComponent(<CheeseMenu />)
    expect(getByTestId('cheese.menu.root')).toBeDefined()
  })

  it('should load the correct number of rows', () => {
    const { getAllByTestId } = renderReduxConnectedComponent(<CheeseMenu />)
    expect(getAllByTestId('cheese.menu.tile').length).toBe(2)
  })
})
