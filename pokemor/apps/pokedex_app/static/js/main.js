$(function () {
    var pokeURL = 'https://pokeapi.co/api/v2/pokemon/';
    var pokeURLCharacteristics = 'http://pokeapi.co/v2/characteristic';

    var li = '';

    var randomPokeIDArr = [];
    for(var i = 0; i < 15; i++){
        randomPokeID = getRandomPokeID();
        randomPokeIDArr.push(randomPokeID);

        pokeURL += str(randomPokeID);
        console.log("pokeURL" + pokeURL);

        var $pokeDetails = $('#pokeDetails');

        var getPokeIDAndAbilities = $.ajax({
            url: pokeURL,
            success: function(dataID){
                var 
            }
        })

        var getPokeCharacteristics = $.ajax({
            url: pokeURLCharacteristics,
        })
    }
});