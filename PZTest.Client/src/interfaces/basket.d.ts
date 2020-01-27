export interface SendBasket {
  ID?: string
  Lines: BaseBasketLine[]
}

export interface BaseBasketLine {
  ProductID: string
  RowNo: number
  Grams: number
}

export interface ReceivedBasket {
  ID?: string
  Lines: ReceivedBasketLine[]
  Total?: number
}

export interface ReceivedBasketLine extends BaseBasketLine {
  Price?: number
  Name: string
}

export interface AddBasketLine {
  ID: string
  Grams: number
  Name: string
}
