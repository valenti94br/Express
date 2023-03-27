const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Datos
const productos = [
  { id: 1, nombre: 'Taza de Harry Potter', precio: 300 },
  { id: 2, nombre: 'FIFA 22 PS5', precio: 1000 },
  { id: 3, nombre: 'Figura Goku Super Saiyan', precio: 100 },
  { id: 4, nombre: 'Zelda Breath of the Wild', precio: 200 },
  { id: 5, nombre: 'Skin Valorant', precio: 120 },
  { id: 6, nombre: 'Taza de Star Wars', precio: 220 }
];

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
  const response = {
    description: 'Productos',
    items: productos
  };
  res.json(response);
});

// Endpoint para crear un producto nuevo
app.post('/products', (req, res) => {
  const nuevoProducto = req.body;
  nuevoProducto.id = productos.length + 1;
  productos.push(nuevoProducto);
  res.json(nuevoProducto);
});

// Endpoint para actualizar un producto existente
app.put('/products/:id', (req, res) => {
  const idProducto = parseInt(req.params.id);
  const productoActualizado = req.body;
  const indiceProducto = productos.findIndex(p => p.id === idProducto);
  if (indiceProducto !== -1) {
    productos[indiceProducto] = { id: idProducto, ...productoActualizado };
    res.json(productos[indiceProducto]);
  } else {
    res.sendStatus(404);
  }
});

// Endpoint para eliminar un producto existente
app.delete('/products/:id', (req, res) => {
  const idProducto = parseInt(req.params.id);
  const indiceProducto = productos.findIndex(p => p.id === idProducto);
  if (indiceProducto !== -1) {
    productos.splice(indiceProducto, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// Filtro por precio de producto
app.get('/products/precio/:precio', (req, res) => {
  const precioBuscado = parseInt(req.params.precio);
  const productosFiltrados = productos.filter(p => p.precio === precioBuscado);
  res.json(productosFiltrados);
});

// Filtro que muestre los productos con un precio entre 50 y 250
app.get('/products/rango-precio', (req, res) => {
  const productosFiltrados = productos.filter(p => p.precio >= 50 && p.precio <= 250);
  res.json(productosFiltrados);
});

// Filtro que devuelve un producto por su id
app.get('/products/id/:id', (req, res) => {
    const idProducto = parseInt(req.params.id);
    const productoBuscado = productos.find(p => p.id === idProducto);
    if (productoBuscado) {
      res.json(productoBuscado);
    } else {
      res.sendStatus(404);
    }
  });
  
  // Filtro que devuelve un producto por su nombre
  app.get('/products/nombre/:nombre', (req, res) => {
    const nombreProducto = req.params.nombre;
    const productoBuscado = productos.find(p => p.nombre === nombreProducto);
    if (productoBuscado) {
      res.json(productoBuscado);
    } else {
      res.sendStatus(404);
    }
  });
  
