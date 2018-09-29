const express = require('express')

const app = express()

// paqute que nos permite la incriptacioin de una via
const bcript = require('bcrypt')

// libreria para la generacion de webtoken
const jwt = require('jsonwebtoken')

// importamos modelo USer de mongo
const User = require('../models/user')


app.post('/login', (req, res) => {
  let body = req.body

  User.findOne({email: body.email}, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          massage: '(Usuario) o contraseña incorrecta'
        }
      })
    }
    // contraseña normar, contraseña ecriptada
    if (!bcript.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          massage: 'Usuario o (contraseña) incorrecta'
        }
      })
    }

    let token = jwt.sign({
      user: userDB
    }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})

    res.json({
      ok: true,
      user: userDB,
      token
    })
  })
})

module.exports = app
