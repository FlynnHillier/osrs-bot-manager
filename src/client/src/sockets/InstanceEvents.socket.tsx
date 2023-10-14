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

        function onBooted(username:string){
            console.log("booted")
            dispatchInstances({
                type:"BOOTED",
                payload:{
                    instanceState:{
                        user:{
                            username:username
                        }
                    }
                }
            })
        }

        function onKilled(username:string){
            dispatchInstances({
                type:"KILLED",
                payload:{
                    instanceState:{
                        user:{
                            username:username,
                        }
                    }
                }
            })
        }
        
        socket.on("NEW",onNew)
        socket.on("BOOTED",onBooted)
        socket.on("KILLED",onKilled)

        return () => {
            socket.off("NEW",onNew)
            socket.off("BOOTED",onBooted)
            socket.off("KILLED",onKilled)
        }
    },[socket])
  
  
    return (
        <>
            {children}
        </>
    )
}

export default SocketInstanceEvents