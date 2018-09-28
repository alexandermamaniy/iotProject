var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongoose_basics', (err) => {
  if(err)
    throw err
  console.log('conectado correactamente')
})


let pruebaSchema = mongoose.Schema({
  ratings: [
    {
      nom: String,
    }
  ]
})

var Prueba = mongoose.model('Prueba', pruebaSchema)

let data = [
  {
    nom: 'Alex'
  },
  {
    nom: 'Karen'
  },
  {
    nom: 'Gaby'
  }]

let prueba = new Prueba({
  ratings: data
})

prueba.save((err, pruebaDB) => {
  if (err)
    throw err
  console.log('Se guardo correactamente', pruebaDB)
})
