// PROYECTO FINAL

/*
Para poder llevar acabo el la siguiente aplicacion
se utilizaron los metodos

forEach
closest
map
push
trim
replace
add
splice
onload

Asi tambien, jQuery y Local Storage
*/ 

/* Clase constructora */

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

// ARRAYS
const productos = [];
let carrito = [];

// Creamos produtos

const toal = new Producto(1, "Toallita", 300, "Media/toall2.jpeg");
const prot = new Producto(2, "Protector diario", 240, "Media/prot2.jpeg");
const copa = new Producto(3, "Copa menstrual", 650, "Media/toall2.jpeg");

// Pusheamos produtos a ARRAY

productos.push(toal);
productos.push(prot);
productos.push(copa);

// Creamos CARDS desde ARRAY

const cardConten = document.querySelector(".main__cardConten")

function crearCards() {
    for (const producto of productos) {
        $(cardConten).append(`
        <article class="card col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 main__card main__cardsh main_cardPadd" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top border border-dark border-1 rounded-1 main__card__img"
                alt="${producto.nombre}">
            <div class="card-body text-center">
                <h5 class="card-title text-capitalize main__ff3 fst-italic fw-bold">${producto.nombre}</h5>
                <p class="card-text text-capitalize main__ff3 fst-italic fw-bold">$${producto.precio}</p>
                <button type="button" class="btn btn-primary btn-sm" id="cardBtn">Agregar al carrito</button>
            </div>
        </article>
        `);
    }
}
crearCards();

// Buscamos target con evento click y asi poder agregar al carrito cada producto

const btnCardClick = document.querySelectorAll("#cardBtn");

btnCardClick.forEach(boton => {
    boton.addEventListener("click", agregarAlCarro)
});


function agregarAlCarro(e) {
    //detectamos el boton y traemos la informacion de cada elemento de la card del mismo
    const boton = e.target
    const prod = boton.closest(".card-body")
    const prodTitle = prod.querySelector(".card-title").textContent;
    const prodPrecio = prod.querySelector(".card-text").textContent
    //creamos un nuevo objeto para agregar al carrito con cantidad
    const prodNuevo ={nombre: prodTitle, precio: prodPrecio, cantidad: 1}
    añadirProducto(prodNuevo)
}

const bodyTabla = document.querySelector(".tablaBody")

//Enviamos el nuevo producto al carrito
function añadirProducto(prodNuevo) {
    const inputProd = bodyTabla.getElementsByClassName("inputTabla");
    //Iteramos para crear un solo elemento por producto, modificando cantidad con cada click
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre.trim() === prodNuevo.nombre.trim()) {
            carrito[i].cantidad ++;
            const inputCantidad = inputProd[i]
            inputCantidad.value++;
            // Calculamos total carrito
            totalCarrito()
            return null;
        }
    }
    carrito.push(prodNuevo)
    convertirCarrito()
}

//Enviamos el producto al modal

function convertirCarrito(){
    bodyTabla.innerHTML = "";
    //Creamos tabla para ingresar al Modal
    carrito.map(prod => {
        const filaTabla = document.createElement("tr");
        filaTabla.classList.add("prodCarrito");
        const datos = `<th scope="row">-</th>
                            <td class="table__productos text-start">
                                <h6 class="title">${prod.nombre}</h6>
                            </td>
                            <td lass="table__precio"><p>${prod.precio}</p></td>
                            <td lass="table__cantidad">
                                <input class="inputTabla text-center col-1" type="number" min="1" value="${prod.cantidad}">
                                <button class="delete btn btn-danger btn-sm">x</button>
                            </td>`
        filaTabla.innerHTML = datos;
        bodyTabla.appendChild(filaTabla);

        filaTabla.querySelector(".delete").addEventListener("click", quitarProdCarrito);
        filaTabla.querySelector(".inputTabla").addEventListener("change", agregarCantidad)
    })
    // Calculamos total carrito
    totalCarrito()
}

// Funcion para calcular monto total del carrito
const totalCarritoProd = document.querySelector(".carritoTotalItem");
function totalCarrito() {
    let total = 0;
    // Indicamos que por cada elemento del carrito multiplique el precio por la cantidad
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ""))
        total = total + precio*item.cantidad;
    })
    totalCarritoProd.innerHTML = `Total $${total}`
    // agregamos carrito al LS
    agregarALS()
}

// Funcion para quitar producto del carrito con boton delete

function quitarProdCarrito(e) {
    const botonBorrar = e.target
    const fila = botonBorrar.closest(".prodCarrito");
    const nombre = fila.querySelector(".title").textContent;
    //recorremos carrito para elm
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre.trim() === nombre.trim()) {
            //Eliminamos un solo elemento del carrito
            carrito.splice(i, 1)
        } 
    }
    fila.remove()
    //Volvemos a calcular precio final
    totalCarrito()
} 

// Funcion para agregar cantidad en carrito con input

function agregarCantidad(e) {  
    const inputSumado = e.target 
    const fila = inputSumado.closest(".prodCarrito")
    const nombre = fila.querySelector(".title").textContent;
    carrito.forEach(item => {
        if (item.nombre.trim() === nombre) {
            inputSumado.value < 1 ? (inputSumado.value = 1) : inputSumado.value;
            item.cantidad = inputSumado.value;
            totalCarrito()
        }
    })
}

// Funcion para enviar carrito al LS

function agregarALS() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// verificamos si hay datos en el LS para ingresar
// desde el inicio los productos al carrito 

window.onload = function () {
    const LS = JSON.parse(localStorage.getItem("carrito"))
    if (LS) {
        carrito = LS;
        convertirCarrito()
    }
}


// Funcion para eliminar todo el carrito

$("#btnBorra").click(() => { 
    localStorage.clear();
    carrito = [];
    bodyTabla.innerHTML = "";
    totalCarritoProd.innerHTML = `Total $0`
});



