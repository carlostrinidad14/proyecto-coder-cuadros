//DECLARACIONES

//array de productos
const arrayCuadros = [
  cuadro1,
  cuadro2,
  cuadro3,
  cuadro4,
  cuadro5,
  cuadro6,
  cuadro7,
  cuadro8,
  cuadro9,
  cuadro10,
  cuadro11,
  cuadro12,
];
let carro = [];
let busqueda = [];

//QUERY DE ELEMENTOS
const btnToggler = document.querySelector(".fa-cart-shopping");
const btnToggler2 = document.querySelector(".toggleCart");
const listadoTienda = document.querySelector("#tiendaContenido");
const ulCarro = document.querySelector(".ulCarro");
const btnBuscar = document.querySelector("#btnBuscar");
const inputBuscar = document.querySelector("#inputBuscar");
const filtros = document.querySelector("#filtros");
const wrapperTienda = document.querySelector("#wrapperTienda");
const selectCategoria = document.querySelector("#selectCategoria");
const selectColor = document.querySelector("#selectColor");
const rangoPrecioMax = document.querySelector("#rangoPrecioMax");
const rangoPrecioMin = document.querySelector("#rangoPrecioMin");
const productoSolo = document.querySelector("#productoSolo");
const fijoCarro = document.querySelector("#fijoCarro");
const finalizarCompra = document.querySelector("#finalizarCompra");

//FUNCIONES

if (localStorage.getItem("carro") === null) {
  //...
} else {
  carro = JSON.parse(localStorage.getItem("carro"));
  console.log(carro);
}

const toggleCart = () => {
  document.querySelector(".sidecart").classList.toggle("open-cart");
};

//CARGA DE ELEMENTOS EN TIENDA
const cargarProductoEnTienda = () => {
  arrayCuadros.forEach((cuadro) => {
    const cuadroCreado = document.createElement("div");
    cuadroCreado.classList.add("cuadroListado");
    cuadroCreado.setAttribute("data-id", cuadro.id);
    cuadroCreado.innerHTML = `
        <div class="imgHoverIcon"> <img src="../images/${cuadro.img}" alt="${cuadro.titulo}">
        <div class="overlay">
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </div>
        </div>
        <p class="prodTit">${cuadro.titulo}</p>
        <div>$${cuadro.precio}</div>
        <button class="agregarCarro" data-id="${cuadro.id}">Agregar al carro</button> <button class="verProd" data-id="${cuadro.id}">verProd</button>
        `;
    listadoTienda.prepend(cuadroCreado);
  });
  const botonCuadro = document.querySelectorAll(".agregarCarro");
  botonCuadro.forEach((button) => {
    button.addEventListener("click", agregarProductoAlCarro);
  });

  const verProducto = document.querySelectorAll(".verProd");
  verProducto.forEach((button) => {
    button.addEventListener("click", verProductoSolo);
  });
};

//AGREGO PRODUCTOS AL CARRO
const agregarProductoAlCarro = (e) => {
  const idCuadro = e.target.getAttribute("data-id");
  const cuadroElegido = arrayCuadros.find((cuadro) => cuadro.id == idCuadro);

  if (!cuadroElegido.cantidad) {
    cuadroElegido.cantidad = 1;
  } else {
    cuadroElegido.cantidad += 1;
  }
  carro = carro.filter((cuadro) => cuadro.id != idCuadro);
  console.log(cuadroElegido);
  carro.push(cuadroElegido);
  Swal.fire("Producto  agregado correctamente al carrito", "", "success");
  const carroJson = JSON.stringify(carro);
  localStorage.setItem("carro", carroJson);
  mostrarCarro();
};

const verProductoSolo = (e) => {
  const idCuadro = e.target.getAttribute("data-id");

  localStorage.setItem("idCuadro", idCuadro);
  window.location.href = "producto.html";
};

//ELIMINO CUADROS QUE ESTAN EN EL CARRO
const eliminarCuadroCarro = (e) => {
  const idCuadroElegido = e.target.closest(".remover").getAttribute("data-id");
  carro = carro.filter((cuadro) => cuadro.id != idCuadroElegido);
  const carroJson = JSON.stringify(carro);
  localStorage.setItem("carro", carroJson);
  mostrarCarro();
};

