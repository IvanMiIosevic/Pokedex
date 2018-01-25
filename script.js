window.onload = function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'pokemon.json', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
    if (xhr.status === 200) {
         var PokeInfo = JSON.parse(xhr.responseText);
         var func = Object.keys(PokeInfo);
        Mypokedex(PokeInfo,func);
        }
};
xhr.send();
function Mypokedex(array,keys){
    document.forms.namedItem('pokename').onsubmit =function(){
        document.querySelector('#name').innerHTML =  "";
        var  selectedPokemon = this.elements.namedItem('name').value;
        for(var i = 0; i < keys.length; i++){
        var name = nameModification(array[i].names.en);
        if(parseInt(selectedPokemon) === array[i].national_id || selectedPokemon === name){
            document.querySelector('#name').innerHTML += "&nbsp;" + array[i].names.en + "&nbsp;/&nbsp;" + array[i].names.fr;
            document.querySelector('img').src = getUrl(array[i].national_id, name);
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
};
