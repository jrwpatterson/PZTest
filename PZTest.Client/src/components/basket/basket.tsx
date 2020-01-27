import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import { useBasketHook } from '../../hooks'
import { Button } from '@material-ui/core'

interface BasketProps {}

export const Basket = (props: BasketProps) => {
  const { basket, clearBasket, removeProductFromBasket } = useBasketHook()
  return (
    <div>
      <List>
        <ListItem>
          <ListItemText primary='Basket' />
        </ListItem>
        <Divider />
        {basket.lines?.map(line => {
          return (
            <ListItem key={`${(line.productID, line.rowNo)}`}>
              <ListItemText primary={line.name} />
              <ListItemText primary=' - ' />
              <ListItemText primary={`$${line.price ?? 0}`} />
            </ListItem>
          )
        })}
        <Divider />
        <ListItem data-testid='basket.total'>
          <ListItemText primary='Total' />
          <ListItemText primary=' - ' />
          <ListItemText
            data-testid='basket.total'
            primary={`$${basket.total ?? 0}`}
          />
        </ListItem>

        <Divider />
        <Button variant='outlined' color='secondary' onClick={clearBasket}>
          Clear Basket
        </Button>
      </List>
    </div>
  )
}
