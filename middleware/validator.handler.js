const { boom } = require("@hapi/boom");

function validatorHandler (schema, property) {//le enviamos el esquema y la propiedad que va a permiotir encontrar informacion
   return (req, res, next) => {
    const data = req[property];//hace que sea dinamico
    const { error } = schema.validate(data, {abortEarly: false});// validamos el esquema y tambiem que nos mande todos los errores huntos
    if(error) { //si hay un error
        next(boom.badRequest(error));//envia un error de tipo 400
    }
    next();//si noy hay error va al siguiente middleware
   }
  }

  module.exports = validatorHandler;