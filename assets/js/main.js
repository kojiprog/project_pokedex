const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limite = 10;
let offset = 0;
const maxRecords = 151


function loadPokemonItens(offset, limite) {
  pokeApi.getPokemons(offset, limite).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
    <li class="pokemon ${pokemon.type}" >
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    
    <div class="detail">
    <ol class="types">
    ${pokemon.types
      .map(
        (type) => `<li class="type ${type}">${type}</li>`
        )
        .join("")}
        </ol>
        
        <img src="${pokemon.photo}" alt="${pokemon.name}-card">
        </div>
        </li>
        `).join('');
      
      pokemonList.innerHTML += newHtml;
      })
}

loadPokemonItens(offset, limite);

loadMoreButton.addEventListener("click", () => {
  offset += limite

  const qtdRecordsNextPage = offset + limite

  if (qtdRecordsNextPage >= maxRecords) {
    const newLimit = maxRecords - offset ;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else{
    loadPokemonItens(offset, limite);
  }

});
