import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import AlertaContext from '../../../Context/alertas/alertaContext';
import AuthContext from '../../../Context/autenticacion/authContext';



const NuevaCuenta = (props) => {

  //Extraer los valores del Context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;


  //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
  useEffect(() => {
    if (autenticado) {
      props.history.push('/proyectos')
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //State para iniciar sesion
  const [usuarioNuevo, guardarUsuarioNuevo] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const {
    nombre, email, password, confirmPassword
  } = usuarioNuevo;

  //Obtener valores de cada input
  const onChange = (e) => {
    guardarUsuarioNuevo({
      ...usuarioNuevo,
      [e.target.name]: e.target.value
    })
  }

  // console.log(usuarioNuevo)

  //Cuando el usuario quiere iniciar sesion
  const onSubmit = e => {

    e.preventDefault();

    //Validar que no hayan campos vacios
    if (
      nombre.trim() === '' || email.trim() === '' ||
      password.trim() === '' || confirmPassword.trim() === ''
    ) {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
      return;
    }

    //Validar password minimo de 6 caracteres
    if (password.length < 6) {
      mostrarAlerta('El password debe ser al menos de 6 caracteres', 'alerta-error')
      return;
    }
    //Validar los 2 passwords iguales
    if (password !== confirmPassword) {
      mostrarAlerta('No coincide el password', 'alerta-error')
      return;
    }

    //Pasarlo al "action" del form
    registrarUsuario({
      nombre,
      email,
      password
    });

  }

  return (
    <div className="form-usuario">

      {/* Si el initialState "alerta" tiene algun contenido va a mostrar eso en pantalla */}
      { (alerta)
        ? (
          <div className={`alerta ${alerta.categoria}`}>
            {alerta.msg}
          </div>
        )
        : (null)
      }


      <div className="contenedor-form sombra-dark">
        <h1>Registrarse</h1>

        <form
          onSubmit={onSubmit}
        >
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmPassword">Repite contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirme su contraseña"
              value={confirmPassword}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>

        {/* En caso de no tener una cuenta, nos re direcciona a otro componente para crear una nueva */}
        <Link
          to={'/'}
          className="btn btn-primario btn-block"
        >
          Iniciar Sesion
        </Link>

      </div>
    </div>
  );
}

export default NuevaCuenta;