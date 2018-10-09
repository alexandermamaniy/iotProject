import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/pages/connectionMQTT';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';



ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
