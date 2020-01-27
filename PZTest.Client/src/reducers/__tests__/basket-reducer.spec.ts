import { basketReducer } from "../basket-reducer"
import { basketAsync } from "../../actions"
import { ReceivedBasket } from "../../interfaces"

const basketReceived:ReceivedBasket = {
    ID: 'testId',
    Lines: [
        {Grams: 100, Name: 'Gorgonzola', Price: 10.15, ProductID: 'Test Product', RowNo: 0},
        {Grams: 250, Name: 'Different Cheese', Price: 20.15, ProductID: 'Test Product2', RowNo: 1}
    ],
    Total: 30.30
}

describe('Basket Reducer', () => {
    it('should add a basket when receiving', () => {
        const reducer = basketReducer({}, basketAsync.success(basketReceived))
        expect
    })
    
    it('should add to a the basket when adding', () => {
        throw new Error('not implemented')
    })
    
    it('should remove from the a basket when removing', () => {
        throw new Error('not implemented')
    })

    it('should clear the basket when asked to clear', () => {
        throw new Error('not implemented')
    })
})