import React from 'react';
import InstanceFrame from './components/InstanceFrame';
import CheckBox from './components/CheckBox';

function App() {
  return (
    <div>
      <InstanceFrame
        user={{
          username:"superman@gmail.com",
          proxy:"string:123:5000:"
        }}
        client={{
          isActive:true,
        }}
      />
    </div>
  );
}

export default App;
