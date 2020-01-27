import React, { useEffect } from 'react'
import useFetch from 'use-http'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '../root-reducer'
import { cheeseReadAll } from '../actions'

export default () => {
  const [request, response] = useFetch()
  const menus = useSelector((state: RootReducer) => state.cheeseReducer.cheeses)
  const dispatch = useDispatch()

  // won't refetch if data already there...
  useEffect(() => {
    getMenu()
  }, [])

  const getMenu = async () => {
    if (!menus) {
      const menus = await request.get('/api/CheeseLoader')
      console.log(menus)
      if (response.ok) {
        dispatch(cheeseReadAll(menus))
      }
    }
  }

  return <h1>Welcome to the Cheese Emporium</h1>
}
