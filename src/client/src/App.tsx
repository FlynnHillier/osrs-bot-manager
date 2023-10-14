import React from 'react';
import InstanceFrame from './components/InstanceFrame';
import { useInstances } from './hooks/contexts/useInstances.hook';

function App() {
  const {instances} = useInstances()
  
  
  return (
    <div>
      {
        Object.values(instances).map((instance)=>{
          return (
            <InstanceFrame
              user={{
                username:instance.user.username,
                proxy:instance.user.proxy,
              }}
              client={{
                isSocketConnected:instance.client.isSocketConnected,
                isBooted:instance.client.isBooted,
              }}
            />
          )
        })
      }
    </div>
  );
}

export default App;
