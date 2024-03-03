// Variable global para almacenar los productos
let productos;

// Función para cargar los productos desde un archivo JSON
fetch('./json/productos.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    return response.json();
  })
  .then(data => {
    console.log('Datos de productos cargados correctamente:', data);
    productos = data; // Almacenar los productos en la variable global
    cargarProductos(productos); // Llamar a la función para utilizar los datos
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });

// Selección de elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const botonesHamburguesa = document.querySelectorAll(".items-lista-hamburguesa");

// Función para cargar los productos en el DOM
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = ""; // Limpiar contenedor

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.classList.add("card-product");
        div.innerHTML = `
            <button class="favorite">
            <i class="fa-regular fa-star" id="favorite-regular" class="estrellaVacia"></i>
            <i class="fa-solid fa-star" id="added-favorite" class="estrellaLLena"></i>
            </button>
            <img class="producto-imagen" src="${producto.imagen}" alt="">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <div class="producto-puntuacion"><i id="cannabito" class="fa-solid fa-cannabis"></i><i id="cannabito" class="fa-solid fa-cannabis"></i><i id="cannabito" class="fa-solid fa-cannabis"></i><i id="cannabito" class="fa-solid fa-cannabis"></i><i id="cannabito" class="fa-solid fa-cannabis"></i></div>
                <button class="producto-agregar" id="${producto.id}"> <span data-i18n="Añadir">Añadir</span></button>
                <button class="mas-info botonDetalle" id="mas-info"> <span>Más info</span></button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    // Actualizar los botones de agregar al carrito
    actualizarBotonesAgregar();
}

// Función para actualizar los botones de agregar al carrito
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Variable para almacenar los productos en el carrito
let productosEnCarrito;

// Obtener los productos del carrito del LocalStorage
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

// Parsear los productos del carrito si existen, sino inicializar un array vacío
if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

// Función para agregar un producto al carrito
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id.toString() === idBoton);

    if (productosEnCarrito.some(producto => producto.id.toString() === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id.toString() === idBoton);
        productosEnCarrito[index].cantidad++;
        alert("El producto ha sido agregado al carrito");
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
        alert("El producto ha sido agregado al carrito");
    }

    // Actualizar el número de productos en el carrito y guardar en el LocalStorage
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Función para actualizar el número de productos en el carrito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerHTML = nuevoNumerito;
}

// Event listeners para los botones de filtro por categoría
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "Ham-todos") {
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerHTML = "Todos los productos";
            cargarProductos(productos);
        }
    });
});

// Event listeners para los botones de filtro por categoría desde el menú hamburguesa
botonesHamburguesa.forEach(botonH => {
    botonH.addEventListener("click", (e) => {
        botonesHamburguesa.forEach(botonH => botonH.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "Ham-todos") {
            const productosBotonH = productos.filter(producto => producto.categoria.id2 === e.currentTarget.id);
            cargarProductos(productosBotonH);
        } else {
            tituloPrincipal.innerHTML = "Todos los productos";
            cargarProductos(productos);
        }
    });
});

// Event listener para redirigir a la página de detalle de producto
const botonesDetalle = document.querySelectorAll(".botonDetalle");
botonesDetalle.forEach((boton) => {
    boton.addEventListener('click', productoDetalleEjemplo);
});
function productoDetalleEjemplo() {
    window.location.href = "/producto.html";
}
