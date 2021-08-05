const pokemonList = document.querySelector('.pokemon--list');
const btn = document.querySelector('.btn-load-more');

const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');
const app = document.querySelector('.app');


let offset = 0;
let limit = 20;


const loadPokemones = offset => {

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)

        .then(res => {
            return res.json();
        }).then((res) => {
            let results = res.results;
            // console.log(results);

            let html = '';

            results.forEach((pokemon) => {

                html += `
             <li class="list__item gotoPokemon" data-url="${pokemon.url}">
              <img src="${getImageURL(pokemon.url)}" alt"${pokemon.name}"/>
                   <p>Nombre: ${pokemon.name.toUpperCase()}</p>
              </li>
              `;
            });

            pokemonList.innerHTML += html;
            const btnPokemon = document.querySelectorAll('.gotoPokemon');

            btnPokemon.forEach(btn => {
                btn.addEventListener('click', () => showPokemon(btn));
            });


        })
        .catch(err => {
            console.error(err);
        });

};

const showPokemon = btn => {
    const url = btn.dataset.url;
    console.log(url);

    axios.get(url)
    .then(res => {
        console.log(res);
        
        const pokemon = res.data;

        const modalImg = document.querySelector('.modal__img');
        const modalNamePokemon = document.querySelector('.modal__name-pokemon');

        modalImg.src = pokemon.sprites.front_default;
        modalNamePokemon.innerText = pokemon.name;

        modal.style.display = 'block';
        backdrop.style.display = 'block';

        app.classList.add('blur');

        })
    .catch(err => console.error(err));
};

const getImageURL = url => {
    let urlArray = url.split('/');
    let imgId = urlArray[urlArray.length - 2];

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${imgId}.png`;
};


backdrop.addEventListener('click', () => {
    app.classList.remove('blur');
    modal.style.display = 'none';
    backdrop.style.display = 'none';
})

btn.addEventListener('click', () => {
    offset += limit;
    loadPokemones(offset);
})

window.addEventListener('DOMContentLoaded', () => {
    loadPokemones(offset);
});
