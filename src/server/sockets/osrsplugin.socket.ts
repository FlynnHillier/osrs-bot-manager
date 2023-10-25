import { Namespace } from "socket.io";
import { SocketEvent,SocketIdentifyPayload } from "../types/sockets.types";
import {Server} from "socket.io"
import { osrsPluginSocketManager } from "./managers.socket";

export function applyOSRSPluginSocketRoutes(socketServer:Server) : Namespace {
    const OSRSPluginNamespace = socketServer.of("/osrsplugin")
    
    OSRSPluginNamespace.on("connection",(socket)=>{
        console.log("an osrs plugin has connected.")
    
        socket.on("identify",({username}: SocketIdentifyPayload) =>{
            osrsPluginSocketManager.getBundle(username).onSocketConnection(socket)
            console.log(`a client has identified themselves as ${username}`)
        })
    })

    return OSRSPluginNamespace
}