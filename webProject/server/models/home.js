const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema


let homeSchema = new Schema({
  Extras: {
    lightYard: {
      pin: Schema.Types.Mixed
    },
    buzzer: {
      pin: Schema.Types.Mixed
    },
    fan: {
      pin: Schema.Types.Mixed
    },
    alertSteal: {
      pin: Schema.Types.Mixed
    },
    ldr: {
      pin: Schema.Types.Mixed
    },
  },
  Bathrooms: [
    {
      door: {
        pin: Schema.Types.Mixed,
        min_angle: Number,
        max_angle: Number,
        value: Number
      },
      light: {
        pin: Schema.Types.Mixed,
        value: Boolean
      }
    }
  ],
  Cookings: [
    {
      door: {
        pin: Schema.Types.Mixed,
        min_angle: Number,
        max_angle: Number,
        value: Number
      },
      light: {
        pin: Schema.Types.Mixed,
        value: Boolean
      }
    }
  ],
  LivingRooms: [
    {
      door: {
        pin: Schema.Types.Mixed,
        min_angle: Number,
        max_angle: Number,
        value: Number
      },
      light: {
        pin: Schema.Types.Mixed,
        value: Boolean
      }
    }
  ],
  Rooms: [
    {
      door: {
        pin: Schema.Types.Mixed,
        min_angle: Number,
        max_angle: Number,
        value: Number
      },
      light: {
        pin: Schema.Types.Mixed,
        value: Boolean
      }
    }
  ],
  Sensors: {
    dht11: {
      humidity: Number,
      temperature: Number,
      pin: Schema.Types.Mixed
    },
    mq135: {
      gas: Boolean
    },
    pir: {
      isActive: Boolean,
      steal: Boolean,
      pin: Schema.Types.Mixed
    }
  },
  General: {
    frontDoor: {
      pin: Schema.Types.Mixed,
      min_angle: Number,
      max_angle: Number,
      value: Number
    },
    garageDoor: {
      pin: Schema.Types.Mixed,
      min_angle: Number,
      max_angle: Number,
      value: Number
    },
    lightCorridor: {
      pin: Schema.Types.Mixed,
      value: Boolean
    }
  }
})

// metodo que se ejecuta cada vez que madamos a imprimir el json del Model User


homeSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})
module.exports = mongoose.model('Home', homeSchema)
