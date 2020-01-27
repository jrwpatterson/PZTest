import { cheeseReducer } from "../cheeses-reducer"
import { cheeseReadAllActions } from "../../actions"
import { Cheese } from "../../interfaces"

const cheese1: Cheese = {
    CheeseColour: 'blue',
    ID: 'testid',
    Name: 'blue cheese',
    PictureUrl: 'test url',
    PricePerKG: 20
}
const cheese2: Cheese = {
    CheeseColour: 'purple',
    ID: 'testid2',
    Name: 'dodgy cheese',
    PictureUrl: 'test url2',
    PricePerKG: 10
}

const cheeses = [cheese1, cheese2]

describe('cheeses reducer', () => {
    it('should add cheeses to its reducer', () => {
        const cheeseRed = cheeseReducer({}, cheeseReadAllActions.success(cheeses))
        expect(cheeseRed.cheeses).toBe(cheeses)
    })
})