//OBJETO PARA GUARDAR DATOS DE LA PERSONALIZACION DEL USUARIO
let cuadroPersonalizado = {
orientacion:"",
ancho:0, 
alto:0,
vidrio:"", 
tipoVidrio:"", 
colorMarco:"",
precio:0
}
//FUNCION PARA VERIFICAR ORIENTACION DEL MARCO
const funcionOrientacion = (orientacionMarco) => {
  while (orientacionMarco != "horizontal" && orientacionMarco != "vertical") {
    alert(
      "La orientacion deber ser: vertical u horizontal " + orientacionMarco
    );
    orientacionMarco = prompt(
      "Seleccione orientacion del Marco (vertical/horizontal)"
    ).toLowerCase();
  }
  cuadroPersonalizado.orientacion=orientacionMarco;
  return orientacionMarco;
};

//FUNCION DE MEDIDAS Y PRECIO DEL CUADRO
const funcionaMedidas = (orientacionMarco, anchoCuadro, altoCuadro) => {
  if (orientacionMarco == "horizontal" && anchoCuadro >= altoCuadro) {
    medidasCuadro = anchoCuadro + "X" + altoCuadro;
    precioCuadro = anchoCuadro * altoCuadro * 0.5;
    alert(
      "Haz seleccionado un cuadro horizontal, con las medidas: " +
        medidasCuadro +
        ". El precio del cuadro es: $" +
        precioCuadro
    );
  } else if (orientacionMarco == "vertical" && anchoCuadro <= altoCuadro) {
    medidasCuadro = anchoCuadro + "X" + altoCuadro;
    precioCuadro = anchoCuadro * altoCuadro * 0.5;
    alert(
      "Haz seleccionado un cuadro vertical, con las medidas: " +
        medidasCuadro +
        ". El precio del cuadro es: $" +
        precioCuadro
    );
  } else {
    alert(
      "Las medidas no son proporcionales a la orientacion elegida. Favor reiniciar la seleccion"
    );
  }
  cuadroPersonalizado.alto=altoCuadro;
  cuadroPersonalizado.ancho=anchoCuadro;
  return precioCuadro;
};

//FUNCION TIPO VIDRIO
const funcionVidrio = (tipoVidrio) => {
  while (tipoVidrio != "comun" && tipoVidrio != "antireflejo") {
    alert("El tipo de vidrio debe ser: comun/antireflejo " + tipoVidrio);
    tipoVidrio = prompt(
      "Ingrese tipo de vidrio (comun/antireflejo)"
    ).toLowerCase();
  }

  if (tipoVidrio == "comun") {
    precioVidrio = 50;
    alert(
      "Tipo de vidrio: " + tipoVidrio + " precio del vidrio: $" + precioVidrio
    );
  } else if (tipoVidrio == "antireflejo") {
    precioVidrio = 100;
    alert(
      "Tipo de vidrio: " + tipoVidrio + " precio del vidrio: $" + precioVidrio
    );
  }
  cuadroPersonalizado.tipoVidrio=tipoVidrio;
  return precioVidrio;
};

//FUNCION COLOR DEL MARCO>
const funcionColor = (colorMarco) => {
  while (
    colorMarco != "natural" &&
    colorMarco != "blanco" &&
    colorMarco != "negro"
  ) {
    alert("El tipo de vidrio debe ser: natural/blanco/negro " + colorMarco);
    colorMarco = prompt(
      "Ingrese color de marco (natural/blanco/negro)"
    ).toLowerCase();
  }

  if (colorMarco == "natural") {
    precioColor = 0;
    alert("El costo del color Natural es: $" + precioColor);
  } else if (colorMarco == "blanco") {
    precioColor = 50;
    alert("El costo del color Blanco es: $" + precioColor);
  } else {
    precioColor = 100;
    alert("El costo del color Negro es: $" + precioColor);
  }
  cuadroPersonalizado.colorMarco=colorMarco;
  return precioColor;
};

//FUNCION PARA METODO ENVIO
const funcionMetodo = (metodoEnvio, direccionEnvio) => {
  while (
    metodoEnvio != "normal" &&
    metodoEnvio != "express" &&
    metodoEnvio != "pickup"
  ) {
    alert("El metodo de envio debe ser, Normal $50, express $150, pickup 0 " + metodoEnvio);
    metodoEnvio = prompt(
      "Ingrese Metodo envio(normal/express/pickup)"
    ).toLowerCase();
  }

  if (metodoEnvio == "normal") {
    precioEnvio = 50;
    alert("El costo del del envio normal es: $" + precioEnvio);
    alert("Se enviará a: "+direccionEnvio);
    
    
  } else if (metodoEnvio == "express") {
    precioEnvio = 150;
    alert("El costo del del envio express es: $" + precioEnvio);
    alert("Se enviará a: "+direccionEnvio);
  } else {
    precioEnvio = 0;
    alert("El costo del del pickUp es: $" + precioEnvio);
    alert("Ha seleccionado la opcion PickUp, deberá retirar su pedido en 48hs en nuestro local.");
  }
  return precioEnvio;

}


