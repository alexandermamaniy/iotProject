// ======================
// PUERTO
// ======================
process.env.PORT = process.env.PORT || 3000

// ======================
// ENTORNO
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ======================
// Base de DATOS
// ======================
process.env.URLDB = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost/projectSCESI' : process.env.MONGO_URI

// ======================
// Vencimiento del token
// ======================
// segundos
// minutos
// horas
// dias

process.env.CADUCIDAD_TOKEN = '48h'

// ======================
// Semilla de Token
// ======================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

// ======================
// Google client ID
// ======================

// process.env.CLIENT_ID = process.env.CLIENT_ID || '1017629132763-lq6sippcb7rugmt00msklempo2ogjofg.apps.googleusercontent.com'
