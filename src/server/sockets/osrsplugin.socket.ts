import { Namespace } from "socket.io";
import { SocketEvent,SocketIdentifyPayload } from "../types/sockets.types";
import {Server} from "socket.io"
import { osrsPluginSocketManager } from "./managers.socket";
import { botInstanceMaster } from "../init/botInstanceMaster.init";

export function applyOSRSPluginSocketRoutes(socketServer:Server) : Namespace {
    const OSRSPluginNamespace = socketServer.of("/osrsplugin")
    
    OSRSPluginNamespace.on("connection",(socket)=>{            
        socket.on("identify",({username}: SocketIdentifyPayload) =>{
            if(username == undefined)
            {
                console.error("invalid plugin identification - no username")
                return
            }

            if(!botInstanceMaster.instanceExists(username))
            {
                console.error("a client identified themselves. but was not recognised: " + username)
                return
            }
            
            osrsPluginSocketManager.bindSocket(username,socket)
        })
    })

    return OSRSPluginNamespace
}