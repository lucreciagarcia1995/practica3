const inputNombre = document.getElementById("nombre");
const botonBuscar = document.getElementById("botonBuscar");
const color = document.getElementById("color"); 
const genero = document.getElementById("genero");
const masa = document.getElementById("masa");
const piel = document.getElementById("piel");
const ojos = document.getElementById("ojos");
const sonido = document.getElementById("sonido"); 
const listaItems = document.getElementById("listaItems"); 
const listaPeliculas = document.getElementById("listaPeliculas"); 

async function buscarInfoStarWars() {

    color.innerText = "";
    genero.innerText = "";
    masa.innerText = "";
    piel.innerText = "";
    ojos.innerText = "";
    sonido.innerText = "";
    listaItems.innerHTML = "";
    listaPeliculas.innerHTML = "";

    const nombreBuscado = inputNombre.value.trim().toLowerCase();
    const respuesta = await fetch("https://swapi.dev/api/people/?search=" + nombreBuscado);
    const data = await respuesta.json();

    const personaje = data.results[0];

    if (!personaje) {
        color.innerText = "Personaje no encontrado";
        return;
    }

   
    color.innerText = personaje.hair_color;
    genero.innerText = personaje.gender;
    masa.innerText = personaje.mass;
    piel.innerText = personaje.skin_color;
    ojos.innerText = personaje.eye_color;
    sonido.innerText = personaje.birth_year;


    for (let url of personaje.starships) {
        const resNave = await fetch(url);
        const dataNave = await resNave.json();
        const item = document.createElement("li");
        item.innerText = dataNave.name;
        listaItems.appendChild(item);
    }


    for (let url of personaje.films) {
        const resPeli = await fetch(url);
        const dataPeli = await resPeli.json();
        const item = document.createElement("li");
        item.innerText = dataPeli.title;
        listaPeliculas.appendChild(item);
    }
}

botonBuscar.addEventListener("click", e => {
    e.preventDefault();
    buscarInfoStarWars();
});