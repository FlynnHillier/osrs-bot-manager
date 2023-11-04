import { Socket } from "socket.io";
import { SocketEntry } from "./SocketEntry.class";
import { SocketHeartbeat } from "./SocketHeartbeat.class";


export type GenericSocketHeartbeatEvents = {
    heartbeat:(username:string)=>any
    disconnect:(username:string)=>any
}


export class SocketManager {
    private socketMap: Map<string,SocketEntry> = new Map<string,SocketEntry>()
    private events : SocketEntry["events"]
    private heartbeatEvents : GenericSocketHeartbeatEvents | null = null

    constructor(events:SocketEntry["events"] = {},heartbeat?:GenericSocketHeartbeatEvents)
    {
        this.events = events
        if(heartbeat)
        {
            this.heartbeatEvents = heartbeat
        }
    }

    public existsSocket(username:string) : boolean
    {
        return Array.from(this.socketMap.keys()).includes(username)
    }
    
    public bindSocket(username:string,socket:Socket) : void
    {
        if(this.existsSocket(username))
        {
            const s = this.getSocket(username) as SocketEntry
            s.off()
            s.socket.disconnect()
        }

        this.socketMap.set(username,
            new SocketEntry(
                username,
                socket,
                this.events,
                this.heartbeatEvents != null ? this._wrapGenericHeartbeatEvents(this.heartbeatEvents,username) : undefined
            )
        )
    }

    public getSocket(username:string) : SocketEntry | null
    {
        return this.socketMap.get(username) || null
    }

    
    private _wrapGenericHeartbeatEvents(genericHeartBeatEvents : GenericSocketHeartbeatEvents,username:string) : SocketHeartbeat["events"]
    {
        //wrap heartbeat events so that when callback is called, a username argument is provided.
        return {
            disconnect:()=>{
                genericHeartBeatEvents.disconnect(username)
            },
            heartbeat:()=>{
                genericHeartBeatEvents.heartbeat(username)
            }
        }
    }

}