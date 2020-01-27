import React from 'react'
import { CheeseMenu } from '../components/cheese-menu'
import { Basket } from '../components'

export default () => {
  return (
    <>
      <h1>Welcome to the Cheese Emporium</h1>
      <CheeseMenu />
      <Basket />
    </>
  )
}
