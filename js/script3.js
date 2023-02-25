const randomPokemonButton = document.querySelector('#randomPokemonDeck')
const randomPokemonHTML = document.querySelector('.pokemon-list3')

function randomCards(pokemonType, pokemonType2, pokemonName, pokemonID, pokemonIMG, HP, ATK, DEF, SATK, SDEF, SPD){
    randomPokemonHTML.innerHTML += `
        <div class="pokemon-input-card ${pokemonType}">
            <div class="pokemon-name-id inputCard">
                <h1>${pokemonName[0].toUpperCase() + pokemonName.substring(1)}</h1>
                <span>${idFormating(pokemonID)}</span>
            </div>
            <div class="background-circle"></div>
            <div class="pokemonSprite">
                <img src="${pokemonIMG}" alt="${pokemonName}" id="pokemonImage">
                <div class="pokemonType">
                    <span class="${pokemonType}">${pokemonType}</span>
                    <span class="${pokemonType2}">${pokemonType2}</span>
                </div>
            </div>
            <div class="about ${pokemonType}Color">
                <h1>Base Stats</h1>
                <div class="stats">
                    <h6>HP</h6>
                    <div class="stats-bar">
                        <div class="stats-bar-progress HP ${pokemonType}" style="width: ${HP}px;"></div>
                    </div>
                </div>
                <div class="stats">
                    <h6>ATK</h6>
                    <div class="stats-bar">
                        <div class="stats-bar-progress ATK ${pokemonType}" style="width: ${ATK}px;"></div>
                    </div>
                </div>
                <div class="stats">
                    <h6>DEF</h6>
                    <div class="stats-bar">
                        <div class="stats-bar-progress DEF ${pokemonType}" style="width: ${DEF}px;"></div>
                    </div>
                </div>
                <div class="stats">
                    <h6>SATK</h6>
                    <div class="stats-bar">
                        <div class="stats-bar-progress SATK ${pokemonType}" style="width: ${SATK}px;"></div>
                    </div>
                </div>
                <div class="stats">
                    <h6>SDEF</h6>
                    <div class="stats-bar">
                        <div class="stats-bar-progress SDEF ${pokemonType}" style="width: ${SDEF}px;"></div>
                    </div>
                </div>
                <div class="stats">
                    <h6>SPD</h6>
                    <div class="stats-bar">
                        <div class="stats-bar-progress SPD ${pokemonType}" style="width: ${SPD}px;"></div>
                    </div>
                </div>
            </div>
        </div>
    `
}
let counterRandomPokemon = 0
randomPokemonButton.onclick = (e) => {
    e.target.classList.add('fullsize')
    counterRandomPokemon++
    randomPokemonHTML.innerHTML = ''
    for(i = 1; i<=6; i++){
        pokemonAPI3(Math.round(Math.random() * 251) + 1)
    }
    console.log(e,counterRandomPokemon)
    if(counterRandomPokemon===3){
        e.target.disabled = true
        e.target.classList.replace('fullsize','none')
    }
    e.target.innerText = 'Change Team'
}

function pokemonAPI3(pokemonID) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
        .then(response => response.json())
        .then(exibirRandom)
}

function exibirRandom(response) {
    if (response.types.length > 1) {
        randomCards(response.types[0].type.name, response.types[1].type.name, response.name, response.id,response.sprites.other["official-artwork"].front_default,response.stats[0].base_stat,response.stats[1].base_stat,response.stats[2].base_stat,response.stats[3].base_stat,response.stats[4].base_stat,response.stats[5].base_stat)
    } else {
        randomCards(response.types[0].type.name, 'none', response.name, response.id,response.sprites.other["official-artwork"].front_default,response.stats[0].base_stat,response.stats[1].base_stat,response.stats[2].base_stat,response.stats[3].base_stat,response.stats[4].base_stat,response.stats[5].base_stat)
    }
}