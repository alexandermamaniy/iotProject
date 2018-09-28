const express = require('express')

const app = express()

app.use(require('./users'))

module.exports = app
