// enable when testing
// const fetch = require('node-fetch');
// querySelector, jQuery style
const $ = selector => document.querySelector(selector);

// Tweak the name to be able to use it properly
const nameModification = (name) => {
  const loweredName = name.toLowerCase();
  const spacelessName = loweredName.replace(/\s/g, '');
  const colonLessName = spacelessName.replace(':', '');
  const fromDotToHyphen = colonLessName.replace('.', '-');
  const nidoranTweak = fromDotToHyphen.replace('♀', 'f').replace('♂', 'm');
  const removedSingleQuoteName = nidoranTweak.replace("'", '');
  return removedSingleQuoteName;
};

const getUrl = name => `http://www.pokestadium.com/sprites/xy/${name}.gif`;

const getAttacks = (pokemon) => {
  let moves = '';
  for (let key = 0; key < pokemon.moves.length; key += 1) {
    if (key !== 1) {
      moves += ` ${pokemon.moves[key]}&nbsp;&nbsp;`;
    } else {
      moves += ` ${pokemon.moves[key]}&nbsp;&nbsp;<br>`;
    }
  }
  return moves;
};

const resetFields = () => {
  $('#name').innerHTML = '';
  $('#types').innerHTML = '';
  $('#stats').innerHTML = '';
  $('#attack').innerHTML = '';
  $('#defense').innerHTML = '';
  $('#movesInfo').innerHTML = '';
  $('#moves').innerHTML = '';
};
// Receive Data from Ajax and Handle it
const myPokedex = (array) => {
  $('#myForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Reset Values
    resetFields();
    const nameField = $('#name');
    const typeField = $('#types');
    const img = $('img');
    const selectedPokemon = nameModification($('#nameInput').value);
    for (let index = 1; index <= Object.keys(array).length; index += 1) {
      // call function to tweak the name
      const name = nameModification(array[index].name);
      if (parseInt(selectedPokemon, 10) === index || selectedPokemon === name) {
        // display infos about pokemon
        nameField.innerHTML = `Name : ${array[index].name} #${index} `;
        img.src = getUrl(name);
        typeField.innerHTML = `Type : ${array[index].type}`;
        $('#stats').innerHTML = 'Stats : ';
        $('#attack').innerHTML = `Attack : ${array[index].attack}`;
        $('#defense').innerHTML = `Defense : ${array[index].defense}`;
        $('#movesInfo').innerHTML = 'Moves : ';
        $('#moves').innerHTML = getAttacks(array[index]);
        break;
      } else if (selectedPokemon === '') {
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      } else {
        // Check if input value is a number
        if (parseInt(selectedPokemon, 10)) {
          nameField.innerHTML = ` Pokemon number ${selectedPokemon} not found `;
        } else {
          nameField.innerHTML = ` ${selectedPokemon} not found `;
        }
        img.src = 'http://www.pokestadium.com/sprites/xy/unown-interrogation.gif';
      }
    }
    return false;
  });
};

function prepareDatalist(pokemons) {
  for (let key = 1; key <= Object.keys(pokemons).length; key++) {
    const currentOption = document.createElement("option");
    currentOption.value = pokemons[key].name;
    $("#nameList").appendChild(currentOption);
  }
}
// AJAX REQUEST
fetch('pokemons.json')
  .then(response => response.json())
  .then((data) => {
    myPokedex(data);
    prepareDatalist(data);
  });

if (typeof exports !== 'undefined') {
  exports.nameModification = nameModification;
  exports.getUrl = getUrl;
}

