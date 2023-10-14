import React,{useState} from 'react'
import CheckBox from './CheckBox'
import { useSocket } from '../hooks/contexts/useSocket.hook'
import { InstanceState } from '@common/types/instanceState.types'

import "../styles/instanceFrame.css"

interface Props extends InstanceState {}

const InstanceFrame = ({user,client}:Props) => {
  let [isMultiSelected,setIsMultiSelected] = useState<boolean>(false)
  const socket = useSocket()


  const bootInstance = () => {
    if(!client.isBooted){
      socket.emit("BOOT",user.username)
    }
  }




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
        <button disabled={client.isBooted} onClick={bootInstance}>
          start client
        </button>
      </div>
    </div>
  )
}

export default InstanceFrame