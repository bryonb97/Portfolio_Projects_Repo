$(function () {
    //#region API URL Calls
    // URLS for the API 
    // Main URL for GET request
    var pokeURL = "http://pokeapi.co/api/v2/pokemon/";

    // new URL for 2nd GET request to get characteristics 
    // Not working right now
    // Needed for sprite though
    var pokeURLCharacteristics = "http://pokeapi.co/api/v2/characteristic/";

    // New URL for 3rd GET request to get Abilities and Moves
    var pokeURLAbility = "https://pokeapi.co/api/v2/pokemon/";
    //#endregion 

    var li = "";
    var randomPokeIdArr = [];
    for (var i = 0; i < 15; i++) {
        param = randomPokeID();
        randomPokeIdArr.push(param);

        // alert(param);

        //#region Add Parameter to URLS
        pokeURL = "http://pokeapi.co/api/v2/pokemon/" + param;
        pokeURLCharacteristics = "http://pokeapi.co/api/v2/characteristic/";
        pokeURLAbility = "https://pokeapi.co/api/v2/pokemon/" + param;
        console.log(pokeURL);
        //#endregion
        var $pokeDetails = $("#pokeDetails");

        //#region GET Requests
        $.ajax({
            url: pokeURL,
            success: function (dataID) {
                var pokeID = dataID.id;
                var pokeName = dataID.name;
                pokeName = titleCase(pokeName);
                var pokeOrder = dataID.order;
                var pokeType1 = dataID.types[0].type.name;
                pokeType1 = titleCase(pokeType1);

                if (dataID.types.length == 2) {
                    var pokeType2 = dataID.types[1].type.name;
                    pokeType2 = titleCase(pokeType2);
                } else var pokeType2 = null;

                var pokeDescription = "";

                $.ajax({
                    url: pokeURLCharacteristics,
                    success: function (dataSprites) {
                        var imageURI = dataID.sprites.front_default;

                        $.ajax({
                            url: pokeURLAbility,
                            success: function (dataAbility) {
                                var pokeWeight = dataAbility.weight;
                                var pokeHeight = dataAbility.height;
                                var mainAbility = dataAbility.abilities[1].ability.name;
                                mainAbility = titleCase(mainAbility);
                                var hiddenAbility = dataAbility.abilities[0].ability.name;   
                                hiddenAbility = titleCase(hiddenAbility);                             

                                if (hiddenAbility) {
                                    hiddenAbility = dataAbility.abilities[0].ability.name;
                                    hiddenAbility = titleCase(hiddenAbility);
                                } else {
                                    mainAbility = dataAbility.abilities[1].ability.name;
                                    mainAbility = titleCase(mainAbility);
                                }

                                // append data to HTML
                                // empty string to hold HTML

                                console.log(i + ': ' + randomPokeIdArr);
                                console.log("param" + param);
                                li += '<div class="card--cont">'
                                li += '<div class="scene scene--card" id="pokeCard' + i + '">';
                                li += '<img class="card__face card__face--front pokemonImg" src="' + imageURI + '" >';
                                li += '<pre class="card__face card__face--back bringToTop"><small>' +
                                    pokeName + ' ' + '#' + pokeID +
                                    '<br>' + pokeType1 +
                                    '</small></pre>';
                                li += '</div>';
                                li += '</div>';


                                // empty the listview
                                $("#pokeDetails").empty();

                                // append new li to listview
                                $("#pokeDetails").append(li);

                                $('.scene--card').click(function (event) {
                                    console.log(event)
                                    console.log(event.currentTarget)
                                    var node = event.currentTarget
                                    node.classList.toggle('is-flipped');
                                    console.log(node)
                                });

                            }

                        })
                    }
                })

                //2nd and 3rd GET requests are nested in success function of 1st GET request
                //#endregion                 
            }
        })

    }
    // debugger;



});


function randomPokeID() {
    var min = 1;
    var max = 766;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    console.log("Random Number Generated : " + random);
    return random;
}


function titleCase(str) {
    str = str.toLowerCase();
    str = str.split(' ')
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

function getTypeColor(type) {
    // alert("getType Color Called!");
    switch (pokeType1) {
        case "bug":
            print("Type: " + pokeType1 + "!");
            break;
        case "dark":
            print("Type: " + pokeType1 + "!");
            break;
        case "dragon":
            print("Type: " + pokeType1 + "!");
            break;
        case "electric":
            print("Type: " + pokeType1 + "!");
            break;
        case "fairy":
            print("Type: " + pokeType1 + "!");
            break;
        case "fighting":
            print("Type: " + pokeType1 + "!");
            break;
        case "fire":
            print("Type: " + pokeType1 + "!");
            break;
        case "flying":
            print("Type: " + pokeType1 + "!");
            break;
        case "ghost":
            print("Type: " + pokeType1 + "!");
            break;
        case "grass":
            print("Type: " + pokeType1 + "!");
            break;
        case "ground":
            print("Type: " + pokeType1 + "!");
            break;
        case "ice":
            print("Type: " + pokeType1 + "!");
            break;
        case "normal":
            print("Type: " + pokeType1 + "!");
            break;
        case "poison":
            print("Type: " + pokeType1 + "!");
            break;
        case "psychic":
            print("Type: " + pokeType1 + "!");
            break;
        case "rock":
            print("Type: " + pokeType1 + "!");
            break;
        case "steel":
            print("Type: " + pokeType1 + "!");
            break;
        case "water":
            print("Type: " + pokeType1 + "!");
            break;
        default:
            print("Invalid Type");

    }
}