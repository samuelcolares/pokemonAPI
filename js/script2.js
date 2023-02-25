const pokemonCardInput = document.querySelector('.pokemon-input-card')
const pokemonName = document.querySelector('.inputCard')
const pokemonImage = document.querySelector('#pokemonImage')
const pokemonType = document.querySelector('.pokemonType')
const randomPokemon1 = document.querySelector('#randomPokemonCard')
const pokemonInputText = document.querySelector('#inputText')

const buttonNext = document.querySelector('#next')
const buttonPrev = document.querySelector('#prev')

const aboutPokemon = document.querySelector('.about')
const statsHP = document.querySelector('.HP')
const statsATK = document.querySelector('.ATK')
const statsDEF = document.querySelector('.DEF')
const statsSATK = document.querySelector('.SATK')
const statsSDEF = document.querySelector('.SDEF')
const statsSPD = document.querySelector('.SPD')
const statsBar = document.querySelectorAll('.stats-bar-progress')

function pokemonAPI2(pokemonID) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
        .then(response => response.json())
        .then(exibirNaTela)
}

let contador = null

function exibirNaTela(response) {

    pokemonName.firstChild.nextElementSibling.innerHTML = `${response.name[0].toUpperCase() + response.name.substring(1)}`
    pokemonName.firstChild.nextElementSibling.nextElementSibling.innerHTML = `${idFormating(response.id)}`

    pokemonImage.src = response.sprites.other["official-artwork"].front_default
    pokemonImage.classList.replace('loadIMG', 'loadedIMG')

    pokemonCardInput.classList.replace(pokemonCardInput.classList[1], response.types[0].type.name);
    if (response.types.length > 1) {
        pokemonType.innerHTML = `
        <span id="type1" class="${response.types[0].type.name}">${response.types[0].type.name}</span>
        <span id="type1" class="${response.types[1].type.name}">${response.types[1].type.name}</span>`
    } else {
        pokemonType.innerHTML = `
        <span id="type1" class="${response.types[0].type.name}">${response.types[0].type.name}</span>
        <span id="type1" class="none"></span>`
    }
    colorStats(response.types[0].type.name)
    stats(response.stats[0].base_stat,
        response.stats[1].base_stat,
        response.stats[2].base_stat,
        response.stats[3].base_stat,
        response.stats[4].base_stat,
        response.stats[5].base_stat)

    contador = response.id
    if (contador > 1) {
        buttonPrev.disabled = false
    }else {
        buttonPrev.disabled = true
    }
}

buttonNext.addEventListener('click', () => {
    contador++
    pokemonAPI2(contador)
})

buttonPrev.addEventListener('click', (event) => {
    contador--
    if (contador < 1) {
        contador = 1
    }
    pokemonAPI2(contador)
})


pokemonInputText.addEventListener('keypress', (e) => {
    const a = parseInt(e.target.value)
    if (e.key === 'Enter' && isNaN(a)) {
        let word = e.target.value
        let wordFinal = word.toLowerCase()
        pokemonAPI2(wordFinal)
    } else if(e.key === 'Enter'){
        pokemonAPI2(a)
    }
})

function load() {
    const random = Math.round(Math.random() * 251) + 1
    pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${random}.png`
}

pokemonImage.onload = load()


// pokemonCardInput.addEventListener('mousemove', (e) => {
//     const containerRect = pokemonCardInput.getBoundingClientRect();
//     const mouseX = e.clientX - containerRect.left;
//     const mouseY = e.clientY - containerRect.top;
//     const percentX = mouseX / containerRect.width;
//     const percentY = mouseY / containerRect.height;
//     const rotateX = -5 + percentY * 25;
//     const rotateY = 5 - percentX * 25;

//     pokemonCardInput.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
// });

// pokemonCardInput.addEventListener('mouseleave', () => {
//     pokemonCardInput.style.transform = '';
// });



function colorStats(pokemonType) {
    aboutPokemon.classList.replace(aboutPokemon.classList[1], `${pokemonType}Color`);
    statsBar.forEach(bar => {
        bar.classList.replace(bar.classList[2], pokemonType)
    })
}

function stats(HP, ATK, DEF, SATK, SDEF, SPD) {
    if(HP > 220){
        statsHP.style.width = `${220}px` 
    } else{
        statsHP.style.width = `${HP}px`
    }
    statsATK.style.width = `${ATK}px`
    statsDEF.style.width = `${DEF}px`
    statsSATK.style.width = `${SATK}px`
    statsSDEF.style.width = `${SDEF}px`
    statsSPD.style.width = `${SPD}px`
}

randomPokemon1.onclick = () => {
    const number = Math.round(Math.random() * 251) + 1
    pokemonAPI2(number)
}

// -----------------------------------------------------------------------------


pokemonInputText.addEventListener('blur', () =>{
    pokemonInputText.value = ''
})