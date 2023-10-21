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
              key={instance.user.username}
              user={{
                username:instance.user.username,
                proxy:instance.user.proxy,
              }}
              client={{
                queue:{
                  isQueued:instance.client.queue.isQueued,
                  position:instance.client.queue.position,
                },
                isSocketConnected:instance.client.isSocketConnected,
                isActive:instance.client.isActive,
              }}
            />
          )
        })
      }
    </div>
  );
}

export default App;
