document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".agregar-carrito");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const producto = {
        id: boton.dataset.id,
        nombre: boton.dataset.nombre,
        precio: parseInt(boton.dataset.precio),
        imagen: boton.dataset.imagen,
        cantidad: 1
      };

      agregarAlCarrito(producto);
      actualizarContadorCarrito();
    });
  });
});

// Funciones de carrito
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();
  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push(producto);
  }

  guardarCarrito(carrito);
}

// Opcional: contador en el menú
function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const total = carrito.reduce((sum, p) => sum + p.cantidad, 0);
  const contador = document.getElementById("contadorCarrito");
  if (contador) contador.textContent = total;
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
});


document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderizarCarrito() {
  const carrito = obtenerCarrito();
  const contenedor = document.getElementById("carritoContenido");
  const totalSpan = document.getElementById("carritoTotal");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='text-white'>Tu carrito está vacío.</p>";
    totalSpan.textContent = "$0";
    return;
  }

  let total = 0;

  carrito.forEach(producto => {
    const item = document.createElement("div");
    item.className = "card card-gomu text-white mb-3";
    item.innerHTML = `
      <div class="card-body d-flex align-items-center">
    <img src="${producto.imagen}" alt="${producto.nombre}" class="me-3" style="width: 60px; height: auto;">
    <div class="flex-grow-1">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">$${producto.precio.toLocaleString()} x ${producto.cantidad}</p>
    </div>
    <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito('${producto.id}')">Eliminar</button>
  </div>
    `;
    contenedor.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  totalSpan.textContent = `$${total.toLocaleString()}`;
}

function eliminarDelCarrito(id) {
  const carrito = obtenerCarrito().filter(p => p.id !== id);
  guardarCarrito(carrito);
  renderizarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  renderizarCarrito();
}

function finalizarCompra() {
  alert("¡Gracias por tu compra! 🛍️");
  vaciarCarrito();
  window.location.href = "../index.html";
}
