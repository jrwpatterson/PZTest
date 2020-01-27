/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from 'use-http'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../root-reducer'
import { basketAsync, basketClear } from '../actions'
import {
  ReceivedBasket,
  AddBasketLine,
  ReceivedBasketLine,
} from '../interfaces'
import _ from 'lodash'

export const useBasketHook = () => {
  const [request, response] = useFetch()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const basket = useSelector((state: RootReducer) => state.basketReducer.basket)
  const validBasket = useSelector(
    (state: RootReducer) => state.basketReducer.validBasket,
  )

  useEffect(() => {
    getBasket()
  }, [validBasket])

  const getBasket = async (force: boolean = false) => {
    if (!loading && (!basket || force || !validBasket)) {
      setLoading(true)
      const newBasket = await request.post('api/Basket', {
        id: basket?.id,
        lines: basket?.lines?.map(line => ({
          productID: line.productID,
          rowNo: line.rowNo,
          grams: line.grams,
        })),
      })
      setLoading(false)
      if (response.ok) {
        dispatch(basketAsync({ basket: newBasket, valid: true }))
      }
    }
  }

  const addProductToBasket = (newBasketLine: AddBasketLine) => {
    if (newBasketLine.grams > 0) {
      const newBasket = addToBasket(newBasketLine, basket)
      dispatch(basketAsync({ basket: newBasket, valid: false }))
    }
  }

  const removeProductFromBasket = (id: string) => {
    const newBasket = removeFromBasket(id, basket)
    dispatch(basketAsync({ basket: newBasket, valid: false }))
  }

  const clearBasket = () => {
    dispatch(basketClear())
  }

  return {
    basket,
    getBasket,
    addProductToBasket,
    removeProductFromBasket,
    clearBasket,
  }
}

export const removeFromBasket = (
  removeID: string,
  basket?: ReceivedBasket,
): ReceivedBasket => {
  _.remove(basket?.lines ?? [], line => line.productID === removeID)

  return { ...basket!, lines: basket!.lines, total: undefined }
}

export const addToBasket = (
  newBasketLine: AddBasketLine,
  basket?: ReceivedBasket,
): ReceivedBasket => {
  const basketLine: ReceivedBasketLine = {
    rowNo: basket?.lines?.length ?? 0,
    grams: newBasketLine.grams,
    name: newBasketLine.name,
    productID: newBasketLine.id,
  }

  if (!basket) {
    return { lines: [basketLine], total: undefined }
  } else {
    return {
      ...basket,
      lines: [...(basket.lines ?? []), basketLine],
      total: undefined,
    }
  }
}
