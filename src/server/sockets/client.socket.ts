import { Namespace, Socket } from "socket.io";
import {Server} from "socket.io"
import { clientSocketBundle } from "./managers.socket";


function router(socket:Socket) {
    
}


export function applyClientSocketRoutes(socketServer:Server) : Namespace {
    const ClientNamespace = socketServer.of("/client")
    
    ClientNamespace.on("connection",(socket)=>{
        router(socket)

        console.log("a gui client has connected.")

        socket.on("disconnect",()=>{
            clientSocketBundle.onSocketDisconnect(socket)
        })
    })

    return ClientNamespace
}