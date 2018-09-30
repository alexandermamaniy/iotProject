const express = require('express')
// importamos modelo USer de mongo
const User = require('../models/user')
const Home = require('../models/home')

const {verificaToken, verificaAdminRole} = require('../middleware/authentication')

// paqute que nos permite la incriptacioin de una via
const bcript = require('bcrypt')

// importacion de underscore
const _ = require('underscore')

const app = express()

app.get('/home', (req, res) => {
  res.render('home')
})

module.exports = app
