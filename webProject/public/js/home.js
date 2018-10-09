(() => {
  
  let callbackTopics = {}
  
  // mapeamos los callbacks
  let addMqtt = (callback, topic) => {
    callbackTopics[topic] = callback
  }

  // callback para los componentes
  let callbackLed = (paramsLeds) => console.log(paramsLeds)
  let callbackServo = (paramsServos) =>  console.log(paramsServos)
  let callbackDht11 = (paramsTemperature) => console.log(paramsTemperature)
  let callbackMq135 = (paramsGas) => console.log(paramsGas)
  let callbackSteal = (paramsSteal) => console.log(paramsSteal)
  let callbackIsActive = (paramsIsActive) => console.log(paramsIsActive)


  sendGET(`http://localhost:3000/user`)
    .then((data) => {
      let user = data.user
      let idUser = user._id
      let home = data.user.home
      for (let index of Object.keys(home)) {
        if (index === 'Sensors') {
          addMqtt(callbackDht11,`${idUser}/dht11/${index}/temperature/value`)
          addMqtt(callbackMq135,`${idUser}/mq135/${index}/gas/value`)
          addMqtt(callbackSteal, `${idUser}/pir/${index}/steal/value`)
          addMqtt(callbackIsActive, `${idUser}/pir/${index}/isActive/value`)
        } else if (index === 'General') {
          addMqtt(callbackLed, `${idUser}/${index}/lightCorridor/value`)
          addMqtt(callbackServo, `${idUser}/${index}/frontDoor/value`)
          addMqtt(callbackServo, `${idUser}/${index}/garageDoor/value`)
        } else if (index === 'Bathrooms' || index === 'Cookings' || index === 'LivingRooms' || index === 'Rooms') {
          for ( let number in home[index]) {
            addMqtt(callbackLed, `${idUser}/${index}/${number}/light/value`)
            addMqtt(callbackServo, `${idUser}/${index}/${number}/door/value`)
          }
        }
      }
      
      client = new Paho.MQTT.Client('akey96', 9001, "/ws", Math.floor(Math.random()*100)+new Date().getSeconds().toString());
      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;
      client.connect({onSuccess:onConnect});

      function onConnect() {
        console.log("onConnect")
        // client.subscribe("World");
        // message = new Paho.MQTT.Message("Hello");
        // message.destinationName = "World";
        // client.send(message)
        for( let topic of Object.keys(callbackTopics)) {
          client.subscribe(topic)
        }
      }

      function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:", responseObject.errorMessage);
        }
      }
      
      // called when a message arrives
      function onMessageArrived(message) {
        console.log("topic:", message.destinationName, ", message:",message.payloadString );
        callbackTopics[message.destinationName](message.payloadString)
      }

      console.log(callbackTopics)

    })
    .catch((err) =>console.log("errrooo   " ,err))

})()
