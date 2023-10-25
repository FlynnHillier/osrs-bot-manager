import React from 'react';
import { useInstances } from './hooks/contexts/useInstances.hook';
import InstanceFrameOverview from './components/InstanceFrameOverview';

function App() {
  const {instances} = useInstances()
  
  
  return (
    <div>
      <InstanceFrameOverview instanceStates={instances}/>
    </div>
  );
}

export default App;
