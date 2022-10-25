const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImgContainer = document.querySelector("[data-poke-img-container]");
const pokeImg = document.querySelector("[data-poke-img]");
const pokeId = document.querySelector("[data-poke-number]");
const pokeType = document.querySelector("[data-poke-type]");
const pokeStats = document.querySelector("[data-poke-stats]");
const addPokemonBtn = document.getElementById("add-btn-root");

const pokeTeamRoot = document.querySelector(".team-section__root");
const pokeTeam = [];

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

class Pokemon {
  constructor(name) {
    this.name = name;
    this.id = Math.random();
  }
}

class Message {
  constructor(text, type) {
    this.text = text;
    this.type = type;
  }

  create() {
    let colorClass;
    let text = this.text;
    if(this.type === 'alert') {
      colorClass = 'alert';
    } else if (this.type === 'success') {
      colorClass = 'success';
    } else {
      return;
    }
    const messageEl = `<p class="message ${colorClass}">${text}</p>`;
    return messageEl;
  }
}

function searchPokemon(event) {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return undefined;
    })
    .then((res) => renderPokemon(res))
    .catch(() => {
      return;
    });
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
  addButton(types);
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
  addPokemonBtn.innerHTML = "";
  pokeName.innerText = "Not a Pokemon";
  pokeId.innerText = "";
  pokeImgContainer.style.background = "";
  pokeType.innerText = "";
  pokeImg.setAttribute("src", "./assets/img/unknown-pokemon.png");
  pokeStats.innerHTML = "";
}

function addButton(typesList) {
  addPokemonBtn.innerHTML = "";
  const buttonEl = document.createElement("button");
  buttonEl.classList.add("add-pokemon__button");
  buttonEl.textContent = "Add to Team";
  for (let i = 0; i < 1; i++) {
    for (let types of typesList) {
      if (types["slot"] === 1) {
        const firstType = types["type"]["name"];
        buttonEl.style.backgroundColor = typeColors[firstType];
      } else {
        break;
      }
    }
  }

  buttonEl.addEventListener("click", (e) => {
    addPokemonHandler(e);
  });

  addPokemonBtn.append(buttonEl);
}

function removePokemonHandler(event) {
  const nodeEl = event.target.closest('.card').parentNode;
  const pokemonIndex = pokeTeam.findIndex(el => el.id === parseFloat(nodeEl.dataset.id));
  pokeTeam.splice(pokemonIndex, 1)
  nodeEl.remove();
}

function addPokemonHandler(event) {
  const cardEl = event.target.parentNode.parentNode;
  const pokeName = cardEl.children[0].textContent;
  const pokemonObj = new Pokemon(pokeName);

  if (cardEl.querySelector('.message')) {
    return;
  }

  if (pokeTeam.length < 6) {
    pokeTeam.push(pokemonObj);
    const pokemonNodeClone = cardEl.parentNode.cloneNode(true);
    const cloneBtn = pokemonNodeClone.querySelector("#add-btn-root > button");
    cloneBtn.textContent = "Remove from team";
    cloneBtn.style.backgroundColor = "#ee1515";
    cloneBtn.addEventListener('click', event => {
      removePokemonHandler(event)
    });
    
    const teamMemberContainer = document.createElement("div");
    teamMemberContainer.dataset.id = pokemonObj.id;
    teamMemberContainer.style.backgroundColor = "#f5f5f5";
    teamMemberContainer.append(pokemonNodeClone);
    pokeTeamRoot.append(teamMemberContainer);

    if (cardEl.querySelector('.message')) {
      return;
    } else {
      const successMessage = new Message('Pokemon added to team!', 'success').create();
      cardEl.insertAdjacentHTML('beforeend', successMessage);
      const message = cardEl.querySelector('.message');
      deleteMessage(message);
    }
  }

  if(pokeTeam.length >= 6) {
    if(cardEl.querySelector('.message')) {
      return;
    }
    const alertMessage = new Message('Team max size: 6. Delete to add more!', 'alert').create();
    cardEl.insertAdjacentHTML('beforeend', alertMessage);
    const message = cardEl.querySelector('.message');
    deleteMessage(message);
    return;
  }
}

function deleteMessage(element) {
  setTimeout(() => {
    element.remove();
  }, 2000);
}

