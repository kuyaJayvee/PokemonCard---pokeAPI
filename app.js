const colors = {
	fire: "#FDDFDF",
	grass: "#DEFDE0",
	electric: "#FCF7DE",
	water: "#DEF3FD",
	ground: "#F4E7DA",
	rock: "#D5D5D4",
	fairy: "#FCEAFF",
	poison: "#98D7A5",
	bug: "#F8D5A3",
	dragon: "#97B3E6",
	psychic: "#EAEDA1",
	flying: "#F5F5F5",
	fighting: "#E6E0D4",
	normal: "#F5F5F5"
} 

const main_type = Object.keys(colors);


function getPokemon() {
   
   const promise = [];

    for(let i = 1; i <= 150; i++) {

   	promise.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response)=>response.json()))
   }

   Promise.all(promise)
   .then((data)=> {
   const pokemon = data.map((poke) => {
   		return({
   			id: poke.id,
   			name: poke.name,
   			type: poke.types.map((poketype) => poketype.type.name),
   			image: poke.sprites.other['official-artwork'].front_default
   		})
   	})
   displayPokemon(pokemon)
   })
   .catch((err) => console.log(err))}

function displayPokemon(pokemon) {
    
    pokemon.forEach((poke) => {
    	const pokeId = poke.id.toString().padStart(3, '0')
        const pokeName = poke.name[0].toUpperCase() + poke.name.slice(1)
    	const type = main_type.find((type) => {
    		return poke.type.indexOf(type) > -1
    	})
       const color = colors[type]
       document.querySelector('.container').innerHTML +=  `<div class="card" id="card" style="background-color:${color}">
            <img src=${poke.image} width="150" height="150" class="poke-img" id="img">
            <p class="poke-num">No. <span id="num">#${pokeId}</span></p>
            <p class="poke-name">Name: <span id="name">${pokeName}</span></p>
            <p class="poke-type">Type: <span id="types">${poke.type.join(" ")}</span></p>
        </div>`
           
    })
}

getPokemon()