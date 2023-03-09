// Armazenamento das variáveis do projeto:
/* -------------- Seção Pesquisa --------------*/
// Seção de pesquisa de pokémon
const $searchingSection = document.querySelector('#searching-page')

// Botões na seção de pesquisa (Avançar para o proximo Pokémon, retroceder para o Pokémon anterior e gerar Pokémon aleatório)
const $buttonNext = document.querySelector('#next')
const $buttonPrev = document.querySelector('#prev')
const $generateRandomPokemon = document.querySelector('#randomPokemonCard')

// Input para receber o ID do Pokémon ou o nome
const $pokemonInputText = document.querySelector('#inputText')

// Elementos que recebem a cor de fundo ou cor de texto com base no pokemon Exibido(usados na função colorType)
const $pokemonCardInput = document.querySelector('.pokemon-input-card')
const $statsBar = document.querySelectorAll('.stats-bar-progress')
const $pokemonInfo = document.querySelector('.pokemonInfo')

// Elementos que recebem dados diferentes para cada Pokémon exibido
const pokemonName = document.querySelector('.inputCard')
const pokemonImage = document.querySelector('#pokemonImage')
const pokemonType = document.querySelector('.pokemonType')
const statsHP = document.querySelector('.HP')
const statsATK = document.querySelector('.ATK')
const statsDEF = document.querySelector('.DEF')
const statsSATK = document.querySelector('.SATK')
const statsSDEF = document.querySelector('.SDEF')
const statsSPD = document.querySelector('.SPD')

/* -------------- Seção Geração I e II --------------*/
// Seção das gerações de Pokémon
const $generationSection = document.querySelector('.generation-page')

//  Onde os cards da geração I ficam armazenados
const $generationI = document.querySelector('.generationI')
const $generationI_toggleBar = document.querySelector('.generationI-page__toggle-bar')
const $firstGenerationCards = document.querySelector('.pokemon-list1')

//  Onde os cards da geração II ficam armazenados
const $generationII = document.querySelector('.generationII')
const $generationII_toggleBar = document.querySelector('.generationII-page__toggle-bar')
const $secondGenerationCards = document.querySelector('.pokemon-list2')

//  Contéudo que varia de acordo com a geração escolhida
const $generationLogoImage = document.querySelector('.generation-page__logo')
const $buttonSwitchGeneration = document.querySelector('#switchGeneration')
const $generationTextAbout = document.querySelector('.generation-page__about')

/* -------------- Seção Jogo --------------*/
// Seção do Jogo de descobrir o pokémon
const $miniGameSection = document.querySelector('#mini-game')

// Input para receber o nome do Pokémon
const inputGame = document.querySelector('#pokemonInputGame')

// Botão para reiniciar o jogo
const buttonGame = document.querySelector('#restartGame')

// Elementos que recebem a cor de fundo ou cor de texto com base no pokemon Exibido(usados na função colorType)
const pokemonCardGame = document.querySelector('.pokemon-game-card')
const statsBarGame = document.querySelectorAll('.stats-bar-progressGame');
const pokemonInfoGame = document.querySelector('.pokemonInfoGame');

// Elementos que recebem dados diferentes para cada Pokémon exibido
const pokemonNameIdGame = document.querySelector('.inputCardGame')
const imageGame = document.querySelector('#pokemonImageGame')
const pokemonTypeGame = document.querySelector('.pokemonTypeGame')
const statsHPGame = document.querySelector('.HPGame');
const statsATKGame = document.querySelector('.ATKGame');
const statsDEFGame = document.querySelector('.DEFGame');
const statsSATKGame = document.querySelector('.SATKGame');
const statsSDEFGame = document.querySelector('.SDEFGame');
const statsSPDGame = document.querySelector('.SPDGame');
const contadorGame = document.querySelector('#contadorGame');

// Elementos que servem para fazer as regras aparecerem na versão mobile
const rulesGame = document.querySelector('.mini-game__rules');
const openRules = document.querySelector('.mobileRules');
const closeRules = document.querySelector('.close-rules');

/* -------------- Seção Time Aleatório --------------*/

