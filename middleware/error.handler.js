function logErrors(err, req, res, next) {//para loguear errores
  /*   console.log('logError') */
  console.error(err);
  next(err);//indica que el siguiente middleware es de tipo error
}
function errorHandler(err, req, res, next) {//para crear un formato de error cada ves que tengamos un error
  /*   console.log('errorHandler') */
  res.status(500).json({
    message: err.message,
    stack: err.stack,//indica que lugar donde ocurrio el error
  });
}
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {//si es de tipo boom
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
