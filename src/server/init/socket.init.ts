import {Server} from "socket.io"
import { applyClientSocketRoutes } from "../sockets/client.socket"
import { applyOSRSPluginSocketRoutes } from "../sockets/osrsplugin.socket"


export function initialiseSocketServer(existingServer?:any) : Server{
    const wss = new Server(existingServer,{
        cors:{
            origin:process.env.CLIENT_URL,
            methods:["GET","POST"],
            credentials:true,
        }
    })
    applyClientSocketRoutes(wss)
    applyOSRSPluginSocketRoutes(wss)
    wss.listen(Number(process.env.PORT) as number)
    return wss
}
