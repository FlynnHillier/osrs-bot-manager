import {useState,useEffect} from 'react'
import { InstanceState } from '@common/types/instanceState.types'
import { useInstanceLogic } from '../hooks/contexts/useInstanceLogic'

import ClientStatusIcon from './ClientStatusIcon'
import CheckBox from './CheckBox'

import "../styles/instanceFrame.css"

interface Props {
  instanceState:InstanceState,
  onSelectionChange?:(selected:boolean)=>any
  isSelected?:boolean
}

const InstanceFrame = ({instanceState,onSelectionChange,isSelected}:Props) => {
  const {user,client} = instanceState

  return (
    <div className='instanceFrame pcontainer'>
      
      { 
        //Only render checkbox if releveant props are provided.
        isSelected !== undefined && onSelectionChange !== undefined ? 
          <CheckBox
            checked={isSelected}
            onChange={(checked)=>{
              onSelectionChange(checked)
            }}
          /> 
        :
        <>
        </>
      }
      <div className="datagrid">
        <div className="user">
          <span className='username'>
            {user.username}
          </span>
          <div className="status">
            <ClientStatusIcon instances={[instanceState]}/>
          </div>
        </div> 
        <div className="task">
          <span className="taskdescription">
            {`${instanceState.activity.job || "no job"} : ${instanceState.activity.task || "no task"}`}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InstanceFrame