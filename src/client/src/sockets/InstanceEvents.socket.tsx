import React,{ReactNode, useEffect} from 'react'
import { useInstances } from '../hooks/contexts/useInstances.hook'
import { socket } from '../contexts/socket.context'
import { InstanceState } from '@common/types/instanceState.types'

interface Props {
    children?:ReactNode
}

const SocketInstanceEvents = ({children}:Props) => {
    const {dispatchInstances} = useInstances()

    useEffect(()=>{
        function onNew(instanceState:InstanceState){
            dispatchInstances({
                type:"NEW",
                payload:{
                    instanceState:instanceState
                }
            })
        }

        function onStarted(instanceState:InstanceState){
            dispatchInstances({
                type:"CLIENT",
                payload:{
                    subType:"STARTED",
                    instanceState:{
                        user:{
                            username:instanceState.user.username
                        },
                    },
                }
            })
        }

        function onClosed(instanceState:InstanceState){
            dispatchInstances({
                type:"CLIENT",
                payload:{
                    subType:"CLOSED",
                    instanceState:{
                        user:{
                            username:instanceState.user.username,
                        }
                    },
                }
            })
        }
        
        socket.on("NEW",onNew)
        socket.on("CLIENT:STARTED",onStarted)
        socket.on("CLIENT:CLOSED",onClosed)

        return () => {
            socket.off("NEW",onNew)
            socket.off("CLIENT:STARTED",onStarted)
            socket.off("CLIENT:CLOSED",onClosed)
        }
    },[socket])
  
  
    return (
        <>
            {children}
        </>
    )
}

export default SocketInstanceEvents