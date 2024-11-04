class Carrito {
    constructor() {
        this.productos = []; // Inicializa un array para almacenar los productos en el carrito
    }

    actualizarUnidades(sku, cantidad) {
        // Compara el sku de cada elemento 
        const productoEnCarrito = this.productos.find(product => product.sku === sku);

        if (productoEnCarrito) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            productoEnCarrito.cantidad = cantidad;
            if (productoEnCarrito.cantidad <= 0) {
                this.eliminarProducto(sku); // Eliminar si la cantidad es cero o menor
            }
        } else {
            // Si el producto no está en el carrito y la cantidad es mayor a 0, lo añade
            if (cantidad > 0) {
                this.productos.push({ sku: sku, cantidad: cantidad });
            }
        }
    }

    eliminarProducto(sku) {
        this.productos = this.productos.filter(product => product.sku !== sku);
    }

    obtenerInformacion() {
        return this.productos.map(product => ({
            sku: product.sku,
            cantidad: product.cantidad,
        }));
    }

    obtenerCarrito() {
        return this.productos;
    }
}
