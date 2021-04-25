import React from 'react'

//Vamos a registrar las diferentes rutas/paginas que tendra nuestro proyecto, para ello requeriremos los sig. modulos.
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Auth/Login/Login";
import NuevaCuenta from "./Auth/NuevaCuenta/NuevaCuenta";
import Main from "./Main/Main";
import ProyectoState from '../Context/proyectos/proyectoState';
import TareaState from '../Context/tasks/tareaState';
import AlertaState from '../Context/alertas/alertaState';
import AuthState from '../Context/autenticacion/authState';
import tokenAuth from '../Config/tokenAuth';
import RoutePrivate from '../Components/RutesPrivates/RutesPrivates';

//Revisar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() { 
  return (
    
    //Haremos disponible nuestro State en toda la APP
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            {/* // Todo lo que se encuentre dentro del "Router" pero fuera del "Switch", sera el contenido que se vea en todas las paginas existentes (Es decir, como si fuese el contenido general de todas las paginas, como el header o el footer.) */}
            <Router>

              {/* Todo lo que se encuentre dentro del "Switch", seran cada una de las posibles paginas de nuestra APP con su respectivo componente a renderizar*/}
              <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/nueva-cuenta' component={NuevaCuenta}/>
                <RoutePrivate exact path='/proyectos' component={Main}/>
                <Redirect to="/proyectos"/>
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
