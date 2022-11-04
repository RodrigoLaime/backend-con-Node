const express = require('express');

const ProductsService = require('../services/product.service.js');

const router = express.Router();
const service = new ProductsService();


//primera peticion
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', async (req, res, next) => {
  try { //si todo va bien
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) { //si no se va a un middleware de tipo error
    next(error)
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;



/* // llamamos a las dependencias
const express = require('express');
// const faker = require('faker');
const ProductsService = require('../services/product.service');//inportamos

// crear una ruta o app
const router = express.Router();//principio de una responsabilidad
const service = new ProductsService;

// crear una api con datos random //metodo get
router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

// endpoin especifico //metodo get
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

// endpoin dinamico
router.get('/:id', (req, res) => {
  const { id } = req.params;//params es una propiedad de req // con la desestructuracion le decimos que queremos algo en especifico
  const product = service.findOne(id);
  res.json(product);
})


// usamos el metodo Post para crear
router.post('/', (req, res) => { //metodoto post le pasamos la ruto principal (/products) y un callback
  const body = req.body;//recivimos el parametro//no usamos desestructuracion ya que queremos todo el cuerpo y no algo especifico. //body === cuerpo
  const newProduct = service.create(body);
  res.status(201).json(newProduct);//producto creado en product.service
});
// usamos el metodo Patch para actualizar un atributo especifico
router.patch('/:id', (req, res) => { //metodoto patch le pasamos la ruto principal (/products y el id) y un callback
  const { id } = req.params; //que queremos un parametro en especifico
  const body = req.body;
  const product = service.update(id, body);
  res.json(product);
});
// usamos el metodo Delete para eliminar un atributo especifico
router.delete('/:id', (req, res) => { //metodoto patch le pasamos la ruto principal (/products y el id) y un callback
  const { id } = req.params; //que queremos un parametro en especifico
  const rta = service.delete(id);
  res.json(rta);
});

module.exports = router;//lo exportamos como un modulo
 */
