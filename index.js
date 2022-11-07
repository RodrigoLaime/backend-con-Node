
// creamos una app y lo cooremos en el puerto 3000

// llamamos a las dependencias
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');//no hace falta colocar el archivo index

const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/error.handler');

// const { route } = require('./routes/productos.route');
const app = express(); //epress va a generar un app
const port = process.env.PORT || 3000; //puerto 3000

//con esto podemos recivir informacion de tipo json que nos envian con post
app.use(express.json());//middleware

const whitelist = ['https://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {//si el origin esta incluido
      callback(null, true)//no hay ningun error y el acceso permitido
    } else {
      callback(new Error('No permitido'))//no se permite origenes desconocidos
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {//parametro una ruta y un callback y este tiene la peticion y la respuesta
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});

routerApi(app);//le pasamos la api

//  // recoger parametros con query
// app.get('/users', (req, res) => {//creamos un nuevo endpoin
//   const { limit, offset } = req.query;//estrategia de paginacion //parametros tipo query
//   if (limit && offset) { //validar si existen
//     res.json({
//       limit,
//       offset
//     });
//   } else { //si existe
//     res.send('No hay parametros');
//   }
// });


// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//   const { categoryId, productId } = req.params;
//   res.json({
//     categoryId,
//     productId,
//   })
// });

//utilizar middleware, simpre despues de haver definido
app.use(logErrors);//colocar en orden correcto
app.use(boomErrorHandler);
app.use(errorHandler);

//le indica a la app que escuche en un  puerto
app.listen(port, () => {
  console.log('My app esta corriendo en el puerto ' + port);
});

