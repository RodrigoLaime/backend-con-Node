const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});


const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
/* const Joi = require('joi');

const id = Joi.string().uuid();//tipo de campo y la validacion de tipo uuid

const name = Joi.string().min(3).max(15);//campo, validacion que sea alphanumerico, min:3 caracteres, max:10 caracteres
const price = Joi.number().integer().min(10);//campo, validacion que sea entero, min:10 caracteres
const image = Joi.string().url();

//crear esquema
const createProductSchema = Joi.object({
    name: name.required(),//le decimos si es requerida
    price: price.required(),//le decimos si es requerida
    image: image.required()
})
//crear esquema para la actualizacion
const updateProductSchema = Joi.object({
    name: name,
    price: price,
    image: image
});
//validacion con un get
const getProductSchema = Joi.object({
    id: id.required()
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema}; */