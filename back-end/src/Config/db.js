const mongoose = require('mongoose'); 

const URI = process.env.DB_MONGO;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

const conectarDB = async () =>{
  try {
    await mongoose.connect(URI, options);
    console.log("Base de datos conectada")
  } catch (error) {
    console.log(error)
    process.exit(1) //Detiene la APP en caso de haber un error 
  }
}

module.exports = conectarDB;