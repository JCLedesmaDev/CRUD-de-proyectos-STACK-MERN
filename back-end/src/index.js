// Para utilizar las variables de entorno, solo cuando estemos en produccion
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({path: ".env"});
}

/*                Requerir los modulos instalados                */
const express = require('express');
const conectarDB = require('./Config/db');
const cors = require('cors');

/*                Inicializaciones                */
const app = express();
conectarDB();

/*             Configuraciones del Servidor             */
app.set("port", process.env.PORT || 4100);
app.use(express.json({extended: true })) //--> Comprende mensajes JSON
app.use(cors({
    origin: '*'
}));

/*                Middlewares                 */


/*                Routes                */
app.use("/api/users", require("./Routes/users.routes"));
app.use("/api/auth", require("./Routes/auth.routes"));
app.use("/api/proyectos", require("./Routes/proyectos.routes"));
app.use("/api/tareas", require("./Routes/tareas.routes"));



/*                 Arranque del servidor                 */
app.listen(app.get("port"), () => {
  console.log(`El servidor se ha iniciado en el puerto ${app.get("port")}`);
});





















