window.onload = function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'pokemon.json', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
    if (xhr.status === 200) {
         var PokeInfo = JSON.parse(xhr.responseText);
         var func = Object.keys(PokeInfo);
        Mypokedex(PokeInfo,func);
        search(PokeInfo,func);
        }
};
xhr.send();
function Mypokedex(array,keys){
    document.forms.namedItem('pokename').onsubmit =function(){
        document.querySelector('#name').innerHTML =  "";
        document.querySelector('#types').innerHTML =  "";
        document.querySelector('img').src = ""; 
        var  selectedPokemon = this.elements.namedItem('name').value;
        for(var i = 0; i < keys.length; i++){
        var name = nameModification(array[i].names.en);
        if(parseInt(selectedPokemon) === array[i].national_id || selectedPokemon === name){
            document.querySelector('#name').innerHTML += "&nbsp;" + array[i].names.en + "&nbsp;/&nbsp;" + array[i].names.fr;
            document.querySelector('img').src = getUrl(array[i].national_id, name);
            getTypes(array[i].types);
            } 
        }    
        return false;
    };
}
function nameModification(name){
    var rawName = name;
    var loweredName = rawName.toLowerCase();
    var pokeclean = loweredName.replace(/\s/g, '').replace(":","").replace(".","-").replace("'","").replace("♀","f").replace("♂","m"); 
    if(pokeclean == 'mimejr-'){
        pokeclean = "mime-jr";
    }
    return pokeclean;
}
function getUrl(nationalId,name){
    if(nationalId  > 721){
        return  "http://www.pkparaiso.com/imagenes/sol-luna/sprites/animados/"+ name +".gif"; 
       }else{
        return  "http://www.pokestadium.com/sprites/xy/" + name +".gif";
       }
}
function getTypes(types){
    for(var j in types){
        if( j == 0){
        document.querySelector('#types').innerHTML += "&nbsp;" + types[j] ;
    } else{
        document.querySelector('#types').innerHTML += "&nbsp;/&nbsp;" + types[j] ;
    }
}
}
function search(array,keys){
    document.querySelector('#nameinput').onkeydown = function (){
        var current = document.querySelector('#nameinput').value;
        var key = event.keyCode || event.charCode;
        document.querySelector('#prediction').innerHTML ="";
        if (current.length >= 2){
        for(var i = 0; i < keys.length; i++){
            var name = nameModification(array[i].names.en);
            if(name.startsWith(current) === true){
            document.querySelector('#prediction').innerHTML += "&nbsp;" + name;
        }
        }
        } else{
            document.querySelector('#prediction').innerHTML ="";
        }
    };
    }
};