// Botão para gerar o time aleatório
const randomPokemonButton = document.querySelector('#randomPokemonDeck')

// Onde os cards random vão ser inseridos
const randomPokemonHTML = document.querySelector('.pokemon-list3')

// Seção do gerador de time aleatório
const $randomTeamSection = document.querySelector('#team-page')


/* -------------- Botões para transitar entre as páginas --------------*/
/*  Botão presente em todas as seções para retornar à landingPage */
const $buttonTo_homeSection = document.querySelectorAll('.back-button')
const $buttonTo_searchingSection = document.querySelector('.pesquisar-pokemon')
const $landingPage_firstGenerationButton = document.querySelector('.first-generation')
const $landingPage_secondGenerationButton = document.querySelector('.second-generation')
const $buttonReturnToTop_generationSection = document.querySelector('#returnTop_generation-page')
const $buttonTo_miniGame = document.querySelectorAll('.goTo-Game')
const $buttonTo_randomTeamSection = document.querySelector('.pokemon-aleatorio')
// função forEach para fazer todos os botões de retorno funcionarem e levarem para a seção inicial
$buttonTo_homeSection.forEach((homeButton) => {
    homeButton.addEventListener('click', () => goTo(0))
})
$buttonTo_searchingSection.addEventListener('click', () => {
    let topSearchingSection = $searchingSection.offsetTop
    goTo(topSearchingSection)
})
$buttonTo_miniGame.forEach((game) => {
    game.addEventListener('click', () => {
        let topGameSection = $miniGameSection.offsetTop
        goTo(topGameSection)
    });
})
$buttonTo_randomTeamSection.addEventListener('click', () => {
    let topRandomTeamSection = $randomTeamSection.offsetTop
    goTo(topRandomTeamSection)
})

/* -------------- Funções Reutilizáveis --------------*/
// Função para indicar para onde o navegador deve levar o usuário, de acordo com o botão que ele aperte --(FUNÇÃO REUTILIZÁVEL ID-01)--
function goTo(page) {
    window.scrollTo({
        top: page,
        behavior: 'smooth'
    })
}

// Função para formatar o nome dos Pokémons que por padrão estão em minúsculo. EX: pikachu -> Pikachu; --(FUNÇÃO REUTILIZÁVEL ID-02)--
function formatName(pokemonName) {
    nameFormated = pokemonName[0].toUpperCase() + pokemonName.substring(1)
    return nameFormated
}

// Função para formatar o ID dos Pokémons que por padrão só possui o número. EX: 1 -> ID#001; --(FUNÇÃO REUTILIZÁVEL ID-03)--
function formatID(idNumber) {
    if (idNumber < 10) {
        return `#00${idNumber}`
    } else if (idNumber >= 10 && idNumber < 100) {
        return `#0${idNumber}`
    } else if (idNumber >= 100) {
        return `#${idNumber}`
    }

}

// Função para criar as cartas e armazenar dentro da divisão com base na geração de Pokémon Escolhida. --(FUNÇÃO REUTILIZÁVEL ID-04)--
function pokemonCard(selectedGeneration, pokemonName, pokemonID, pokemonImageType, pokemonType, pokemonType2) {
    selectedGeneration.innerHTML += `
    <section class="card ${pokemonType}">
        <div class="pokemon-name-id smallCard">
            <h3 id="pokemonName">${formatName(pokemonName)}</h3>
            <span id="pokeID">${formatID(pokemonID)}</span>
        </div>
        <div class="pokemonSprite center smallCard">
            <img src="${pokemonImageType}" alt="" id="imagem">
            <div class="pokemonType smallCard">
                <span id="type1" class="${pokemonType}">${pokemonType}</span>
                <span id="type1" class="${pokemonType2}">${pokemonType2}</span>
            </div>
        </div>
    </section>`
}

// Função para colorir o card com base no tipo de Pokémon --(FUNÇÃO REUTILIZÁVEL ID-05)--
function colorType(pokemonCard, pokemonInfo, pokemonsStats, pokemonType) {
    //Recebe o background da cor do tipo principal do Pokémon
    pokemonCard.classList.replace(pokemonCard.classList[1], pokemonType);

    //Recebe a cor de texto do tipo principal do Pokémon
    pokemonInfo.classList.replace(pokemonInfo.classList[1], `${pokemonType}Color`);

    //Recebe o background da cor do tipo principal do Pokémon
    pokemonsStats.forEach(bar => {
        bar.classList.replace(bar.classList[2], pokemonType)
    })
}

