import { wss } from "./init.socket";
import { SocketEvent,SocketIdentifyPayload } from "../types/sockets.types";
import { socketManager } from "./manager.socket";
import {Socket} from "socket.io"

const onConnection = () => {
    console.log("a client has made a connection.")
}


wss.on("connection",(socket)=>{
    onConnection()
    socket.on("identify",({username}: SocketIdentifyPayload) =>{
        socketManager.registerConnection(username,socket)
        console.log(`a client has identified themselves as ${username}`)
    })
})

wss.listen(8080)