export interface BaseCheese {
  name: string
  pricePerKG: number
  pictureUrl: string
  cheeseColour: string
}

export interface Cheese extends BaseCheese {
  id: string
}