// Função para alterar o tamanho de cada barra de Stats com base no Pokémon --(FUNÇÃO REUTILIZÁVEL ID-06)--
function stats(HP, ATK, DEF, SATK, SDEF, SPD, HP_Data, ATK_Data, DEF_Data, SATK_Data, SDEF_Data, SPD_Data) {
    const attributes = [HP, ATK, DEF, SATK, SDEF, SPD];
    const attributeData = [HP_Data, ATK_Data, DEF_Data, SATK_Data, SDEF_Data, SPD_Data];
  
    for (let i = 0; i < attributes.length; i++) {
      if (attributeData[i] > 220) {
        attributes[i].style.width = '220px';
      } else {
        attributes[i].style.width = `${attributeData[i]}px`;
      }
    }
  }

// Função para retornar todos os elementos do CARD da mesma forma que deram load, ou seja, da forma original --(FUNÇÃO REUTILIZÁVEL ID-07)--
function original(pokemonCard, pokemon_name_id, pokemonTypeSpan) {
    pokemonCard.classList.replace(pokemonCard.classList[1], `type`);

    pokemon_name_id.firstChild.nextElementSibling.innerHTML = 'POKEMON'
    pokemon_name_id.firstChild.nextElementSibling.nextElementSibling.innerHTML = '#ID'

    pokemonTypeSpan.innerHTML = `
    <span style="color: black;">TYPE 1</span>
    <span style="color: black;">TYPE 2</span>`
    colorType(pokemonCardGame, pokemonInfoGame, statsBarGame, 'type')
    stats(statsHPGame, statsATKGame, statsDEFGame, statsSATKGame, statsSDEFGame, statsSPDGame, '110',
        '110',
        '110',
        '110',
        '110',
        '110')
}

// Função para emitir no HTML os cards aleatórios--(FUNÇÃO REUTILIZÁVEL ID-08)--
function randomCards(cardHTML, pokemonType, pokemonType2, pokemonName, pokemonID, pokemonIMG, HP, ATK, DEF, SATK, SDEF, SPD) {
    cardHTML.innerHTML += `
        <div class="pokemon-input-card tt ${pokemonType}">
            <div class="pokemon-name-id inputCard">
                <h1>${formatName(pokemonName)}</h1>
                <span>${formatID(pokemonID)}</span>
            </div>
            <div class="background-circle"></div>
            <div class="pokemonSprite">
                <img src="${pokemonIMG}" alt="${pokemonName}" id="pokemonImage">
                <div class="pokemonType">
                    <span class="${pokemonType}">${pokemonType}</span>
                    <span class="${pokemonType2}">${pokemonType2}</span>
                </div>
            </div>
            <div class="pokemonInfo ${pokemonType}Color">
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



/* -------------- Seção Pesquisa: Funções e Eventos --------------*/
// Variável LET para armazenar o ID do pokemon e fazer os botões de avançar e retroceder funcionarem corretamente
let pokemonCounter = null

// Criação da requisição da API de Pokémon para os cards pequenos
function pokemonAPI_Cards(pokemonID) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
        .then(response => response.json())
        .then(outputCard)
}

// Função que recebe a reposta da API(pokemonAPI_Cards) para exibir o pokémon pesquisado em tela
function outputCard(data) {
    const pokemonNameOutput = pokemonName.firstChild.nextElementSibling
    const pokemonIDOutput = pokemonName.firstChild.nextElementSibling.nextElementSibling
    const tipoPrincipalPokemon = data.types[0].type.name
    const tipoSecundarioPokemon = data.types[1] ? data.types[1].type.name : 'none';

    pokemonNameOutput.innerHTML = `${formatName(data.name)}`
    pokemonIDOutput.innerHTML = `${formatID(data.id)}`

    pokemonImage.src = data.sprites.other["official-artwork"].front_default
    pokemonImage.classList.replace('loadIMG', 'loadedIMG')

    pokemonType.innerHTML = `
        <span id="type1" class="${tipoPrincipalPokemon}">${tipoPrincipalPokemon}</span>
        <span id="type1" class="${tipoSecundarioPokemon}">${tipoSecundarioPokemon}</span>`

    colorType($pokemonCardInput, $pokemonInfo, $statsBar, data.types[0].type.name)
    stats(statsHP, statsATK, statsDEF, statsSATK, statsSDEF, statsSPD, data.stats[0].base_stat,
        data.stats[1].base_stat,
        data.stats[2].base_stat,
        data.stats[3].base_stat,
        data.stats[4].base_stat,
        data.stats[5].base_stat)

    pokemonCounter = data.id
    if (pokemonCounter > 1) {
        $buttonPrev.disabled = false
    } else {
        $buttonPrev.disabled = true
    }
}

// Função para dar load em uma imagem de algum pokémon Aleatório entre a geração I e geração II
function loadRandomPokemonImage() {
    const random = Math.round(Math.random() * 251) + 1
    pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${random}.png`
}


