import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { useCheeseMenu } from '../../hooks/use-cheese-menu'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'lightgrey',
  },
  gridList: {
    height: 700,
  },
  subHeader: {
    height: 50,
  },
}))

export const CheeseMenu = () => {
  const { cheeses } = useCheeseMenu()
  const classes = useStyles()

  if (!cheeses) {
    return null
  }

  return (
    <div className={classes.root} data-testid='cheese.menu.root'>
      <GridList className={classes.gridList}>
        <GridListTile style={{ height: 'auto' }} cols={3} key='SubHeader'>
          <ListSubheader component='div' data-testid='cheese.menu.header'>
            Cheeses
          </ListSubheader>
        </GridListTile>
        {cheeses?.map(cheese => (
          <GridListTile key={cheese.id}>
            <Link to={`/detail/${cheese.id}`}>
              <img src={cheese.pictureUrl} alt={cheese.name} />
              <GridListTileBar
                data-testid='cheese.menu.tile'
                title={cheese.name}
                subtitle={<span>Price/Kg ${cheese.pricePerKG}</span>}
                actionIcon={
                  <IconButton
                    style={{ color: cheese.cheeseColour }}
                    aria-label={`info about ${cheese.name}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
