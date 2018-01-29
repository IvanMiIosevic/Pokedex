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
            document.querySelector('img').src = "";
            var selectedPokemon = this.elements.namedItem('name').value;
            for (var i in array) {
                var name = nameModification(array[i].name);
                if (selectedPokemon === i || selectedPokemon === name) {
                    document.querySelector('#name').innerHTML = " Name : &nbsp;" + array[i].name;
                    document.querySelector('img').src = getUrl(name);
                    document.querySelector('#types').innerHTML = " Type : &nbsp;" + array[i].type;
                    document.querySelector('#error').innerHTML = "";
                    break;
                } else {
                    document.querySelector('img').src = "http://www.pokestadium.com/sprites/xy/unown-interrogation.gif";
                    document.querySelector('#error').innerHTML = "Sorry , this Pokemon is not in our Database :(";
                }
            }
            return false;
        };
    }

    function nameModification(name) {
        var rawName = name;
        var loweredName = rawName.toLowerCase();
        var pokeclean = loweredName.replace(/\s/g, '').replace(":", "").replace(".", "-").replace("'", "").replace("♀", "f").replace("♂", "m");
        return pokeclean;
    }

    function getUrl(name) {
        return "http://www.pokestadium.com/sprites/xy/" + name + ".gif";
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