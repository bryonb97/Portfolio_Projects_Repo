$(function () {
    // alert("Ready!");

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

    $(".searchBtn").click(pokeURL, function (pokeSubmit) {
        var param = document.getElementById("pokeInput").value;
        var lowercase = param.toLowerCase();
        document.getElementById("pokeInput").value = lowercase;
        param = lowercase;
        // console.log(param);

        //#region Add Parameter to URLS
        pokeURL = "http://pokeapi.co/api/v2/pokemon/" + param;
        pokeURLCharacteristics = "http://pokeapi.co/api/v2/characteristic/";
        pokeURLAbility = "https://pokeapi.co/api/v2/pokemon/" + param;
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
                                var hiddenAbility = dataAbility.abilities[0].ability.name;
                                hiddenAbility = titleCase(hiddenAbility);
                                var mainAbility = dataAbility.abilities[1].ability.name;
                                mainAbility = titleCase(mainAbility);

                                if (hiddenAbility == true) {
                                    hiddenAbility = dataAbility.abilities[0].ability.name;
                                    hiddenAbility = titleCase(hiddenAbility);
                                } else {
                                    mainAbility = dataAbility.abilities[1].ability.name;
                                    mainAbility = titleCase(mainAbility);
                                }

                                var moves = dataAbility.moves[0].move.name;

                                for (var i = 0; i < dataAbility.moves.length; i++) {
                                    moves = dataAbility.moves[i].move.name;
                                    // console.log("Move " + i + ": " + moves);
                                }

                                // append data to HTML
                                // empty string to hold HTML
                                var li = "";
                                li += '<div id="resultContainer" class="row">';
                                li += '<li id="pokeImg" class="card col bg-dark"><img src="' + imageURI + '" class="pokeImg"></li>';
                                li += '<div class="col">';
                                li += '<div class="infoCard" class="row">';
                                li += '<h1 id="pokeID" class="">#' + pokeID + ' ' + pokeName + '</h1>';
                                li += '<h2 id="pokeOrder" class="">' + 'Order: ' + pokeOrder + '</h2>';

                                li += '<p id="pokeType1Color" class="row">' + 'Type 1: ' + pokeType1 + '</p>'; 

                                // only display Type 2 if it is not null
                                if (pokeType2 != null) {
                                    li += '<p class="pokeTypeColor2 row">Type 2: ' + pokeType2 + '</p>';
                                }

                                

                                li += '<h2 id="mainAbility" class="row">Main Ability: ' + mainAbility + '</h1>';
                                li += '<h3 id="hiddenAbility" class="row">Hidden Ability: ' + hiddenAbility + '</h1>';
                                li += '<input type="button" class="btn btn-primary row" id="showMovesBtn" onclick="showMoves();" value="Show Moves">';     
                                                        


                                for (var i = 0; i < dataAbility.moves.length; i++) {
                                    moves = dataAbility.moves[i].move.name;
                                    li += '<p class="movesList row">' + "Move " + [i + 1] + ": " + moves + '</p>';
                                    // console.log(i);
                                }

                                li += '<p>' + pokeDescription + '</p>';
                                li += '</div>';  
                                li += '</div>';
                                li += '</div>';
                                

                                // empty the listview
                                $("#pokeDetails").empty();

                                // append new li to listview
                                $("#pokeDetails").append(li);



                            }
                        })
                    }
                })
                //2nd and 3rd GET requests are nested in success function of 1st GET request
                //#endregion 
                $("#showMovesBtn").click(function () {
                    // alert("Button Clicked!");
                });

                $("#getTypeColorBtn").click(function () {
                    alert("Button Clicked!");
                });
            }
        })
    });
});

function titleCase(str) {
    str = str.toLowerCase();
    str = str.split(' ')
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

function showMoves() {
    // console.log("Showing moves");
    $(".movesList").slideToggle("slow");
}

function getTypeColor(type){
    // alert("getType Color Called!");
    switch (pokeType1) {
        case "bug":
            type = "bug";
            getTypeColor();                                 
            console.log("Changed color to: Green");
            console.log("Type: " + pokeType1 + "!");
            break;
        case "dark":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "dragon":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "electric":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "fairy":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "fighting":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "fire":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "flying":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "ghost":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "grass":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "ground":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "ice":
            console.log("Type: " + pokeType1 + "!");
            break;
        case "normal":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "poison":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "psychic":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "rock":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "steel":

            console.log("Type: " + pokeType1 + "!");
            break;
        case "water":

            console.log("Type: " + pokeType1 + "!");
            break;
        default:
            console.log("Invalid Type");

    }
}