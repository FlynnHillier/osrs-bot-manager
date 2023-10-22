import React from "react"
import { InstanceState } from "@common/types/instanceState.types";
import { TailSpin } from "react-loader-spinner";
import {FaPlay} from "react-icons/fa"
import "../styles/clientStatusIcon.css"
import { bootInstance } from "../logic/instance.logic";
import {ClipLoader} from "react-spinners"

interface Props {
    instance:InstanceState
}

function ClientStatusIcon({instance}:Props) {
    return ( 
        <div className="clientStatusIcon">
            {
                instance.client.isActive  && instance.client.isSocketConnected ? <div className="icon launched connected"/> :
                instance.client.isActive ? <div className="icon launched"/> :
                instance.client.queue.isQueued ? <ClipLoader size={14}/> :
                <FaPlay className="icon idle" onClick={()=>{bootInstance(instance)}}/>
            }
        </div>
     );
}

export default ClientStatusIcon;