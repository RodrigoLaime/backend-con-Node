const express = require('express');

const productsRouter = require('./productos.route');//inportamos el router con el metodo require
// const categoriesRouter = require('./categories.router');
// const usersRouter = require('./users.router');
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);//definimos el endpoint products y lo unimos con el archivo
  // app.use('./users', productsRouter);
  // app.use('./categories', productsRouter);

}

module.exports = routerApi;//lo expotamos como un modulo

