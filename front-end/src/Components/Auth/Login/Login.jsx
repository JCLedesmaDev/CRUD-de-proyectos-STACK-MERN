import React, { useContext, useState, useEffect } from 'react';
import AlertaContext from '../../../Context/alertas/alertaContext';
import AuthContext from '../../../Context/autenticacion/authContext';


//Para re direccionar a otra URL
import { Link } from "react-router-dom";

const Login = (props) => {

  //Extraer los valores del Context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;


  //En caso de que el password o email del usuario no exista
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
  const [usuario, guardarUsuario] = useState({
    email: '',
    password: ''
  })
  const { email, password } = usuario;

  //Obtener valores de cada input
  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  //Cuando el usuario quiere iniciar sesion
  const onSubmit = (e) => {
    e.preventDefault()

    //Validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", 'alerta-error')
    }

    //Pasarlo al "action" del form
    iniciarSesion({ email, password })

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
        <h1>Iniciar Sesion</h1>

        <form
          onSubmit={onSubmit}
        >
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesion"
            />
          </div>
        </form>

        {/* En caso de no tener una cuenta, nos re direcciona a otro componente para crear una nueva */}
        <Link
          to={'/nueva-cuenta'}
          className="btn btn-primario btn-block"
        >
          Registrarse
        </Link>

      </div>
    </div>
  );
}

export default Login;