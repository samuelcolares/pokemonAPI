// Interacoes do usuario com o game
const inputGame = document.querySelector('#pokemonInputGame')
const buttonGame = document.querySelector('#restartGame')


// Elementos importados do DOM que compõe o Card do game
const pokemonCardGame = document.querySelector('.pokemon-game-card')
const imageGame = document.querySelector('#pokemonImageGame')
const pokemonNameIdGame = document.querySelector('.inputCardGame')
const pokemonTypeGame = document.querySelector('.pokemonTypeGame')
const aboutPokemonGame = document.querySelector('.aboutGame');
const statsHPGame = document.querySelector('.HPGame');
const statsATKGame = document.querySelector('.ATKGame');
const statsDEFGame = document.querySelector('.DEFGame');
const statsSATKGame = document.querySelector('.SATKGame');
const statsSDEFGame = document.querySelector('.SDEFGame');
const statsSPDGame = document.querySelector('.SPDGame');
const statsBarGame = document.querySelectorAll('.stats-bar-progressGame');
const contadorGame = document.querySelector('#contadorGame')


let contagemAcertos = 0
let contagemErros = 0

// função para aplicar a cor predominante nas barras de stats e título h3 'Base Stats' 
function colorStatsGame(pokemonType) {
    aboutPokemonGame.classList.replace(aboutPokemonGame.classList[1], `${pokemonType}Color`);
    statsBarGame.forEach(bar => {
        bar.classList.replace(bar.classList[2], pokemonType)
    })
}

// função para alterar o tamanho da barra de cada stats de acordo com cada pokemon 
function statsGame(HP, ATK, DEF, SATK, SDEF, SPD) {
    statsHPGame.style.width = `${HP}px`
    statsATKGame.style.width = `${ATK}px`
    statsDEFGame.style.width = `${DEF}px`
    statsSATKGame.style.width = `${SATK}px`
    statsSDEFGame.style.width = `${SDEF}px`
    statsSPDGame.style.width = `${SPD}px`
}


// Criação de uma variável para armazenar um número aleatório, variável 'let' porquê esse número pode mudar a qualquer momento.
let numeroAleatorio

// Função para gerar número aleatório que é armazenado na variável 'let numeroAleatorio'
function gameRandomNumber() {
    numeroAleatorio = Math.round(Math.random() * 251) + 1
    return numeroAleatorio
}

// Chamando a função de gerar um número aleatório e chamando a API com o parâmetro sendo o numero aleatório
gameRandomNumber()
pokemonAPIGame(numeroAleatorio)

// Função para chamar a API que recebe como parâmetro o número aleatório
function pokemonAPIGame(RandomNumber) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${RandomNumber}/`)
        .then(response => response.json())
        .then(pokemonGame)
    // .catch(erros)
}

// Função que recebe de parâmetro a resposta vindo da api
function pokemonGame(response) {
    //Variáveis para facilitar o entendimento
    const nomePokemon = response.name
    const nomePokemonFormatado = nomePokemon[0].toUpperCase() + nomePokemon.substring(1)
    const tipoPrincipalPokemon = response.types[0].type.name
    const tipoSecundarioPokemon = response.types[1] ? response.types[1].type.name : 'none';

    const nomePokemonOutput = pokemonNameIdGame.firstChild.nextElementSibling
    const idPokemonOutput = pokemonNameIdGame.firstChild.nextElementSibling.nextElementSibling

    const dadosInput = inputGame.value.toLowerCase()

    // Verificação para checar se o valor entrado no input é igual ao nome do pokemon
    if (dadosInput === nomePokemon || contagemErros > 3) {
        buttonGame.innerText = `Play Again`
        imageGame.classList.add('exibir')
        imageGame.classList.add('acerto')
        setTimeout(() => {
            imageGame.classList.remove('acerto')
        }, 2000)

        nomePokemonOutput.innerHTML = `${nomePokemonFormatado}`
        idPokemonOutput.innerHTML = `${idFormating(response.id)}`

        pokemonCardGame.classList.replace(pokemonCardGame.classList[1], tipoPrincipalPokemon);

        pokemonTypeGame.innerHTML = `
            <span id="type1" class="${tipoPrincipalPokemon}">${tipoPrincipalPokemon}</span>
            <span id="type1" class="${tipoSecundarioPokemon}">${tipoSecundarioPokemon}</span>`

        colorStatsGame(tipoPrincipalPokemon)
        statsGame(response.stats[0].base_stat,
            response.stats[1].base_stat,
            response.stats[2].base_stat,
            response.stats[3].base_stat,
            response.stats[4].base_stat,
            response.stats[5].base_stat)
        if (dadosInput === nomePokemon) {
            contagemAcertos++
            contadorGame.innerText = contagemAcertos
            inputGame.classList.add('scored')
            setTimeout(() => {
                inputGame.classList.remove('scored')
            }, 2000)
        }
        contagemErros = 0
    } else {
        contagemErros++
        console.log(contagemErros)
    }
    imageGame.src = response.sprites.other["official-artwork"].front_default
    if (contagemErros > 1 && contagemErros <= 4){
        inputGame.classList.add('wrongGuess')
            setTimeout(()=>{
                inputGame.classList.remove('wrongGuess')
            }, 2000)
    }
}


buttonGame.addEventListener('click', () => {
    buttonGame.innerText = `Restart Game`
    imageGame.classList.remove('exibir')
    contagemErros = 0
    gameRandomNumber()
    original(pokemonCardGame, pokemonNameIdGame, pokemonTypeGame)
    pokemonAPIGame(numeroAleatorio)
})

inputGame.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        pokemonAPIGame(numeroAleatorio)
    }
})



// Função para retornar todos os elementos do CARD da mesma forma que deram load, ou seja, da forma original
function original(pokemonCard, pokemon_name_id, pokemonTypeSpan) {
    pokemonCard.classList.replace(pokemonCard.classList[1], `type`);

    pokemon_name_id.firstChild.nextElementSibling.innerHTML = 'POKEMON'
    pokemon_name_id.firstChild.nextElementSibling.nextElementSibling.innerHTML = '#ID'

    pokemonTypeSpan.innerHTML = `
    <span style="color: black;">TYPE 1</span>
    <span style="color: black;">TYPE 2</span>`
    colorStatsGame(`type`)
    statsGame(`110`, `110`, `110`, `110`, `110`, `110`)
}


// Método para previnir interação com o botão direito do mouse, antes de descobrir o pokemon
imageGame.addEventListener("contextmenu", (event) => {
    const teste = event.target
    if (!teste.classList.contains('exibir')) {
        event.preventDefault()

    }
})

function erros() {
    contagemErros++
    console.log('Erros:', contagemErros)
}

inputGame.addEventListener('blur', () => {
    inputGame.value = ''
})