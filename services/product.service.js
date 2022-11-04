const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000);
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFount('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;//si todo va bien se retorna el producto
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFount('product not found');//la dependecia boom permite explicar de mejor manera los statuscode
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFount('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;


/* const faker = require('faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),//string superlargo
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }
  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),//generamos un id random
      ...data//para traer todos los valores de data que vengan del usuario
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
  }
  update(id, changes) {//el id y los cambios
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not fount');
    }

    const product = this.products[index];
    this.products[index] = {//le decimos que persista todo lo que hay de los atributos del producto y aplicar todos los nuevos cambios
      ...product,
      ...changes
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not fount');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
 */
