const socket = io()

socket.emit("message", "hola desde home")



// Escuchar el evento 'updateProducts'
socket.on('updateProducts', (data) => {
    // Verificar si la propiedad 'productos' está presente y es un array
    if (data && Array.isArray(data.productos)) {
        // Actualizar la lista de productos en la interfaz de usuario
        updateProductsList(data.productos);
    }
});


function updateProductsList(productos) {
    const productList = document.getElementById('product-list');


    // Verificar si hay productos antes de iterar
    if (productos && productos.length > 0) {
        // Crear un nuevo elemento <ul> y agregar los nuevos productos
   
        const newList = document.createElement('ul');
        newList.id = 'product-list';

        productos.forEach((product) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<h3>${product.title}</h3>`;
            newList.appendChild(listItem);
        });

        // Reemplazar el antiguo <ul> con el nuevo
        productList.replaceWith(newList);
    } else {
        console.log('No hay productos disponibles.');
    }
}