// Chamada de Evento para quando houver o load da página um pokémon aleatório ser exibido no Card
pokemonImage.addEventListener('load', loadRandomPokemonImage())

// Chamada de Evento para quando o usuário digitar o nome ou ID do pokémon e apertar enter, fazer a requisição do dado do input para a API
$pokemonInputText.addEventListener('keypress', (e) => {
    const number = parseInt(e.target.value)
    if (e.key === 'Enter' && isNaN(number)) {
        let word = e.target.value
        let wordFinal = word.toLowerCase()
        pokemonAPI_Cards(wordFinal)
    } else if (e.key === 'Enter') {
        pokemonAPI_Cards(number)
    }
})

// Chamada de Evento para quando o usuário tirar o foco do input, o contéudo do input ser apagado
$pokemonInputText.addEventListener('blur', () => {
    $pokemonInputText.value = ''
})

// Chamada de Evento para quando houver interação de clique avançar para o próximo pokémon
$buttonNext.addEventListener('click', () => {
    pokemonCounter++
    pokemonAPI_Cards(pokemonCounter)
})

// Chamada de Evento para quando houver interação de clique retroceder para o pokémon anterior, caso o pokémon já seja o primeiro, desabilitar o botão.
$buttonPrev.addEventListener('click', (event) => {
    pokemonCounter--
    if (pokemonCounter < 1) {
        pokemonCounter = 1
    }
    pokemonAPI_Cards(pokemonCounter)
})

// Chamada de Evento para quando houver interação de clique, gerar um pokémon aleatório entre a geração I e II
$generateRandomPokemon.addEventListener('click', () => {
    const number = Math.round(Math.random() * 251) + 1
    pokemonAPI_Cards(number)
})





/* -------------- Seção Geração I e II: Funções e Eventos --------------*/
// Criação da requisição da API de Pokémon para os cards pequenos
function pokemonAPI_smallCards(i, pokemonGeneration) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then(response => response.json())
        .then((data) => smallCard.call(this, data, pokemonGeneration))
}

// Função que recebe a reposta da API(pokemonAPI_smallCards) e envia os dados para a função reutilizável ID-04 para criação das cartas pequenas de Pokémon
function smallCard(data, pokemonGeneration) {

    const tipoSecundarioPokemon = data.types[1] ? data.types[1].type.name : 'none';
    // Caso o pokémon tenha mais de um tipo elemental, emitir os dois elementos dele em tela
    pokemonCard(pokemonGeneration, data.name, data.id, data.sprites.other["official-artwork"].front_default, data.types[0].type.name, tipoSecundarioPokemon)

    // Caso o pokémon tenha apenas um tipo elemental, aplicar classe 'none' no segundo elemento
}

// Função para gerar as cartas do 151 Pokémons da primeira geração
function firstGenerationLoad() {
    for (i = 1; i <= 151; i++) {
        pokemonAPI_smallCards(i, $firstGenerationCards)
    }
}

