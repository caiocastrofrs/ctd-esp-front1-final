const getEpisodiosId = require('./utils');

test('pegar o id do episodio',() => {
  expect(getEpisodiosId(['ceujuedje/20','jusda71e/80'])).toBe(['20','30'])
})

