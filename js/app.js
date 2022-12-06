//DECLARACIONES

//array de productos
let arrayCuadros = [];
let carro = [];
let busqueda = [];

let totalConEnvio = 0;

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

//VERIFICO SI HAY LOCAL STORAGE PARA CARGAR CARRO GUARDADO
if (localStorage.getItem("carro") === null) {
} else {
  carro = JSON.parse(localStorage.getItem("carro"));
}

// FUNCIONA ABRIR EL CARRO
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
        <div class="overlay" data-id="${cuadro.id}">
        <a href="#" class="iconImg" data-id="${cuadro.id}"><i class="fa-solid fa-arrow-up-right-from-square" data-id="${cuadro.id}"></a></i>
        </div>
        </div>
        <p class="prodTit">${cuadro.titulo}</p>
        <div>$${cuadro.precio}</div>
        <button class="agregarCarro" data-id="${cuadro.id}">Agregar al carro</button> <button class="verProd" data-id="${cuadro.id}">Ver Cuadro</button>
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

  const verProductoOverlay = document.querySelectorAll(".overlay");
  verProductoOverlay.forEach((button) => {
    button.addEventListener("click", verProductoSolo);
  });
  const verProductoIconImg = document.querySelectorAll(".iconImg");
  verProductoIconImg.forEach((button) => {
    button.addEventListener("click", verProductoSolo);
  });
};

