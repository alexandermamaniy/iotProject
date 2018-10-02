import React, { Component } from 'react';
import logo from './cart-wifi-icon-1.png';
import { Icon } from 'semantic-ui-react';
import {Header} from 'semantic-ui-react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" as='h2'>
        <img src={logo} className="App-logo" alt="logo"/>
            <Header.Content>
              Domotica
              <Header.Subheader>Para Viviendas</Header.Subheader>  
            </Header.Content>
          {/* <img src="./cart-wifi-icon-1.png" alt="logo" className="house-logo" /> */}
           {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Domotica para Vivienda</h1>
          <div>
            <Icon circular name='user circle'/>
          </div>
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <h2 class='ui header'>
  <i aria-hidden='true' class='plug icon' />
  <div class='content'>Uptime Guarantee</div>
</h2>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default App;
