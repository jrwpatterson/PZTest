import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  navBar: {
    width: '100vw',
    height: 80,
    backgroundColor: 'cyan',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  navLink: {
    marginLeft: 30,
    marginRight: 30,
    listStyle: 'none',
    flex: 1,
    alignSelf: 'center',
  },
  navList: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 0,
  },
})

interface TopMenuProps {}

export const TopMenu = (props: TopMenuProps) => {
  const classes = useStyles()
  return (
    <div>
      <nav className={classes.navBar}>
        <ul className={classes.navList}>
          <li className={classes.navLink}>
            <Link to='/'>Home</Link>
          </li>
          <li className={classes.navLink}>
            <Link to='/admin'>Admin</Link>
          </li>
          <li className={classes.navLink}>
            <Link to='/detail'>Detail</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
