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
                    instanceState
                }
            })
        }

        function onStarted(instanceState:InstanceState){
            dispatchInstances({
                type:"CLIENT",
                payload:{
                    subType:"STARTED",
                    instanceState
                }
            })
        }

        function onQueued(instanceState:InstanceState){
            dispatchInstances({
                type:"CLIENT",
                payload:{
                    subType:"QUEUED",
                    instanceState
                }
            })
        }

        function onDequeued(instanceState:InstanceState){
            dispatchInstances({
                type:"CLIENT",
                payload:{
                    subType:"DEQUEUED",
                    instanceState
                }
            })
        }

        function onClosed(instanceState:InstanceState){
            dispatchInstances({
                type:"CLIENT",
                payload:{
                    subType:"CLOSED",
                    instanceState
                }
            })
        }

        function onSocketConnected(instanceState:InstanceState)
        {
            dispatchInstances({
                type:"CLIENT",
                payload:{
                    subType:"SOCKETCONNECTED",
                    instanceState
                }
            })
        }

        function onSocketDisconnected(instanceState:InstanceState)
        {
            dispatchInstances({
                type:"CLIENT",
                payload:{
                    subType:"SOCKETDISCONNECTED",
                    instanceState
                }
            })
        }


        socket.on("NEW",onNew)
        socket.on("CLIENT:STARTED",onStarted)
        socket.on("CLIENT:QUEUED",onQueued)
        socket.on("CLIENT:CLOSED",onClosed)
        socket.on("CLIENT:DEQUEUED",onDequeued)
        socket.on("CLIENT:SOCKETDISCONNECTED",onSocketDisconnected)
        socket.on("CLIENT:SOCKETCONNECTED",onSocketConnected)

        return () => {
            socket.off("NEW",onNew)
            socket.off("CLIENT:QUEUED",onQueued)
            socket.off("CLIENT:STARTED",onStarted)
            socket.off("CLIENT:CLOSED",onClosed)
            socket.off("CLIENT:DEQUEUED",onDequeued)
            socket.off("CLIENT:SOCKETDISCONNECTED",onSocketDisconnected)
            socket.off("CLIENT:SOCKETCONNECTED",onSocketConnected)
        }
    },[socket])
  
  
    return (
        <>
            {children}
        </>
    )
}

export default SocketInstanceEvents