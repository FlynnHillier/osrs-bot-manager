import { BotInstanceMaster } from "../classes/BotInstanceMaster.class";
import { SocketEntry } from "../classes/SocketEntry.class";
import { botInstanceMaster } from "../init/botInstanceMaster.init";
import { GenericSocketHeartbeatEvents } from "../classes/SocketManager.class";

export const socketHeartbeatEvents : GenericSocketHeartbeatEvents = {
    heartbeat:(username)=>{
        if(botInstanceMaster.instanceExists(username))
        {
            botInstanceMaster.getInstance(username)?.client.getCallbacks().socketConnected()
        }
    },
    disconnect:(username)=>{
        if(botInstanceMaster.instanceExists(username))
        {
            botInstanceMaster.getInstance(username)?.client.getCallbacks().socketDisconnected()
        }
    }
}

export const socketEvents : SocketEntry["events"] = {}