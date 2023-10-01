import { SocketEvent,SocketIdentifyPayload } from "../types/sockets.types";
import { socketManager } from "./manager.socket";
import {Socket,Server} from "socket.io"

export function applySocketRoutes(socketServer:Server) : void {
    socketServer.on("connection",(socket)=>{
        console.log("a client has connected.")
    
        socket.on("identify",({username}: SocketIdentifyPayload) =>{
            socketManager.registerConnection(username,socket)
            console.log(`a client has identified themselves as ${username}`)
        })
    })

}