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
        return false;
    };
}
};
