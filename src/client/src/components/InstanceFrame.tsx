import React,{useState} from 'react'
import CheckBox from './CheckBox'
import { useSocket } from '../hooks/contexts/useSocket.hook'
import { InstanceState } from '@common/types/instanceState.types'
import { useInstanceLogic } from '../hooks/contexts/useInstanceLogic'

import "../styles/instanceFrame.css"


const InstanceFrame = (instanceState:InstanceState) => {
  let [isMultiSelected,setIsMultiSelected] = useState<boolean>(false)
  const {bootInstance} = useInstanceLogic()
  const {user,client} = instanceState




  return (
    <div className='instanceFrame pcontainer'>
      <CheckBox
        onActiveStateChange={setIsMultiSelected}
      />
      <div className="datagrid">
        <div className="user">
          <span className='username'>
            {user.username}
          </span>
          <div className="onlineStatus"/>
        </div> 
        <div className="task">
          <span className="taskdescription">
            {"fishing: casting rod"}
          </span>
        </div>
        <button disabled={client.isActive} onClick={()=>{
          bootInstance(instanceState)
        }}>
          start client
        </button>
      </div>
    </div>
  )
}

export default InstanceFrame