import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useCheeseMenu } from '../hooks'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Cheese } from '../interfaces'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles(theme => ({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'lightgrey',
    paddingLeft: 35,
    paddingBottom: 50,
  },
  gridItem: {
    overflow: 'hidden',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridList: {
    height: 700,
  },
  subHeader: {
    height: 50,
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export default () => {
  const { cheeses, deleteItem, editItem } = useCheeseMenu()

  const [open, setOpen] = React.useState(false)
  const [editMode, setEditMode] = React.useState('edit')

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedCheese, setSelectedCheese] = React.useState<Cheese>()

  const handleEdit = () => {
    handleClose()
    setEditMode('edit')
    setOpen(true)
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    cheese: Cheese,
  ) => {
    setSelectedCheese(cheese)
    setAnchorEl(event.currentTarget)
  }

  const [modalStyle] = React.useState(getModalStyle)

  const deleteMenuItem = () => {
    handleClose()
    if (selectedCheese) {
      deleteItem(selectedCheese?.id)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.base}>
      <div>Admin Page</div>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper>Cheese Admin Table</Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            onClick={() => {
              setEditMode('create')
              setOpen(true)
              setSelectedCheese(undefined)
            }}
          >
            Add New Cheese
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Paper>Name</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper>Price/Kg</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>Url</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper>Colour</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper>Menu</Paper>
        </Grid>
        {cheeses?.map(cheese => {
          return (
            <React.Fragment key={cheese.id}>
              <Grid item xs={2}>
                <Paper className={classes.gridItem}>{cheese.name}</Paper>
              </Grid>
              <Grid item xs={1}>
                <Paper className={classes.gridItem}>{cheese.pricePerKG}</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.gridItem}>{cheese.pictureUrl}</Paper>
              </Grid>
              <Grid item xs={1}>
                <Paper className={classes.gridItem}>
                  {cheese.cheeseColour}
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Button
                  className={classes.gridItem}
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={e => handleClick(e, cheese)}
                >
                  Open Menu
                </Button>
              </Grid>
            </React.Fragment>
          )
        })}
      </Grid>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={deleteMenuItem}>Delete</MenuItem>
      </Menu>
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.modal}>
          <h2 id='simple-modal-title'>Edit</h2>
          <TextField
            id='standard-basic'
            label='Name'
            value={selectedCheese?.name}
            onChange={event =>
              setSelectedCheese({
                ...selectedCheese!,
                name: event.target.value,
              })
            }
          />
          <TextField
            id='standard-basic'
            label='Price'
            value={selectedCheese?.pricePerKG}
            type='number'
            onChange={event =>
              setSelectedCheese({
                ...selectedCheese!,
                pricePerKG: parseFloat(event.target.value),
              })
            }
          />
          <TextField
            id='standard-basic'
            label='Url'
            value={selectedCheese?.pictureUrl}
            onChange={event =>
              setSelectedCheese({
                ...selectedCheese!,
                pictureUrl: event.target.value,
              })
            }
          />
          <TextField
            id='standard-basic'
            label='Colour'
            value={selectedCheese?.cheeseColour}
            onChange={event =>
              setSelectedCheese({
                ...selectedCheese!,
                cheeseColour: event.target.value,
              })
            }
          />
          <Button
            className={classes.gridItem}
            aria-controls='simple-menu'
            aria-haspopup='true'
            variant='contained'
            onClick={e => {
              handleClose()
              setOpen(false)
              editMode === 'edit'
                ? editItem(selectedCheese!)
                : editItem(selectedCheese!)
            }}
          >
            {editMode === 'edit' ? 'Update Item' : 'Add Item'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
