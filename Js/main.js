// PROYECTO FINAL


/* crear clase constructora */

class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

/*
ACLARACION
Dado que no encontré informacion sobre la cantidad de PARAMETROS
que se pueden agregar en un constructor (tenia la idea 
de que maximo eran 3 pero no encontré info que lo confirmara)
ingresé los 4 que necesito(ID/NOMBRE/PRECIO/IMAGEN) para crear cada 
producto con NEW, SI NO LO REALIZABA ASI ME INDICA QUE NO ESTA 
DEFINIDO AL MOMENTO DE CREARLOS PARA PUSHEARLOS AL ARRAY
*/

const productos = [];

// Creamos produtos

const toal = new Producto(1, "Toallita", 300, "Media/toall2.jpeg");
const prot = new Producto(2, "Protector diario", 240, "Media/prot2.jpeg");
const copa = new Producto(3, "Copa menstrual", 650, "Media/toallitalinda.jpeg");

// Pusheamos produtos a ARRAY

productos.push(toal);
productos.push(prot);
productos.push(copa);

console.log(productos);

// Creamos CARDS desde ARRAY

const cardConten = document.querySelector(".main__cardConten")

function crearCards() {
    for (const producto of productos) {
        $(cardConten).append(`
        <article class="card col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 main__card main__cardsh main_cardPadd" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top border border-dark border-1 rounded-1 main__card__img"
                alt="${producto.nombre}">
            <div class="card-body text-center">
                <p class="card-text text-capitalize main__ff3 fst-italic fw-bold">${producto.nombre}</p>
                <p class="card-text text-capitalize main__ff3 fst-italic fw-bold">$${producto.precio}</p>
                <button type="button" class="btn btn-primary btn-sm" id="cardBtn">Agregar al carrito</button>
            </div>
        </article>
        `);
    }
}

crearCards();

