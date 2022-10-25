const pokedexBtn = document.getElementById('pokedex-btn');
const poketeamBtn = document.getElementById('poketeam-btn');
const pokedexNavLink = document.getElementById('pokedex-link');
const poketeamNavLink = document.getElementById('poketeam-link');
const homeNavLink = document.getElementById('home-link');

const pokedexSectionEl = document.querySelector('.pokedex-section');
const poketeamSectionEl = document.querySelector('.team-section__pokemons');

function scrollToPokedex(ev) {
    ev.preventDefault();
    const pokedexPosition = pokedexSectionEl.offsetTop;
    window.scroll({top: pokedexPosition, behavior: 'smooth'});
}

pokedexBtn.addEventListener('click', ev => {
    scrollToPokedex(ev);
});

pokedexNavLink.addEventListener('click', ev => {
    scrollToPokedex(ev);
})

function scrollToTeams(ev) {
    ev.preventDefault();
    const poketeamPosition = poketeamSectionEl.offsetTop;
    window.scroll({top: poketeamPosition, behavior: 'smooth'});
}

poketeamBtn.addEventListener('click', ev => {
    scrollToTeams(ev);
})

poketeamNavLink.addEventListener('click', ev => {
    scrollToTeams(ev);
})

function scrollToTop(ev) {
    ev.preventDefault();
    document.documentElement.scroll({top: 0, behavior: "smooth"});
}

homeNavLink.addEventListener('click', scrollToTop);