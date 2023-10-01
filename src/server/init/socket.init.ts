import {Server} from "socket.io"
import {applySocketRoutes} from "../sockets/router.socket"


export function initialiseSocketServer(existingServer?:any) : Server{
    const wss = new Server(existingServer)
    applySocketRoutes(wss)
    wss.listen(Number(process.env.PORT) as number)
    return wss
}
