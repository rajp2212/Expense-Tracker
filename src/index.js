import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from './context/Context';
import App from './App';
import { SpeechProvider } from '@speechly/react-client';

ReactDOM.render(
  <SpeechProvider appId='1125122a-27a7-4b39-af91-33a631f966ca' language='en-US' >
  <Provider>
    <App />
  </Provider>
  </SpeechProvider>  
,
  document.getElementById('root')
);


