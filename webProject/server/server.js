require('./config/config')
require('colors')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const hbs = require('hbs')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// usando las rutas configuradas
app.use(require('./routes/index'))

// habilitar la carpeta public como publica

app.use(express.static(path.resolve(__dirname, '../public')))

// Express con HBS engine
app.set('view engine', 'hbs')

// registramos una carpeta donde buscara hbs
hbs.registerPartials(path.join(__dirname, 'views/parciales'))

mongoose.connect(process.env.URLDB, (err, resp) => {
  if (err) {
    throw err
  }
  console.log('Mongo corriendo de forma correcta'.green)
})

app.listen(process.env.PORT, () => console.log(`escuchando por el puerto ${process.env.PORT}`))
