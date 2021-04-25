const router = require('express').Router();
const tareasCtrl = require('../Controllers/tareas.controllers')
const authMiddle = require('../Middlewares/Auth.middleware');
const { check } = require('express-validator');

router.post("/", 
  authMiddle.verifyToken,
  [
    check('nombreTarea', 'El nombre es obligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
  ],
  tareasCtrl.createTasks
);

router.get('/',
  authMiddle.verifyToken,
  tareasCtrl.getTasks
);

router.put('/:id',
  authMiddle.verifyToken,
  tareasCtrl.updateTasks
);

router.delete('/:id',
  authMiddle.verifyToken,
  tareasCtrl.deleteTasks
);

module.exports = router;