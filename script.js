window.onload = function () {
    // AJAX REQUEST 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'pokemons.json', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var PokeInfo = JSON.parse(xhr.responseText);
            Mypokedex(PokeInfo);
            search(PokeInfo);
        }
    };
    xhr.send();
    // Receive Data from Ajax and Handle it
    function Mypokedex(array) {
        document.forms.namedItem('pokename').onsubmit = function () {
            //Reset Values
            var nameField = document.querySelector('#name');
            nameField.innerHTML = "";
            document.querySelector('#prediction').innerHTML = "";
            var typeField = document.querySelector('#types');
            typeField.innerHTML = "";
            var img = document.querySelector('img');
            // This source is a blank image to prevent border and icon
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            document.querySelector('#stats').innerHTML = "";
            document.querySelector('#attack').innerHTML = "";
            document.querySelector('#defense').innerHTML = "";
            document.querySelector('#movesInfo').innerHTML = "";
            document.querySelector('#moves').innerHTML = "";
            var error = document.querySelector('#error');
            document.querySelector('#moves').innerHTML = "";
            var selectedPokemon = this.elements.namedItem('name').value;
            for (var i in array) {
                // call function to tweak the name
                var name = nameModification(array[i].name);
                if (selectedPokemon === i || selectedPokemon === name) {
                    // display infos about pokemon
                    nameField.innerHTML = " <span class='title'>Name :</span> &nbsp;" + array[i].name + " #" + i;
                    img.src = getUrl(name);
                    typeField.innerHTML = " <span class='title'>Type :</span> &nbsp;" + array[i].type;
                    document.querySelector('#stats').innerHTML = "Stats : ";
                    document.querySelector('#attack').innerHTML = "Attack : " + array[i].attack;
                    document.querySelector('#defense').innerHTML = "Defense : " + array[i].defense;
                    document.querySelector('#movesInfo').innerHTML = "Moves : ";
                    document.querySelector('#moves').innerHTML = getAttacks(array, i);
                    error.innerHTML = "";
                    // call function to get attacks
                    getAttacks(array, i);
                    break;
                } else {
                    //check if input value is a number
                    if (parseInt(selectedPokemon)) {
                        img.src = "http://www.pokestadium.com/sprites/xy/unown-interrogation.gif";
                        error.innerHTML = ` Pokémon number ${selectedPokemon} not found `;
                    } else {
                        img.src = "http://www.pokestadium.com/sprites/xy/unown-interrogation.gif";
                        error.innerHTML = ` ${selectedPokemon} not found `;
                    }
                }
            }
            return false;
        };
    }
    // Tweak the name to be able to use it properly
    function nameModification(name) {
        var rawName = name;
        var loweredName = rawName.toLowerCase();
        var firstTweak = loweredName.replace(/\s/g, '').replace(":", "").replace(".", "-");
        var nidoranTweak = firstTweak.replace("♀", "f").replace("♂", "m");
        var pokeclean = nidoranTweak.replace("'", "");
        return pokeclean;
    }
    
    function getUrl(name) {
        return "http://www.pokestadium.com/sprites/xy/" + name + ".gif";
    }
    
    function getAttacks(array, number) {
        var moves = "";
        for (var i in array[number].moves) {
            if (i != 1) {
                moves += array[number].moves[i] + "&nbsp;&nbsp;";
            } else {
                moves += array[number].moves[i] + "&nbsp;&nbsp;<br>";
            }
        }
        return moves;
    }
    // Function to show suggestions while user is typing
    function search(array, keys) {
        document.querySelector('#nameinput').onkeydown = function () {
           document.querySelector('#error').innerHTML = "";
            var current = document.querySelector('#nameinput').value;
            document.querySelector('#prediction').innerHTML = "";
            if (current.length >= 2) {
                for (var i in array) {
                    var name = nameModification(array[i].name);
                    //if name of Pokemon Starts with the current input value
                    if (name.startsWith(current) === true) {
                        document.querySelector('#prediction').innerHTML += "&nbsp;" + name;
                    }
                }
            } else {
                document.querySelector('#prediction').innerHTML = "";
            }
        };
    }
};