        // AJAX REQUEST 
        fetch('pokemons.json')
            .then(function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function(data) {
                    prepareDatalist(data);
                    myPokedex(data);
                });
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
            // querySelector, jQuery style
            var $ = function (selector) {
             return document.querySelector(selector);
            };
        // Receive Data from Ajax and Handle it
    function myPokedex(array) {
        $('#myForm').onsubmit = function () {
        //Reset Values
        var nameField = $('#name');
        nameField.innerHTML = "";
        var typeField = $('#types');
        typeField.innerHTML = "";
        var img = $('img');
        // This source is a blank image to prevent border and icon
                img.src = "";
                $('#stats').innerHTML = "";
                $('#attack').innerHTML = "";
                $('#defense').innerHTML = "";
                $('#movesInfo').innerHTML = "";
                $('#moves').innerHTML = "";
                var error = $('#error');
                $('#moves').innerHTML = "";
                var selectedPokemon = nameModification($('#nameInput').value);
                for (var i in array) {
                    // call function to tweak the name
                    var name = nameModification(array[i].name);
                    if (selectedPokemon === i || selectedPokemon === name) {
                        // display infos about pokemon
                        nameField.innerHTML = " <span class='title'>Name :</span> &nbsp;" + array[i].name + " #" + i;
                        img.src = getUrl(name);
                        typeField.innerHTML = " <span class='title'>Type :</span> &nbsp;" + array[i].type;
                        $('#stats').innerHTML = "Stats : ";
                        $('#attack').innerHTML = "Attack : " + array[i].attack;
                     $('#defense').innerHTML = "Defense : " + array[i].defense;
                        $('#movesInfo').innerHTML = "Moves : ";
                        $('#moves').innerHTML = getAttacks(array, i);
                        error.innerHTML = "";
                        // call function to get attacks
                        getAttacks(array, i);
                        break;
                    } else {
                        //check if input value is a number
                        if (parseInt(selectedPokemon)) {
                            img.src = "http://www.pokestadium.com/sprites/xy/unown-interrogation.gif";
                            error.innerHTML = ` Pokemon number ${selectedPokemon} not found `;
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
            var loweredName = name.toLowerCase();
            var firstTweak = loweredName.replace(/\s/g, '').replace(":", "").replace(".", "-");
            var nidoranTweak = firstTweak.replace("♀", "f").replace("♂", "m");
            var cleanedName = nidoranTweak.replace("'", "");
            return cleanedName;
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
        function prepareDatalist(array) {
            let options = '';
            for (var i in array) {
                let currentOption = document.createElement('option');
                currentOption.value = array[i].name;
                $('#nameList').appendChild(currentOption);
            }
            return;
        }