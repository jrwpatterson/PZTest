import React from 'react'
import { useParams } from 'react-router-dom'
import { useCheeseMenu } from '../hooks'

interface DetailScreenProps {
  id: string
}
export default () => {
  const { id } = useParams<DetailScreenProps>()
  const { cheeses } = useCheeseMenu()

  return <div>Detail Page for {id}</div>
}
