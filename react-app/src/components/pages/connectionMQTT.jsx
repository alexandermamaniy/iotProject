import React from  'react'
import { Connector } from 'mqtt-react';
import App from '../index';
 
export default () => (
  <Connector mqttProps="ws://akey96:9001">
    <App />
  </Connector>
)


