import { basketReducer, addToBasket } from "../basket-reducer"
import { basketAsync, basketAdd, basketClear, basketRemove } from "../../actions"
import { ReceivedBasket } from "../../interfaces"

const basketLine1 = {Grams: 100, Name: 'Gorgonzola', Price: 10.15, ProductID: 'Test Product', RowNo: 0}
const basketLine2 = {Grams: 250, Name: 'Different Cheese', Price: 20.15, ProductID: 'Test Product2', RowNo: 1}

let basketReceived: ReceivedBasket

describe('Basket Reducer', () => {
    beforeEach(() => {
        basketReceived =  {
            ID: 'testId',
            Lines: [
                basketLine1,
                basketLine2
            ],
            Total: 30.30
        }
    })
    it('should add a basket when receiving', () => {
        const reducer = basketReducer({}, basketAsync.success(basketReceived))
        expect(reducer.basket).toBe(basketReceived)
    })
    
    it('should add to a the basket when adding', () => {
        const newLine = {Grams: 500, Name: 'Added Cheese', ID: 'Test Product3'}
        const newBasket = basketReducer({}, basketAdd(newLine))

        expect(newBasket.basket?.Lines[0].Grams).toBe(500)
        expect(newBasket.basket?.Lines[0].Name).toBe('Added Cheese')
        expect(newBasket.basket?.Lines[0].ProductID).toBe('Test Product3')
        expect(newBasket.basket?.Lines[0].RowNo).toBe(0)
        expect(newBasket.basket?.Lines[0].Price).toBe(undefined)
    })
    
    it('should remove from the a basket when removing', () => {

        let newBasket = basketReducer({basket: basketReceived}, basketRemove('Test Product'))
        expect(newBasket.basket?.Lines.length).toBe(1)
        expect(newBasket.basket?.Lines[0]).toBe(basketLine2)
        expect(newBasket.basket?.Total).toBe(undefined)

        newBasket = basketReducer({basket: {...basketReceived}}, basketRemove('Test Product2'))
        expect(newBasket.basket?.Lines.length).toBe(0)
    })

    it('should remove from the a basket when removing - Test Product 2', () => {

        const newBasket2 = basketReducer({basket: {...basketReceived}}, basketRemove('Test Product2'))
        expect(newBasket2.basket?.Lines.length).toBe(1)
        expect(newBasket2.basket?.Lines[0]).toBe(basketLine1)
        expect(newBasket2.basket?.Total).toBe(undefined)
    })

    it('should clear the basket when asked to clear', () => {
        const newBasket = basketReducer({basket: basketReceived}, basketClear())
        expect(newBasket.basket?.Lines).toEqual([])
        expect(newBasket.basket?.ID).toBe('testId')
        expect(newBasket.basket?.Total).toBe(0)
    })

    it('addToBasket should add the line if basket is not formed', () =>{ 
        const newLine = {Grams: 500, Name: 'Added Cheese', ID: 'Test Product3'}
        const newBasket = addToBasket(newLine)

        expect(newBasket.Lines[0].Grams).toBe(500)
        expect(newBasket.Lines[0].Name).toBe('Added Cheese')
        expect(newBasket.Lines[0].ProductID).toBe('Test Product3')
        expect(newBasket.Lines[0].RowNo).toBe(0)
        expect(newBasket.Lines[0].Price).toBe(undefined)
    })

    it('addToBasket should add the line if basket is formed', () =>{ 
        const newLine = {Grams: 500, Name: 'Added Cheese', ID: 'Test Product3'}
        const newBasket = addToBasket(newLine, basketReceived)

        expect(newBasket.Lines[0]).toBe(basketLine1)
        expect(newBasket.Lines[1]).toBe(basketLine2)

        expect(newBasket.Lines[3].Grams).toBe(500)
        expect(newBasket.Lines[3].Name).toBe('A3ded Cheese')
        expect(newBasket.Lines[3].ProductID).toBe('Test Product3')
        expect(newBasket.Lines[3].RowNo).toBe(3)
        expect(newBasket.Lines[3].Price).toBe(undefined)
    })
})