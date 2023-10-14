import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import SocketProvider from './contexts/socket.context';
import SocketInstanceEvents from './sockets/InstanceEvents.socket';
import InstancesProvider from './contexts/instances.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <InstancesProvider>
      <SocketProvider>
        <SocketInstanceEvents>
          <App />
        </SocketInstanceEvents>
      </SocketProvider>
    </InstancesProvider>
  </React.StrictMode>
);