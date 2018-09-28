const express = require('express')
// importamos modelo USer de mongo
const User = require('../models/user')

// const {verificaToken, verificaAdminRole} = require('../middleware/authentication')

// paqute que nos permite la incriptacioin de una via
const bcript = require('bcrypt')

// importacion de underscore
const _ = require('underscore')

const app = express()

app.get('', (req, res) => {
  res.json({
    ok: true,
    message: 'Todo funciona'
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
