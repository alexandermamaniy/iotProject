const express = require('express')
// importamos modelo USer de mongo
const User = require('../models/user')
const Home = require('../models/home')

// const {verificaToken, verificaAdminRole} = require('../middleware/authentication')

// paqute que nos permite la incriptacioin de una via
const bcript = require('bcrypt')

// importacion de underscore
const _ = require('underscore')

const app = express()

app.get('/prueba', (req, res) => {
  let token = req.get('token')
  res.json({
    token
  })
})

app.get('/user/:id', (req, res) => {
  let id = req.params.id
  User.findById(id)
  .populate('home', 'Bathrooms Cookings LivingRooms Rooms Sensors General')
  .exec((err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if(!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'ID de usuario no existente'
        }
      })
    }
    res.json({
      ok: true,
      user: userDB
    })
  })
})

app.post('/user', (req, res) => {
  let body = req.body

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcript.hashSync(body.password, 10),
    role: body.role
  })
  // metodo save para guardar un user en mondoDB
  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      user: userDB
    })
  })
})

module.exports = app
