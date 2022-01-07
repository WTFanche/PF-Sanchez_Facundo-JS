// PROYECTO FINAL

// ARRAY PRODUCTOS

/* crear clase constructora */

const productos = [{
        id: 1,
        nombre: "Toallita",
        precio: 300,
        imagen: "Media/toall2.jpeg"
    },
    {
        id: 2,
        nombre: "Protector diario",
        precio: 240,
        imagen: "Media/prot2.jpeg"
    },
    {
        id: 3,
        nombre: "Copa menstrual",
        precio: 650,
        imagen: "Media/toallita linda.jpg"
    }
];


/* CREAMOS CARDS CON AJAX desde JSON (manipulamos DOM) */

const URL = "../Json/productos.json";

$.ajax({
    method: "GET",
    dataType: "json",
    url: URL,
}).done((respuesta) => {
    respuesta.forEach((product) => {
        $(".main__cardConten").append(
            `<article class="card col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 main__card main__cardsh main_cardPadd" style="width: 18rem;">
                <img src="${product.imagen}" class="card-img-top border border-dark border-1 rounded-1 main__card__img"
                    alt="toallita">
                <div class="card-body text-center">
                    <p class="card-text text-capitalize main__ff3 fst-italic fw-bold">${product.nombre}</p>
                    <p class="card-text text-capitalize main__ff3 fw-bold">$${product.precio}</p>
                    <button type="button" class="btn btn-primary" id="btnCard${product.id}">Agregar al carrito</button>
                </div>
            </article>`
        );
    });
});

/* FILTRAMOS CARDS CON LABEL */

const input = document.querySelector("#nombreP");
const mostrar = document.querySelector(".main__cardConten")

$("#nombreP").keyup(() => {
    mostrar.innerHTML = "";
    const entrada = input.value.toLowerCase();
    for (let producto of productos) {
        let nombre = producto.nombre.toLowerCase();
        if (nombre.indexOf(entrada) !== -1) {
            mostrar.innerHTML += `
            <article class="card col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 main__card main__cardsh main_cardPadd" style="width: 18rem;">
                <img src="${producto.imagen}" class="card-img-top border border-dark border-1 rounded-1 main__card__img"
                    alt="toallita">
                <div class="card-body text-center">
                    <p class="card-text text-capitalize main__ff3 fst-italic fw-bold">${producto.nombre}</p>
                    <p class="card-text text-capitalize main__ff3 fw-bold">$${producto.precio}</p>
                    <button type="button" class="btn btn-primary" id="btnCard${producto.id}">Agregar al carrito</button>
                </div>
            </article>
            `
        }
    }
    if (mostrar.innerHTML === "") {
        mostrar.innerHTML += `<p class="text-center main__ff3 fst-italic fw-bold">No tenemos el producto que estas buscando.</p>`
    }
});


const btn1 = document.querySelector("#btnCard1");
const btn2 = document.querySelector("#btnCard2");
const btn3 = document.querySelector("#btnCard3");
console.log(btn1);
console.log(btn2);
console.log(btn3);

$("#btnCard1").click(() => {
    console.log("Pusheo toallita al carrito");
});

/* btn.addEventListener("click", prueba)

function prueba() {
	console.log("Hiciste click");
} */






/* 
//Agregamos al cartito

const carrito = [];

// agregar carrito a LS

function agregarALS(carro) {
    localStorage.setItem("Carrito", JSON.stringify(carro))
}

$("#btnCard1").click(() => {
    //push de producto al ARRAY carrito
    console.log("Pusheo toallita al carrito");
    carrito.push({
        id: 1,
        nombre: "Toallita",
        precio: 300
    })
    console.log(carrito);
    //agregao carrito a LS
    agregarALS(carrito);
});

$("#btnCard2").click(() => {
    //push de producto al ARRAY carrito
    console.log("Pusheo protector al carrito");
    carrito.push({
        id: 2,
        nombre: "Protector diario",
        precio: 240
    })
    console.log(carrito);
    //agregao carrito a LS
    agregarALS(carrito);
});

$("#btnCard3").click(() => {
    //push de producto al ARRAY carrito
    console.log("Pusheo copa al carrito");
    carrito.push({
        id: 3,
        nombre: "Copa menstrual",
        precio: 650
    })
    console.log(carrito);
    //agregao carrito a LS
    agregarALS(carrito);
});

// Vemos pedido desde LS en modal

$("#verPedido").click(() => {
    const carroLS = localStorage.getItem("Carrito");
    const carroMod = JSON.parse(carroLS);
    console.log(carroMod);
    for (const producto of carroMod) {
        console.log(producto);
        $("#modalBody").append(`
      <p>${producto.nombre} ................  $${producto.precio}</p>
      `);
    }
    return carroMod;
});

//Borramos pedido

function borrarPedido() {
    localStorage.clear();
    const limpiarMod = document.querySelector("#modalBody")
    limpiarMod.innerHTML = ` `
};

const borrar = document.querySelector("#borrarPedido")
borrar.addEventListener("click", borrarPedido); 

------------------------------------

const btnAgregarTo = document.querySelector("#btnCard1")
const btnAgregarPr = document.querySelector("#btnCard2")
const btnAgregarCo = document.querySelector("#btnCard3")

btnAgregarTo.addEventListener("click", agregarCarritoTo)
btnAgregarPr.addEventListener("click", agregarCarritoPr)
btnAgregarCo.addEventListener("click", agregarCarritoCo)

const toJSON = JSON.stringify(productos[0])

function agregarCarritoTo() {
    localStorage.setItem("CarritoTo", toJSON)
}
const prJSON = JSON.stringify(productos[1])

function agregarCarritoPr() {
    localStorage.setItem("CarritoPr", prJSON)
}
const coJSON = JSON.stringify(productos[2])

function agregarCarritoCo() {
    localStorage.setItem("CarritoCo", coJSON)
}

const toGet = localStorage.getItem("CarritoTo")
const prGet = localStorage.getItem("CarritoPr")
const coGet = localStorage.getItem("CarritoCo")

const toLS = JSON.parse(toGet);
const prLS = JSON.parse(prGet);
const coLS = JSON.parse(coGet); */

/* Vemos pedido en Modal */

/* const btnVer = document.querySelector("#verPedido")
btnVer.addEventListener("click", mostrarCarrito)

const modal = document.querySelector("#modalBody") */


/* function mostrarCarrito() {
    modal.innerHTML = `
    <p>${toLS.nombre}                   $${toLS.precio}</p>

    <p>${prLS.nombre}                   $${prLS.precio}</p>

    <p>${coLS.nombre}                   $${coLS.precio}</p>

    <p>TOTAL                            $${toLS.precio + prLS.precio + coLS.precio}</p>
    `
}; */


/* Borramos pedido de Modal */

/* function borrarPedido() {
    localStorage.clear();
};

const borrar = document.querySelector("#borrarPedido")
borrar.addEventListener("click", borrarPedido)
 */