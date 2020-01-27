export interface BaseCheese {
    Name: string
    PricePerKG: number
    PictureUrl: string
    CheeseColour: string
}


export interface Cheese extends BaseCheese {
    ID: string
}