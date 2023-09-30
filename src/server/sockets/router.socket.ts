import { wss } from "./init.socket";
import { SocketEvent,SocketMessage } from "../types/sockets.types";
import { socketManager } from "./manager.socket";
import {WebSocket} from "ws";

const onConnection = () => {
    console.log("a client has made a connection.")
    //register socket to some 'unknown sockets' pool
}



const onMessage = (message : SocketMessage,socket:WebSocket) => {
    const {event,payload} = message
    
    switch(event) {
        case "identify":
            console.log(`a client has identified themselves: ${payload.username}`)
            socketManager.register(payload.username,socket)
            break
        default:
            console.log(`a client sent a message in an unrecognised format:`,message)
    }
}


wss.on("connection",(socket)=>{
    onConnection()
    socket.on("message",(data) =>{
        try {
            console.log(data.toString())
            const parsedData = JSON.parse(data.toString())
            console.log("new message: ", parsedData)
            onMessage(parsedData,socket)
        } catch(e) {
            console.error(e)
        }
    })
})