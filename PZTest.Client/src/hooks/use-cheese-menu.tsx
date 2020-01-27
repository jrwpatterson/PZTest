/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '../root-reducer'
import useFetch from 'use-http'
import { cheeseReadAll, cheeseClear } from '../actions'
import _ from 'lodash'

export const useCheeseMenu = () => {
  const [request, response] = useFetch()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const cheeses = useSelector(
    (state: RootReducer) => state.cheeseReducer.cheeses,
  )
  useEffect(() => {
    getMenu()
  }, [])

  const getMenu = async () => {
    if ((!cheeses || cheeses.length === 0) && !loading) {
      setLoading(true)
      const menus = await request.get('api/CheeseLoader')
      setLoading(false)
      if (response.ok) {
        dispatch(cheeseReadAll(menus))
      }
    }
  }

  const getMenuItem = (id: string) => {
    if (cheeses == null) {
      return null
    }
    const index = _.findIndex(cheeses, cheese => cheese.id === id)

    return cheeses[index]
  }

  const clearMenu = () => {
    dispatch(cheeseClear())
  }

  return {
    loading,
    getMenu,
    clearMenu,
    getMenuItem,
    cheeses,
  }
}
