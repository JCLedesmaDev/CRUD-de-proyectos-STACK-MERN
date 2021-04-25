// Rutas para autenticar usuarios
const router = require('express').Router();
const authCtrl = require('../Controllers/auth.controllers');
const authMiddle = require('../Middlewares/Auth.middleware');
const { check } = require('express-validator');


//Autenticar un usuario (Iniciar sesion) - /users/auth
router.post('/', 

  [ // Las reglas van aqui, pero el resultado se lee en "controllers"  
    //-> Agrega un email valido
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres y un maximo de 15 caracteres").isLength({min: 6, max: 15}),
  ],
  authCtrl.autenticarUsuario
)

////Obtener que usuario esta autenticado
router.get('/',
  authMiddle.verifyToken,
  authCtrl.usuarioAutenticado
)

module.exports = router;