// Função para gerar as cartas do 100 Pokémons da segunda geração
function secondGenerationLoad() {
    for (i = 152; i <= 251; i++) {
        pokemonAPI_smallCards(i, $secondGenerationCards)
    }
}

// Função para alterar o contéudo da Seção (Logo, texto, cor dos botões) para geração I
const switchToGenerationI = () => {
    $generationLogoImage.src = "img/Generation-I.png"
    $generationTextAbout.innerText = 'The first generation of Pokémon, often referred to as Generation I, was released in Japan in 1996 and internationally in 1998. It introduced a total of 151 Pokémon species, including iconic characters such as Pikachu, Charmander, and Squirtle. The gameplay involved training and battling Pokémon, collecting gym badges, and ultimately becoming the Champion of the Pokémon League. The first generation games, Pokémon Red, Blue, and Green, were released for the Game Boy and have since become a beloved cultural phenomenon with a lasting impact on gaming and pop culture.'
    $generationII.classList.add('none')
    $generationI.classList.remove('none')
    $buttonReturnToTop_generationSection.classList.remove('second');
    $buttonSwitchGeneration.innerText = 'Switch to Generation II'
    $buttonSwitchGeneration.style['background-color'] = 'rgb(245, 125, 49)'
    $buttonSwitchGeneration.style['box-shadow'] = '0 0 10px rgba(245, 125, 49,0.7)'
}

// Função para alterar o contéudo da Seção (Logo, texto, cor dos botões) para geração II
const switchToGenerationII = () => {
    $generationLogoImage.src = "img/Generation-II.png"
    $generationTextAbout.innerText = 'The second generation of Pokémon, often referred to as Generation II, was released in Japan in 1999 and internationally in 2000. It introduced 100 new Pokémon species, bringing the total number of Pokémon to 251. The games in this generation, Pokémon Gold, Silver, and Crystal, were also released for the Game Boy and offered new features such as a real-time clock, day and night cycles, and the ability to breed Pokémon. The storyline followed a new protagonist on a journey through the Johto region, which was connected to the Kanto region from the previous generation games. The second generation of Pokémon also introduced new mechanics and features that have since become staples of the franchise, such as held items, gender differences, and the ability to choose the gender of the player character.'
    $generationI.classList.add('none')
    $generationII.classList.remove('none')
    $buttonReturnToTop_generationSection.classList.add('second');
    $buttonSwitchGeneration.innerText = 'Switch to Generation I'
    $buttonSwitchGeneration.style['background-color'] = 'rgb(30, 91, 55)'
    $buttonSwitchGeneration.style['box-shadow'] = '0 0 10px rgba(30, 91, 55, 0.7)'
}

// Função que verificar se o botão de retornar ao topo da seção deve ser visível ou não
const retornarAoTopo = () => {
    // variável para armazenar o tamanho padrão da altura de tela do usuário, será usada calcular a altura mínima para a exibição o botão de retornar ao topo da seção
    const minHeight = window.innerHeight;
    let scrollvertical = window.scrollY
    let topoGenerationSection = $generationSection.offsetTop
    let alturaTotalGenerationSection = $generationSection.offsetHeight
    const alturaMetadeGenerationSection = topoGenerationSection + alturaTotalGenerationSection / 3;
    const limiteInferior = topoGenerationSection + alturaTotalGenerationSection - minHeight;

    if (scrollvertical >= alturaMetadeGenerationSection - minHeight / 3 &&
        scrollvertical <= limiteInferior &&
        !$buttonReturnToTop_generationSection.classList.contains('visible')) {
        $buttonReturnToTop_generationSection.classList.remove('none')
        setTimeout(() => {
            $buttonReturnToTop_generationSection.classList.add('visible');
        }, 1000)
    } else if ((scrollvertical < alturaMetadeGenerationSection - minHeight / 3 ||
        scrollvertical > limiteInferior) &&
        $buttonReturnToTop_generationSection.classList.contains('visible')) {
        $buttonReturnToTop_generationSection.classList.remove('visible');
        $buttonReturnToTop_generationSection.classList.add('none');
    }
}


