import { Socket } from "socket.io";
import { SocketHeartbeat } from "./SocketHeartbeat.class";


export class SocketEntry {
    private username
    private _socket : Socket
    private events : {[key:string]: (username:string, ...args:any[])=>any}
    private heartbeat : SocketHeartbeat | null = null


    constructor(username:string,socket:Socket, events:SocketEntry["events"] = {}, heartbeat?:SocketHeartbeat["events"])
    {
        this.username = username
        this._socket = socket
        this.events = events
        if(heartbeat != undefined)
        {
            this.heartbeat = new SocketHeartbeat(socket,heartbeat)
        }
        this.on()
    }

    public on()
    {
        for(let [event,callback] of  Object.entries(this.events))
        {
            this._socket.on(event,(...args:any[])=>{callback(this.username,...args)})
        }
        
        if(this.heartbeat)
        {
            this.heartbeat.start()
        }
    }

    public off()
    {
        for(let [event,callback] of  Object.entries(this.events))
        {
            this._socket.off(event,callback)
        }

        if(this.heartbeat)
        {
            this.heartbeat.stop()
        }
    }

    get socket ()
    {
        return this._socket
    }
}
