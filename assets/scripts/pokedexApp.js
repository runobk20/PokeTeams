const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImgContainer = document.querySelector("[data-poke-img-container]");
const pokeImg = document.querySelector("[data-poke-img]");
const pokeId = document.querySelector("[data-poke-number]");
const pokeType = document.querySelector("[data-poke-type]");
const pokeStats = document.querySelector("[data-poke-stats]");

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dark: "#705848",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  fairy: "#F0B6BC",
};

function searchPokemon(event) {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return undefined;
    })
    .then((res) => renderPokemon(res))
    .catch(() => {return});
}

function renderPokemon(res) {
  if (!res) {
    renderNotFound(res);
  }
  let { id, name, types } = res;
  name = name[0].toUpperCase() + name.slice(1); //Capitalize first letter

  const sprite = res.sprites.front_default;
  pokeName.innerText = name;
  pokeId.innerText = `Nº ${id}`;
  pokeImg.setAttribute("src", sprite);

  renderTypes(types);
  renderBackground(types);
  renderStats(res.stats);
}

function renderTypes(typesList) {
  pokeType.innerHTML = "";
  for (let types of typesList) {
    const typeEl = document.createElement("p");
    typeEl.textContent = types.type.name;
    typeEl.classList = "type";
    typeEl.style.color = typeColors[types.type.name];
    //typeEl.style.border = `2px dashed ${typeColors[types.type.name]}`;
    typeEl.style.border = `1px solid #888`;
    pokeType.append(typeEl);
  }
}

function renderBackground(typeList) {
  pokeImgContainer.style.background = "";
  const toRenderTypes = [];
  for (const type of typeList) {
    toRenderTypes.push(typeColors[type.type.name]);
  }
  if (toRenderTypes.length > 1) {
    pokeImgContainer.style.background = `radial-gradient(${toRenderTypes[1]} 33%, ${toRenderTypes[0]} 33%)`;
  } else {
    pokeImgContainer.style.background = `radial-gradient(#888 33%, ${toRenderTypes[0]} 33%)`;
  }
  pokeImgContainer.style.backgroundSize = "5px 5px";
}

function renderStats(statsList) {
  pokeStats.innerHTML = "";
  for (const stat of statsList) {
    let statName = stat.stat.name;
    let statValue = stat.base_stat;
    const statEl = document.createElement("li");
    const statNameEl = document.createElement("p");
    const statValueEl = document.createElement("p");
    statNameEl.textContent = statName;
    statValueEl.textContent = statValue;
    statEl.append(statNameEl, statValueEl);
    pokeStats.append(statEl);
  }
}

function renderNotFound(res) {
  console.log(res);
  pokeName.innerText = "Not a Pokemon";
  pokeId.innerText = "";
  pokeImgContainer.style.background = "";
  pokeType.innerText = "";
  pokeImg.setAttribute("src", "./assets/img/unknown-pokemon.png");
  pokeStats.innerHTML = '';
}