// Chamada de Evento para quando houver o load da página, os cards de pokemons serem inseridos em seus respectivos locais de armazenamento
$firstGenerationCards.onload = firstGenerationLoad()
$secondGenerationCards.onload = secondGenerationLoad()


// Chamada de Evento para quando houver interação de clique na barra que guarda os cards de pokémon, ela ganhar a classe 'expanded' e caso haja outra interação de clique, ela perca a clase 'expanded' escondendo os Pokémons de novo
$generationI_toggleBar.addEventListener('click', () => {
    $generationI.classList.toggle('expanded')
})
$generationII_toggleBar.addEventListener('click', () => {
    $generationII.classList.toggle('expanded')
})

// Chamadas de Eventos para quando houver interação de clique no botão da seção inicial, Evento1: altera o contéudo da seção (que por padrão é a Geração I) para a geração II, Evento2: leva o usuário até a seção
$landingPage_secondGenerationButton.addEventListener('click', switchToGenerationII)
$landingPage_secondGenerationButton.addEventListener('click', () => {
    let topGenerationSection = $generationSection.offsetTop
    goTo(topGenerationSection)
});


// Chamadas de Eventos para quando houver interação de clique no botão da seção inicial, Evento1: altera o contéudo da seção para a geração I caso a geração II esteja ativa, Evento2: leva o usuário até a seção
$landingPage_firstGenerationButton.addEventListener('click', switchToGenerationI)
$landingPage_firstGenerationButton.addEventListener('click', () => {
    let topGenerationSection = $generationSection.offsetTop
    goTo(topGenerationSection)
});

// Chamada de Evento para quando houver interação de clique no botão para alternar entre as gerações sem que o usuário tenha que ficar retornando ao topo para fazer isso
$buttonSwitchGeneration.addEventListener('click', () => {
    if ($generationII.classList.contains('none')) {
        switchToGenerationII()
    } else {
        switchToGenerationI()
    }
})


// Chamada de Evento de scroll para o botão de retornar ao topo da seção ficar disponível ou não
window.addEventListener('scroll', retornarAoTopo);

// Chamada de Evento para quando houver interação de clique no botão de retornar ao topo da seção para fazer seu trabalho.
$buttonReturnToTop_generationSection.addEventListener('click', () => {
    let topGenerationSection = $generationSection.offsetTop
    goTo(topGenerationSection)
});


/* -------------- Seção Jogo: Funções e Eventos --------------*/
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
}


// Função que recebe de parâmetro a resposta vindo da api e também verifica se o valor do input é o mesmo nome do pokemon, caso o usuário erre 3 vezes o pokémon é exibido
let contagemAcertos = 0
let contagemErros = 0
function pokemonGame(data) {
    //Variáveis para facilitar o entendimento
    imageGame.src = data.sprites.other["official-artwork"].front_default
    const nomePokemon = data.name
    const nomePokemonFormatado = formatName(nomePokemon)
    const tipoPrincipalPokemon = data.types[0].type.name
    const tipoSecundarioPokemon = data.types[1] ? data.types[1].type.name : 'none';

    const nomePokemonOutput = pokemonNameIdGame.firstChild.nextElementSibling
    const idPokemonOutput = pokemonNameIdGame.firstChild.nextElementSibling.nextElementSibling

    const dadosInput = inputGame.value.toLowerCase()
    console.log(inputGame.value)

    // Verificação para checar se o valor entrado no input é igual ao nome do pokemon
    if (dadosInput === nomePokemon || contagemErros > 3) {
        buttonGame.innerText = `Play Again`
        imageGame.classList.add('exibir')
        imageGame.classList.add('acerto')
        setTimeout(() => {
            imageGame.classList.remove('acerto')
        }, 2000)

        nomePokemonOutput.innerHTML = `${nomePokemonFormatado}`
        idPokemonOutput.innerHTML = `${formatID(data.id)}`

        // pokemonCardGame.classList.replace(pokemonCardGame.classList[1], tipoPrincipalPokemon);

        pokemonTypeGame.innerHTML = `
            <span id="type1" class="${tipoPrincipalPokemon}">${tipoPrincipalPokemon}</span>
            <span id="type1" class="${tipoSecundarioPokemon}">${tipoSecundarioPokemon}</span>`

        colorType(pokemonCardGame, pokemonInfoGame, statsBarGame, tipoPrincipalPokemon)
        stats(statsHPGame, statsATKGame, statsDEFGame, statsSATKGame, statsSDEFGame, statsSPDGame, data.stats[0].base_stat,
            data.stats[1].base_stat,
            data.stats[2].base_stat,
            data.stats[3].base_stat,
            data.stats[4].base_stat,
            data.stats[5].base_stat)
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
    }
    
    if (contagemErros > 1 && contagemErros <= 4) {
        inputGame.classList.add('wrongGuess')
        setTimeout(() => {
            inputGame.classList.remove('wrongGuess')
        }, 2000)
    }
}

