import { cheeseReducer } from '../cheeses-reducer'
import { cheeseReadAll, cheeseClear } from '../../actions'
import { Cheese } from '../../interfaces'

const cheese1: Cheese = {
  cheeseColour: 'blue',
  id: 'testid',
  name: 'blue cheese',
  pictureUrl: 'test url',
  pricePerKG: 20,
}
const cheese2: Cheese = {
  cheeseColour: 'purple',
  id: 'testid2',
  name: 'dodgy cheese',
  pictureUrl: 'test url2',
  pricePerKG: 10,
}

const cheeses = [cheese1, cheese2]

describe('cheeses reducer', () => {
  it('should add cheeses to its reducer', () => {
    const cheeseRed = cheeseReducer({}, cheeseReadAll(cheeses))
    expect(cheeseRed.cheeses).toBe(cheeses)
  })

  it('should clear the cheese when they are finished', () => {
    const cheeseRed = cheeseReducer({}, cheeseClear())
    expect(cheeseRed.cheeses).toBeUndefined()
  })
})
