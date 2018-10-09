import React, {Component} from 'react'
import { subscribe } from 'mqtt-react';

// Messages are passed on the "data" prop
const MessageList = (props) => (
  <ul>
    {props.data.map( message => <li>primer : {message}</li> )}
  </ul>
)
 
// simple subscription to messages on the "@test/demo" topic
export default subscribe({
  topic: '@alex'
})(MessageList)



// import mqtt from 'mqtt'
// const client  = mqtt.connect('ws://akey96:9001')
// // Messages are passed on the "data" prop
// export default class MessageList extends Component {

//   constructor (...props) {
//     super(...props)
//     this.state = {
//       value: 'pepito'
//     }
    
//     client.on('connect', function () {
      
//       client.subscribe('presence', function (err) {
//         if (!err) {
//           client.publish('presence', 'Hello mqtt')
//         }
//       })
//     })
//   }

//   componentDidMount () {
//     client.on('alex', function (topic, message) {
//       console.log('emtro')
//       this.setState({
//         value: message.toString()
//       })
//       client.end()
//     })
//   }



//   render () {
//     return (
//       <div>hola {this.state.value} </div>
//     )
//   }

// }
