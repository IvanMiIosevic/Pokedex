window.onload = function(){
    function loadJSON(callback) {   
        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', 'pokemons.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
                console.log(xobj.responseText);
              }
        };
        xobj.send(null);  
     }
     var actual_JSON = {};
     loadJSON(function(response) {
        // Parse JSON string into object
          var actual_JSON = JSON.parse(response);
          return actual_JSON;
       }); 

       console.log(Object.keys(actual_JSON));


    var errorBlock = document.querySelector('#error-block');
    document.forms['pokename'].onsubmit =function(){
       var selectedPokemon = this.elements['name'].value;
       console.log(selectedPokemon);
       

        return false;
};
};