const UserSchema = require('../Models/User.models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const JWT = require('jsonwebtoken')

const authCtrl = {}

authCtrl.autenticarUsuario = async (req, res) =>{

  //Revisar si hay errores en la validacion
  const errors = validationResult(req);
  if (!errors.isEmpty()) { //-> Sino esta vacio, es xq tiene un error
    return res.status(400).json({errors: errors.array()})
  }

  //Extraer email y password
  const {email, password} = req.body;

  try {

    //Revisar que sea un usuario registrado
    let usuario = await UserSchema.findOne({email});
    if (!usuario) {
      return res.status(400).json({msg: 'El usuario no existe'})
    }

    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({msg: 'Contraseña incorrecta'})
    }

    //Si todo es correcto, vamos a crear y firmar el JWT para que pueda navegar libremente 
    const payload = { //1- Crear el JWT
      //De esta manera, vamos a tener un Token con el Id del usuario
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
    console.log(error);
    res.status(500).json({msg: 'Hubo un error'});
  }

}

//Obtiene que usuario esta autenticado y sus datos
authCtrl.usuarioAutenticado = async (req, res) =>{
  try {
    
    //De esta manera, traemos todo el registro que posee ese usuario con el token en especifico (exceptuando el password)
    const usuario = await UserSchema.findById(req.usuario.id).select('-password');
    res.json({usuario});

  } catch (error) {
    console.log(error);
    res.status(500).json({msg: 'Hubo un error'});
  }
}

module.exports = authCtrl;