const pikachu = document.getElementById('pikachu');
const cachedPokemon = {};

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=50`
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((data, index) => ({
        name: data.name,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
            1}.png`
    }));
    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) =>
                `
    <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        
       
    </li>
        `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if (!cachedPokemon[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokeman = await res.json();
        cachedPokemon[id] = pokeman;
        displayPokemanPopup(pokeman);
    } else {
        displayPokemanPopup(cachedPokemon[id]);
    }
};

const displayPokemanPopup = (pokeman) => {
    console.log(pokeman);
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    const htmlString = `
        
            <div class="card">
                <img class="card-image" src="${
                    pokeman.sprites['front_default']
                }"/>
                <h2 class="card-title">${pokeman.name}</h2>
                <p><small>Type: ${type} | Height:</small> ${pokeman.height} | Weight: ${
        pokeman.weight} |<small>Type: ${type} | Move:</small> ${pokeman.id} | Ability: ${pokeman.id}</p>

        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();
const pokeBtn = document.querySelector('#pokeBtn')
function getName(){
  const LoadData = async () => {
  try {
const url = `https://pokeapi.co/api/v2/pokemon/`;
const res = await fetch(url);
console.log(res.ok)
const data = await res.json();
console.log(data);
return data;
  }catch(err){
    console.error(err)
  }
};
LoadData().then((data) => console.log(data));
}


