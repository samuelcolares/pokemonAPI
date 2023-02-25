const firstGeneration = document.querySelector('.pokemon-list1')
const secondGeneration = document.querySelector('.pokemon-list2')


function firstGenerationLoad() {
    // secondGeneration.innerHTML = '';
    // firstGeneration.innerHTML = '';
    for (i = 1; i <= 151; i++) {
        pokemonAPI(i, firstGeneration)
    }
}

function secondGenerationLoad() {
    // secondGeneration.innerHTML = '';
    // firstGeneration.innerHTML = '';
    for (i = 152; i <= 251; i++) {
        pokemonAPI(i, secondGeneration)
    }
}


function pokemonAPI(i, pokemonGeneration) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then(response => response.json())
        .then((response) => smallCard.call(this, response, pokemonGeneration))
}


function pokemonCard(pokemonGeneration, pokemonName, pokemonID, pokemonImageType, pokemonType, pokemonType2) {
    pokemonGeneration.innerHTML += `
    <section class="card ${pokemonType}">
        <div class="pokemon-name-id">
            <h3 id="pokemonName">${pokemonName.toUpperCase()}</h3>
            <span id="pokeID">${idFormating(pokemonID)}</span>
        </div>
        <div class="pokemonSprite center">
            <img src="${pokemonImageType}" alt="" id="imagem">
            <div class="pokemonType">
                <span id="type1" class="${pokemonType}">${pokemonType}</span>
                <span id="type1" class="${pokemonType2}">${pokemonType2}</span>
            </div>
        </div>
    </section>`
}

function idFormating(idNumber) {
    if (idNumber < 10) {
        return `#00${idNumber}`
    } else if (idNumber >= 10 && idNumber < 100) {
        return `#0${idNumber}`
    } else if (idNumber >= 100) {
        return `#${idNumber}`
    }

}

function smallCard(response, pokemonGeneration) {
    if (response.types.length > 1) {
        pokemonCard(pokemonGeneration, response.name, response.id, response.sprites.other["official-artwork"].front_default, response.types[0].type.name, response.types[1].type.name)
    } else {
        pokemonCard(pokemonGeneration, response.name, response.id, response.sprites.other["official-artwork"].front_default, response.types[0].type.name, 'none')
    }
}


// --------------- teste
const generationSection = document.querySelector('.generation-page')
const buttonReturnGeneration = document.querySelector('#returnTop_generation-page')
const buttonChangeGeneration = document.querySelector('#changeGeneration')

const generationI_toggleBar = document.querySelector('.generationI-page__toggle-bar')
const generationII_toggleBar = document.querySelector('.generationII-page__toggle-bar')
const generationI = document.querySelector('.generationI')
const generationII = document.querySelector('.generationII')

generationI_toggleBar.addEventListener('click', () => {
    generationI.classList.toggle('expanded')
})

generationII_toggleBar.addEventListener('click', () => {
    generationII.classList.toggle('expanded')
})


firstGeneration.onload = firstGenerationLoad()
secondGeneration.onload = secondGenerationLoad()


const primeiraGeracao = document.querySelector('.primeira-geracao')
const segundaGeracao = document.querySelector('.segunda-geracao')
const imgimg = document.querySelector('.generation-page__logo')
const generationAbout = document.querySelector('.generation-page__about')




// calcular a altura mínima para mostrar o botão
const minHeight = window.innerHeight;


// função que verifica se o botão deve ser visível
const retornarAoTopo = () => {
    let scrollvertical = window.scrollY
    let topoGenerationSection = generationSection.offsetTop
    let alturaTotalGenerationSection = generationSection.offsetHeight
    const alturaMetadeGenerationSection = topoGenerationSection + alturaTotalGenerationSection / 3;
    const limiteInferior = topoGenerationSection + alturaTotalGenerationSection - minHeight;
  
    if (scrollvertical >= alturaMetadeGenerationSection - minHeight / 3 &&
        scrollvertical <= limiteInferior && 
        !buttonReturnGeneration.classList.contains('visible')) {
      buttonReturnGeneration.classList.remove('none')
      setTimeout(() => {
        buttonReturnGeneration.classList.add('visible');
      }, 1000)
    } else if ((scrollvertical < alturaMetadeGenerationSection - minHeight / 3 || 
                scrollvertical > limiteInferior) &&
                buttonReturnGeneration.classList.contains('visible')) {
      buttonReturnGeneration.classList.remove('visible');
      buttonReturnGeneration.classList.add('none');
    }
  }

// adicionar evento de scroll
window.addEventListener('scroll', retornarAoTopo);

// adicionar evento de clique no botão
buttonReturnGeneration.addEventListener('click', () => {
    let topoGenerationSection = generationSection.offsetTop
    window.scrollTo({
        top: topoGenerationSection,
        behavior: 'smooth'
    });
});



const changeToGenerationII = () => {
    imgimg.src = "img/Generation-II.png"
    generationAbout.innerText = 'The second generation of Pokémon, often referred to as Generation II, was released in Japan in 1999 and internationally in 2000. It introduced 100 new Pokémon species, bringing the total number of Pokémon to 251. The games in this generation, Pokémon Gold, Silver, and Crystal, were also released for the Game Boy and offered new features such as a real-time clock, day and night cycles, and the ability to breed Pokémon. The storyline followed a new protagonist on a journey through the Johto region, which was connected to the Kanto region from the previous generation games. The second generation of Pokémon also introduced new mechanics and features that have since become staples of the franchise, such as held items, gender differences, and the ability to choose the gender of the player character.'
    generationI.classList.add('none')
    generationII.classList.remove('none')
    buttonReturnGeneration.classList.add('second');
    buttonChangeGeneration.innerText = 'Change to Generation I'
    buttonChangeGeneration.style['background-color'] = 'rgb(30, 91, 55)'
    buttonChangeGeneration.style['box-shadow'] = '0 0 10px rgba(30, 91, 55, 0.7)'
}

const changeToGenerationI = () => {
    imgimg.src = "img/Generation-I.png"
    generationAbout.innerText = 'The first generation of Pokémon, often referred to as Generation I, was released in Japan in 1996 and internationally in 1998. It introduced a total of 151 Pokémon species, including iconic characters such as Pikachu, Charmander, and Squirtle. The gameplay involved training and battling Pokémon, collecting gym badges, and ultimately becoming the Champion of the Pokémon League. The first generation games, Pokémon Red, Blue, and Green, were released for the Game Boy and have since become a beloved cultural phenomenon with a lasting impact on gaming and pop culture.'
    generationII.classList.add('none')
    generationI.classList.remove('none')
    buttonReturnGeneration.classList.remove('second');
    buttonChangeGeneration.innerText = 'Change to Generation II'
    buttonChangeGeneration.style['background-color'] = 'rgb(245, 125, 49)'
    buttonChangeGeneration.style['box-shadow'] = '0 0 10px rgba(245, 125, 49,0.7)'
}



segundaGeracao.addEventListener('click', changeToGenerationII)

primeiraGeracao.addEventListener('click', changeToGenerationI)

buttonChangeGeneration.addEventListener('click', () =>{
    if(generationII.classList.contains('none')){
        changeToGenerationII()
    }else{
        changeToGenerationI()
    }
})