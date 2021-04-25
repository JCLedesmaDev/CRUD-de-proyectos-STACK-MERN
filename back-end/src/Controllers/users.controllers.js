const UserSchema = require('../Models/User.models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const JWT = require('jsonwebtoken')

const usersCtrl = {}

usersCtrl.createUser = async (req, res) =>{

  //Revisar si hay errores en la validacion
  const errors = validationResult(req);
  if (!errors.isEmpty()) { //-> Sino esta vacio, es xq tiene un error
    return res.status(400).json({errors: errors.array()})
  }

  //Extraer email y password
  const { email, password} = req.body;

  try {

    //Validaremos de que el email no exista en la BD
    let usuario = await UserSchema.findOne({ email })
    if (usuario) {
      return res.status(400).json({msg: 'El usuario ya existe'});
    }

    //Crea el nuevo usuario
    usuario = new UserSchema(req.body);

    //Encriptar el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt)

    //Guardar el usuario
    await usuario.save();

    //Crear y firmar el JWT
    const payload = { //1- Crear el JWT

      //Cuando un usuario se registre, le vamos a brindar a su respectivo Token, el ID del Usuario. De esta manera, vamos a tener un Token con el Id del usuario y lo vamos a poder re utilizar a futuro para obtener cosas particulares de ese usuario.
      usuario: {
        id: usuario.id
      }
    }
    JWT.sign(payload, process.env.SECRET, { //2- Firmar el JWT
      expiresIn: 3600 //Expira en 1 hs
    }, (error, token) =>{

      //En caso de haber un error, lo retornamos. Sino, retornamos el token
      if (error) throw error;
      //Mensaje de confirmacion
      res.json({token});

    })

  } catch (error) {
    console.log(error)
    res.status(400).send("Hubo un error")
  }
}

module.exports = usersCtrl;