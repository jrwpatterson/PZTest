import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCheeseMenu, useBasketHook } from '../hooks'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { Basket } from '../components'

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: 20,
    marginRight: 20,
  },
  outerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    height: 450,
    borderRadius: 15,
  },
  addToBasketBox: {
    height: 100,
    marginTop: 30,
    backgroundColor: 'lightgreen',
  },
  addToBasketLowerBox: {
    display: 'flex',
    flexDirection: 'row',
  },
}))

interface DetailScreenProps {
  id: string
}

export const calculatePrice = (grams: number, price: number) => {
  return Math.round((grams * price) / 10) / 100
}

export default () => {
  const { id } = useParams<DetailScreenProps>()
  const classes = useStyles()
  const [grams, setGrams] = useState(0)
  const [cost, setCost] = useState(0)

  const { getMenuItem } = useCheeseMenu()
  const { addProductToBasket } = useBasketHook()

  const cheese = getMenuItem(id)

  if (!cheese) {
    return <div className={classes.root}>Invalid Product</div>
  }

  const changeSectedAmount = (
    event: React.ChangeEvent<{}>,
    value: number | number[],
  ) => {
    setCost(calculatePrice(value as number, cheese.pricePerKG))
    setGrams(value as number)
  }

  const addItemToBasket = () => {
    addProductToBasket({ grams, id: cheese.id, name: cheese.name })
  }

  return (
    <div className={classes.root}>
      <h1>{cheese.name}</h1>
      <div className={classes.outerContainer}>
        <div className={classes.detailsContainer}>
          <img
            src={cheese.pictureUrl}
            className={classes.image}
            alt={cheese.name}
          />
          <div>
            <span>Colour - </span>
            <span>{cheese.cheeseColour}</span>
          </div>
          <div>
            <span>Price per kg - </span>
            <span>{cheese.pricePerKG}</span>
          </div>
          <div className={classes.addToBasketBox}>
            <Typography id='discrete-slider-small-steps' gutterBottom>
              Calculate Price
            </Typography>
            <Slider
              defaultValue={0}
              aria-labelledby='discrete-slider-small-steps'
              step={10}
              min={0}
              max={2000}
              valueLabelDisplay='auto'
              onChange={changeSectedAmount}
            />
            <div className={classes.addToBasketLowerBox}>
              <Button
                variant='contained'
                color='primary'
                onClick={addItemToBasket}
              >
                Add to basket
              </Button>

              <Typography id='discrete-slider-small-steps' gutterBottom>
                <span data-testid={'projected.cost'}>
                  Calculated Price ${cost}
                </span>
              </Typography>
            </div>
          </div>
        </div>
        <Basket />
      </div>
    </div>
  )
}
