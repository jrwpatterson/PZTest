import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCheeseMenu } from '../hooks'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { basketAdd } from '../actions'

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
}))

interface DetailScreenProps {
  id: string
}

export default () => {
  const { id } = useParams<DetailScreenProps>()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [grams, setGrams] = useState(0)

  const { getMenuItem } = useCheeseMenu()

  const cheese = getMenuItem(id)

  if (!cheese) {
    return <div className={classes.root}>Invalid Product</div>
  }

  const addToBasket = () => {
    dispatch(basketAdd({ grams, id: cheese.id, name: cheese.name }))
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
              Add to basket
            </Typography>
            <Slider
              defaultValue={0.00000005}
              aria-labelledby='discrete-slider-small-steps'
              step={10}
              min={0}
              max={2000}
              valueLabelDisplay='auto'
              onChange={(event, value) => setGrams(value as number)}
            />
            <Button variant='contained' color='primary' onClick={addToBasket} />
          </div>
        </div>
      </div>
    </div>
  )
}
