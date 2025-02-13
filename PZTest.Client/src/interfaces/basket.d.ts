export interface SendBasket {
  ID?: string
  Lines: BaseBasketLine[]
}

export interface SendBasketLine {
  ProductID: string
  RowNo: number
  Grams: number
}

export interface BaseBasketLine {
  productID: string
  rowNo: number
  grams: number
}

export interface ReceivedBasket {
  id?: string
  lines: ReceivedBasketLine[]
  total?: number
}

export interface ReceivedBasketLine extends BaseBasketLine {
  price?: number
  name: string
}

export interface AddBasketLine {
  id: string
  grams: number
  name: string
}