//MUESTRO ARRAY CARRO EN SIDEBAR
const mostrarCarro = () => {
  let precioCuadrosTotal = 0;
  ulCarro.innerHTML = "";
  carro.forEach((cuadro) => {
    const cuadroEnCarro = document.createElement("div");
    cuadroEnCarro.classList.add("nav-link");
    cuadroEnCarro.classList.add("d-flex");
    cuadroEnCarro.classList.add("flex-wrap");
    cuadroEnCarro.classList.add("flex-row");
    cuadroEnCarro.setAttribute("data-id", cuadro.id);
    cuadroEnCarro.innerHTML = `
    <div class="col-12 text-light h5 text-center p-0">${cuadro.titulo}</div>
    <div class="col-4 p-0">
        <img class="img-fluid"
        src="../images/${cuadro.img}"
            alt="">
    </div>
    <div class="col-2 bg-primary text-light justify-content-around d-flex flex-column">
        <i class="fas fa-plus"></i>
        <div class="product-quantity m-0 p-0 h5">${cuadro.cantidad}</div>
        <i class="fas fa-minus"></i>
    </div>
    <div class="sidecart-price pl-0 col-6 bg-primary text-right d-flex flex-wrap text-light">
        <div class="text-right text-dark d-flex flex-row justify-content-end align-items-center h6 m-0 p-0 remover"  data-id="${
          cuadro.id
        }">
            Remover <span class="h5 ml-2 m-0 p-0 "><b>X</b></span></div>
        <div class="product-price">$${cuadro.precio}</div>
        <div class=""><span class="text-dark"><b>Total</b></span>$ <span class="product-price-total">${
          cuadro.precio * cuadro.cantidad
        }
                </span></div>
    </div>
            `;

    ulCarro.append(cuadroEnCarro);
  });

  const removerCuadro = document.querySelectorAll(".remover");
  removerCuadro.forEach((button) => {
    button.addEventListener("click", eliminarCuadroCarro);
  });

  const preciosCuadrosCarro = document.querySelectorAll(".product-price-total");
  preciosCuadrosCarro.forEach((button) => {
    let precioInner = Number(button.innerHTML);

    precioCuadrosTotal = precioCuadrosTotal + precioInner;
    cacularTotal(precioCuadrosTotal);

    console.log(finalizarCompra);
  });
};

//BUSQUEDA POR TEXTO EN TITULO DE CUADRO

const buscarTitulo = () => {
  arrayCuadros.forEach((cuadro) => {
    let txtBusqueda = inputBuscar.value;
    busqueda = arrayCuadros.filter((cuadro) =>
      cuadro.titulo.includes(txtBusqueda)
    );
    console.log(busqueda);
  });
};

const buscarCategoria = () => {
  arrayCuadros.forEach((cuadro) => {
    let catBusqueda = selectCategoria.value;
    busqueda = arrayCuadros.filter(
      (producto) => producto.categoria === catBusqueda
    );
  });
};

const buscarColor = () => {
  arrayCuadros.forEach((cuadro) => {
    let colorBusqueda = selectColor.value;
    console.log(colorBusqueda);
    busqueda = arrayCuadros.filter((producto) =>
      producto.colorMarco.includes(colorBusqueda)
    );
  });
};

const buscarPrecio = () => {
  arrayCuadros.forEach((cuadro) => {
    let precioMax = rangoPrecioMax.value;
    let precioMin = rangoPrecioMin.value;
    console.log(precioMax);
    console.log(precioMin);
    busqueda = arrayCuadros.filter(
      (producto) => producto.precio >= precioMin && producto.precio <= precioMax
    );
  });
};

const cargarProductoBuscadoEnTienda = () => {
  listadoTienda.innerHTML = "";
  busqueda.forEach((cuadro) => {
    const cuadroCreado = document.createElement("div");
    cuadroCreado.classList.add("cuadroListado");
    cuadroCreado.setAttribute("data-id", cuadro.id);
    cuadroCreado.innerHTML = `
    <div class="imgHoverIcon"> <img src="../images/${cuadro.img}" alt="${cuadro.titulo}">
    <div class="overlay">
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
    </div>
    </div>
    <p class="prodTit">${cuadro.titulo}</p>
    <div>$${cuadro.precio}</div>
    <button class="agregarCarro" data-id="${cuadro.id}">Agregar al carro</button> <button class="verProd" data-id="${cuadro.id}">Ver Producto</button>
    `;
    listadoTienda.prepend(cuadroCreado);
  });
  const botonCuadro = document.querySelectorAll(".agregarCarro");
  botonCuadro.forEach((button) => {
    button.addEventListener("click", agregarProductoAlCarro);
  });
  const verProducto = document.querySelectorAll(".verProd");
  verProducto.forEach((button) => {
    button.addEventListener("click", verProductoSolo);
  });
};

