//Lo que haremos aqui, sera enviar el Token del usuario para validarlo y ver si realmente pertenece hacia este proyecto
const jwt = require('jsonwebtoken');

const JWT = {}

JWT.verifyToken = function(req, res, next){

  //Leer el token que nos envia el usuario por medio del "Header"
  const token = req.header('x-auth-token')

 
  //Revisar si no hay un token
  if (!token) {
    return res.status(401).json({msg: 'Acceso denegado: Token inexistente'})
  }

  //Validar el Token
  try {
    
    //Verificamos el token que nos envio el usuario con nuestra palabra secreta
    const cifrado = jwt.verify(token, process.env.SECRET)

    //Nuestro cifrado, va a tener el respectivo id del Usuario al que le pertenece este token (Lo que hicimos en "users.controllers.js")
    req.usuario = cifrado.usuario;
    next();

  } catch (error) {
    res.status(401).json({msg: 'Token no valido'})
  }

}

module.exports = JWT;