//FUNCION  PAGO
const funcionPago = (metodoPago) => {
  while (
    metodoPago != "efectivo" &&
    metodoPago != "transferencia" &&
    metodoPago != "tarjeta"
  ) {
    alert("El metodo de pago debe ser: efectivo/transferencia/tarjeta " + metodoPago);
    metodoPago = prompt(
      "Seleccione el metodo de pago (efectivo/transferencia/tarjeta)"
    ).toLowerCase();
  }

  if (metodoPago == "efectivo") {
    pagoElejido = "efectivo";
    alert("Ha seleccionado pago con: " + pagoElejido);
  } else if (metodoPago == "transferencia") {
    pagoElejido = "transferencia";
    alert("Ha seleccionado pago con: " + pagoElejido);
  } else {
    pagoElejido = "tarjeta";
    alert("Ha seleccionado pago con: " + pagoElejido);
  }
    return pagoElejido;
};


//LLAMO FUNCIONES

//DEVUELVE ORIENTACION
let resultadoOrientacion = funcionOrientacion(
  prompt("Seleccione orientaciondel Marco (vertical/horizontal)")
).toLowerCase();


let anchoCuadroIngesado = prompt("Ingrese ancho en CM");
let altoCuadroIngresado = prompt("Ingrese alto en CM");
//DEVUELVE PRECIO DEL CUADRO
let resultadoPrecio = funcionaMedidas(
  resultadoOrientacion,
  anchoCuadroIngesado,
  altoCuadroIngresado
);

//DEVUELVE PRECIO DEL VIDRIO
let resultadoVidrio;
let vidrio = prompt("Quiere el cuadro con Vidiro? si/no").toLowerCase();
if (vidrio == "si") {
  let tipoVidrioIngresado = prompt(
    "Ingrese tipo de vidrio (comun/antireflejo)"
  ).toLowerCase();
  resultadoVidrio = funcionVidrio(tipoVidrioIngresado);
  cuadroPersonalizado.vidrio="Con Vidrio";
} else {
  alert("Cuadro sin Vidrio.");
  resultadoVidrio = 0;
  cuadroPersonalizado.vidrio="Sin Vidrio";
}

//DEVUELVE PRECIO DEL COLOR
let resultadoColor = funcionColor(
  prompt("Ingrese color de marco (natural/blanco/negro)").toLowerCase()
);

//COSTO TODAL DEL CUADRO
let preciofinal = (resultadoPrecio + resultadoVidrio + resultadoColor) * 1.22;
cuadroPersonalizado.precio=preciofinal;
alert(
  "El costo total del cuadro seleccionado, con impuestos incluidos es: $" + preciofinal
  ); 

  //SELECCION DE METO DE ENVIO
let resultadoMetodo = funcionMetodo(
  prompt("Seleccione metodo Envio: Normal $50, express $150, pickup 0").toLowerCase(), prompt("Selecione direccion de Envío:").toLowerCase()
);

let resultadoPago = funcionPago(
  prompt("Seleccione el metodo de pago (efectivo/transferencia/tarjeta)").toLowerCase()
);

console.log(cuadroPersonalizado);

alert("Felicitaciones ha comprado un cuadro " + cuadroPersonalizado.orientacion + " de: " + cuadroPersonalizado.alto + "CM x " + cuadroPersonalizado.ancho + "CM.\n"
 +cuadroPersonalizado.vidrio + ". El tipo de Vidrio es: "+ cuadroPersonalizado.tipoVidrio + ", Y el color del marco: " + cuadroPersonalizado.colorMarco + ".\n"
 + "El precio del cuadro es: $" + preciofinal + " y El precio total envío inlcuido es: $" + (preciofinal+resultadoMetodo)  );




/* //BUSQUEDA EN EL ARRAY DE PRODUCTOS PARA FILTRO POR CATEGORIA
let categoria = prompt(
  "Ingrese una categoría (Ciudades, Botanicos, Asbtractos o Infantiles) para filtrar por categoría"
);
 let producto = productos.filter((producto) => producto.categoria === categoria);

console.log(producto);

//BUSQUEDA POR COLOR DE MARCO
let colorMarco = prompt(
  "Seleccione color de Marco para ver los cuadros disponibles (Natural, Blanco, Negro)"
);
let productoColorMarco = productos.filter((producto) =>
  producto.colorMarco.includes(colorMarco)
);
console.log(productoColorMarco); 

//BUSQUEDA POR COLOR DE MARCO DENTRO DE CATEGORÍA
let productoCombinado = productos.filter((producto) => producto.categoria === categoria && producto.colorMarco.includes(colorMarco));
console.log(productoCombinado); 

//BUSQUEDA RANGO PRECIO
let precioMenor = prompt("Ingrese precio MENOR para buscar");
let precioMayor = prompt("Ingrese precio MAYOR para buscar");
let productoPorPrecio = productos.filter((producto) => producto.precio >= precioMenor && producto.precio <= precioMayor);
console.log(productoPorPrecio); 


//BUSQUEDA COMBINADA CATEGORIA, COLOR DE MARCO Y RANGO DE PRECIO

let productoCombinado2 = productos.filter((producto) => producto.precio >= precioMenor && producto.precio <= precioMayor && producto.categoria === categoria && producto.colorMarco.includes(colorMarco));
console.log(productoCombinado2); */