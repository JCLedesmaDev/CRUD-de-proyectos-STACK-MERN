// Rutas para crear usuarios
const router = require('express').Router();
const usersCtrl = require('../Controllers/users.controllers');
const { check } = require('express-validator');

//Crea un usuario - /users/
router.post('/', 

  [ // Las reglas van aqui, pero el resultado se lee en "controllers"
    //-> Valida que no este vacio
    check("nombre", "El nombre es obligatorio").isString().not().isEmpty(),  
    //-> Agrega un email valido
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres y un maximo de 15 caracteres").isLength({min: 6, max: 15}),
  ],
  usersCtrl.createUser
)


module.exports = router;