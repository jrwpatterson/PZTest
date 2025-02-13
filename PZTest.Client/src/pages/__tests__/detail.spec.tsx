import React from 'react'
import { renderReduxConnectedComponent } from '../../utilites/test-wrappers'
import Detail, { calculatePrice } from '../detail'
import { defaultMockStore } from '../../utilites/mock-store-data'
import { Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { basketAsync } from '../../actions'

describe('details screen', () => {
  it('should match its snapshot', () => {
    const { container } = renderReduxConnectedComponent(
      <Route path='/detail/:id'>
        <Detail />
      </Route>,
      undefined,
      ['/detail/testid2'],
    )
    expect(container).toMatchSnapshot()
  })

  it('should show an invalid product message if no product', () => {
    const { queryByText } = renderReduxConnectedComponent(
      <Route path='/detail/:id'>
        <Detail />
      </Route>,
      {
        ...defaultMockStore,
        cheeseReducer: {
          cheeses: [
            {
              name: 'nothing',
              pricePerKG: 1,
              pictureUrl: 't',
              cheeseColour: 'noo',
              id: 'nothing',
            },
          ],
        },
      },
    )
    expect(queryByText('Invalid Product')).toBeDefined()
  })

  it('should show the details of the product', () => {
    const { getByTestId } = renderReduxConnectedComponent(
      <Route path='/detail/:id'>
        <Detail />
      </Route>,
      undefined,
      ['/detail/testid2'],
    )
    expect(getByTestId('projected.cost').innerHTML).toEqual(
      'Calculated Price $0',
    )
  })

  it('should calculate the price correctly', () => {
    expect(calculatePrice(600, 10)).toBe(6)
  })
})
