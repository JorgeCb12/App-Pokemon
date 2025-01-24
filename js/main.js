const listarPokemon = document.querySelector("#listarPokemon");
const botonesHearder = document.querySelectorAll(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemons = [];

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then((data => {
            pokemons.push(data);
            if (pokemons.length === 151) {
                pokemons.sort((a, b) => a.id - b.id); // Ordena los Pokémon por ID
                pokemons.forEach(poke => mostrarPokemon(poke));
            }
        }));
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) =>
        `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');
    
    let pokeId = poke.id.toString();
    console.log(`Valor inicial de poke.id: ${poke.id}`);
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }
    console.log(`Valor final de pokeId: ${pokeId}`);

    let div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemos-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stats">${poke.height}m</p>
                <p class="stats">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listarPokemon.append(div);
}


botonesHearder.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listarPokemon.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }


            })
    }
}));


