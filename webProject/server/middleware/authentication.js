// =======================
// Verificaion de Token
// =======================

const jwt = require('jsonwebtoken')


let verificaToken = (req, res, next) => {
  // recuperamos el token pasado por los HEADERS de la peticion
  let token = req.get('Authorization')
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: 'Token no valido'
      })
    }
    // hacenos que despues que pase este midleware podamos acceder a la informacion del usuario logueado
    req.user = decoded.user
    next()
  })
}

let verificaAdminRole = (req, res, next) => {
  let user = req.user
  if (user.role === 'ADMIN_ROLE') {
    next()
  } else {
    return res.status(401).json({
      ok: false,
      err: {
        message: 'el usuario no es un administrador'
      }
    })
  }
}

module.exports = {
  verificaToken,
  verificaAdminRole
}
