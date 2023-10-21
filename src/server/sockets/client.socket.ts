import { Namespace, Socket } from "socket.io";
import {Server} from "socket.io"
import { clientSocketBundle } from "./managers.socket";
import { botInstanceMaster } from "../init/botInstanceMaster.init";


function router(socket:Socket) {
    socket.on("BOOT",(username:string)=>{
        // botInstanceMaster.startInstance(username)
    })
}


export function applyClientSocketRoutes(socketServer:Server) : Namespace {
    const ClientNamespace = socketServer.of("/client")
    
    ClientNamespace.on("connection",(socket)=>{
        clientSocketBundle.onSocketConnection(socket)
        router(socket)

        //populate client with existing instances
        for(let instance of botInstanceMaster.getAllInstances()) {
            socket.emit("NEW",instance.clientState)
        }

        socket.on("disconnect",()=>{
            clientSocketBundle.onSocketDisconnect(socket)
        })
    })

    return ClientNamespace
}