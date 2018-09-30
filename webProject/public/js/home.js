((ajax) => {

  const [READY_STATE_COMPLETE, OK, NOT_FOUND] = [4, 200, 400]
  
  let sendAjax = () => {
    return new Promise((resolve, reject) => {
      ajax.open('GET', 'http://localhost:3000/user', true)
      ajax.setRequestHeader('Authorization', localStorage.getItem('Authorization'))
      ajax.addEventListener('load', e => {
        if (ajax.readyState === READY_STATE_COMPLETE) {
          data = JSON.parse(ajax.response)
          if (ajax.status === OK) {
            resolve(data)
          } else {
            reject(data)
          }
        }
      })
      ajax.send()
    })
  }

  sendAjax()
    .then(data => {
      let {user, user:{_id:id}, user:{home}} = data
      console.log(user, id, home)
      let conn = mqtt.connect('ws://akey96:9001');
      window.conn = conn;
      let conexion = conn
      let topic = 'narrieth'
      let mensaje = 'hello world  aaaa'
      conexion.publish(topic, mensaje);
    })
    .catch(data => console.log(data))

})(new XMLHttpRequest())