const cacularTotal = (precioCuadrosTotal) => {
  totalConEnvio = precioCuadrosTotal + 250;
  fijoCarro.innerHTML = ` <div class="text-light h6 text-left mx-3">Total: <span class="text-success"
  id="sidecart-total-products">$ ${precioCuadrosTotal}</span></div>
<div class="text-light h6 text-left mx-3">Envio: <span class="text-success" id="sidecart-flete">$
  250</span>
(Precio Fijo)</div>
<div class="text-light h5 text-left mx-3">Valor Final: <span class="text-success" id="sidecart-total">
  $${precioCuadrosTotal + 250}</span></div>
`;

  return totalConEnvio;
};

//FUNCION PARA CARGAR PRODUCTO EN PAGINA PRODUCTO.HTML

const cargoProductoSolo = () => {
  productoSolo.innerHTML = "";
  arrayCuadros.forEach((cuadro) => {
    const idGuardada = localStorage.getItem("idCuadro");
    if (cuadro.id == idGuardada) {
      const cuadroCreado = document.createElement("div");
      cuadroCreado.classList.add("cuadroListado");
      cuadroCreado.classList.add("flexH");
      cuadroCreado.setAttribute("data-id", cuadro.id);
      cuadroCreado.innerHTML = `
        <div><img src="../images/${cuadro.img}" alt="Cuadro con ciudades" height="400"></div>
        <div id="infoProducto">
            <h2>${cuadro.titulo} </h2>
            <p class="precio">$${cuadro.precio}</p>
            <p class="categorias">${cuadro.colorMarco}</p>

            <p class="descProducto">Cuadro con nombres de ciudades a eleccion.
            </p>
            <section class="tamaniosInfoProd">
                <div id="tamaniosProd">
                    <h5>Tamaños Disponibles</h5>
                    <ul>
                        <li>
                            22x32 cm.
                        </li>
                        <li>
                            32x46 cm.
                        </li>
                        <li>
                            52x72 cm.
                        </li>
                        <li>
                            72x102 cm.
                        </li>
                        <li>
                            102x152 cm.
                        </li>
                    </ul>
                </div>
                <div id="infoProd">
                    <h5> Información del Producto</h5>

                    <p> ${cuadro.descripcion}</p>
                </div>
            </section>
            <p>Agregar a Favoritos <i class="fa-solid fa-heart fravorito"></i></p>
            <input type="text" placeholder="Cantidad">
            <button class="agregarCarro" data-id="${cuadro.id}">Agregar al carro</button>
        </div>
          `;
      productoSolo.prepend(cuadroCreado);
    }
  });
  const botonCuadro = document.querySelectorAll(".agregarCarro");
  botonCuadro.forEach((button) => {
    button.addEventListener("click", agregarProductoAlCarro);
  });
};

//Finalizar Compra

const finalizaCompra = () => {
  Swal.fire(
    "Compra realizada correctamente",
    "Total de la compra: " + totalConEnvio,
    "success"
  );
};

//EVENTLISTENERS

btnToggler.addEventListener("click", toggleCart);
btnToggler2.addEventListener("click", toggleCart);
btnBuscar.addEventListener("click", buscarTitulo);
btnBuscar.addEventListener("click", cargarProductoBuscadoEnTienda);
inputBuscar.addEventListener("keypress", buscarTitulo);
inputBuscar.addEventListener("keypress", cargarProductoBuscadoEnTienda);
if (filtros) {
  selectCategoria.addEventListener("change", buscarCategoria);
  selectCategoria.addEventListener("change", cargarProductoBuscadoEnTienda);
  selectColor.addEventListener("change", buscarColor);
  selectColor.addEventListener("change", cargarProductoBuscadoEnTienda);
  rangoPrecioMax.addEventListener("change", buscarPrecio);
  rangoPrecioMax.addEventListener("change", cargarProductoBuscadoEnTienda);
  rangoPrecioMin.addEventListener("change", buscarPrecio);
  rangoPrecioMin.addEventListener("change", cargarProductoBuscadoEnTienda);
}

if (wrapperTienda) {
  cargarProductoEnTienda();
}
mostrarCarro();
if (productoSolo) {
  cargoProductoSolo();
}

finalizarCompra.addEventListener("click", finalizaCompra);