// CARGA PRODUCTOS EN TIENDA DESPUES DE FILTRAR
const cargarProductoBuscadoEnTienda = () => {
  listadoTienda.innerHTML = "";
  busqueda.forEach((cuadro) => {
    const cuadroCreado = document.createElement("div");
    cuadroCreado.classList.add("cuadroListado");
    cuadroCreado.setAttribute("data-id", cuadro.id);
    cuadroCreado.innerHTML = `
    <div class="imgHoverIcon"> <img src="../images/${cuadro.img}" alt="${cuadro.titulo}">
    <div class="overlay" data-id="${cuadro.id}">
    <a href="#" class="iconImg" data-id="${cuadro.id}"><i class="fa-solid fa-arrow-up-right-from-square" data-id="${cuadro.id}"></a></i>
    </div>
    </div>
    <p class="prodTit">${cuadro.titulo}</p>
    <div>$${cuadro.precio}</div>
    <button class="agregarCarro" data-id="${cuadro.id}">Agregar al carro</button> <button class="verProd" data-id="${cuadro.id}">Ver Cuadro</button>
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
  const verProductoOverlay = document.querySelectorAll(".overlay");
  verProductoOverlay.forEach((button) => {
    button.addEventListener("click", verProductoSolo);
  });
  const verProductoIconImg = document.querySelectorAll(".iconImg");
  verProductoIconImg.forEach((button) => {
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

//FN QUE LLEVA A PAGINA DE PRODUCTO INDIVIDUAL
const verProductoSolo = (e) => {
  const idCuadro = e.target.getAttribute("data-id");
  console.log(e);
  console.log(idCuadro);
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
        <img class="img-fluid imgCarro" data-id="${cuadro.id}"
        src="../images/${cuadro.img}"
            alt="${cuadro.titulo}">
    </div>
    <div class="col-2 bg-primary text-light justify-content-around d-flex flex-column">
        
        <div class="product-quantity m-0 p-0 h5">${cuadro.cantidad}</div>
        
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

  const verProductoImgCarro = document.querySelectorAll(".imgCarro");
  verProductoImgCarro.forEach((button) => {
    button.addEventListener("click", verProductoSolo);
  });

  const removerCuadro = document.querySelectorAll(".remover");
  removerCuadro.forEach((button) => {
    button.addEventListener("click", eliminarCuadroCarro);
  });

  if (carro.length === 0) {
    cacularTotal(0);
  } else {
    const preciosCuadrosCarro = document.querySelectorAll(
      ".product-price-total"
    );
    preciosCuadrosCarro.forEach((button) => {
      let precioInner = Number(button.innerHTML);

      precioCuadrosTotal = precioCuadrosTotal + precioInner;
      cacularTotal(precioCuadrosTotal);

      /*  console.log(finalizarCompra); */
    });
  }
};

//BUSQUEDA POR TEXTO EN TITULO DE CUADRO
const buscarTitulo = () => {
  arrayCuadros.forEach((cuadro) => {
    let txtBusqueda = inputBuscar.value;
    busqueda = arrayCuadros.filter((cuadro) =>
      cuadro.titulo.includes(txtBusqueda)
    );
  });
};

//FILTROS INDIVIDUALES
/* const buscarCategoria = () => {
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
}; */

// FUNCION PARA BUSCAR CON TODOS LOS FILTRO DE LA TIENDA
const buscarCompleto = () => {
  arrayCuadros.forEach((cuadro) => {
    let catBusqueda = selectCategoria.value;
    let colorBusqueda = selectColor.value;
    let precioMax = rangoPrecioMax.value;
    let precioMin = rangoPrecioMin.value;
    if (
      catBusqueda === "Seleccionar Categoría" &&
      colorBusqueda === "Seleccionar Color de Marco"
    ) {
      console.log("sin cat y sin color");
      console.log(catBusqueda.value);
      console.log(selectColor.value);
      busqueda = arrayCuadros.filter(
        (producto) =>
          producto.precio >= precioMin && producto.precio <= precioMax
      );
    } else if (catBusqueda === "Seleccionar Categoría") {
      console.log("sin cat y CON color");
      console.log(catBusqueda.value);
      console.log(selectColor.value);
      busqueda = arrayCuadros.filter(
        (producto) =>
          producto.precio >= precioMin &&
          producto.precio <= precioMax &&
          producto.colorMarco.includes(colorBusqueda)
      );
    } else if (colorBusqueda === "Seleccionar Color de Marco") {
      console.log("CON cat y sin color");
      console.log(catBusqueda.value);
      console.log(selectColor.value);
      busqueda = arrayCuadros.filter(
        (producto) =>
          producto.precio >= precioMin &&
          producto.precio <= precioMax &&
          producto.categoria === catBusqueda
      );
    } else {
      console.log("con cat y con color");
      console.log(catBusqueda.value);
      console.log(selectColor.value);
      busqueda = arrayCuadros.filter(
        (producto) =>
          producto.precio >= precioMin &&
          producto.precio <= precioMax &&
          producto.categoria === catBusqueda &&
          producto.colorMarco.includes(colorBusqueda)
      );
    }
  });
};

const cacularTotal = (precioCuadrosTotal) => {
  if (carro.length === 0) {
    fijoCarro.innerHTML = ` <div class="text-light h6 text-left mx-3">Total: <span class="text-success"
  id="sidecart-total-products">$ 0</span></div>
<div class="text-light h6 text-left mx-3">Envio: <span class="text-success" id="sidecart-flete">$
  250</span>
(Precio Fijo)</div>
<div class="text-light h5 text-left mx-3">Valor Final: <span class="text-success" id="sidecart-total">
  $ 0</span></div>
`;
  } else {
    totalConEnvio = precioCuadrosTotal + 250;
    fijoCarro.innerHTML = ` <div class="text-light h6 text-left mx-3">Total: <span class="text-success"
  id="sidecart-total-products">$ ${precioCuadrosTotal}</span></div>
<div class="text-light h6 text-left mx-3">Envio: <span class="text-success" id="sidecart-flete">$
  250</span>
(Precio Fijo)</div>
<div class="text-light h5 text-left mx-3">Valor Final: <span class="text-success" id="sidecart-total">
  $${precioCuadrosTotal + 250}</span></div>
`;
  }

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

            <p class="descProducto">${cuadro.descripcion}
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

                    <p> </p>
                </div>
            </section>
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
  if (carro.length === 0) {
    Swal.fire(
      "El carro está vacío",
      "Te Invitamos a visitar nuestra tienda y elegir algunos productos",
      "error"
    );
  } else {
    Swal.fire(
      "Compra realizada correctamente",
      "Total de la compra: " + totalConEnvio,
      "success"
    );
  }
};

//EVENTLISTENERS

btnToggler.addEventListener("click", toggleCart);
btnToggler2.addEventListener("click", toggleCart);
btnBuscar.addEventListener("click", buscarTitulo);
btnBuscar.addEventListener("click", cargarProductoBuscadoEnTienda);
inputBuscar.addEventListener("keypress", buscarTitulo);
inputBuscar.addEventListener("keypress", cargarProductoBuscadoEnTienda);
if (filtros) {
  /* selectCategoria.addEventListener("change", buscarCategoria); */
  selectCategoria.addEventListener("change", buscarCompleto);
  selectCategoria.addEventListener("change", cargarProductoBuscadoEnTienda);
  /* selectColor.addEventListener("change", buscarColor); */
  selectColor.addEventListener("change", buscarCompleto);
  selectColor.addEventListener("change", cargarProductoBuscadoEnTienda);
  /*  rangoPrecioMax.addEventListener("change", buscarPrecio); */
  rangoPrecioMax.addEventListener("change", buscarCompleto);
  rangoPrecioMax.addEventListener("change", cargarProductoBuscadoEnTienda);
  /* rangoPrecioMin.addEventListener("change", buscarPrecio); */
  rangoPrecioMin.addEventListener("change", buscarCompleto);
  rangoPrecioMin.addEventListener("change", cargarProductoBuscadoEnTienda);
}

fetch("../json/data.json")
  .then((response) => response.json())
  .then((data) => {
    arrayCuadros = data;

    if (wrapperTienda) {
      cargarProductoEnTienda();
    }
    mostrarCarro();
    if (productoSolo) {
      cargoProductoSolo();
    }
  });

finalizarCompra.addEventListener("click", finalizaCompra);