// Chamada de Evento para receber o dado do input e fazer a checackem da função que recebe os dados da API (pokemonAPIGame)
inputGame.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        pokemonAPIGame(numeroAleatorio)
    }
})

// Chamada de Evento para quando houver interação de clique, reiniciar o jogo
buttonGame.addEventListener('click', () => {
    buttonGame.innerText = `Restart Game`
    imageGame.classList.remove('exibir')
    setTimeout(() => {
        imageGame.classList.remove('exibir')
    }, 10);
    contagemErros = 0
    gameRandomNumber()
    original(pokemonCardGame, pokemonNameIdGame, pokemonTypeGame)
    pokemonAPIGame(numeroAleatorio)
})

// Chamada de Evento para previnir interação com o botão direito do mouse na imagem do pokémon antes de ele ser descoberto, previnindo uma possivel trapaça
imageGame.addEventListener("contextmenu", (event) => {
    const teste = event.target
    if (!teste.classList.contains('exibir')) {
        event.preventDefault()
    }
})

// Chamada de Evento para quando o usuário tirar o foco do input, o conteúdo dentro dele ser apagado
inputGame.addEventListener('blur', () => {
    inputGame.value = ''
})


// Chamada de Evento para quando for pressionado, exibir as regras do jogo
openRules.addEventListener('click',()=>{
    rulesGame.classList.add('exibir')
})
// Chamada de Evento para quando for pressionado, fechar as regras do jogo
closeRules.addEventListener('click', ()=>{
    rulesGame.classList.remove('exibir')
})


/* -------------- Seção Time Aleatório: Funções e Eventos --------------*/
// Criação da requisição da API de Pokémon para os cards aleatórios
function pokemonAPI_RandomTeam(pokemonID) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
        .then(response => response.json())
        .then(exibirRandom)
}

// Função que recebe a resposta da API(pokemonAPI_RandomTeam) para exibir os pokémons aleatórios em tela e envia os dados para função reutilizável 07
function exibirRandom(data) {
    const pokemonName = data.name
    const pokemonID = data.id
    const pokemonIMG = data.sprites.other["official-artwork"].front_default
    const mainType = data.types[0].type.name
    const secondaryType = data.types[1] ? data.types[1].type.name : 'none';
    const HP = data.stats[0].base_stat
    const ATK = data.stats[1].base_stat
    const DEF = data.stats[2].base_stat
    const SATK = data.stats[3].base_stat
    const SDEF = data.stats[4].base_stat
    const SPD = data.stats[5].base_stat

    return randomCards(randomPokemonHTML, mainType, secondaryType, pokemonName, pokemonID, pokemonIMG, HP, ATK, DEF, SATK, SDEF, SPD)
}


// Chamada de Evento para quando houver interação de clique gerar 6 pokémons aleatórios e caso o botão seja apertado 3 vezes, ele é automaticamente desativado
let counterRandomPokemon = 0
randomPokemonButton.onclick = (e) => {
    e.target.classList.add('fullsize')
    counterRandomPokemon++
    randomPokemonHTML.innerHTML = ''
    for (i = 1; i <= 6; i++) {
        pokemonAPI_RandomTeam(Math.round(Math.random() * 251) + 1)
    }
    console.log(e, counterRandomPokemon)
    if (counterRandomPokemon === 3) {
        e.target.disabled = true
        // e.target.classList.replace('fullsize','none')
    }
    e.target.innerText = 'Change Team'
}

