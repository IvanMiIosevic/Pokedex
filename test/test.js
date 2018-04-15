const chai = require('chai');
const app = require('../script');

describe('Pokedex project', () => {
  it('should return toto-toto after tweaking the name', () => {
    chai.assert.equal(app.nameModification('Mr. mime'), 'mr-mime');
  });
  it('should return http://www.pokestadium.com/sprites/xy/nameOfSelectedPokemon.gif', () => {
    chai.assert.equal(app.getUrl('Pikachu'), 'http://www.pokestadium.com/sprites/xy/Pikachu.gif');
  });
});
