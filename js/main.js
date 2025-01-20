const listarPokemon = document.querySelector("#listarPokemon");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch (URL + i)
    .then((response) => response.json())
    .then((data => mostrarPokemon(data))) 

}
function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => 
    `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('')
   
    
    const div = document.createElement("div");
    div.classList.add("pokemon")
    div.innerHTML = `
    <p class="pokemon-id-back">#${poke.id}</p>
<div class="pokemon-imagen">
    <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}"
        alt="">
</div>
<div class="pokemon-info">
    <div class="nombre-contenedor">
        <p class="pokemon-id"># ${poke.id}</p>
        <h2 class="pokemos-nombre">
            ${poke.name}
        </h2>
    </div>
    <div class="pokemon-tipos">
        ${tipos}
    </div>
    <div class="pokemon-stats">
        <p class="stats">${poke.height}m</p>
        <p class="stats">${poke.weight}kg</p>
    </div>
</div>
</div> 
`
listarPokemon.append(div);

}



