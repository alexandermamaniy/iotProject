const mongoose = require('mongoose')
const Home = require('./home')
const User = require('./user')

mongoose.connect('mongodb://localhost/projectSCESI', (err, resp) => {
  if (err) {
    throw err
  }
  console.log('Mongo corriendo de forma correcta'.green)
})


let user = new User({
  information: {
    firstName: 'Pepito',
    lastName: 'Perez',
    address: 'Av La paz entre Hernando Silez',
    cellphone: '68685411'
  },
  email: 'akeymy4@gmail.com',
  password: 'pepito1234',
  home: '5baeb94cbd50601887001975'
})

user.save((err, userBD) => {
  if (err) {
    throw err
  }
  console.log('se guardo un user correctamente ', userBD)
  return 'a'
})



// let objeto = {
//   Extras : {
//     lightYard: {
//       pin: 24
//     },
//     buzzer: {
//       pin: 18
//     },
//     fan: {
//       pin: 16
//     },
//     alertSteal: {
//       pin: 22
//     },
//     ldr: {
//       pin: null
//     }
//   },
//   Bathrooms : [ {
//     door: {
//       pin:0,
//       min_angle : 0,
//       max_angle: 90,
//       value : 0
//     },
//     light : {
//       pin : 12,
//       value : false
//     }
//   } ],
//   Cookings : [ {
//     door : {
//       pin: 26,
//       min_angle: 90,
//       max_angle: -90,
//       value : 90
//     },
//     light: {
//       pin: 23,
//       value: false
//     }
//   } ],
//   LivingRooms : [ {
//     door : {
//       pin:1,
//       min_angle : 0,
//       max_angle: 90,
//       value: 0
//     },
//     light: {
//       pin: 20,
//       value: false
//     }
//   } ],
//   Rooms : [ {
//     door : {
//       pin: 2,
//       min_angle : 0,
//       max_angle: 90,
//       value : 0
//     },
//     light : {
//       pin : 7,
//       value : false
//     }
//   }, {
//     door: {
//       pin:3,
//       min_angle : 0,
//       max_angle: 90,
//       value : 0
//     },
//     light : {
//       pin : 17,
//       value : false
//     }
//   }, {
//     door : {
//       pin:19,
//       min_angle : -90,
//       max_angle: 90,
//       value : -90
//     },
//     light : {
//       pin : 25,
//       value : false
//     }
//   } ],

//   General : {
//     frontDoor : {
//       pin : 6,
//       min_angle : 90,
//       max_angle: -90,
//       value : 90
//     },
//     garageDoor : {
//       pin : 13,
//       min_angle : 90,
//       max_angle: 0,
//       value : 90
//     },
//     lightCorridor : {
//       pin : 21,
//       value : false
//     }
//   },
//   Sensors : {
//     dht11 : {
//       humidity : 0,
//       temperature : 0,
//       pin: 27
//     },
//     mq135 : {
//       gas : false
//     },
//     pir : {
//       isActive : false,
//       steal : true,
//       pin: 5
//     }
//   }
// }


// let home = new Home(objeto)
// home.save((errH, homeDB) => {
//   if (errH) {
//     throw errH
//   }
//   console.log('se guardo correctemente')
//   return
// })

