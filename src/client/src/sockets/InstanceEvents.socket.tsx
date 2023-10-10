import React,{ReactNode, useEffect} from 'react'
import { useInstances } from '../hooks/contexts/useInstances.hook'
import { socket } from '../contexts/socket.context'

interface Props {
    children?:ReactNode
}

const SocketInstanceEvents = ({children}:Props) => {
    const {dispatchInstances} = useInstances()

    useEffect(()=>{
        

        return () => {

        }
    },[socket])
  
  
    return (
        <>
            {children}
        </>
    )
}

export default SocketInstanceEvents