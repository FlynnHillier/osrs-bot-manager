import React from 'react'
import CheckBox from './CheckBox'

import "../styles/instanceFrame.css"

interface Props {
    user:{
      username:string
      proxy:string | null
    }
    client:{
      isActive:boolean
    }
}

const InstanceFrame = ({user,client}:Props) => {
  return (
    <div className='instanceFrame pcontainer'>
      <CheckBox
        onActiveStateChange={(active)=>{}}
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

      </div>
    </div>
  )
}

export default InstanceFrame