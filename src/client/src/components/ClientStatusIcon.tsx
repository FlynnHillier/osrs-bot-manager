import React,{useEffect} from "react"
import { InstanceState } from "@common/types/instanceState.types";
import { TailSpin } from "react-loader-spinner";
import {FaPlay} from "react-icons/fa"
import "../styles/clientStatusIcon.css"
import { bootInstance } from "../logic/instance.logic";
import {ClipLoader} from "react-spinners"

interface Props {
    instances:InstanceState[]
}

function ClientStatusIcon({instances}:Props) {
    function someInstancesIdle() : boolean {
        return instances.some((instance)=>{return (!instance.client.queue.isQueued && !instance.client.isActive)})
    }

    function someInstancesActive() : boolean{
        return instances.some((instance)=>{return instance.client.isActive})
    }

    function someInstancesQueued() : boolean{
        return instances.some((instance)=>{return instance.client.queue.isQueued})
    }

    function everyInstancesSocketConnected() : boolean{
        return instances.every((instance)=>{return instance.client.isSocketConnected})
    }

    function bootAll(){
        instances.forEach((instance)=>bootInstance(instance))
    }


    return ( 
        <div className="clientStatusIcon">
            {   
                someInstancesIdle() ? <FaPlay className="icon idle" onClick={bootAll}/> :
                someInstancesQueued() ? <ClipLoader size={14}/> :
                someInstancesActive() && !everyInstancesSocketConnected() ? <div className="icon launched"/> :
                <div className="icon launched connected"/>
            }
        </div>
     );
}

export default ClientStatusIcon;