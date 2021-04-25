// Rutas para crear usuarios
const router = require('express').Router();
const proyectosCtrl = require('../Controllers/proyectos.controllers')
const authMiddle = require('../Middlewares/Auth.middleware');
const { check } = require('express-validator');

//Para poder crear proyectos, el usuario debe estar autenticado... De ahi extraeremos su Id y se lo daremos como parametro a nuestro "new proyectosSchema()" para completar su respectivo modelo de datos
 
router.post('/', 
  //Solo podra acceder a esta ruta y crear proyectos quienes hayan pasado por la validacion del Token
  authMiddle.verifyToken , //-> 1ro verifica el token enviado y luego da la respuesta.
  
  //Validacion de datos
  [
    check('nombreProyecto', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  proyectosCtrl.createProject
);

router.get('/', 
  authMiddle.verifyToken , //-> 1ro verifica el token enviado y luego da la respuesta.
  proyectosCtrl.getProject
);

router.put('/:id',
  authMiddle.verifyToken ,  
  [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  proyectosCtrl.updateProject
);

router.delete('/:id',
  authMiddle.verifyToken , 
  proyectosCtrl.deleteProject

);

module.exports = router;