/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '../root-reducer'
import useFetch from 'use-http'
import { cheeseReadAll, cheeseClear } from '../actions'
import _ from 'lodash'
import { Cheese } from '../interfaces'

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

  const getMenu = async (force: boolean = false) => {
    if ((force || !cheeses || cheeses.length === 0) && !loading) {
      setLoading(true)
      const menus = await request.get('api/CheeseLoader')
      setLoading(false)
      if (response.ok) {
        dispatch(cheeseReadAll(menus))
      }
    }
  }

  const editItem = async (cheese: Cheese) => {
    await request.put(`api/CheeseAdmin`, cheese)
    await getMenu(true)
  }

  const deleteItem = async (id: string) => {
    await request.delete(`api/CheeseAdmin/${id}`)
    await getMenu(true)
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
    deleteItem,
    editItem,
    getMenu,
    clearMenu,
    getMenuItem,
    cheeses,
  }
}
