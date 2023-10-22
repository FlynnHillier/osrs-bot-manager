import {useState} from 'react'
import { InstanceState } from '@common/types/instanceState.types'
import { useInstanceLogic } from '../hooks/contexts/useInstanceLogic'

import ClientStatusIcon from './ClientStatusIcon'
import CheckBox from './CheckBox'

import "../styles/instanceFrame.css"


const InstanceFrame = (instanceState:InstanceState) => {
  let [isMultiSelected,setIsMultiSelected] = useState<boolean>(false)
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
          <div className="status">
            <ClientStatusIcon instance={instanceState}/>
          </div>
        </div> 
        <div className="task">
          <span className="taskdescription">
            {"fishing: casting rod"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InstanceFrame