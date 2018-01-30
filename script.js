window.onload = function () {
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

    function Mypokedex(array) {
        document.forms.namedItem('pokename').onsubmit = function () {
            document.querySelector('#name').innerHTML = "";
            document.querySelector('#prediction').innerHTML = "";
            document.querySelector('#types').innerHTML = "";
            document.querySelector('img').src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            document.querySelector('#moves').innerHTML = "";
            var selectedPokemon = this.elements.namedItem('name').value;
            for (var i in array) {
                var name = nameModification(array[i].name);
                if (selectedPokemon === i || selectedPokemon === name) {
                    document.querySelector('#name').innerHTML = " <span class='title'>Name :</span> &nbsp;" + array[i].name;
                    document.querySelector('img').src = getUrl(name);
                    document.querySelector('#types').innerHTML = " <span class='title'>Type :</span> &nbsp;" + array[i].type;
                    document.querySelector('#stats').innerHTML="Stats : ";
                    document.querySelector('#attack').innerHTML="Attack : " + array[i].attack;
                    document.querySelector('#defense').innerHTML="Defense : " + array[i].defense;
                    document.querySelector('#movesInfo').innerHTML="Moves : ";
                    document.querySelector('#moves').innerHTML = getAttacks(array,i);
                    document.querySelector('#error').innerHTML = "";
                    getAttacks(array,i);
                    break;
                } else {
                    if(parseInt(selectedPokemon)){
                    document.querySelector('img').src = "http://www.pokestadium.com/sprites/xy/unown-interrogation.gif";
                    document.querySelector('#error').innerHTML = ` Pokémon number ${selectedPokemon} not found `;
                    }
                    else{
                        document.querySelector('img').src = "http://www.pokestadium.com/sprites/xy/unown-interrogation.gif";
                        document.querySelector('#error').innerHTML = ` ${selectedPokemon} not found `;
                    }
                }
            }
            return false;
        };
    }

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
        for (var i in array[number].moves){
            if(i != 1){
            moves += "&nbsp" + array[number].moves[i] + "&nbsp/";
        }else{
            moves += "&nbsp" + array[number].moves[i] + "&nbsp<br>";
        }
    }
        return moves;
    }
    function search(array, keys) {
        document.querySelector('#nameinput').onkeydown = function () {
            var current = document.querySelector('#nameinput').value;
            var key = event.keyCode || event.charCode;
            document.querySelector('#prediction').innerHTML = "";
            if (current.length >= 2) {
                for (var i in array) {
                    var name = nameModification(array[i].name);
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