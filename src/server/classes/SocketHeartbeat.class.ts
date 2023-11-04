import { Socket } from "socket.io";

interface HeartbeatCallbacks {
    disconnect:(...args:any)=>any
    heartbeat:(...args:any)=>any
}

export class SocketHeartbeat
{
    private socket : Socket
    private offlineTimeout : NodeJS.Timeout | null = null
    private interval : number
    private events : HeartbeatCallbacks

    public connected : boolean

    //'removeListener' is a callback which should (and will) simply encapsulate this.onHeartbeat, it is necessary to
    //keep a reference to 'this' reffering to the class instance, so that the functionality
    //can properly occur (this may be replacable by using .bind somehow)
    //it is necessary to store, so that when heartbeat is stopped, we can clear the event,
    // referencing this callback.
    private removeListener : () => void = ()=>{} 



    constructor(socket : Socket,events:HeartbeatCallbacks,interval = 6000)
    {
        this.socket = socket
        this.interval = interval
        this.events = events
        this.connected = socket.connected


        this.start()
    }

    private onHeartbeat()
    {
        this.connected = true

        if(this.offlineTimeout)
        {
            //clear previous timeout.
            clearTimeout(this.offlineTimeout)
        }
        //define new timeout.
        this.offlineTimeout = this.timeout()

        //call event
        this.events.heartbeat()
    }


    private timeout()
    {
        return setTimeout(()=>{
            this.connected = false
            this.events.disconnect()
        },this.interval)
    }


    public stop()
    {
        this.removeListener()
        if(this.offlineTimeout)
        {
            clearTimeout(this.offlineTimeout)
        }
    }

    public start()
    {
        //define some callback that encapsulates this.onHeartbeat (see top of file for explanation on why this is necessary)
        const listen = () => {
            this.onHeartbeat()
        }

        this.socket.on("heartbeat",listen)

        this.removeListener = () => {
            this.socket.off("heartbeat",listen)
        }

        if(!this.offlineTimeout)
        {
            this.offlineTimeout = this.timeout()
        }
    }
}