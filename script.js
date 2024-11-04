const carrito = new Carrito();

document.addEventListener('DOMContentLoaded', function(event) {
    // Carga los productos desde el JSON
    fetch('http://jsonblob.com/api/1302537061884878848')
        .then(response => response.json())
        .then(data => {
            const productosLista = document.getElementById('productos-lista');

            data.products.forEach(product => {
                const row = document.createElement('tr');
                const cellProducto = document.createElement('td');
                cellProducto.textContent = product.title;

                const cellCantidad = document.createElement('td');
                cellCantidad.innerHTML = `
                    <button class="btn-cantidad" onclick="cambiarCantidad('${product.SKU}', -1)">-</button>
                    <input type="number" id="${product.SKU}" value="0" min="0" onchange="actualizarCarrito('${product.SKU}', this.value)" />
                    <button class="btn-cantidad" onclick="cambiarCantidad('${product.SKU}', 1)">+</button>
                    `;

                const cellPrecio = document.createElement('td');
                cellPrecio.textContent = `${data.currency}${parseFloat(product.price).toFixed(2)}`;

                const cellTotal = document.createElement('td');
                cellTotal.id = `total-${product.SKU}`;
                cellTotal.textContent = `${data.currency}0.00`;

                row.appendChild(cellProducto);
                row.appendChild(cellCantidad);
                row.appendChild(cellPrecio);
                row.appendChild(cellTotal);
                productosLista.appendChild(row);
            });
        })
        .catch(error => console.error('Error al hacer el fetch al JSON de productos:', error));
});

// Función para manejar el cambio de cantidad
function cambiarCantidad(sku, delta) {
    const input = document.getElementById(sku);
    let cantidad = parseInt(input.value) + delta;

    if (cantidad < 0) {
        cantidad = 0; // Evitar que la cantidad sea negativa
    }

    input.value = cantidad; // Actualiza el valor en el input
    actualizarCarrito(sku, cantidad); // Actualiza el carrito
}

// Función para actualizar el carrito
function actualizarCarrito(sku, cantidad) {
    const precioPorUnidad = parseFloat(document.querySelector(`#productos-lista td:nth-child(3)`).textContent.replace('€', '').trim());
    const totalCell = document.getElementById(`total-${sku}`);
    const total = (cantidad * precioPorUnidad).toFixed(2);
    totalCell.textContent = `€${total}`; // Actualiza el total del producto

    // Actualiza el carrito
    carrito.actualizarUnidades(sku, cantidad);
    actualizarTotalCarrito();
    mostrarCarrito(); // Mostrar el carrito actualizado
}

// Función para actualizar el total del carrito
function actualizarTotalCarrito() {
    const totalCarritoElement = document.getElementById('total-carrito');
    const productosEnCarrito = carrito.obtenerCarrito();
    let totalCarrito = 0;

    productosEnCarrito.forEach(product => {
        const cantidad = product.cantidad;
        const precio = parseFloat(document.querySelector(`#total-${product.sku}`).textContent.replace('€', '').trim());
        totalCarrito += cantidad > 0 ? precio : 0; // Solo agrega si la cantidad es mayor que 0
    });

    totalCarritoElement.textContent = `Total del Carrito: €${totalCarrito.toFixed(2)}`;
}

// Función para mostrar el carrito en el div correspondiente
function mostrarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    carritoLista.innerHTML = ''; // Limpia el carrito antes de volver a llenarlo
    const productosEnCarrito = carrito.obtenerCarrito();

    productosEnCarrito.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `Producto SKU: ${product.sku}, Cantidad: ${product.cantidad}`;
        carritoLista.appendChild(li);
    });
}
